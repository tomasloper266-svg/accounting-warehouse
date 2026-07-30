// ============================================================
// test/sales-return.test.js
// اختبار ميزة "مردود المبيع" (Sales Return):
//  - مردود جزئي لفاتورة مدفوعة بالكامل → يزيد creditBalance والمخزون يرجع.
//  - مردود لفاتورة آجلة غير مدفوعة → ينقّص balance.
//  - مردود لفاتورة مدفوعة جزئياً وقيمته > الدين → جزء ينقّص balance والباقي creditBalance.
//  - منع إرجاع كمية أكبر من المتاح (بعد مردودات سابقة).
//  - الترقيم التسلسلي RET-001, RET-002.
// يُشغّل عبر:  node test/sales-return.test.js   (أو npm test)
// يستورد الدوال النقية الحقيقية من db.js (نفس منطق app.js حرفياً).
// ============================================================

const assert = require('assert');
const path   = require('path');
const os     = require('os');
const fs     = require('fs');

const dbm = require('../db.js');
const {
  computeReturnableQty, validateReturnQty, computeSalesReturnEffect,
  computeInventory, computeInvoiceRemaining, computeAccountSummary, roundMoney,
} = dbm;

let passed = 0;
function test(name, fn) {
  fn();
  passed++;
  console.log('  \u2705 ' + name);
}

// ------------------------------------------------------------
// محاكاة دقيقة لتدفق saveSalesReturn في app.js (نفس الدوال النقية من db.js)
// ------------------------------------------------------------

// رقم مردود تسلسلي — مستقل عن ترقيم الفواتير (نفس صيغة app.js).
function nextReturnNumber(counter) {
  return 'RET-' + String(counter).padStart(3, '0');
}

// مجموع ما سبق إرجاعه لبند مصدر (srcLine) من مردودات فاتورة معينة.
function priorReturnedForLine(returns, invNumber, srcLine) {
  return roundMoney(returns
    .filter(r => r.type === 'sale' && r.refInvoice === invNumber)
    .reduce((s, r) => s + (r.lines || [])
      .filter(l => l.srcLine === srcLine)
      .reduce((ss, l) => ss + (parseFloat(l.qty) || 0), 0), 0));
}

// يعكس saveSalesReturn: يحسب الأثر، يطفّر balance/creditBalance، ويضيف المردود.
function applySalesReturn(customer, invoice, returns, payments, retLines, counter) {
  // retLines: [{ srcLine, itemId, qty, price, unitType }]
  const priorSaleReturns = returns.filter(r => r.type === 'sale' && r.refInvoice === invoice.number);
  const remaining = computeInvoiceRemaining(invoice, payments, priorSaleReturns).remaining;
  const total = roundMoney(retLines.reduce((s, l) => s + (l.qty * l.price), 0));
  const eff = computeSalesReturnEffect(remaining, total);
  const number = nextReturnNumber(counter);
  const ret = {
    number, type: 'sale', date: '2026-07-10', party: customer.name,
    refInvoice: invoice.number, total,
    debtReduction: eff.debtReduction, creditAdded: eff.creditAdded,
    lines: retLines.map(l => ({ ...l, total: roundMoney(l.qty * l.price) })),
  };
  returns.push(ret);
  if (eff.debtReduction > 0.005) customer.balance = Math.max(0, roundMoney((customer.balance || 0) - eff.debtReduction));
  if (eff.creditAdded   > 0.005) customer.creditBalance = roundMoney((customer.creditBalance || 0) + eff.creditAdded);
  return { ret, eff, remainingBefore: remaining };
}

// ------------------------------------------------------------
// 1) الدوال النقية
// ------------------------------------------------------------
console.log('\n\u2192 الدوال النقية (db.js)');

test('computeReturnableQty: المتاح = المباع − المُرجع سابقاً', () => {
  assert.strictEqual(computeReturnableQty(10, 0), 10);
  assert.strictEqual(computeReturnableQty(10, 7), 3);
  assert.strictEqual(computeReturnableQty(10, 10), 0);
  assert.strictEqual(computeReturnableQty(10, 12), 0); // لا ينزل تحت الصفر
});

test('computeSalesReturnEffect: فاتورة مسدّدة (المتبقي 0) → كل القيمة رصيد إضافي', () => {
  const e = computeSalesReturnEffect(0, 20);
  assert.strictEqual(e.debtReduction, 0);
  assert.strictEqual(e.creditAdded, 20);
});

test('computeSalesReturnEffect: القيمة أقل من الدين → كلها خصم من الدين', () => {
  const e = computeSalesReturnEffect(50, 20);
  assert.strictEqual(e.debtReduction, 20);
  assert.strictEqual(e.creditAdded, 0);
});

test('computeSalesReturnEffect: القيمة > الدين → جزء دين والباقي رصيد إضافي', () => {
  const e = computeSalesReturnEffect(5, 20);
  assert.strictEqual(e.debtReduction, 5);
  assert.strictEqual(e.creditAdded, 15);
});

// ------------------------------------------------------------
// 2) مردود جزئي لفاتورة مدفوعة بالكامل (نقدية) → creditBalance + المخزون
// ------------------------------------------------------------
console.log('\n\u2192 مردود جزئي لفاتورة مدفوعة بالكامل');

test('فاتورة نقدية: إرجاع 4 من 10 → creditBalance +20 والمخزون يرجع 4', () => {
  const customer = { name: 'زبون نقدي', balance: 0, creditBalance: 0 };
  const invoice = { number: 'INV-001', customerName: customer.name, paymentType: 'cash', total: 50,
    lines: [{ itemId: 'NUM-001', qty: 10, price: 5, total: 50, unitType: 'unit' }] };
  const returns = [];
  const payments = [];

  const r = applySalesReturn(customer, invoice, returns, payments,
    [{ srcLine: 0, itemId: 'NUM-001', qty: 4, price: 5, unitType: 'unit' }], 1);

  assert.strictEqual(r.remainingBefore, 0, 'الفاتورة النقدية بلا دين');
  assert.strictEqual(r.eff.debtReduction, 0);
  assert.strictEqual(r.eff.creditAdded, 20);
  assert.strictEqual(customer.creditBalance, 20, 'الرصيد الإضافي يصير 20');
  assert.strictEqual(customer.balance, 0);
  assert.strictEqual(r.ret.number, 'RET-001');

  // المخزون: شراء 10 − بيع 10 + مردود 4 = 4
  const data = {
    purchaseInvoices: [{ number: 'P-1', lines: [{ itemId: 'NUM-001', qty: 10 }] }],
    salesInvoices: [invoice],
    returns, damages: [],
  };
  const inv = computeInventory(data);
  assert.strictEqual(inv['NUM-001'], 4, 'المخزون يرجع لـ 4 بعد المردود');
});

// ------------------------------------------------------------
// 3) مردود لفاتورة آجلة غير مدفوعة → ينقّص balance
// ------------------------------------------------------------
console.log('\n\u2192 مردود لفاتورة آجلة غير مدفوعة');

test('فاتورة آجلة (دين 50): إرجاع 4 → balance ينزل 20', () => {
  const customer = { name: 'زبون آجل', balance: 50, creditBalance: 0 };
  const invoice = { number: 'INV-010', customerName: customer.name, paymentType: 'deferred', total: 50, paidAmount: 0,
    lines: [{ itemId: 'NUM-003', qty: 10, price: 5, total: 50, unitType: 'unit' }] };
  const returns = [];
  const payments = [];

  const r = applySalesReturn(customer, invoice, returns, payments,
    [{ srcLine: 0, itemId: 'NUM-003', qty: 4, price: 5, unitType: 'unit' }], 1);

  assert.strictEqual(r.remainingBefore, 50);
  assert.strictEqual(r.eff.debtReduction, 20);
  assert.strictEqual(r.eff.creditAdded, 0);
  assert.strictEqual(customer.balance, 30, 'الدين ينزل من 50 إلى 30');
  assert.strictEqual(customer.creditBalance, 0);

  // كشف الحساب: المتبقي العام = 30، والهوية totalPaid = totalInvoices − remaining
  const acc = computeAccountSummary({ invoices: [invoice], payments, returns, creditBalance: 0 });
  assert.strictEqual(acc.remaining, 30, 'الدين العام يعكس المردود');
  assert.strictEqual(acc.totalPaid, roundMoney(acc.totalInvoices - acc.remaining), 'الهوية الحسابية محفوظة');
  assert.strictEqual(acc.totalReturnDebt, 20);
});

// ------------------------------------------------------------
// 4) مردود لفاتورة مدفوعة جزئياً والقيمة > الدين المتبقي
// ------------------------------------------------------------
console.log('\n\u2192 مردود لفاتورة مدفوعة جزئياً');

test('دين متبقي 5 ومردود 20 → 5 خصم من balance و 15 رصيد إضافي', () => {
  const customer = { name: 'زبون جزئي', balance: 5, creditBalance: 0 };
  const invoice = { number: 'INV-020', customerName: customer.name, paymentType: 'deferred', total: 50, paidAmount: 0,
    lines: [{ itemId: 'NUM-004', qty: 10, price: 5, total: 50, unitType: 'unit' }] };
  // دفعة مربوطة 45 → المتبقي 5
  const payments = [{ amount: 45, linkedInvoice: 'INV-020' }];
  const returns = [];

  assert.strictEqual(computeInvoiceRemaining(invoice, payments, []).remaining, 5, 'المتبقي قبل المردود 5');

  const r = applySalesReturn(customer, invoice, returns, payments,
    [{ srcLine: 0, itemId: 'NUM-004', qty: 4, price: 5, unitType: 'unit' }], 1);

  assert.strictEqual(r.eff.debtReduction, 5, 'يُسدّد الدين المتبقي 5');
  assert.strictEqual(r.eff.creditAdded, 15, 'الفائض 15 رصيد إضافي');
  assert.strictEqual(customer.balance, 0);
  assert.strictEqual(customer.creditBalance, 15);

  // بعد المردود: دين الفاتورة = 0
  assert.strictEqual(computeInvoiceRemaining(invoice, payments, returns).remaining, 0, 'الفاتورة تُسوّى بالكامل');
  const acc = computeAccountSummary({ invoices: [invoice], payments, returns });
  assert.strictEqual(acc.remaining, 0);
  assert.strictEqual(acc.totalPaid, roundMoney(acc.totalInvoices - acc.remaining));
});

// ------------------------------------------------------------
// 5) منع إرجاع أكثر من المتاح (بعد مردودات سابقة)
// ------------------------------------------------------------
console.log('\n\u2192 منع تجاوز الكمية المتاحة');

test('إرجاع أكبر من المتاح يُرفض، وبعد مردود سابق يُحدّث المتاح', () => {
  const invNumber = 'INV-030';
  const returns = [];
  // مبيع 10، لا مردودات بعد
  let prior = priorReturnedForLine(returns, invNumber, 0);
  assert.strictEqual(prior, 0);
  assert.strictEqual(validateReturnQty(11, 10, prior).ok, false, '11 > 10 يُرفض');
  assert.strictEqual(validateReturnQty(11, 10, prior).reason, 'exceeds');
  assert.strictEqual(validateReturnQty(0, 10, prior).ok, false, 'الصفر يُرفض');
  assert.strictEqual(validateReturnQty(10, 10, prior).ok, true, 'الإرجاع الكامل مسموح');

  // مردود سابق 7 → المتاح 3
  returns.push({ type: 'sale', refInvoice: invNumber, lines: [{ srcLine: 0, itemId: 'X', qty: 7 }] });
  prior = priorReturnedForLine(returns, invNumber, 0);
  assert.strictEqual(prior, 7);
  assert.strictEqual(computeReturnableQty(10, prior), 3);
  assert.strictEqual(validateReturnQty(4, 10, prior).ok, false, '4 > المتاح 3 يُرفض');
  assert.strictEqual(validateReturnQty(3, 10, prior).ok, true, '3 مسموح');
});

// ------------------------------------------------------------
// 6) الترقيم التسلسلي RET-001, RET-002
// ------------------------------------------------------------
console.log('\n\u2192 الترقيم التسلسلي');

test('الترقيم يتسلسل RET-001 ثم RET-002 (مستقل عن الفواتير)', () => {
  assert.strictEqual(nextReturnNumber(1), 'RET-001');
  assert.strictEqual(nextReturnNumber(2), 'RET-002');
  assert.strictEqual(nextReturnNumber(10), 'RET-010');

  const customer = { name: 'زبون متعدد', balance: 0, creditBalance: 0 };
  const invoice = { number: 'INV-040', customerName: customer.name, paymentType: 'cash', total: 100,
    lines: [{ itemId: 'NUM-001', qty: 20, price: 5, total: 100, unitType: 'unit' }] };
  const returns = [];
  const r1 = applySalesReturn(customer, invoice, returns, [], [{ srcLine: 0, itemId: 'NUM-001', qty: 2, price: 5, unitType: 'unit' }], 1);
  const r2 = applySalesReturn(customer, invoice, returns, [], [{ srcLine: 0, itemId: 'NUM-001', qty: 3, price: 5, unitType: 'unit' }], 2);
  assert.strictEqual(r1.ret.number, 'RET-001');
  assert.strictEqual(r2.ret.number, 'RET-002');
  assert.strictEqual(returns.length, 2);
});

// ------------------------------------------------------------
// 7) الثبات (persistence) + المخزون — يتخطّى تلقائياً إن لم تتوفر better-sqlite3
// ------------------------------------------------------------
console.log('\n\u2192 ثبات المردود والمخزون في SQLite (db.js)');

let sqliteAvailable = true;
try { require('better-sqlite3'); } catch (e) { sqliteAvailable = false; }

if (!sqliteAvailable) {
  console.log('  \u26a0\ufe0f  تخطي: better-sqlite3 غير مثبّت — اختبار الثبات تُجوزّ');
} else {
  test('saveAll/loadAll: يحفظ ويسترجع حقول المردود ويعيد المخزون', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ret-test-'));
    dbm.openDatabase(dir);
    const data = dbm.loadAll();
    data.items = [{ id: 'NUM-001', name: 'إسمنت', unit: 'كيس' }];
    data.customers = [{ id: 'CUS-001', name: 'زبون', balance: 0, creditBalance: 0 }];
    data.purchaseInvoices = [{ number: 'P-1', supplierName: 'مورد', lines: [{ itemId: 'NUM-001', qty: 10, price: 3, total: 30 }] }];
    data.salesInvoices = [{ number: 'INV-001', customerName: 'زبون', paymentType: 'cash', total: 25,
      lines: [{ itemId: 'NUM-001', qty: 5, price: 5, total: 25, unitType: 'unit' }] }];
    data.returns = [{ number: 'RET-001', type: 'sale', date: '2026-07-10', party: 'زبون', refInvoice: 'INV-001',
      total: 10, debtReduction: 0, creditAdded: 10,
      lines: [{ itemId: 'NUM-001', qty: 2, price: 5, total: 10, unitType: 'unit', srcLine: 0 }] }];
    dbm.saveAll(data);

    const reloaded = dbm.loadAll();
    const ret = reloaded.returns.find(r => r.number === 'RET-001');
    assert.ok(ret, 'المردود يُحفظ');
    assert.strictEqual(ret.refInvoice, 'INV-001');
    assert.strictEqual(roundMoney(ret.creditAdded), 10);
    assert.strictEqual(ret.lines[0].srcLine, 0, 'srcLine يُحفظ');

    // المخزون: شراء 10 − بيع 5 + مردود 2 = 7
    const inv = computeInventory(reloaded);
    assert.strictEqual(inv['NUM-001'], 7, 'المخزون يعكس المردود بعد إعادة التحميل');

    fs.rmSync(dir, { recursive: true, force: true });
  });
}

console.log('\n\u2705 نجحت كل اختبارات مردود المبيع (' + passed + ')\n');

