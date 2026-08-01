// ============================================================
// test/currency.test.js
// اختبار ميزة "دعم أكثر من عملة" (multi-currency):
//  - كل فاتورة تحمل عملتها (currency) وسعر صرفها المجمَّد (usdToOld) وقت الإنشاء
//  - المبالغ تُخزَّن دائماً بالدولار كأساس محايد؛ العملة والسعر المجمَّد للعرض والحساب
//  - سعر الصرف المجمَّد لا يتغيّر أبداً بتغيّر السعر الحالي لاحقاً
//  - كشف الحساب/المتبقي/التقارير: كل فاتورة تُحوَّل بسعرها المجمَّد ثم تُجمّع
// يُشغَّل عبر:  node test/currency.test.js   (أو npm test)
//
// ملاحظة: دوال العملة تعيش في app.js (كود متصفح بلا module.exports)، لذا نعكس
// منطقها هنا حرفياً بنفس أسلوب credit-balance.test.js الذي يحاكي تدفق app.js.
// أي تغيير في منطق app.js يجب أن يبقى متطابقاً مع هذه النسخة المرآتية.
// ============================================================

const assert = require('assert');

let passed = 0;
function test(name, fn) {
  fn();
  passed++;
  console.log('  \u2705 ' + name);
}
function section(title) { console.log('\n\u2192 ' + title); }

// ------------------------------------------------------------
// نسخة مرآتية دقيقة من دوال العملة في app.js
// (getRate هنا تمثّل "السعر الحالي/اللحظي" القابل للتغيّر)
// ------------------------------------------------------------
let LIVE_RATE = 12000; // db.exchange.usdToOld الحالي — يتغيّر بمرور الوقت
function getRate() { return (LIVE_RATE && LIVE_RATE > 0) ? LIVE_RATE : 12000; }

// سعر الصرف المجمَّد للفاتورة — يقع على قيمة الفاتورة المخزَّنة، لا السعر الحالي.
function invRate(inv) {
  const r = inv && inv.usdToOld != null ? parseFloat(inv.usdToOld) : NaN;
  return (r && r > 0) ? r : getRate();
}
// عملة الفاتورة المختارة وقت الإنشاء (USD افتراضياً للفواتير القديمة).
function invCurrency(inv) { return (inv && inv.currency === 'SYP') ? 'SYP' : 'USD'; }
// تحويل مبلغ فاتورة (بالدولار) إلى عملة عرض مطلوبة بسعرها المجمَّد الخاص.
function invAmountIn(inv, usd, displayCurrency) {
  return displayCurrency === 'SYP' ? usd * invRate(inv) : usd;
}

// يحاكي تجميد السعر والعملة وقت إنشاء الفاتورة في saveSaleInvoice/savePurchaseInvoice.
function createInvoice({ total, currency }) {
  return {
    total,
    currency: currency === 'SYP' ? 'SYP' : 'USD',
    usdToOld: getRate(), // يُجمَّد الآن ولا يتغيّر لاحقاً
  };
}

// ------------------------------------------------------------

section('تجميد سعر الصرف وقت الإنشاء (الثبات مدى الحياة)');

test('تغيّر السعر الحالي لاحقاً لا يغيّر قيمة الفاتورة بالليرة', () => {
  LIVE_RATE = 12000;
  const inv = createInvoice({ total: 100, currency: 'USD' });
  assert.strictEqual(invRate(inv), 12000, 'السعر يُجمَّد على 12000');
  const before = invAmountIn(inv, inv.total, 'SYP');
  assert.strictEqual(before, 100 * 12000);
  // ارتفع السعر الحالي لاحقاً — الفاتورة القديمة يجب أن تبقى ثابتة
  LIVE_RATE = 20000;
  const after = invAmountIn(inv, inv.total, 'SYP');
  assert.strictEqual(after, 100 * 12000, 'قيمة الفاتورة القديمة لا تتأثر بارتفاع السعر');
  assert.strictEqual(before, after, 'الثبات: القيمة قبل وبعد تغيّر السعر متطابقة');
});

test('فاتورتان بسعرين مجمَّدين مختلفين تحتفظان بسعريهما', () => {
  LIVE_RATE = 10000;
  const invA = createInvoice({ total: 50, currency: 'USD' }); // مجمَّد 10000
  LIVE_RATE = 15000;
  const invB = createInvoice({ total: 50, currency: 'USD' }); // مجمَّد 15000
  LIVE_RATE = 99999; // تغيّر لاحق لا يهم
  assert.strictEqual(invRate(invA), 10000);
  assert.strictEqual(invRate(invB), 15000);
  assert.strictEqual(invAmountIn(invA, 50, 'SYP'), 500000);
  assert.strictEqual(invAmountIn(invB, 50, 'SYP'), 750000);
});

section('الفواتير القديمة (بلا عملة/سعر مجمَّد) تعامل كدولار بالسعر الحالي');

test('غياب currency ⇒ USD، وغياب usdToOld ⇒ يرجع للسعر الحالي', () => {
  LIVE_RATE = 13000;
  const legacy = { total: 100 }; // لا currency ولا usdToOld
  assert.strictEqual(invCurrency(legacy), 'USD');
  assert.strictEqual(invRate(legacy), 13000, 'يستخدم السعر الحالي كحل احتياطي');
  assert.strictEqual(invAmountIn(legacy, 100, 'SYP'), 100 * 13000);
});

test('usdToOld غير صالح (0 أو نص فارغ) يسقط للسعر الحالي', () => {
  LIVE_RATE = 14000;
  assert.strictEqual(invRate({ usdToOld: 0 }), 14000);
  assert.strictEqual(invRate({ usdToOld: '' }), 14000);
  assert.strictEqual(invRate({ usdToOld: '16000' }), 16000, 'النص الرقمي يُحلَّل');
});

section('عرض المبلغ بعملة الفاتورة وبعملة العرض المطلوبة');

test('فاتورة دولارية: تُعرض بالدولار كما هي وتُحوَّل لليرة بسعرها المجمَّد', () => {
  LIVE_RATE = 12000;
  const inv = createInvoice({ total: 80, currency: 'USD' });
  LIVE_RATE = 30000;
  assert.strictEqual(invAmountIn(inv, 80, 'USD'), 80);
  assert.strictEqual(invAmountIn(inv, 80, 'SYP'), 80 * 12000);
});

test('فاتورة ليرية: المبلغ مخزَّن بالدولار، ويُعرض بالدولار أو بالليرة المجمَّدة', () => {
  LIVE_RATE = 12000;
  const inv = createInvoice({ total: 40, currency: 'SYP' });
  assert.strictEqual(invCurrency(inv), 'SYP');
  LIVE_RATE = 25000;
  assert.strictEqual(invAmountIn(inv, 40, 'USD'), 40, 'الأساس المحايد بالدولار ثابت');
  assert.strictEqual(invAmountIn(inv, 40, 'SYP'), 40 * 12000, 'الليرة بالسعر المجمَّد');
});

section('المتبقي على الفاتورة يُحسب بسعرها المجمَّد');

test('المتبقي بالليرة = (الإجمالي − المدفوع) × السعر المجمَّد', () => {
  LIVE_RATE = 12000;
  const inv = createInvoice({ total: 100, currency: 'USD' });
  const paidUSD = 30;
  const remainingUSD = inv.total - paidUSD; // 70 (أساس محايد)
  LIVE_RATE = 50000; // تغيّر لاحق
  assert.strictEqual(invAmountIn(inv, remainingUSD, 'SYP'), 70 * 12000);
  assert.strictEqual(invAmountIn(inv, remainingUSD, 'USD'), 70);
});

section('تجميع التقارير: كل فاتورة تُحوَّل بسعرها المجمَّد ثم تُجمّع');

test('مجموع الليرة يجمع كل فاتورة بسعرها لا بسعر اليوم', () => {
  LIVE_RATE = 10000;
  const a = createInvoice({ total: 100, currency: 'USD' }); // مجمَّد 10000
  LIVE_RATE = 20000;
  const b = createInvoice({ total: 100, currency: 'USD' }); // مجمَّد 20000
  LIVE_RATE = 99999; // سعر اليوم لا يجب أن يدخل الحساب
  const invoices = [a, b];
  const totalSYP = invoices.reduce((s, i) => s + invAmountIn(i, i.total, 'SYP'), 0);
  // الصحيح: 100×10000 + 100×20000 = 3,000,000
  assert.strictEqual(totalSYP, 3000000);
  // الخطأ الذي نمنعه: استخدام سعر اليوم للجميع = 200×99999
  assert.notStrictEqual(totalSYP, 200 * 99999);
  // بالدولار (الأساس المحايد) الجمع مستقل عن أي سعر صرف
  const totalUSD = invoices.reduce((s, i) => s + invAmountIn(i, i.total, 'USD'), 0);
  assert.strictEqual(totalUSD, 200);
});

test('مجموع مختلط (فواتير دولار وليرة) متسق في الأساس الدولاري', () => {
  LIVE_RATE = 12000;
  const usdInv = createInvoice({ total: 100, currency: 'USD' });
  const sypInv = createInvoice({ total: 100, currency: 'SYP' });
  LIVE_RATE = 18000;
  const invoices = [usdInv, sypInv];
  const totalUSD = invoices.reduce((s, i) => s + invAmountIn(i, i.total, 'USD'), 0);
  const totalSYP = invoices.reduce((s, i) => s + invAmountIn(i, i.total, 'SYP'), 0);
  assert.strictEqual(totalUSD, 200);
  assert.strictEqual(totalSYP, 100 * 12000 + 100 * 12000);
});

console.log('\n\u2705 \u0646\u062c\u062d\u062a \u0643\u0644 \u0627\u062e\u062a\u0628\u0627\u0631\u0627\u062a \u062f\u0639\u0645 \u0627\u0644\u0639\u0645\u0644\u0627\u062a (' + passed + ')\n');

