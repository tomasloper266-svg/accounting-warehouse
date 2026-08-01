// ============================================================
// test/overdue-invoices.test.js
// اختبار ميزة "كشف الفواتير المتأخرة" (overdue deferred invoices):
//  - "الاستحقاق" = تاريخ الفاتورة + مهلة السداد الافتراضية المحفوظة بالإعدادات
//    (لا يوجد تاريخ استحقاق مخزَّن مستقل).
//  - أيام التأخير = عدد الأيام منذ تاريخ الاستحقاق
//                  = عمر الفاتورة بالأيام (منذ تاريخها) − مهلة السداد.
//  - "متأخرة كثيراً" = تجاوز التأخير نفسه مهلة السداد (أي عمر الفاتورة > ضعف المهلة).
//  - فاتورة آجلة مسدَّدة بالكامل (remaining = 0) لا تُعتبر متأخرة أبداً مهما بلغ عمرها.
// يستورد computeOverdueInfo الحقيقية من db.js (نفس منطق app.js حرفياً — الريندرر يعكسها لأنه لا يستطيع require).
// يُشغَّل عبر:  node test/overdue-invoices.test.js   (أو npm test)
// ============================================================

const assert = require('assert');
const dbm = require('../db.js');
const { computeOverdueInfo } = dbm;

let passed = 0;
function test(name, fn) {
  fn();
  passed++;
  console.log('  \u2705 ' + name);
}
function section(title) { console.log('\n\u2192 ' + title); }

// يبني تاريخ فاتورة (YYYY-MM-DD) يسبق "اليوم" المحاكى بعدد أيام معيّن.
function daysAgo(today, n) {
  const d = new Date(today);
  d.setDate(d.getDate() - n);
  return d.toISOString().split('T')[0];
}

const TODAY = '2026-08-01'; // "اليوم" المحاكى لثبات الاختبار (لا يعتمد على تاريخ التشغيل الفعلي)
const TERM = 30; // مهلة السداد الافتراضية المفترضة في هذه الاختبارات

section('فاتورة ضمن المهلة — لا تُعتبر متأخرة');

test('عمر الفاتورة أقل من المهلة (10 أيام من 30) لا يُعتبر تأخراً', () => {
  const inv = { date: daysAgo(TODAY, 10) };
  const r = computeOverdueInfo(inv.date, 500, TERM, TODAY);
  assert.strictEqual(r.isOverdue, false);
  assert.strictEqual(r.overdueDays, 0);
});

test('عمر الفاتورة يساوي المهلة تماماً (30 من 30) لا يُعتبر تأخراً بعد', () => {
  const inv = { date: daysAgo(TODAY, TERM) };
  const r = computeOverdueInfo(inv.date, 500, TERM, TODAY);
  assert.strictEqual(r.isOverdue, false, 'عمر = المهلة بالضبط ليس تجاوزاً');
});

section('فاتورة متأخرة عادية (تجاوزت المهلة لكن دون ضعفها)');

test('عمر 45 يوماً بمهلة 30 يوماً ⇒ متأخرة 15 يوماً وغير متأخرة كثيراً', () => {
  const inv = { date: daysAgo(TODAY, 45) };
  const r = computeOverdueInfo(inv.date, 200, TERM, TODAY);
  assert.strictEqual(r.isOverdue, true);
  assert.strictEqual(r.overdueDays, 15, 'أيام التأخير = عمر الفاتورة (45) − المهلة (30)');
  assert.strictEqual(r.isSevere, false, '15 يوم تأخير لا يتجاوز المهلة نفسها (30)');
});

section('فاتورة متأخرة كثيراً (التأخير يتجاوز ضعف المهلة)');

test('عمر 70 يوماً بمهلة 30 يوماً ⇒ متأخرة 40 يوماً وتُعتبر متأخرة كثيراً', () => {
  const inv = { date: daysAgo(TODAY, 70) };
  const r = computeOverdueInfo(inv.date, 300, TERM, TODAY);
  assert.strictEqual(r.isOverdue, true);
  assert.strictEqual(r.overdueDays, 40, 'أيام التأخير = عمر الفاتورة (70) − المهلة (30)');
  assert.strictEqual(r.isSevere, true, '40 يوم تأخير يتجاوز المهلة نفسها (30) ⇒ عمر الفاتورة > ضعف المهلة (70 > 60)');
});

test('الحد الفاصل: تأخير = المهلة بالضبط (عمر 60 = ضعف المهلة 30) ليس "كثيراً" بعد', () => {
  const inv = { date: daysAgo(TODAY, 60) };
  const r = computeOverdueInfo(inv.date, 100, TERM, TODAY);
  assert.strictEqual(r.overdueDays, 30);
  assert.strictEqual(r.isSevere, false, 'overdueDays > term هو الشرط الصارم — المساواة ليست "كثيراً" بعد');
});

test('الحد الفاصل: تأخير 31 (عمر 61) يتجاوز المهلة فعلاً ⇒ متأخرة كثيراً', () => {
  const inv = { date: daysAgo(TODAY, 61) };
  const r = computeOverdueInfo(inv.date, 100, TERM, TODAY);
  assert.strictEqual(r.overdueDays, 31);
  assert.strictEqual(r.isSevere, true);
});

section('فاتورة آجلة مسدَّدة بالكامل — لا تظهر أبداً في الكشف');

test('remaining = 0 ⇒ ليست متأخرة حتى لو كان عمرها كبيراً جداً (120 يوماً)', () => {
  const inv = { date: daysAgo(TODAY, 120) };
  const r = computeOverdueInfo(inv.date, 0, TERM, TODAY);
  assert.strictEqual(r.isOverdue, false);
  assert.strictEqual(r.overdueDays, 0);
  assert.strictEqual(r.isSevere, false);
});

test('remaining بالسالب (تقريب/تسوية) لا يُحتسب متأخراً', () => {
  const inv = { date: daysAgo(TODAY, 120) };
  const r = computeOverdueInfo(inv.date, -0.001, TERM, TODAY);
  assert.strictEqual(r.isOverdue, false);
});

section('ترتيب كشف الفواتير المتأخرة — الأكثر تأخراً إلى الأقل');

test('قائمة مختلطة تُرتَّب تنازلياً حسب أيام التأخير', () => {
  const invoices = [
    { number: 'S-1', date: daysAgo(TODAY, 45), remaining: 100 }, // 15 يوم تأخير
    { number: 'S-2', date: daysAgo(TODAY, 70), remaining: 100 }, // 40 يوم تأخير (كثيراً)
    { number: 'S-3', date: daysAgo(TODAY, 31), remaining: 100 }, // 1 يوم تأخير
    { number: 'S-4', date: daysAgo(TODAY, 20), remaining: 100 }, // ضمن المهلة — تُستبعد
  ];
  const overdueList = invoices
    .map(inv => ({ inv, overdue: computeOverdueInfo(inv.date, inv.remaining, TERM, TODAY) }))
    .filter(r => r.overdue.isOverdue)
    .sort((a, b) => b.overdue.overdueDays - a.overdue.overdueDays);

  assert.strictEqual(overdueList.length, 3, 'S-4 ضمن المهلة فتُستبعد من الكشف');
  assert.deepStrictEqual(overdueList.map(r => r.inv.number), ['S-2', 'S-1', 'S-3'],
    'الأكثر تأخراً (S-2: 40 يوم) أولاً، ثم S-1 (15 يوم)، ثم S-3 (1 يوم)');
});

section('مهلة سداد مخصَّصة من الإعدادات (لا 30 يوماً افتراضياً فقط)');

test('مهلة سداد محفوظة = 15 يوماً تُغيّر عتبة التأخر والتأخر الشديد', () => {
  const term15 = 15;
  const inv = { date: daysAgo(TODAY, 40) }; // عمر 40 يوماً
  const r = computeOverdueInfo(inv.date, 50, term15, TODAY);
  assert.strictEqual(r.overdueDays, 25, '40 − 15 = 25 يوم تأخير');
  assert.strictEqual(r.isSevere, true, '25 > 15 (المهلة) ⇒ متأخرة كثيراً');
});

test('مهلة سداد غير صالحة (0 أو نص فارغ) تسقط إلى 30 يوماً افتراضياً', () => {
  const inv = { date: daysAgo(TODAY, 40) };
  const r1 = computeOverdueInfo(inv.date, 50, 0, TODAY);
  const r2 = computeOverdueInfo(inv.date, 50, '', TODAY);
  assert.strictEqual(r1.overdueDays, 10, '40 − 30(افتراضي) = 10');
  assert.strictEqual(r2.overdueDays, 10);
});

console.log('\n\u2705 \u0646\u062c\u062d\u062a \u0643\u0644 \u0627\u062e\u062a\u0628\u0627\u0631\u0627\u062a \u0627\u0644\u0641\u0648\u0627\u062a\u064a\u0631 \u0627\u0644\u0645\u062a\u0623\u062e\u0631\u0629 (' + passed + ')\n');
