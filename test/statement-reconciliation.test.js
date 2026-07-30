// ============================================================
// test/statement-reconciliation.test.js
// اختبار ترابط كشف الحساب (زبون/مورد) رياضياً:
//  1) الإجمالي العام (remaining) = مجموع سطور الفواتير الظاهرة في الجدول.
//  2) مجموع الدفعات (totalPayments) يُحسب ويُعرض منفصلاً ويطابق البيانات.
//  3) الدفعات اليتيمة (بلا فاتورة) تبقى بنداً مستقلاً — لا تُوزَّع على الفواتير.
//  4) الأرقام الثلاثة متسقة دائماً حتى بعد أي تعديل.
// يُشغّل عبر:  node test/statement-reconciliation.test.js   (أو npm test)
// يستورد الدوال النقية الحقيقية من db.js (نفس منطق app.js حرفياً).
// ============================================================

const assert = require('assert');
const dbm = require('../db.js');
const { computeAccountSummary, computeInvoiceRemaining, roundMoney } = dbm;

let passed = 0;
function test(name, fn) {
  fn();
  passed++;
  console.log('  \u2705 ' + name);
}

// مجموع متبقي سطور الفواتير الآجلة — ما يراه المستخدم فعلياً في جدول الفواتير.
function sumInvoiceRows(invoices, payments) {
  return roundMoney(invoices
    .filter(i => (i.paymentType || 'cash') === 'deferred')
    .reduce((s, inv) => s + computeInvoiceRemaining(inv, payments).remaining, 0));
}

// ------------------------------------------------------------
// 1) فاتورة واحدة — المتبقي الحي
// ------------------------------------------------------------
console.log('\n\u2192 computeInvoiceRemaining (المتبقي الحي للفاتورة)');

test('الفاتورة النقدية مسدّدة بالكامل دائماً', () => {
  const inv = { number: 'INV-C', total: 80, paymentType: 'cash', paidAmount: 0 };
  const b = computeInvoiceRemaining(inv, []);
  assert.strictEqual(b.remaining, 0);
  assert.strictEqual(b.isDeferred, false);
});

test('الدفعة المربوطة تخفّض متبقي فاتورتها فقط', () => {
  const inv = { number: 'INV-1', total: 100, paymentType: 'deferred', paidAmount: 0 };
  const b = computeInvoiceRemaining(inv, [{ amount: 40, linkedInvoice: 'INV-1' }]);
  assert.strictEqual(b.remaining, 60);
});

test('الفائض (creditAdded) لا يُحتسب سداداً على الفاتورة', () => {
  const inv = { number: 'INV-1', total: 100, paymentType: 'deferred', paidAmount: 0 };
  const b = computeInvoiceRemaining(inv, [{ amount: 120, creditAdded: 20, linkedInvoice: 'INV-1' }]);
  assert.strictEqual(b.remaining, 0);
});

// ------------------------------------------------------------
// 2) السيناريو المطلوب — زبون بأكثر من فاتورة + دفعات مختلطة (مربوطة ويتيمة)
// ------------------------------------------------------------
console.log('\n\u2192 كشف حساب زبون — فواتير متعددة + دفعة يتيمة');

test('الإجمالي العام = مجموع سطور الفواتير، والدفعة اليتيمة لا تُوزّع', () => {
  const invoices = [
    { number: 'INV-001', date: '2026-07-01', total: 100, paymentType: 'deferred', paidAmount: 0 },
    { number: 'INV-002', date: '2026-07-02', total: 50,  paymentType: 'deferred', paidAmount: 0 },
  ];
  const payments = [
    { amount: 40, linkedInvoice: 'INV-001' }, // جزئي على INV-001 → متبقي 60
    { amount: 50, linkedInvoice: 'INV-002' }, // يسدّد INV-002 بالكامل → متبقي 0
    { amount: 30, linkedInvoice: '' },        // دفعة يتيمة — غير مرتبطة بأي فاتورة
  ];

  const acc = computeAccountSummary({ invoices, payments, creditBalance: 0 });

  // (1) الإجمالي العام = مجموع سطور الفواتير الظاهرة
  assert.strictEqual(acc.remaining, sumInvoiceRows(invoices, payments), 'الإجمالي العام يطابق مجموع الجدول');
  assert.strictEqual(acc.remaining, 60, 'المتبقي 60 (وليس 30) — الدفعة اليتيمة لم تُطرح ضمنياً');

  // (2) مجموع الدفعات يُحسب منفصلاً ويطابق البيانات
  assert.strictEqual(acc.totalLinked, 90);
  assert.strictEqual(acc.totalStandalone, 30);
  assert.strictEqual(acc.totalPayments, 120, 'مجموع الدفعات = المربوطة + اليتيمة');

  // (3) الدفعة اليتيمة بند مستقل ظاهر وليس موزّعاً
  assert.strictEqual(acc.standalonePayments.length, 1);
  assert.strictEqual(computeInvoiceRemaining(invoices[0], payments).remaining, 60, 'INV-001 لم تتأثر باليتيمة');
  assert.strictEqual(computeInvoiceRemaining(invoices[1], payments).remaining, 0,  'INV-002 لم تتأثر باليتيمة');

  // (4) اتساق المدفوع مع الإجمالي والمتبقي
  assert.strictEqual(acc.totalPaid, roundMoney(acc.totalInvoices - acc.remaining));
  assert.strictEqual(acc.totalInvoices, 150);
});

test('إزالة الدفعة اليتيمة لا تغيّر الإجمالي العام (لا توزيع خفي)', () => {
  const invoices = [
    { number: 'INV-001', total: 100, paymentType: 'deferred', paidAmount: 0 },
    { number: 'INV-002', total: 50,  paymentType: 'deferred', paidAmount: 0 },
  ];
  const withOrphan = [
    { amount: 40, linkedInvoice: 'INV-001' },
    { amount: 30, linkedInvoice: '' },
  ];
  const withoutOrphan = [{ amount: 40, linkedInvoice: 'INV-001' }];

  const a = computeAccountSummary({ invoices, payments: withOrphan });
  const b = computeAccountSummary({ invoices, payments: withoutOrphan });
  assert.strictEqual(a.remaining, b.remaining, 'وجود اليتيمة لا يغيّر دين الفواتير');
  assert.strictEqual(a.remaining, 110);
  assert.strictEqual(a.totalStandalone, 30);
  assert.strictEqual(b.totalStandalone, 0);
});

// ------------------------------------------------------------
// 3) المورد — نفس المحرك (الدالة محايدة للطرف)
// ------------------------------------------------------------
console.log('\n\u2192 كشف حساب مورد — فواتير شراء + دفعة يتيمة');

test('المورد: الإجمالي العام = مجموع السطور، واليتيمة مستقلة', () => {
  const invoices = [
    { number: 'PINV-001', supplierName: 'مورد', total: 200, paymentType: 'deferred', paidAmount: 50 },
    { number: 'PINV-002', supplierName: 'مورد', total: 120, paymentType: 'deferred', paidAmount: 0 },
  ];
  const payments = [
    { amount: 100, linkedInvoice: 'PINV-001' }, // 200 - 50 - 100 = 50 متبقي
    { amount: 20,  linkedInvoice: '' },         // يتيمة
  ];
  const acc = computeAccountSummary({ invoices, payments });

  assert.strictEqual(acc.remaining, sumInvoiceRows(invoices, payments));
  assert.strictEqual(acc.remaining, 170, '50 (PINV-001) + 120 (PINV-002)');
  assert.strictEqual(acc.totalStandalone, 20);
  assert.strictEqual(computeInvoiceRemaining(invoices[1], payments).remaining, 120, 'PINV-002 لم تمتص اليتيمة');
});

// ------------------------------------------------------------
// 4) الثبات الحسابي بعد التعديل
// ------------------------------------------------------------
console.log('\n\u2192 الاتساق بعد التعديل (إضافة دفعات)');

test('بعد إضافة دفعة يتيمة ثانية: الإجمالي العام = مجموع السطور دائماً', () => {
  const invoices = [
    { number: 'INV-001', total: 100, paymentType: 'deferred', paidAmount: 0 },
    { number: 'INV-002', total: 60,  paymentType: 'deferred', paidAmount: 0 },
  ];
  const payments = [{ amount: 40, linkedInvoice: 'INV-001' }];

  // قبل أي دفعة يتيمة
  let acc = computeAccountSummary({ invoices, payments });
  assert.strictEqual(acc.remaining, sumInvoiceRows(invoices, payments));
  assert.strictEqual(acc.remaining, 120);

  // تعديل: دفعتان يتيمتان
  payments.push({ amount: 15, linkedInvoice: '' });
  payments.push({ amount: 25, linkedInvoice: '' });
  acc = computeAccountSummary({ invoices, payments });
  assert.strictEqual(acc.remaining, sumInvoiceRows(invoices, payments), 'الاتساق يبقى بعد التعديل');
  assert.strictEqual(acc.remaining, 120, 'دين الفواتير لم يتغيّر بالدفعات اليتيمة');
  assert.strictEqual(acc.totalStandalone, 40);
  assert.strictEqual(acc.standalonePayments.length, 2);
});

test('سجلات الوديعة التلقائية تُستثنى من الاحتساب (لا ازدواج)', () => {
  const invoices = [{ number: 'INV-001', total: 100, paymentType: 'deferred', paidAmount: 30 }];
  const payments = [
    { amount: 30, linkedInvoice: 'INV-001', _deposit: true }, // وديعة تلقائية — مضمّنة أصلاً في paidAmount
    { amount: 20, linkedInvoice: 'INV-001' },
  ];
  const acc = computeAccountSummary({ invoices, payments });
  // 100 - 30 (وديعة) - 20 = 50
  assert.strictEqual(acc.remaining, 50);
  assert.strictEqual(acc.remaining, sumInvoiceRows(invoices, payments));
  assert.strictEqual(acc.totalLinked, 20, 'الوديعة التلقائية لا تُحتسب مرتين');
});

console.log('\n\u2705 نجحت كل اختبارات ترابط كشف الحساب (' + passed + ')\n');

