// ============================================================
// test/credit-balance.test.js
// اختبار ميزة "الرصيد الإضافي" (credit balance) للزبائن والموردين:
//  - الدفع الزائد يتحول إلى رصيد إضافي
//  - الفاتورة الجديدة تخصم من الرصيد الإضافي أولاً
// يُشغَّل عبر:  node test/credit-balance.test.js   (أو npm test)
// ============================================================

const assert = require('assert');
const path   = require('path');
const os     = require('os');
const fs     = require('fs');

const dbm = require('../db.js');
const { computeOverpayment, applyCreditToInvoice, roundMoney } = dbm;

let passed = 0;
function test(name, fn) {
  fn();
  passed++;
  console.log('  \u2705 ' + name);
}

// ------------------------------------------------------------
// محاكاة دقيقة لتدفق app.js (نفس الدوال النقية من db.js)
// ------------------------------------------------------------

// يعكس فرع الدفع الزائد في saveReceiptCustomer / saveReceiptSupplier
function recordPayment(party, amountUSD, outstanding, { discount = 0, confirmCredit = true } = {}) {
  const netDue = Math.max(0, roundMoney(outstanding - discount));
  const over = computeOverpayment(amountUSD, netDue);
  let creditAdded = 0;
  if (over.isOverpayment) {
    if (!confirmCredit) return { halted: true }; // المستخدم رفض → يُوقف الحفظ
    creditAdded = over.creditAdded;
    party.creditBalance = roundMoney((party.creditBalance || 0) + creditAdded);
  }
  const appliedCash = amountUSD - creditAdded;
  party.balance = Math.max(0, (party.balance || 0) - appliedCash - discount);
  return { halted: false, creditAdded, appliedToInvoices: over.appliedToInvoices };
}

// يعكس فرع خصم الرصيد في saveSaleInvoice / savePurchaseInvoice
function createInvoice(party, total, paidAmount = 0) {
  let creditApplied = 0;
  let effectivePaid = paidAmount;
  if ((party.creditBalance || 0) > 0.005) {
    const res = applyCreditToInvoice(party.creditBalance, total, 0);
    creditApplied = res.creditApplied;
    party.creditBalance = res.remainingCredit;
    effectivePaid = Math.min(paidAmount, res.amountDue);
  }
  const settledNow = roundMoney(effectivePaid + creditApplied);
  const amountDue  = roundMoney(total - settledNow);
  return { creditApplied, amountDue, settledNow };
}

// ------------------------------------------------------------
// 1) الدوال النقية
// ------------------------------------------------------------
console.log('\n→ الدوال النقية (db.js)');

test('computeOverpayment: دفع فوق المطلوب ينتج فائضاً', () => {
  const r = computeOverpayment(200, 0);
  assert.strictEqual(r.creditAdded, 200);
  assert.strictEqual(r.appliedToInvoices, 0);
  assert.strictEqual(r.isOverpayment, true);
});

test('computeOverpayment: دفع أقل من/يساوي المطلوب لا ينتج فائضاً', () => {
  const r = computeOverpayment(100, 100);
  assert.strictEqual(r.creditAdded, 0);
  assert.strictEqual(r.appliedToInvoices, 100);
  assert.strictEqual(r.isOverpayment, false);
});

test('computeOverpayment: دفع 300 والمطلوب 100 → فائض 200', () => {
  const r = computeOverpayment(300, 100);
  assert.strictEqual(r.appliedToInvoices, 100);
  assert.strictEqual(r.creditAdded, 200);
});

test('applyCreditToInvoice: الرصيد يغطي الفاتورة جزئياً', () => {
  const r = applyCreditToInvoice(200, 150, 0);
  assert.strictEqual(r.creditApplied, 150);
  assert.strictEqual(r.remainingCredit, 50);
  assert.strictEqual(r.amountDue, 0);
});

test('applyCreditToInvoice: الرصيد أقل من الفاتورة → خصم جزئي ومتبقٍ', () => {
  const r = applyCreditToInvoice(50, 150, 0);
  assert.strictEqual(r.creditApplied, 50);
  assert.strictEqual(r.remainingCredit, 0);
  assert.strictEqual(r.amountDue, 100);
});

// ------------------------------------------------------------
// 2) السيناريو المطلوب — الزبون
// الزبون يدفع 200 فوق المطلوب → رصيد إضافي 200
// ثم فاتورة 150 → يُخصم 150، يتبقى 50، والفاتورة بلا مستحق
// ------------------------------------------------------------
console.log('\n→ السيناريو المطلوب (الزبون)');

test('الزبون: دفع 200 زائد → رصيد 200، ثم فاتورة 150 → رصيد 50 ومستحق 0', () => {
  const customer = { name: 'زبون اختبار', balance: 0, creditBalance: 0 };

  // لا فواتير مفتوحة → المطلوب 0؛ يدفع 200
  const pay = recordPayment(customer, 200, 0);
  assert.strictEqual(pay.halted, false);
  assert.strictEqual(pay.creditAdded, 200);
  assert.strictEqual(customer.creditBalance, 200, 'الرصيد الإضافي يجب أن يصبح 200');

  // فاتورة جديدة بـ 150
  const inv = createInvoice(customer, 150, 0);
  assert.strictEqual(inv.creditApplied, 150, 'يجب خصم 150 من الرصيد');
  assert.strictEqual(customer.creditBalance, 50, 'يتبقى رصيد إضافي 50');
  assert.strictEqual(inv.amountDue, 0, 'الفاتورة بلا مستحق');
});

test('الزبون: رفض حفظ الفرق يوقف الحفظ دون تغيير الرصيد', () => {
  const customer = { name: 'زبون', balance: 0, creditBalance: 0 };
  const pay = recordPayment(customer, 200, 0, { confirmCredit: false });
  assert.strictEqual(pay.halted, true);
  assert.strictEqual(customer.creditBalance, 0);
});

test('الزبون: مطلوب 100 ويدفع 300 → رصيد 200', () => {
  const customer = { name: 'زبون', balance: 100, creditBalance: 0 };
  const pay = recordPayment(customer, 300, 100);
  assert.strictEqual(pay.creditAdded, 200);
  assert.strictEqual(customer.creditBalance, 200);
  assert.strictEqual(customer.balance, 0, 'المطلوب تسوّى بالكامل');
});

// ------------------------------------------------------------
// 3) السيناريو المطلوب — المورد (متماثل)
// ------------------------------------------------------------
console.log('\n→ السيناريو المطلوب (المورد)');

test('المورد: دفع 200 زائد → رصيد 200، ثم فاتورة شراء 150 → رصيد 50 ومستحق 0', () => {
  const supplier = { name: 'مورد اختبار', balance: 0, creditBalance: 0 };

  const pay = recordPayment(supplier, 200, 0);
  assert.strictEqual(pay.halted, false);
  assert.strictEqual(pay.creditAdded, 200);
  assert.strictEqual(supplier.creditBalance, 200, 'الرصيد الإضافي للمورد يجب أن يصبح 200');

  const inv = createInvoice(supplier, 150, 0);
  assert.strictEqual(inv.creditApplied, 150, 'يجب خصم 150 من رصيد المورد');
  assert.strictEqual(supplier.creditBalance, 50, 'يتبقى رصيد إضافي 50');
  assert.strictEqual(inv.amountDue, 0, 'فاتورة الشراء بلا مستحق');
});

// ------------------------------------------------------------
// 3.5) سيناريو كشف الحساب — دفعات متعددة من المودال وفائض للرصيد
// يعكس تدفق addCustomerPayment / addSupplierPayment (الربط التلقائي + تحويل الفائض)
// ------------------------------------------------------------
console.log('\n→ سيناريو كشف الحساب (دفعات متعددة + فائض)');

// محاكاة invoiceBalance من app.js لفاتورة آجلة
function simInvoiceBalance(inv, payments) {
  const total   = inv.total || 0;
  const deposit = parseFloat(inv.paidAmount) || 0;
  const later = payments
    .filter(p => p.linkedInvoice === inv.number)
    .reduce((s, p) => s + (parseFloat(p.amount) || 0) - (parseFloat(p.creditAdded) || 0) + (parseFloat(p.discountOnPayment) || 0), 0);
  const paid = deposit + later;
  const remaining = Math.max(0, roundMoney(total - paid));
  return { total, paid: roundMoney(paid), remaining, closed: remaining <= 0.005 };
}

// محاكاة getCustomerAccount.remaining
function simAccountRemaining(invoices, payments) {
  const totalDeferred  = invoices.reduce((s, i) => s + (i.total || 0), 0);
  const paidOnDeferred = invoices.reduce((s, i) => s + (parseFloat(i.paidAmount) || 0), 0);
  const applied = payments.reduce((s, p) =>
    s + (parseFloat(p.amount) || 0) - (parseFloat(p.creditAdded) || 0) + (parseFloat(p.discountOnPayment) || 0), 0);
  return Math.max(0, roundMoney(totalDeferred - paidOnDeferred - applied));
}

// محاكاة addCustomerPayment / addSupplierPayment (المستخدم يوافق على حفظ الفائض)
function addAccountPayment(party, invoices, payments, amount) {
  const outstanding = simAccountRemaining(invoices, payments);
  const over = computeOverpayment(amount, outstanding);
  const creditAdded = over.isOverpayment ? over.creditAdded : 0;
  const open = invoices
    .filter(inv => simInvoiceBalance(inv, payments).remaining > 0.005)
    .sort((a, b) => (new Date(a.date) - new Date(b.date)) || String(a.number).localeCompare(String(b.number)));
  const linkedInvoice = open.length ? open[0].number : '';
  payments.push({ amount, creditAdded, linkedInvoice });
  if (creditAdded > 0.005) {
    party.creditBalance = roundMoney((party.creditBalance || 0) + creditAdded);
  }
  return { creditAdded, linkedInvoice };
}

test('الزبون ali: دفعات 2.10 ثم 3.00 ثم 3.00 على فاتورة 5.10 — المتبقي يتحدّث والفائض 3.00 يصير رصيداً', () => {
  const customer = { name: 'ali', balance: 5.10, creditBalance: 0 };
  const invoices = [{ number: 'INV-001', date: '2026-07-01', total: 5.10, paidAmount: 0, paymentType: 'deferred' }];
  const payments = [];

  // الدفعة 1: 2.10 — تُربط بـ INV-001 → المتبقي 3.00 (جزئي)
  const p1 = addAccountPayment(customer, invoices, payments, 2.10);
  assert.strictEqual(p1.linkedInvoice, 'INV-001');
  assert.strictEqual(p1.creditAdded, 0);
  assert.strictEqual(simInvoiceBalance(invoices[0], payments).remaining, 3.00, 'بعد الدفعة الأولى المتبقي 3.00');

  // الدفعة 2: 3.00 — تُربط بـ INV-001 → الفاتورة تُسدّد بالكامل
  const p2 = addAccountPayment(customer, invoices, payments, 3.00);
  assert.strictEqual(p2.linkedInvoice, 'INV-001');
  assert.strictEqual(p2.creditAdded, 0);
  assert.strictEqual(simInvoiceBalance(invoices[0], payments).remaining, 0, 'بعد الدفعة الثانية الفاتورة مسدّدة');
  assert.strictEqual(simInvoiceBalance(invoices[0], payments).closed, true);

  // الدفعة 3: 3.00 — لا فواتير مفتوحة → كلها فائض → رصيد إضافي 3.00
  const p3 = addAccountPayment(customer, invoices, payments, 3.00);
  assert.strictEqual(p3.linkedInvoice, '', 'لا تُربط لأن كل الفواتير مسدّدة');
  assert.strictEqual(p3.creditAdded, 3.00, 'الدفعة الثالثة بالكامل فائض');
  assert.strictEqual(customer.creditBalance, 3.00, 'الرصيد الإضافي يصير 3.00');

  // الفاتورة تبقى مسدّدة والحساب بلا متبقٍ
  assert.strictEqual(simInvoiceBalance(invoices[0], payments).remaining, 0);
  assert.strictEqual(simAccountRemaining(invoices, payments), 0, 'الحساب بلا دين');
});

test('المورد: دفعتان تُسدّدان فاتورة شراء ثم دفعة زائدة → رصيد إضافي', () => {
  const supplier = { name: 'مورد', balance: 10, creditBalance: 0 };
  const invoices = [{ number: 'PINV-001', date: '2026-07-02', total: 10, paidAmount: 0, paymentType: 'deferred' }];
  const payments = [];

  addAccountPayment(supplier, invoices, payments, 4);
  assert.strictEqual(simInvoiceBalance(invoices[0], payments).remaining, 6);

  addAccountPayment(supplier, invoices, payments, 6);
  assert.strictEqual(simInvoiceBalance(invoices[0], payments).closed, true);

  const p3 = addAccountPayment(supplier, invoices, payments, 5);
  assert.strictEqual(p3.creditAdded, 5, 'الفائض بعد التسوية يصير رصيداً');
  assert.strictEqual(supplier.creditBalance, 5);
});

// ------------------------------------------------------------
// 4) الثبات (persistence) — يتخطّى تلقائياً إن لم تتوفر better-sqlite3
// ------------------------------------------------------------
console.log('\n→ ثبات creditBalance في SQLite (db.js)');

let sqliteAvailable = true;
try { require('better-sqlite3'); } catch (e) { sqliteAvailable = false; }

if (!sqliteAvailable) {
  console.log('  ⚠️  تخطي: better-sqlite3 غير مثبّت — اختبار الثبات تُجوزَّ');
} else {
  test('saveAll/loadAll: يحفظ ويسترجع creditBalance للزبائن والموردين', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'cb-test-'));
    dbm.openDatabase(dir);
    const data = dbm.loadAll();
    data.customers = [{ id: 'CUS-001', name: 'زبون', phone: '', address: '', balance: 0, creditBalance: 50 }];
    data.suppliers = [{ id: 'SUP-001', name: 'مورد', phone: '', address: '', balance: 0, creditBalance: 75 }];
    dbm.saveAll(data);

    const reloaded = dbm.loadAll();
    const c = reloaded.customers.find(x => x.id === 'CUS-001');
    const s = reloaded.suppliers.find(x => x.id === 'SUP-001');
    assert.strictEqual(c.creditBalance, 50, 'creditBalance الزبون يجب أن يُحفظ');
    assert.strictEqual(s.creditBalance, 75, 'creditBalance المورد يجب أن يُحفظ');

    fs.rmSync(dir, { recursive: true, force: true });
  });
}

console.log('\n✅ نجحت كل الاختبارات (' + passed + ')\n');

