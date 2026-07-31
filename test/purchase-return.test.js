// ============================================================
// test/purchase-return.test.js
// اختبار ميزة "مردود الشراء" (Purchase Return) — مرآة لمردود المبيع بالاتجاه المعاكس:
//  - مردود جزئي لفاتورة شراء مدفوعة بالكامل → يزيد creditBalance للمورد والمخزون يُنقّص.
//  - مردود لفاتورة شراء آجلة غير مدفوعة → يُنقّص balance (ديننا للمورد).
//  - مردود لفاتورة مدفوعة جزئياً وقيمته > الدين → جزء يُنقّص balance والباقي creditBalance.
//  - منع إرجاع كمية أكبر من المتاح (بعد مردودات سابقة).
//  - الترقيم التسلسلي PRET-001, PRET-002.
//  - ظهور المردود كبند في كشف حساب المورد (تأثيره على المتبقي).
// يُشغّل عبر:  node test/purchase-return.test.js   (أو npm test)
// يستورد الدوال النقية الحقيقية من db.js (نفس منطق app.js حرفياً).
// ============================================================

const assert = require('assert');
const path   = require('path');
const os     = require('os');
const fs     = require('fs');

const dbm = require('../db.js');
const {
  computeReturnableQty, validateReturnQty, computePurchaseReturnEffect,
  computeInventory, computeInvoiceRemaining, roundMoney,
} = dbm;

let passed = 0;
function test(name, fn) {
  fn();
  passed++;
  console.log('  \u2705 ' + name);
}

// ------------------------------------------------------------
// محاكاة دقيقة لتدفق savePurchaseReturn في app.js (نفس الدوال النقية من db.js)
// ------------------------------------------------------------

// رقم مردود شراء تسلسلي — مستقل عن ترقيم الفواتير ومردود المبيع (نفس صيغة app.js).
function nextPurchaseReturnNumber(counter) {
  return 'PRET-' + String(counter).padStart(3, '0');
}

// مجموع ما سبق إرجاعه لبند مصدر (srcLine) من مردودات شراء فاتورة معينة.
function priorReturnedForLine(returns, invNumber, srcLine) {
  return roundMoney(returns
    .filter(r => r.type === 'purchase' && r.refInvoice === invNumber)
    .reduce((s, r) => s + (r.lines || [])
      .filter(l => l.srcLine === srcLine)
      .reduce((ss, l) => ss + (parseFloat(l.qty) || 0), 0), 0));
}

// يعكس savePurchaseReturn: يحسب الأثر، يطفّر balance/creditBalance للمورد، ويضيف المردود.
function applyPurchaseReturn(supplier, invoice, returns, payments, retLines, counter) {
  // retLines: [{ srcLine, itemId, qty, price, unitType }]
  const priorPurchaseReturns = returns.filter(r => r.type === 'purchase' && r.refInvoice === invoice.number);
  const remaining = computeInvoiceRemaining(invoice, payments, priorPurchaseReturns).remaining;
  const total = roundMoney(retLines.reduce((s, l) => s + (l.qty * l.price), 0));
  const eff = computePurchaseReturnEffect(remaining, total);
  const number = nextPurchaseReturnNumber(counter);
  const ret = {
    number, type: 'purchase', date: '2026-07-10', party: supplier.name,
    refInvoice: invoice.number, total,
    debtReduction: eff.debtReduction, creditAdded: eff.creditAdded,
    lines: retLines.map(l => ({ ...l, total: roundMoney(l.qty * l.price) })),
  };
  returns.push(ret);
  if (eff.debtReduction > 0.005) supplier.balance = Math.max(0, roundMoney((supplier.balance || 0) - eff.debtReduction));
  if (eff.creditAdded   > 0.005) supplier.creditBalance = roundMoney((supplier.creditBalance || 0) + eff.creditAdded);
  return { ret, eff, remainingBefore: remaining };
}

// ------------------------------------------------------------
// 1) الدوال النقية
// ------------------------------------------------------------
console.log('\n\u2192 الدوال النقية (db.js)');

test('computeReturnableQty: المتاح = المشترى − المُرجع سابقاً', () => {
  assert.strictEqual(computeReturnableQty(10, 0), 10);
  assert.strictEqual(computeReturnableQty(10, 7), 3);
  assert.strictEqual(computeReturnableQty(10, 10), 0);
  assert.strictEqual(computeReturnableQty(10, 12), 0); // لا ينزل تحت الصفر
});

test('computePurchaseReturnEffect: فاتورة مسدّدة (المتبقي 0) → كل القيمة رصيد إضافي', () => {
  const e = computePurchaseReturnEffect(0, 20);
  assert.strictEqual(e.debtReduction, 0);
  assert.strictEqual(e.creditAdded, 20);
});

test('computePurchaseReturnEffect: القيمة أقل من الدين → كلها خصم من الدين', () => {
  const e = computePurchaseReturnEffect(50, 20);
  assert.strictEqual(e.debtReduction, 20);
  assert.strictEqual(e.creditAdded, 0);
});

test('computePurchaseReturnEffect: القيمة > الدين → جزء دين والباقي رصيد إضافي', () => {
  const e = computePurchaseReturnEffect(5, 20);
  assert.strictEqual(e.debtReduction, 5);
  assert.strictEqual(e.creditAdded, 15);
});

// ------------------------------------------------------------
// 2) مردود جزئي لفاتورة شراء مدفوعة بالكامل (نقدية) → creditBalance + المخزون يُنقّص
// ------------------------------------------------------------
console.log('\n\u2192 مردود جزئي لفاتورة شراء مدفوعة بالكامل');

test('فاتورة شراء نقدية: إرجاع 4 من 10 → creditBalance +20 والمخزون يُنقّص 4', () => {
  const supplier = { name: 'مورد نقدي', balance: 0, creditBalance: 0 };
  const invoice = { number: 'PINV-001', supplierName: supplier.name, paymentType: 'cash', total: 50,
    lines: [{ itemId: 'NUM-001', qty: 10, price: 5, total: 50, unitType: 'unit' }] };
  const returns = [];
  const payments = [];

  const r = applyPurchaseReturn(supplier, invoice, returns, payments,
    [{ srcLine: 0, itemId: 'NUM-001', qty: 4, price: 5, unitType: 'unit' }], 1);

  assert.strictEqual(r.remainingBefore, 0, 'فاتورة الشراء النقدية بلا دين');
  assert.strictEqual(r.eff.debtReduction, 0);
  assert.strictEqual(r.eff.creditAdded, 20);
  assert.strictEqual(supplier.creditBalance, 20, 'الرصيد الإضافي المستحق لنا يصير 20');
  assert.strictEqual(supplier.balance, 0);
  assert.strictEqual(r.ret.number, 'PRET-001');

  // المخزون: شراء 10 − مردود شراء 4 = 6 (البضاعة رجعت للمورد)
  const data = {
    purchaseInvoices: [invoice],
    salesInvoices: [],
    returns, damages: [],
  };
  const inv = computeInventory(data);
  assert.strictEqual(inv['NUM-001'], 6, 'المخزون يُنقّص لـ 6 بعد المردود');
});

// ------------------------------------------------------------
// 3) مردود لفاتورة شراء آجلة غير مدفوعة → يُنقّص balance
// ------------------------------------------------------------
console.log('\n\u2192 مردود لفاتورة شراء آجلة غير مدفوعة');

test('فاتورة آجلة (دين 50): إرجاع 4 → balance ينزل 20', () => {
  const supplier = { name: 'مورد آجل', balance: 50, creditBalance: 0 };
  const invoice = { number: 'PINV-010', supplierName: supplier.name, paymentType: 'deferred', total: 50, paidAmount: 0,
    lines: [{ itemId: 'NUM-003', qty: 10, price: 5, total: 50, unitType: 'unit' }] };
  const returns = [];
  const payments = [];

  const r = applyPurchaseReturn(supplier, invoice, returns, payments,
    [{ srcLine: 0, itemId: 'NUM-003', qty: 4, price: 5, unitType: 'unit' }], 1);

  assert.strictEqual(r.remainingBefore, 50);
  assert.strictEqual(r.eff.debtReduction, 20);
  assert.strictEqual(r.eff.creditAdded, 0);
  assert.strictEqual(supplier.balance, 30, 'الدين ينزل من 50 إلى 30');
  assert.strictEqual(supplier.creditBalance, 0);

  // كشف حساب المورد: المتبقي على الفاتورة = 30 (نفس مصدر invoiceBalance)
  assert.strictEqual(computeInvoiceRemaining(invoice, payments, returns).remaining, 30, 'المتبقي يعكس المردود');
  // المردود موثّق كبند في الكشف
  assert.strictEqual(r.ret.party, supplier.name);
  assert.strictEqual(r.ret.refInvoice, 'PINV-010');
  assert.strictEqual(r.ret.total, 20);
});

// ------------------------------------------------------------
// 4) مردود لفاتورة مدفوعة جزئياً والقيمة > الدين المتبقي
// ------------------------------------------------------------
console.log('\n\u2192 مردود لفاتورة مدفوعة جزئياً');

test('دين متبقي 5 ومردود 20 → 5 خصم من balance و 15 رصيد إضافي', () => {
  const supplier = { name: 'مورد جزئي', balance: 5, creditBalance: 0 };
  const invoice = { number: 'PINV-020', supplierName: supplier.name, paymentType: 'deferred', total: 50, paidAmount: 0,
    lines: [{ itemId: 'NUM-004', qty: 10, price: 5, total: 50, unitType: 'unit' }] };
  // دفعة مربوطة 45 → المتبقي 5
  const payments = [{ amount: 45, linkedInvoice: 'PINV-020' }];
  const returns = [];

  assert.strictEqual(computeInvoiceRemaining(invoice, payments, []).remaining, 5, 'المتبقي قبل المردود 5');

  const r = applyPurchaseReturn(supplier, invoice, returns, payments,
    [{ srcLine: 0, itemId: 'NUM-004', qty: 4, price: 5, unitType: 'unit' }], 1);

  assert.strictEqual(r.eff.debtReduction, 5, 'يُسدّد الدين المتبقي 5');
  assert.strictEqual(r.eff.creditAdded, 15, 'الفائض 15 رصيد إضافي');
  assert.strictEqual(supplier.balance, 0);
  assert.strictEqual(supplier.creditBalance, 15);

  // بعد المردود: دين الفاتورة = 0
  assert.strictEqual(computeInvoiceRemaining(invoice, payments, returns).remaining, 0, 'الفاتورة تُسوّى بالكامل');
});

// ------------------------------------------------------------
// 5) منع إرجاع أكثر من المتاح (بعد مردودات سابقة)
// ------------------------------------------------------------
console.log('\n\u2192 منع تجاوز الكمية المتاحة');

test('إرجاع أكبر من المتاح يُرفض، وبعد مردود سابق يُحدّث المتاح', () => {
  const invNumber = 'PINV-030';
  const returns = [];
  // مشترى 10، لا مردودات بعد
  let prior = priorReturnedForLine(returns, invNumber, 0);
  assert.strictEqual(prior, 0);
  assert.strictEqual(validateReturnQty(11, 10, prior).ok, false, '11 > 10 يُرفض');
  assert.strictEqual(validateReturnQty(11, 10, prior).reason, 'exceeds');
  assert.strictEqual(validateReturnQty(0, 10, prior).ok, false, 'الصفر يُرفض');
  assert.strictEqual(validateReturnQty(10, 10, prior).ok, true, 'الإرجاع الكامل مسموح');

  // مردود سابق 7 → المتاح 3
  returns.push({ type: 'purchase', refInvoice: invNumber, lines: [{ srcLine: 0, itemId: 'X', qty: 7 }] });
  prior = priorReturnedForLine(returns, invNumber, 0);
  assert.strictEqual(prior, 7);
  assert.strictEqual(computeReturnableQty(10, prior), 3);
  assert.strictEqual(validateReturnQty(4, 10, prior).ok, false, '4 > المتاح 3 يُرفض');
  assert.strictEqual(validateReturnQty(3, 10, prior).ok, true, '3 مسموح');
});

// ------------------------------------------------------------
// 6) الترقيم التسلسلي PRET-001, PRET-002
// ------------------------------------------------------------
console.log('\n\u2192 الترقيم التسلسلي');

test('الترقيم يتسلسل PRET-001 ثم PRET-002 (مستقل عن الفواتير ومردود المبيع)', () => {
  assert.strictEqual(nextPurchaseReturnNumber(1), 'PRET-001');
  assert.strictEqual(nextPurchaseReturnNumber(2), 'PRET-002');
  assert.strictEqual(nextPurchaseReturnNumber(10), 'PRET-010');

  const supplier = { name: 'مورد متعدد', balance: 0, creditBalance: 0 };
  const invoice = { number: 'PINV-040', supplierName: supplier.name, paymentType: 'cash', total: 100,
    lines: [{ itemId: 'NUM-001', qty: 20, price: 5, total: 100, unitType: 'unit' }] };
  const returns = [];
  const r1 = applyPurchaseReturn(supplier, invoice, returns, [], [{ srcLine: 0, itemId: 'NUM-001', qty: 2, price: 5, unitType: 'unit' }], 1);
  const r2 = applyPurchaseReturn(supplier, invoice, returns, [], [{ srcLine: 0, itemId: 'NUM-001', qty: 3, price: 5, unitType: 'unit' }], 2);
  assert.strictEqual(r1.ret.number, 'PRET-001');
  assert.strictEqual(r2.ret.number, 'PRET-002');
  assert.strictEqual(returns.length, 2);
});

// ------------------------------------------------------------
// 7) الثبات (persistence) + المخزون — يتخطّى تلقائياً إن لم تتوفر better-sqlite3
// ------------------------------------------------------------
console.log('\n\u2192 ثبات مردود الشراء والمخزون في SQLite (db.js)');

let sqliteAvailable = true;
try { require('better-sqlite3'); } catch (e) { sqliteAvailable = false; }

if (!sqliteAvailable) {
  console.log('  \u26a0\ufe0f  تخطي: better-sqlite3 غير مثبّت — اختبار الثبات تُجوزّ');
} else {
  test('saveAll/loadAll: يحفظ ويسترجع حقول مردود الشراء ويُنقّص المخزون', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'pret-test-'));
    dbm.openDatabase(dir);
    const data = dbm.loadAll();
    data.items = [{ id: 'NUM-001', name: 'إسمنت', unit: 'كيس' }];
    data.suppliers = [{ id: 'SUP-001', name: 'مورد', balance: 0, creditBalance: 0 }];
    data.purchaseInvoices = [{ number: 'PINV-001', supplierName: 'مورد', paymentType: 'cash', total: 30,
      lines: [{ itemId: 'NUM-001', qty: 10, price: 3, total: 30, unitType: 'unit' }] }];
    data.salesInvoices = [];
    data.returns = [{ number: 'PRET-001', type: 'purchase', date: '2026-07-10', party: 'مورد', refInvoice: 'PINV-001',
      total: 6, debtReduction: 0, creditAdded: 6,
      lines: [{ itemId: 'NUM-001', qty: 2, price: 3, total: 6, unitType: 'unit', srcLine: 0 }] }];
    dbm.saveAll(data);

    const reloaded = dbm.loadAll();
    const ret = reloaded.returns.find(r => r.number === 'PRET-001');
    assert.ok(ret, 'مردود الشراء يُحفظ');
    assert.strictEqual(ret.type, 'purchase');
    assert.strictEqual(ret.refInvoice, 'PINV-001');
    assert.strictEqual(roundMoney(ret.creditAdded), 6);
    assert.strictEqual(ret.lines[0].srcLine, 0, 'srcLine يُحفظ');

    // المخزون: شراء 10 − مردود شراء 2 = 8
    const inv = computeInventory(reloaded);
    assert.strictEqual(inv['NUM-001'], 8, 'المخزون يعكس المردود بعد إعادة التحميل');

    fs.rmSync(dir, { recursive: true, force: true });
  });
}

console.log('\n\u2705 نجحت كل اختبارات مردود الشراء (' + passed + ')\n');

