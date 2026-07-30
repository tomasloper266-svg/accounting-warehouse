// ============================================================
// test/credit-ledger.test.js
// اختبار السجل الموحّد للرصيد الإضافي (credit ledger — مصدر الحقيقة الواحد):
//  - المسارات الثلاثة (فاتورة / دفعة من الكشف / إيصال مستقل) تستخدم نفس المنطق
//  - نفس الدفعة لا تُحتسب مرتين (idempotent عبر مفتاح المرجع)
//  - الرصيد مرتبط دائماً بالحساب الصحيح (لا تسرّب)
//  - حالات الحافة: إلغاء فاتورة خصمت رصيداً، حذف دفعة زائدة
// يُشغّل عبر:  node test/credit-ledger.test.js
// ============================================================

const assert = require('assert');
const path   = require('path');
const os     = require('os');
const fs     = require('fs');

const dbm = require('../db.js');
const {
  CREDIT_MOVE, buildCreditMovement, recordCreditMovement,
  creditMovementKey, creditBalanceFromMovements, applyCreditDelta, roundMoney,
} = dbm;

let passed = 0;
function test(name, fn) {
  fn();
  passed++;
  console.log('  \u2705 ' + name);
}

// محاكاة postCreditMovement من app.js: يسجّل الحركة (مرة واحدة)
// ثم يشتق الرصيد من السجل — نفس المنطق الموحّد.
function post(movements, party, opts) {
  const move = buildCreditMovement({
    partyType: opts.partyType, partyName: party.name, type: opts.type,
    amount: opts.amount, refType: opts.refType || '', ref: opts.ref || '',
    note: opts.note || '', date: opts.date || '',
  });
  const res = recordCreditMovement(movements, move);
  party.creditBalance = creditBalanceFromMovements(movements, opts.partyType, party.name);
  return res;
}

// ------------------------------------------------------------
// 1) الدوال النقية للسجل
// ------------------------------------------------------------
console.log('\n\u2192 الدوال النقية (credit ledger)');

test('buildCreditMovement: يطبّع النوع ويقرّب المبلغ', () => {
  const m = buildCreditMovement({ partyType: 'customer', partyName: 'x', type: 'weird', amount: 10.005, refType: 'receipt', ref: 'R1' });
  assert.strictEqual(m.type, CREDIT_MOVE.ADD, 'أي نوع غير deduct يصير add');
  assert.strictEqual(m.amount, 10.01);
  assert.ok(m.id && m.date, 'يولّد id وتاريخ');
});

test('creditBalanceFromMovements: مجموع الإضافات ناقص الخصومات', () => {
  const mv = [];
  const p = { name: 'A' };
  post(mv, p, { partyType: 'customer', type: 'add', amount: 200, refType: 'receipt', ref: 'R1' });
  post(mv, p, { partyType: 'customer', type: 'deduct', amount: 150, refType: 'invoice', ref: 'INV-1' });
  assert.strictEqual(p.creditBalance, 50);
});

test('applyCreditDelta: دالة نقية لا تنزل تحت الصفر', () => {
  assert.strictEqual(applyCreditDelta(100, 'add', 50), 150);
  assert.strictEqual(applyCreditDelta(100, 'deduct', 40), 60);
  assert.strictEqual(applyCreditDelta(30, 'deduct', 100), 0, 'لا رصيد سالب');
});

// ------------------------------------------------------------
// 2) المسارات الثلاثة تستخدم نفس المنطق
// ------------------------------------------------------------
console.log('\n\u2192 المسارات الثلاثة (مصدر حقيقة واحد)');

test('المسارات الثلاثة: إيصال + دفعة كشف + خصم فاتورة — رصيد واحد متسق', () => {
  const mv = [];
  const cust = { name: 'ali' };
  // مسار 1: إيصال قبض مستقل زائد 100
  post(mv, cust, { partyType: 'customer', type: 'add', amount: 100, refType: 'receipt', ref: 'REC-1' });
  // مسار 2: دفعة من الكشف زائدة 50
  post(mv, cust, { partyType: 'customer', type: 'add', amount: 50, refType: 'payment', ref: 'CPAY-1' });
  assert.strictEqual(cust.creditBalance, 150);
  // مسار 3: إنشاء فاتورة تخصم 120
  post(mv, cust, { partyType: 'customer', type: 'deduct', amount: 120, refType: 'invoice', ref: 'INV-9' });
  assert.strictEqual(cust.creditBalance, 30, 'الرصيد يعكس المسارات الثلاثة دون تكرار');
});

// ------------------------------------------------------------
// 3) منع احتساب نفس الدفعة مرتين
// ------------------------------------------------------------
console.log('\n\u2192 منع التكرار (idempotency)');

test('نفس الإيصال يُعالَج مرتين → يُسجّل مرة واحدة فقط', () => {
  const mv = [];
  const cust = { name: 'ali' };
  const r1 = post(mv, cust, { partyType: 'customer', type: 'add', amount: 100, refType: 'receipt', ref: 'REC-1' });
  const r2 = post(mv, cust, { partyType: 'customer', type: 'add', amount: 100, refType: 'receipt', ref: 'REC-1' });
  assert.strictEqual(r1.added, true);
  assert.strictEqual(r2.added, false, 'المرجع المكرر يُرفض');
  assert.strictEqual(mv.length, 1);
  assert.strictEqual(cust.creditBalance, 100, 'لا يُضاعف الرصيد');
});

test('دفعتان مستقلتان بمرجعين مختلفين → كلتاهما تُحتسب', () => {
  const mv = [];
  const cust = { name: 'ali' };
  post(mv, cust, { partyType: 'customer', type: 'add', amount: 100, refType: 'payment', ref: 'CPAY-1' });
  post(mv, cust, { partyType: 'customer', type: 'add', amount: 100, refType: 'payment', ref: 'CPAY-2' });
  assert.strictEqual(mv.length, 2);
  assert.strictEqual(cust.creditBalance, 200);
});

test('حركة بمبلغ صفر أو أقل من epsilon تُتجاهل', () => {
  const mv = [];
  const cust = { name: 'ali' };
  const r = post(mv, cust, { partyType: 'customer', type: 'add', amount: 0, refType: 'receipt', ref: 'REC-0' });
  assert.strictEqual(r.added, false);
  assert.strictEqual(mv.length, 0);
});

// ------------------------------------------------------------
// 4) الرصيد مرتبط دائماً بالحساب الصحيح (لا تسرّب)
// ------------------------------------------------------------
console.log('\n\u2192 عزل الحسابات (لا تسرّب)');

test('رصيد زبون لا يتسرّب لزبون آخر', () => {
  const mv = [];
  const a = { name: 'ali' };
  const b = { name: 'omar' };
  post(mv, a, { partyType: 'customer', type: 'add', amount: 100, refType: 'receipt', ref: 'REC-A' });
  post(mv, b, { partyType: 'customer', type: 'add', amount: 40, refType: 'receipt', ref: 'REC-B' });
  assert.strictEqual(a.creditBalance, 100);
  assert.strictEqual(b.creditBalance, 40);
  assert.strictEqual(creditBalanceFromMovements(mv, 'customer', 'ali'), 100);
  assert.strictEqual(creditBalanceFromMovements(mv, 'customer', 'omar'), 40);
});

test('زبون ومورد بنفس الاسم → رصيدان منفصلان', () => {
  const mv = [];
  const cust = { name: 'sameName' };
  const sup = { name: 'sameName' };
  post(mv, cust, { partyType: 'customer', type: 'add', amount: 100, refType: 'receipt', ref: 'RC' });
  post(mv, sup, { partyType: 'supplier', type: 'add', amount: 70, refType: 'receipt', ref: 'RS' });
  assert.strictEqual(creditBalanceFromMovements(mv, 'customer', 'sameName'), 100);
  assert.strictEqual(creditBalanceFromMovements(mv, 'supplier', 'sameName'), 70);
});

// ------------------------------------------------------------
// 5) حالات الحافة — الإلغاء والحذف
// ------------------------------------------------------------
console.log('\n\u2192 حالات الحافة (إلغاء/حذف)');

test('رصيد يُطبّق على فاتورة ثم تُلغى الفاتورة → يُسترجع الرصيد', () => {
  const mv = [];
  const cust = { name: 'ali' };
  post(mv, cust, { partyType: 'customer', type: 'add', amount: 200, refType: 'receipt', ref: 'REC-1' });
  // فاتورة تخصم 150
  post(mv, cust, { partyType: 'customer', type: 'deduct', amount: 150, refType: 'invoice', ref: 'INV-1' });
  assert.strictEqual(cust.creditBalance, 50);
  // إلغاء الفاتورة → استرجاع (add) بمرجع فريد
  post(mv, cust, { partyType: 'customer', type: 'add', amount: 150, refType: 'reversal', ref: 'REV-INV-1-a' });
  assert.strictEqual(cust.creditBalance, 200, 'الرصيد يعود كاملاً بعد الإلغاء');
});

test('إلغاء ثم استرجاع الفاتورة → يُعاد خصم الرصيد (المحصلة صفر)', () => {
  const mv = [];
  const cust = { name: 'ali' };
  post(mv, cust, { partyType: 'customer', type: 'add', amount: 200, refType: 'receipt', ref: 'REC-1' });
  post(mv, cust, { partyType: 'customer', type: 'deduct', amount: 150, refType: 'invoice', ref: 'INV-1' });
  post(mv, cust, { partyType: 'customer', type: 'add', amount: 150, refType: 'reversal', ref: 'REV-a' });     // إلغاء
  post(mv, cust, { partyType: 'customer', type: 'deduct', amount: 150, refType: 'reversal', ref: 'REV-b' });  // استرجاع
  assert.strictEqual(cust.creditBalance, 50, 'المحصلة تعود كما كانت');
});

test('حذف دفعة زائدة يعكس رصيدها (لا يبقى رصيد متسرّب)', () => {
  const mv = [];
  const cust = { name: 'ali' };
  post(mv, cust, { partyType: 'customer', type: 'add', amount: 80, refType: 'payment', ref: 'CPAY-1' });
  assert.strictEqual(cust.creditBalance, 80);
  // حذف الدفعة → عكس (deduct) بمرجع فريد
  post(mv, cust, { partyType: 'customer', type: 'deduct', amount: 80, refType: 'reversal', ref: 'REV-CPAY-1' });
  assert.strictEqual(cust.creditBalance, 0);
});

// ------------------------------------------------------------
// 6) الثبات — جدول credit_movements في SQLite
// ------------------------------------------------------------
console.log('\n\u2192 ثبات سجل الرصيد في SQLite (db.js)');

let sqliteAvailable = true;
try { require('better-sqlite3'); } catch (e) { sqliteAvailable = false; }

if (!sqliteAvailable) {
  console.log('  \u26a0\ufe0f  تخطي: better-sqlite3 غير مثبّت — اختبار الثبات يُجوّز');
} else {
  test('saveAll/loadAll: يحفظ ويسترجع creditMovements ويشتق الرصيد منها', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'cl-test-'));
    dbm.openDatabase(dir);
    const data = dbm.loadAll();
    data.customers = [{ id: 'CUS-1', name: 'ali', phone: '', address: '', balance: 0, creditBalance: 0 }];
    data.creditMovements = [
      buildCreditMovement({ partyType: 'customer', partyName: 'ali', type: 'add', amount: 200, refType: 'receipt', ref: 'REC-1' }),
      buildCreditMovement({ partyType: 'customer', partyName: 'ali', type: 'deduct', amount: 150, refType: 'invoice', ref: 'INV-1' }),
    ];
    dbm.saveAll(data);

    const reloaded = dbm.loadAll();
    assert.strictEqual((reloaded.creditMovements || []).length, 2, 'يُحفظ السجل عبر إعادة التحميل');
    assert.strictEqual(creditBalanceFromMovements(reloaded.creditMovements, 'customer', 'ali'), 50, 'الرصيد مشتق من السجل المُسترجع');

    fs.rmSync(dir, { recursive: true, force: true });
  });
}

console.log('\n\u2705 نجحت كل اختبارات السجل (' + passed + ')\n');

