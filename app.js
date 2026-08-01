

// ============================================================
// تاريخ اليوم — مساعدة مركزية
// ============================================================
function todayStr() {
  return new Date().toISOString().split('T')[0];
}

// تعبئة تلقائية لكل حقول التاريخ الفارغة في الصفحة
function fillTodayDates(...ids) {
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el && !el.value) el.value = todayStr();
  });
}

// ============================================================
// المواد الافتراضية لكل مجال
// ============================================================
const BUSINESS_ITEMS = {

  construction: [
    { id:'NUM-001', name:'إسمنت بورتلاندي عادي 42.5', type:'مواد بناء', unit:'كيس', unit2:'طن', factor:20, cost:2.33, price:2.67, minStock:10 },
    { id:'NUM-002', name:'إسمنت أبيض', type:'مواد بناء', unit:'كيس', unit2:'طن', factor:20, cost:3.50, price:4.00, minStock:10 },
    { id:'NUM-003', name:'حديد تسليح 10mm', type:'حديد وصلب', unit:'كيلو', unit2:'طن', factor:1000, cost:0.35, price:0.40, minStock:500 },
    { id:'NUM-004', name:'حديد تسليح 12mm', type:'حديد وصلب', unit:'كيلو', unit2:'طن', factor:1000, cost:0.35, price:0.40, minStock:500 },
    { id:'NUM-005', name:'حديد تسليح 16mm', type:'حديد وصلب', unit:'كيلو', unit2:'طن', factor:1000, cost:0.35, price:0.40, minStock:500 },
    { id:'NUM-006', name:'رمل ناعم للبناء', type:'مواد بناء', unit:'م3', unit2:'طن', factor:1.5, cost:10.00, price:12.08, minStock:5 },
    { id:'NUM-007', name:'رمل خشن للخرسانة', type:'مواد بناء', unit:'م3', unit2:'طن', factor:1.6, cost:8.33, price:10.42, minStock:5 },
    { id:'NUM-008', name:'حجارة بازلت 20-40mm', type:'مواد بناء', unit:'م3', unit2:'طن', factor:1.7, cost:10.83, price:13.33, minStock:5 },
    { id:'NUM-009', name:'أنابيب PVC 2 بوصة', type:'سباكة', unit:'متر', unit2:'طرد', factor:6, cost:1.00, price:1.25, minStock:20 },
    { id:'NUM-010', name:'كابل كهربائي 2.5mm²', type:'كهربائيات', unit:'متر', unit2:'لفة', factor:100, cost:0.71, price:0.88, minStock:50 },
    { id:'NUM-011', name:'دهان بلاستيك داخلي 17L', type:'دهانات', unit:'علبة', unit2:'كرتون', factor:4, cost:23.33, price:28.33, minStock:5 },
    { id:'NUM-012', name:'سيراميك أرضيات 60×60', type:'مواد بناء', unit:'م2', unit2:'كرتون', factor:1.44, cost:10.00, price:12.33, minStock:20 },
  ],

  restaurant: [
    { id:'RES-001', name:'دجاج طازج', type:'لحوم ودواجن', unit:'كيلو', unit2:'', factor:1, cost:3.50, price:5.00, minStock:10 },
    { id:'RES-002', name:'لحم غنم', type:'لحوم ودواجن', unit:'كيلو', unit2:'', factor:1, cost:8.00, price:12.00, minStock:5 },
    { id:'RES-003', name:'لحم بقر', type:'لحوم ودواجن', unit:'كيلو', unit2:'', factor:1, cost:7.00, price:10.00, minStock:5 },
    { id:'RES-004', name:'زيت نباتي', type:'زيوت وتوابل', unit:'لتر', unit2:'جالون', factor:4, cost:2.00, price:2.80, minStock:10 },
    { id:'RES-005', name:'أرز بسمتي', type:'حبوب', unit:'كيلو', unit2:'كيس 25kg', factor:25, cost:1.20, price:1.80, minStock:20 },
    { id:'RES-006', name:'طحين', type:'حبوب', unit:'كيلو', unit2:'كيس 25kg', factor:25, cost:0.80, price:1.20, minStock:20 },
    { id:'RES-007', name:'سكر', type:'حبوب', unit:'كيلو', unit2:'كيس 25kg', factor:25, cost:0.70, price:1.00, minStock:10 },
    { id:'RES-008', name:'ملح', type:'زيوت وتوابل', unit:'كيلو', unit2:'', factor:1, cost:0.20, price:0.40, minStock:5 },
    { id:'RES-009', name:'بهارات مشكلة', type:'زيوت وتوابل', unit:'كيلو', unit2:'', factor:1, cost:3.00, price:5.00, minStock:3 },
    { id:'RES-010', name:'طماطم', type:'خضار وفواكه', unit:'كيلو', unit2:'', factor:1, cost:0.50, price:0.90, minStock:10 },
    { id:'RES-011', name:'بصل', type:'خضار وفواكه', unit:'كيلو', unit2:'', factor:1, cost:0.30, price:0.60, minStock:10 },
    { id:'RES-012', name:'غاز طبخ', type:'وقود', unit:'اسطوانة', unit2:'', factor:1, cost:8.00, price:10.00, minStock:2 },
  ],

  supermarket: [
    { id:'SUP-001', name:'مياه معدنية 1.5L', type:'مشروبات', unit:'حبة', unit2:'كرتون', factor:12, cost:0.30, price:0.50, minStock:50 },
    { id:'SUP-002', name:'عصير برتقال 1L', type:'مشروبات', unit:'حبة', unit2:'كرتون', factor:12, cost:0.80, price:1.20, minStock:24 },
    { id:'SUP-003', name:'مشروب غازي 330ml', type:'مشروبات', unit:'علبة', unit2:'كرتون', factor:24, cost:0.40, price:0.70, minStock:48 },
    { id:'SUP-004', name:'حليب طازج 1L', type:'ألبان وأجبان', unit:'حبة', unit2:'كرتون', factor:12, cost:0.90, price:1.30, minStock:24 },
    { id:'SUP-005', name:'جبنة بيضاء 500g', type:'ألبان وأجبان', unit:'حبة', unit2:'', factor:1, cost:1.50, price:2.20, minStock:10 },
    { id:'SUP-006', name:'خبز تنور', type:'مخبوزات', unit:'ربطة', unit2:'', factor:1, cost:0.30, price:0.50, minStock:20 },
    { id:'SUP-007', name:'معجون طماطم 400g', type:'معلبات', unit:'علبة', unit2:'كرتون', factor:24, cost:0.60, price:1.00, minStock:24 },
    { id:'SUP-008', name:'تونة معلبة 170g', type:'معلبات', unit:'علبة', unit2:'كرتون', factor:24, cost:0.80, price:1.30, minStock:24 },
    { id:'SUP-009', name:'شيبس 50g', type:'وجبات خفيفة', unit:'حبة', unit2:'كرتون', factor:24, cost:0.25, price:0.50, minStock:48 },
    { id:'SUP-010', name:'شوكولاتة 100g', type:'حلويات', unit:'حبة', unit2:'كرتون', factor:24, cost:0.60, price:1.00, minStock:24 },
    { id:'SUP-011', name:'سكر 1kg', type:'بقالة', unit:'كيس', unit2:'', factor:1, cost:0.70, price:1.10, minStock:20 },
    { id:'SUP-012', name:'زيت زيتون 750ml', type:'زيوت', unit:'حبة', unit2:'كرتون', factor:12, cost:4.00, price:6.00, minStock:12 },
  ],

  clothing: [
    { id:'CLO-001', name:'تيشيرت رجالي S', type:'تيشيرتات', unit:'حبة', unit2:'دزينة', factor:12, cost:3.00, price:6.00, minStock:10 },
    { id:'CLO-002', name:'تيشيرت رجالي M', type:'تيشيرتات', unit:'حبة', unit2:'دزينة', factor:12, cost:3.00, price:6.00, minStock:10 },
    { id:'CLO-003', name:'تيشيرت رجالي L', type:'تيشيرتات', unit:'حبة', unit2:'دزينة', factor:12, cost:3.00, price:6.00, minStock:10 },
    { id:'CLO-004', name:'بنطال جينز رجالي', type:'بناطيل', unit:'حبة', unit2:'', factor:1, cost:8.00, price:15.00, minStock:5 },
    { id:'CLO-005', name:'بنطال جينز نسائي', type:'بناطيل', unit:'حبة', unit2:'', factor:1, cost:8.00, price:15.00, minStock:5 },
    { id:'CLO-006', name:'فستان نسائي', type:'فساتين', unit:'حبة', unit2:'', factor:1, cost:10.00, price:20.00, minStock:5 },
    { id:'CLO-007', name:'جاكيت شتوي رجالي', type:'جاكيتات', unit:'حبة', unit2:'', factor:1, cost:15.00, price:30.00, minStock:5 },
    { id:'CLO-008', name:'جوارب قطنية', type:'إكسسوارات', unit:'زوج', unit2:'دزينة', factor:12, cost:0.50, price:1.00, minStock:24 },
    { id:'CLO-009', name:'حزام جلد', type:'إكسسوارات', unit:'حبة', unit2:'', factor:1, cost:3.00, price:7.00, minStock:5 },
    { id:'CLO-010', name:'حذاء رياضي', type:'أحذية', unit:'زوج', unit2:'', factor:1, cost:12.00, price:25.00, minStock:5 },
    { id:'CLO-011', name:'شنطة نسائية', type:'حقائب', unit:'حبة', unit2:'', factor:1, cost:8.00, price:18.00, minStock:3 },
    { id:'CLO-012', name:'كاب قبعة', type:'إكسسوارات', unit:'حبة', unit2:'', factor:1, cost:2.00, price:5.00, minStock:10 },
  ],

  pharmacy: [
    { id:'PHA-001', name:'باراسيتامول 500mg', type:'مسكنات', unit:'علبة', unit2:'', factor:1, cost:0.50, price:1.00, minStock:20 },
    { id:'PHA-002', name:'أموكسيسيلين 500mg', type:'مضادات حيوية', unit:'علبة', unit2:'', factor:1, cost:1.50, price:3.00, minStock:10 },
    { id:'PHA-003', name:'فيتامين C 1000mg', type:'فيتامينات', unit:'علبة', unit2:'', factor:1, cost:2.00, price:4.00, minStock:10 },
    { id:'PHA-004', name:'شاش طبي', type:'مستلزمات', unit:'لفة', unit2:'', factor:1, cost:0.30, price:0.70, minStock:20 },
    { id:'PHA-005', name:'قفازات طبية', type:'مستلزمات', unit:'علبة', unit2:'', factor:1, cost:1.50, price:3.00, minStock:10 },
    { id:'PHA-006', name:'ضغط دم رقمي', type:'أجهزة', unit:'حبة', unit2:'', factor:1, cost:15.00, price:30.00, minStock:2 },
    { id:'PHA-007', name:'شامبو طبي', type:'عناية', unit:'حبة', unit2:'', factor:1, cost:2.00, price:4.50, minStock:5 },
    { id:'PHA-008', name:'كريم مرطب', type:'عناية', unit:'حبة', unit2:'', factor:1, cost:1.50, price:3.50, minStock:5 },
    { id:'PHA-009', name:'مقياس حرارة', type:'أجهزة', unit:'حبة', unit2:'', factor:1, cost:3.00, price:7.00, minStock:3 },
    { id:'PHA-010', name:'ماء أكسجيني', type:'مطهرات', unit:'حبة', unit2:'', factor:1, cost:0.40, price:0.90, minStock:10 },
  ],

  electronics: [
    { id:'ELE-001', name:'شاشة حماية موبايل', type:'إكسسوارات', unit:'حبة', unit2:'', factor:1, cost:0.50, price:2.00, minStock:20 },
    { id:'ELE-002', name:'كفر موبايل', type:'إكسسوارات', unit:'حبة', unit2:'', factor:1, cost:0.80, price:3.00, minStock:20 },
    { id:'ELE-003', name:'شاحن USB-C', type:'شواحن', unit:'حبة', unit2:'', factor:1, cost:2.00, price:5.00, minStock:10 },
    { id:'ELE-004', name:'سماعات بلوتوث', type:'سماعات', unit:'حبة', unit2:'', factor:1, cost:8.00, price:20.00, minStock:5 },
    { id:'ELE-005', name:'بطارية احتياطية 10000mAh', type:'بطاريات', unit:'حبة', unit2:'', factor:1, cost:7.00, price:15.00, minStock:5 },
    { id:'ELE-006', name:'كابل USB-C 1m', type:'كابلات', unit:'حبة', unit2:'', factor:1, cost:1.00, price:3.00, minStock:15 },
    { id:'ELE-007', name:'ذاكرة فلاش 32GB', type:'تخزين', unit:'حبة', unit2:'', factor:1, cost:3.00, price:7.00, minStock:10 },
    { id:'ELE-008', name:'لاب توب مستعمل', type:'أجهزة', unit:'حبة', unit2:'', factor:1, cost:150.00, price:250.00, minStock:1 },
    { id:'ELE-009', name:'موبايل مستعمل', type:'أجهزة', unit:'حبة', unit2:'', factor:1, cost:80.00, price:130.00, minStock:1 },
    { id:'ELE-010', name:'راوتر واي فاي', type:'شبكات', unit:'حبة', unit2:'', factor:1, cost:15.00, price:30.00, minStock:3 },
  ],

  general: []
};

const BUSINESS_LABELS = {
  construction: { label: 'مقاولات وبناء', icon: '🏗️' },
  restaurant:   { label: 'مطعم وكافيه',   icon: '🍽️' },
  supermarket:  { label: 'سوبرماركت',      icon: '🛒' },
  clothing:     { label: 'ألبسة وأزياء',   icon: '👕' },
  pharmacy:     { label: 'صيدلية',          icon: '💊' },
  electronics:  { label: 'إلكترونيات',     icon: '📱' },
  general:      { label: 'عام / فارغ',     icon: '🔧' },
};

// ============================================================
// نظام المحاسبة - v2
// ============================================================
const DB_KEY = 'accounting_v1';

// المواد الافتراضية — لا تُحذف عند إعادة التعيين
const DEFAULT_ITEMS = [
  { id:'NUM-001', name:'إسمنت بورتلاندي عادي 42.5', type:'مواد بناء', unit:'كيس', unit2:'طن', factor:20, cost:2.33, price:2.67, minStock:10 },
  { id:'NUM-002', name:'إسمنت أبيض', type:'مواد بناء', unit:'كيس', unit2:'طن', factor:20, cost:3.50, price:4.00, minStock:10 },
  { id:'NUM-003', name:'حديد تسليح 10mm', type:'حديد وصلب', unit:'كيلو', unit2:'طن', factor:1000, cost:0.35, price:0.40, minStock:500 },
  { id:'NUM-004', name:'حديد تسليح 12mm', type:'حديد وصلب', unit:'كيلو', unit2:'طن', factor:1000, cost:0.35, price:0.40, minStock:500 },
  { id:'NUM-005', name:'حديد تسليح 16mm', type:'حديد وصلب', unit:'كيلو', unit2:'طن', factor:1000, cost:0.35, price:0.40, minStock:500 },
  { id:'NUM-006', name:'رمل ناعم للبناء', type:'مواد بناء', unit:'م3', unit2:'طن', factor:1.5, cost:10.00, price:12.08, minStock:5 },
  { id:'NUM-007', name:'رمل خشن للخرسانة', type:'مواد بناء', unit:'م3', unit2:'طن', factor:1.6, cost:8.33, price:10.42, minStock:5 },
  { id:'NUM-008', name:'حجارة بازلت 20-40mm', type:'مواد بناء', unit:'م3', unit2:'طن', factor:1.7, cost:10.83, price:13.33, minStock:5 },
  { id:'NUM-019', name:'أنابيب PVC 2 بوصة', type:'سباكة', unit:'متر', unit2:'طرد', factor:6, cost:1.00, price:1.25, minStock:20 },
  { id:'NUM-020', name:'أنابيب PVC 4 بوصة', type:'سباكة', unit:'متر', unit2:'طرد', factor:6, cost:1.83, price:2.25, minStock:20 },
  { id:'NUM-027', name:'كابل كهربائي 2.5mm²', type:'كهربائيات', unit:'متر', unit2:'لفة', factor:100, cost:0.71, price:0.88, minStock:50 },
  { id:'NUM-028', name:'كابل كهربائي 4mm²', type:'كهربائيات', unit:'متر', unit2:'لفة', factor:100, cost:1.08, price:1.33, minStock:50 },
  { id:'NUM-037', name:'دهان بلاستيك داخلي 17L', type:'دهانات', unit:'علبة', unit2:'كرتون', factor:4, cost:23.33, price:28.33, minStock:5 },
  { id:'NUM-038', name:'دهان بلاستيك خارجي 17L', type:'دهانات', unit:'علبة', unit2:'كرتون', factor:4, cost:31.67, price:38.33, minStock:5 },
  { id:'NUM-046', name:'سيراميك أرضيات 60×60', type:'مواد بناء', unit:'م2', unit2:'كرتون', factor:1.44, cost:10.00, price:12.33, minStock:20 },
];

const defaultData = {
  company: { name:'شركتي', address:'', phone:'', email:'', slogan:'نشكر ثقتكم بنا' },
  exchange: { usdToOld: 12000, note: '1 دولار = X ل.س قديمة | 1 ل.س جديدة = 100 ل.س قديمة' },
  items: JSON.parse(JSON.stringify(DEFAULT_ITEMS)),
  customers: [],
  suppliers: [],
  salesInvoices: [],
  purchaseInvoices: [],
  invoiceCounters: { sale:0, purchase:0, returnSale:0, returnPurchase:0, receipt:0 }
};

// ============================================================
// SQLite — تحميل وحفظ البيانات
// ============================================================
// ============================================================
// isElectron — يكتشف تلقائياً هل البرنامج داخل Electron أو متصفح
// ============================================================
const isElectron = !!(window.electronAPI && window.electronAPI.dbLoad);

async function initDB() {
  if (isElectron) {
    // ===== وضع Electron: SQLite =====
    const hasData = await window.electronAPI.dbHasData();
    if (!hasData) {
      const oldData = localStorage.getItem(DB_KEY);
      if (oldData) {
        const result = await window.electronAPI.dbMigrate(oldData);
        if (result && result.success && !result.skipped) {
          showToast('✅ تم ترحيل بياناتك إلى النظام الجديد بنجاح', 'success');
          localStorage.setItem(DB_KEY + '_migrated_backup', oldData);
        }
      }
    }
    const loaded = await window.electronAPI.dbLoad();
    if (loaded) {
      db = loaded;
      // ✅ إذا items فاضية (حُذفت أو قاعدة جديدة) — أضف الافتراضيين
      if (!db.items || db.items.length === 0) {
        db.items = JSON.parse(JSON.stringify(DEFAULT_ITEMS));
        await window.electronAPI.dbSave(db);
      }
    } else {
      db = JSON.parse(JSON.stringify(defaultData));
      await window.electronAPI.dbSave(db);
    }
  } else {
    // ===== وضع المتصفح: localStorage =====
    const saved = localStorage.getItem(DB_KEY);
    if (saved) {
      try { db = JSON.parse(saved); }
      catch(e) { db = JSON.parse(JSON.stringify(defaultData)); }
    } else {
      db = JSON.parse(JSON.stringify(defaultData));
      localStorage.setItem(DB_KEY, JSON.stringify(db));
    }
  }

  // ضمان وجود كل الحقول
  if (!db.company)          db.company = JSON.parse(JSON.stringify(defaultData.company));
  if (!db.exchange)         db.exchange = JSON.parse(JSON.stringify(defaultData.exchange));
  if (!db.invoiceCounters)  db.invoiceCounters = { sale:0, purchase:0, returnSale:0, returnPurchase:0, receipt:0 };
  if (!db.invoiceCounters.receipt) db.invoiceCounters.receipt = 0;
  if (!db.customers)        db.customers = [];
  if (!db.suppliers)        db.suppliers = [];
  if (!db.books)            db.books = [];
  if (!db.salesInvoices)    db.salesInvoices = [];
  if (!db.purchaseInvoices) db.purchaseInvoices = [];
  if (!db.returns)          db.returns = [];
  if (!db.warehouses)       db.warehouses = [];
  if (!db.transfers)        db.transfers = [];
  if (!db.damages)          db.damages = [];
  if (!db.customerPayments) db.customerPayments = [];
  if (!db.supplierPayments) db.supplierPayments = [];
  if (!db.creditLedger)     db.creditLedger = []; // سجل حركة الرصيد الإضافي
  if (!db.auditLog)         db.auditLog = [];     // سجل التدقيق — عمليات الحذف/التعديل الحساسة
}

// ============================================================
// سجل التدقيق (Audit Log) — تسجيل تلقائي للعمليات الحساسة
// ============================================================
// أنواع العمليات الحساسة المُراقَبة
const AUDIT_TYPES = {
  INVOICE_DELETE: 'حذف فاتورة',
  PRICE_EDIT:     'تعديل سعر بيع',
  PAYMENT_DELETE: 'حذف دفعة',
  BALANCE_EDIT:   'تعديل رصيد يدوي',
};

// اسم المستخدم الفاعل — لا يوجد نظام صلاحيات متعدد المستخدمين في البرنامج
// (الدخول ببوابة كلمة مرور واحدة فقط)، لذا نستخدم اسماً موحّداً.
function auditActor() {
  return 'مستخدم البرنامج';
}

// يسجّل قيداً واحداً في سجل التدقيق ثم يحفظ. يُستدعى من كل عملية حساسة.
// type: أحد قيم AUDIT_TYPES — details: نص عربي يصف الكيان الحقيقي المتأثر.
function logAudit(type, details) {
  if (!db.auditLog) db.auditLog = [];
  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  db.auditLog.push({
    id:      'AUD-' + now.getTime() + '-' + Math.random().toString(36).slice(2, 8),
    ts:      now.toISOString(),
    date:    `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`,
    time:    `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`,
    type:    type || '',
    user:    auditActor(),
    details: details || '',
  });
  saveData(db);
}

// لون شارة نوع العملية في شاشة سجل التدقيق — يميّز الحذف عن التعديل بصرياً.
function auditTypeBadgeClass(type) {
  switch (type) {
    case AUDIT_TYPES.INVOICE_DELETE: return 'badge-red';
    case AUDIT_TYPES.PAYMENT_DELETE: return 'badge-yellow';
    case AUDIT_TYPES.PRICE_EDIT:     return 'badge-blue';
    case AUDIT_TYPES.BALANCE_EDIT:   return 'badge-purple';
    default:                         return 'badge-gray';
  }
}

// تهريب نصوص التفاصيل قبل الحقن في innerHTML — تحتوي أسماء عملاء/أصناف يدخلها المستخدم.
function auditEscape(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

// يعيد قيود سجل التدقيق مرتبة زمنياً تنازلياً (الأحدث أولاً).
function sortedAuditLog() {
  return (db.auditLog || [])
    .slice()
    .sort((a, b) => (b.ts || '').localeCompare(a.ts || '') || (b.id || '').localeCompare(a.id || ''));
}

// شاشة سجل التدقيق ضمن قسم التقارير — تعرض العمليات الحساسة، الأحدث أولاً.
function renderAuditLog() {
  const tbody = document.getElementById('audit-log-tbody');
  const subtitle = document.getElementById('audit-log-subtitle');
  if (!tbody) return;

  const allRows = sortedAuditLog();

  // الفلاتر: بحث نصي (النوع/المستخدم/التفاصيل) ومدى تاريخي (شامل الطرفين).
  const q    = (document.getElementById('audit-search')?.value || '').trim().toLowerCase();
  const from = document.getElementById('audit-from')?.value || '';
  const to   = document.getElementById('audit-to')?.value || '';

  const rows = allRows.filter(r => {
    if (from && (r.date || '') < from) return false;
    if (to   && (r.date || '') > to)   return false;
    if (q) {
      const hay = `${r.type || ''} ${r.user || ''} ${r.details || ''}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  const hasFilter = !!(q || from || to);

  if (subtitle) {
    if (allRows.length === 0) {
      subtitle.textContent = 'لا توجد عمليات مسجّلة بعد';
    } else if (hasFilter) {
      subtitle.textContent = `عرض ${rows.length} من ${allRows.length} عملية — الأحدث أولاً`;
    } else {
      subtitle.textContent = `${allRows.length} عملية مسجّلة — الأحدث أولاً`;
    }
  }

  if (rows.length === 0) {
    const msg = hasFilter
      ? 'لا توجد نتائج مطابقة للبحث أو الفترة المحددة'
      : 'لا توجد عمليات مسجّلة في سجل التدقيق';
    tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;padding:32px;color:var(--text-muted)">${msg}</td></tr>`;
    return;
  }

  tbody.innerHTML = rows.map(r => `
    <tr>
      <td style="white-space:nowrap;color:var(--text-muted)">${r.date || '—'} <span style="opacity:.7">${r.time || ''}</span></td>
      <td><span class="badge ${auditTypeBadgeClass(r.type)}">${auditEscape(r.type) || '—'}</span></td>
      <td style="font-weight:500">${auditEscape(r.user) || '—'}</td>
      <td>${auditEscape(r.details) || '—'}</td>
    </tr>
  `).join('');
}

// مسح فلاتر شاشة سجل التدقيق وإعادة العرض الكامل.
function clearAuditFilters() {
  const s = document.getElementById('audit-search');
  const f = document.getElementById('audit-from');
  const t = document.getElementById('audit-to');
  if (s) s.value = '';
  if (f) f.value = '';
  if (t) t.value = '';
  renderAuditLog();
}

function loadData() {
  return db || JSON.parse(JSON.stringify(defaultData));
}

function saveData(data) {
  db = data;
  if (isElectron) {
    // Electron: SQLite
    window.electronAPI.dbSave(data).catch(e => console.error('saveData error:', e));
  } else {
    // Browser: localStorage
    try { localStorage.setItem(DB_KEY, JSON.stringify(data)); }
    catch(e) { console.error('localStorage saveData error:', e); }
  }
}

let db = JSON.parse(JSON.stringify(defaultData));

// ============================================================
// سلة المحذوفات — حذف ناعم قابل للاسترجاع
// فواتير البيع/الشراء المحذوفة تبقى في db.salesInvoices/db.purchaseInvoices
// (للاحتفاظ بإمكانية الاسترجاع) مع وسم deletedAt.
// أي قراءة للتقارير/اللوحات/الإحصائيات يجب أن تمرّ عبر
// activeSalesInvoices()/activePurchaseInvoices() لاستبعاد المحذوفات تلقائياً.
// ============================================================
function activeSalesInvoices()    { return (db.salesInvoices    || []).filter(i => !i.deletedAt); }
function activePurchaseInvoices() { return (db.purchaseInvoices || []).filter(i => !i.deletedAt); }
function trashedSalesInvoices()    { return (db.salesInvoices    || []).filter(i => !!i.deletedAt); }
function trashedPurchaseInvoices() { return (db.purchaseInvoices || []).filter(i => !!i.deletedAt); }

// نافذة تأكيد عامة — confirm() غير موثوق داخل Electron فنستخدم modal خاص
function showConfirmModal({ title, message, confirmLabel = 'تأكيد', danger = true, onConfirm }) {
  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:9999;display:flex;align-items:center;justify-content:center;font-family:inherit;';
  overlay.innerHTML = `
    <div style="background:#fff;border-radius:16px;padding:32px;width:380px;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,0.3);">
      <div style="font-size:40px;margin-bottom:12px;">⚠️</div>
      <h3 style="margin:0 0 8px;font-size:18px;color:#0f172a;">${title}</h3>
      <p style="margin:0 0 24px;font-size:14px;color:#64748b;white-space:pre-line;">${message}</p>
      <div style="display:flex;gap:12px;justify-content:center;">
        <button id="confirm-modal-cancel" style="padding:10px 24px;border-radius:8px;border:1px solid #e2e8f0;background:#f8fafc;font-size:14px;cursor:pointer;font-family:inherit;">إلغاء</button>
        <button id="confirm-modal-ok" style="padding:10px 24px;border-radius:8px;border:none;background:${danger ? '#ef4444' : '#4f46e5'};color:#fff;font-size:14px;font-weight:600;cursor:pointer;font-family:inherit;">${confirmLabel}</button>
      </div>
    </div>`;
  document.body.appendChild(overlay);
  const close = () => { if (document.body.contains(overlay)) document.body.removeChild(overlay); };
  document.getElementById('confirm-modal-cancel').onclick = close;
  document.getElementById('confirm-modal-ok').onclick = () => { close(); onConfirm(); };
}

// نافذة إدخال عامة — prompt() غير موثوق داخل Electron فنستخدم modal خاصاً
function showPromptModal({ title, message, defaultValue = '', confirmLabel = 'حفظ', onConfirm }) {
  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:9999;display:flex;align-items:center;justify-content:center;font-family:inherit;';
  overlay.innerHTML = `
    <div style="background:#fff;border-radius:16px;padding:32px;width:380px;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,0.3);">
      <h3 style="margin:0 0 8px;font-size:18px;color:#0f172a;">${title}</h3>
      <p style="margin:0 0 16px;font-size:14px;color:#64748b;white-space:pre-line;">${message}</p>
      <input id="prompt-modal-input" type="number" step="0.01" value="${defaultValue}" style="width:100%;padding:10px 14px;border:1px solid #e2e8f0;border-radius:8px;font-size:14px;font-family:inherit;margin-bottom:20px;box-sizing:border-box;text-align:center;">
      <div style="display:flex;gap:12px;justify-content:center;">
        <button id="prompt-modal-cancel" style="padding:10px 24px;border-radius:8px;border:1px solid #e2e8f0;background:#f8fafc;font-size:14px;cursor:pointer;font-family:inherit;">إلغاء</button>
        <button id="prompt-modal-ok" style="padding:10px 24px;border-radius:8px;border:none;background:#4f46e5;color:#fff;font-size:14px;font-weight:600;cursor:pointer;font-family:inherit;">${confirmLabel}</button>
      </div>
    </div>`;
  document.body.appendChild(overlay);
  const input = document.getElementById('prompt-modal-input');
  input.focus(); input.select();
  const close = () => { if (document.body.contains(overlay)) document.body.removeChild(overlay); };
  const submit = () => { const v = input.value; close(); onConfirm(v); };
  document.getElementById('prompt-modal-cancel').onclick = close;
  document.getElementById('prompt-modal-ok').onclick = submit;
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') submit(); if (e.key === 'Escape') close(); });
}

// نقل فاتورة (بيع/شراء) إلى سلة المحذوفات — حذف ناعم فقط
// (لا يوجد حذف نهائي مباشر من القوائم العادية أبداً)
function softDeleteInvoice(number, isSale) {
  const list = isSale ? db.salesInvoices : db.purchaseInvoices;
  const inv = (list || []).find(i => i.number === number);
  if (!inv) return;
  showConfirmModal({
    title: 'نقل الفاتورة إلى المحذوفات',
    message: `سيتم نقل الفاتورة "${number}" إلى سلة المحذوفات.\nستختفي من القوائم والتقارير فوراً ويمكن استرجاعها لاحقاً من سلة المحذوفات.`,
    confirmLabel: '🗑️ نقل إلى المحذوفات',
    danger: true,
    onConfirm: () => {
      inv.deletedAt = new Date().toISOString();
      // إرجاع الرصيد الإضافي المخصوم على هذه الفاتورة — لا يبقى الخصم بعد الإلغاء
      reverseCreditMovements({ partyType: isSale ? 'customer' : 'supplier',
        partyName: isSale ? inv.customerName : inv.supplierName, refType:'invoice', ref:number });
      const _party = isSale ? inv.customerName : inv.supplierName;
      logAudit(AUDIT_TYPES.INVOICE_DELETE,
        `حذف فاتورة ${isSale ? 'بيع' : 'شراء'} ${number} بقيمة ${fmtUSD(inv.total || 0)}` +
        `${_party ? ' — ' + _party : ''} (نقل إلى المحذوفات)`);
      saveData(db);
      showToast('🗑️ تم نقل الفاتورة ' + number + ' إلى المحذوفات', 'success');
      const modal = document.getElementById('invoice-detail-modal');
      if (modal && !modal.classList.contains('hidden')) closeDetailModal();
      render(currentPage);
    }
  });
}

// استرجاع فاتورة من سلة المحذوفات إلى حالتها الطبيعية — تظهر مجدداً في قائمتها الأصلية
function restoreInvoiceFromTrash(number, isSale) {
  const list = isSale ? db.salesInvoices : db.purchaseInvoices;
  const inv = (list || []).find(i => i.number === number);
  if (!inv) return;
  inv.deletedAt = '';
  // إعادة تطبيق خصم الرصيد الإضافي الذي كان على الفاتورة (نفس المفتاح — idempotent)
  if ((parseFloat(inv.creditApplied) || 0) > CREDIT_EPSILON) {
    applyCreditMovement({ partyType: isSale ? 'customer' : 'supplier',
      partyName: isSale ? inv.customerName : inv.supplierName,
      delta: -(parseFloat(inv.creditApplied) || 0),
      refType:'invoice', ref:number, date: inv.date, key:'invoice-deduct:'+number });
  }
  saveData(db);
  showToast('♻️ تم استرجاع الفاتورة ' + number, 'success');
  renderTrash();
}

// حذف نهائي من سلة المحذوفات — لا يمكن التراجع عنه
function permanentlyDeleteInvoice(number, isSale) {
  showConfirmModal({
    title: 'حذف نهائي',
    message: `سيتم حذف الفاتورة "${number}" نهائياً ولا يمكن التراجع عن هذا الإجراء أبداً.`,
    confirmLabel: '🗑️ حذف نهائي',
    danger: true,
    onConfirm: () => {
      const _srcList = isSale ? db.salesInvoices : db.purchaseInvoices;
      const _inv = (_srcList || []).find(i => i.number === number);
      const _party = _inv ? (isSale ? _inv.customerName : _inv.supplierName) : '';
      if (isSale) db.salesInvoices = (db.salesInvoices || []).filter(i => i.number !== number);
      else db.purchaseInvoices = (db.purchaseInvoices || []).filter(i => i.number !== number);
      logAudit(AUDIT_TYPES.INVOICE_DELETE,
        `حذف نهائي لفاتورة ${isSale ? 'بيع' : 'شراء'} ${number} بقيمة ${fmtUSD(_inv ? (_inv.total || 0) : 0)}` +
        `${_party ? ' — ' + _party : ''}`);
      saveData(db);
      showToast('✅ تم الحذف النهائي للفاتورة ' + number, 'success');
      renderTrash();
    }
  });
}

// زر الحذف داخل مودال تفاصيل الفاتورة
function deleteInvoiceFromDetail() {
  const modal = document.getElementById('invoice-detail-modal');
  const number = modal.dataset.number;
  const isSale = modal.dataset.type === 'sale';
  softDeleteInvoice(number, isSale);
}

// عرض صفحة سلة المحذوفات — فواتير البيع والشراء المحذوفة كل في قسمها
function renderTrash() {
  const saleSearch = (document.getElementById('trash-sale-search')?.value || '').toLowerCase().trim();
  const purSearch  = (document.getElementById('trash-pur-search')?.value  || '').toLowerCase().trim();

  const trashedSales = trashedSalesInvoices()
    .filter(inv => !saleSearch || (inv.number||'').toLowerCase().includes(saleSearch) || (inv.customerName||'').toLowerCase().includes(saleSearch))
    .sort((a,b) => new Date(b.deletedAt) - new Date(a.deletedAt));
  const trashedPurchases = trashedPurchaseInvoices()
    .filter(inv => !purSearch || (inv.number||'').toLowerCase().includes(purSearch) || (inv.supplierName||'').toLowerCase().includes(purSearch))
    .sort((a,b) => new Date(b.deletedAt) - new Date(a.deletedAt));

  const saleCountEl = document.getElementById('trash-sale-count');
  if (saleCountEl) saleCountEl.textContent = trashedSales.length + ' فاتورة';
  const purCountEl = document.getElementById('trash-pur-count');
  if (purCountEl) purCountEl.textContent = trashedPurchases.length + ' فاتورة';

  const fmtDeletedAt = (iso) => {
    if (!iso) return '—';
    const d = new Date(iso);
    return isNaN(d) ? iso : d.toLocaleDateString('ar-SY') + ' ' + d.toLocaleTimeString('ar-SY', {hour:'2-digit', minute:'2-digit'});
  };

  const saleListEl = document.getElementById('trash-sale-list');
  if (saleListEl) {
    saleListEl.innerHTML = trashedSales.length === 0
      ? '<div class="empty-state">لا توجد فواتير بيع محذوفة</div>'
      : trashedSales.map(inv => `
        <div class="invoice-row">
          <span class="inv-num">${inv.number}</span>
          <span class="inv-customer">${inv.customerName || '—'}</span>
          <span class="inv-total">${fmtUSD(inv.total)}</span>
          <span class="inv-date">${fmtDeletedAt(inv.deletedAt)}</span>
          <span style="display:flex;gap:6px;">
            <button class="btn btn-success btn-sm" onclick="restoreInvoiceFromTrash('${inv.number}', true)">♻️ استرجاع</button>
            <button class="btn btn-danger btn-sm" onclick="permanentlyDeleteInvoice('${inv.number}', true)">🗑️ حذف نهائي</button>
          </span>
        </div>`).join('');
  }

  const purListEl = document.getElementById('trash-pur-list');
  if (purListEl) {
    purListEl.innerHTML = trashedPurchases.length === 0
      ? '<div class="empty-state">لا توجد فواتير شراء محذوفة</div>'
      : trashedPurchases.map(inv => `
        <div class="invoice-row">
          <span class="inv-num">${inv.number}</span>
          <span class="inv-customer">${inv.supplierName || '—'}</span>
          <span class="inv-total">${fmtUSD(inv.total)}</span>
          <span class="inv-date">${fmtDeletedAt(inv.deletedAt)}</span>
          <span style="display:flex;gap:6px;">
            <button class="btn btn-success btn-sm" onclick="restoreInvoiceFromTrash('${inv.number}', false)">♻️ استرجاع</button>
            <button class="btn btn-danger btn-sm" onclick="permanentlyDeleteInvoice('${inv.number}', false)">🗑️ حذف نهائي</button>
          </span>
        </div>`).join('');
  }
}


// ============================================================
// حساب المخزون
// ============================================================
function getStats() {
  const totalSales = activeSalesInvoices().reduce((s,i)=>s+(i.total||0),0);
  const totalPurchases = activePurchaseInvoices().reduce((s,i)=>s+(i.total||0),0);
  // ✅ إصلاح: حساب المرتجعات في الأرباح
  const totalReturnSales = (db.returns||[]).filter(r=>r.type==='sale').reduce((s,r)=>s+(r.total||0),0);
  const totalReturnPurchases = (db.returns||[]).filter(r=>r.type==='purchase').reduce((s,r)=>s+(r.total||0),0);
  const netSales = totalSales - totalReturnSales;
  const netPurchases = totalPurchases - totalReturnPurchases;
  const profit = netSales - netPurchases;
  const inv = calcInventory();
  // "منخفض" = وصلت الكمية إلى الحد الأدنى أو أقل منه (شامل الحد نفسه)، وليس أقل منه فقط
  const lowStock = db.items.filter(item => (item.minStock||0) > 0 && (inv[item.id]||0) <= item.minStock);
  const invValue = db.items.reduce((s,item)=>s+(inv[item.id]||0)*item.cost,0);
  return { totalSales, totalPurchases, netSales, netPurchases, profit,
           totalReturnSales, totalReturnPurchases,
           lowStock, invValue,
           salesCount: activeSalesInvoices().length, purchasesCount: activePurchaseInvoices().length,
           returnsCount: (db.returns||[]).length };
}

// ============================================================
// نظام العملات
// ============================================================
function getRate() {
  // exchange.usdToOld قد يُخزَّن كنص في SQLite — نحوّله لرقم دائماً مع قيمة افتراضية آمنة
  const r = db.exchange ? parseFloat(db.exchange.usdToOld) : NaN;
  return (r && r > 0) ? r : 12000;
}
// تحويل دولار → ل.س قديمة
function usdToOld(usd) { return usd * getRate(); }
// تحويل دولار → ل.س جديدة (حذف صفرين = قسمة 100)
function usdToNew(usd) { return usd * getRate() / 100; }

function fmtUSD(n) { return '$ ' + n.toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2}); }
function fmtOld(n) { return new Intl.NumberFormat('ar-SY').format(Math.round(n)) + ' ل.س ق'; }
function fmtNew(n) { return new Intl.NumberFormat('ar-SY').format(Math.round(n)) + ' ل.س ج'; }

// عرض السعر الكامل بالعملات الـ3
function fmtAll(usd) {
  return fmtUSD(usd) + ' = ' + fmtOld(usdToOld(usd)) + ' = ' + fmtNew(usdToNew(usd));
}
// للتوافق مع الكود القديم
function fmt(n) { return fmtOld(n); }

// ============================================================
// ROUTER
// ============================================================
const pages = ['dashboard','invoice-sale','invoice-purchase','items','customers','suppliers','settings','reports','returns','receipt-customer','receipt-supplier','warehouses','damages','stock','statements','statements-hub','invoices-statement','payments-statement','account-closing','customer-balances','trash','daily-report','audit-log'];
let currentPage = 'dashboard';

function navigate(page) {
  currentPage = page;
  document.body.setAttribute('data-page', page);
  pages.forEach(p => {
    document.getElementById('page-'+p)?.classList.add('hidden');
    document.querySelector(`[data-page="${p}"]`)?.classList.remove('active');
  });
  document.getElementById('page-'+page)?.classList.remove('hidden');
  document.querySelector(`[data-page="${page}"]`)?.classList.add('active');
  render(page);
}

function render(page) {
  switch(page) {
    case 'dashboard': renderDashboard(); break;
    case 'invoice-sale': renderSaleInvoice(); break;
    case 'invoice-purchase': renderPurchaseInvoice(); break;
    case 'items': renderItems(); break;
    case 'customers': renderCustomers(); break;
    case 'suppliers': renderSuppliers(); break;
    case 'settings': renderSettings(); break;
    case 'reports': renderReports(); break;
    case 'returns': renderReturns(); break;
    case 'receipt-customer': renderReceiptCustomer(); break;
    case 'receipt-supplier': renderReceiptSupplier(); break;
    case 'warehouses': renderWarehouses(); updateWarehouseSelects(); break;
    case 'damages': renderDamages(); updateWarehouseSelects(); break;
    case 'stock': renderStock(); break;
    case 'statements': renderStatements(); break;
    case 'statements-hub': renderStatementsHub(); break;
    case 'invoices-statement': renderInvoicesStatement(); break;
    case 'payments-statement': renderPaymentsStatement(); break;
    case 'account-closing': renderAccountClosing(); break;
    case 'customer-balances': renderCustomerBalances(); break;
    case 'trash': renderTrash(); break;
    case 'daily-report': renderDailyReport(); break;
    case 'audit-log': renderAuditLog(); break;
  }
}

// ============================================================
// DASHBOARD
// ============================================================
function renderDashboard() {
  const stats = getStats();
  const inv = calcInventory();

  // ── Date label
  const dateEl = document.getElementById('dash-date-label');
  if (dateEl) {
    const now = new Date();
    const opts = { weekday:'long', year:'numeric', month:'long', day:'numeric' };
    dateEl.textContent = now.toLocaleDateString('ar-SY', opts);
  }

  // ── KPI Cards
  const setEl = (id, val) => { const el = document.getElementById(id); if(el) el.textContent = val; };
  setEl('kpi-total-sales', fmtUSD(stats.totalSales));
  setEl('kpi-total-purchases', fmtUSD(stats.totalPurchases));
  setEl('kpi-sales-count', stats.salesCount + ' فاتورة');
  setEl('kpi-purchases-count', stats.purchasesCount + ' فاتورة');
  const profit = stats.profit;
  const profitEl = document.getElementById('kpi-net-profit');
  if(profitEl) {
    profitEl.textContent = fmtUSD(profit);
    profitEl.style.color = profit >= 0 ? 'var(--success-600)' : 'var(--danger-600)';
  }
  const margin = stats.totalSales > 0 ? ((profit / stats.totalSales) * 100).toFixed(1) : 0;
  setEl('kpi-profit-margin', 'هامش: ' + margin + '%');
  setEl('kpi-customers-count', db.customers.length);
  setEl('kpi-suppliers-count', (db.suppliers||[]).length + ' مورد');

  // ── Quick stats
  setEl('dash-items-count', db.items.length);
  setEl('dash-low-stock-count', stats.lowStock.length);
  setEl('dash-inv-value', '$' + Math.round(stats.invValue).toLocaleString('en-US'));
  setEl('dash-returns-count', stats.returnsCount);

  // ── Stock Alerts
  const alertsEl = document.getElementById('stock-alerts');
  const alertCountEl = document.getElementById('stock-alert-count');
  if (alertsEl) {
    if (stats.lowStock.length === 0) {
      alertsEl.innerHTML = '<div class="empty-state"><div class="empty-state-icon">✅</div>كل المواد بمخزون كافٍ</div>';
      if(alertCountEl) alertCountEl.style.display = 'none';
    } else {
      if(alertCountEl) { alertCountEl.style.display=''; alertCountEl.textContent = stats.lowStock.length; }
      alertsEl.innerHTML = stats.lowStock.slice(0, 8).map(item => {
        const stock = inv[item.id] || 0;
        const isZero = stock === 0;
        const pct = item.minStock > 0 ? Math.min(100, Math.round((stock / item.minStock) * 100)) : 0;
        return `<div class="alert-row">
          <span class="item-id">${item.id}</span>
          <span class="item-name">${item.name}</span>
          <div style="flex:1;max-width:80px;height:4px;background:var(--border);border-radius:2px;overflow:hidden;">
            <div style="height:100%;width:${pct}%;background:${isZero?'var(--danger-500)':'var(--warning-500)'};border-radius:2px;"></div>
          </div>
          <span class="stock-badge ${isZero ? 'badge-error' : 'badge-warning'}">
            ${isZero ? '⚠️ نفد' : stock + ' ' + item.unit}
          </span>
        </div>`;
      }).join('');
    }
  }

  // ── Bar Chart: Last 6 months
  renderDashboardBarChart();

  // ── Rate widget sync
  const rateInp = document.getElementById('rate-quick-input');
  if(rateInp && db.exchange) rateInp.value = db.exchange.usdToOld || 12000;
  const rateNew = document.getElementById('rate-widget-new');
  if(rateNew && db.exchange) rateNew.textContent = Math.round((db.exchange.usdToOld||12000)/100) + ' ل.س ج';

  // ── All invoices list
  renderAllInvoices();
}

function renderDashboardBarChart() {
  const svg = document.getElementById('bar-chart-svg');
  if (!svg) return;

  // Build monthly buckets for last 6 months
  const now = new Date();
  const months = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({
      key: d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0'),
      label: d.toLocaleDateString('ar-SY', {month:'short'}),
      sales: 0,
      purchases: 0
    });
  }

  activeSalesInvoices().forEach(inv => {
    if (!inv.date) return;
    const mk = inv.date.substring(0,7);
    const m = months.find(m => m.key === mk);
    if (m) m.sales += (inv.total || 0);
  });
  activePurchaseInvoices().forEach(inv => {
    if (!inv.date) return;
    const mk = inv.date.substring(0,7);
    const m = months.find(m => m.key === mk);
    if (m) m.purchases += (inv.total || 0);
  });

  const maxVal = Math.max(...months.map(m => Math.max(m.sales, m.purchases)), 1);
  const W = 360, H = 120, padL = 32, padB = 24, padT = 10, barW = 22, gap = 6;
  const chartW = W - padL - 10;
  const groupW = (chartW) / 6;
  const chartH = H - padB - padT;

  let svgContent = '';

  // Grid lines
  for (let i = 0; i <= 4; i++) {
    const y = padT + (chartH / 4) * i;
    const val = Math.round(maxVal * (1 - i/4));
    svgContent += `<line x1="${padL}" y1="${y}" x2="${W-8}" y2="${y}" stroke="var(--border)" stroke-width="1" stroke-dasharray="3,3"/>`;
    svgContent += `<text x="${padL-2}" y="${y+3}" text-anchor="end" font-size="7" fill="var(--text-muted)" font-family="inherit">$${val >= 1000 ? (val/1000).toFixed(1)+'k' : val}</text>`;
  }

  // Bars
  months.forEach((m, i) => {
    const gx = padL + i * groupW + groupW/2;
    const salesH = maxVal > 0 ? (m.sales / maxVal) * chartH : 0;
    const purH   = maxVal > 0 ? (m.purchases / maxVal) * chartH : 0;
    const salesX = gx - barW - gap/2;
    const purX   = gx + gap/2;

    // Sales bar
    if (salesH > 0) {
      svgContent += `<rect x="${salesX}" y="${padT + chartH - salesH}" width="${barW}" height="${salesH}" rx="3" fill="#4f46e5" opacity=".85">
        <title>${m.label}: $${m.sales.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}</title>
      </rect>`;
    } else {
      svgContent += `<rect x="${salesX}" y="${padT + chartH - 2}" width="${barW}" height="2" rx="1" fill="#4f46e5" opacity=".3"/>`;
    }

    // Purchase bar
    if (purH > 0) {
      svgContent += `<rect x="${purX}" y="${padT + chartH - purH}" width="${barW}" height="${purH}" rx="3" fill="#f59e0b" opacity=".85">
        <title>${m.label}: $${m.purchases.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}</title>
      </rect>`;
    } else {
      svgContent += `<rect x="${purX}" y="${padT + chartH - 2}" width="${barW}" height="2" rx="1" fill="#f59e0b" opacity=".3"/>`;
    }

    // Month label
    svgContent += `<text x="${gx}" y="${H - 6}" text-anchor="middle" font-size="8.5" fill="var(--text-muted)" font-family="inherit" font-weight="600">${m.label}</text>`;
  });

  svg.innerHTML = svgContent;
}

// ============================================================
// عرض كل الفواتير مع البحث
// ============================================================
function renderAllInvoices() {
  const searchVal = (document.getElementById('invoices-search') ? document.getElementById('invoices-search').value : '').toLowerCase().trim();

  const all = [
    ...activeSalesInvoices().map(i=>({...i, type:'بيع'})),
    ...activePurchaseInvoices().map(i=>({...i, type:'شراء'}))
  ].sort((a,b) => new Date(b.date) - new Date(a.date));

  const payFilter = document.getElementById('invoices-pay-filter') ? document.getElementById('invoices-pay-filter').value : 'all';

  const filtered = all.filter(inv => {
    const matchSearch = !searchVal ||
      (inv.number || '').toLowerCase().includes(searchVal) ||
      (inv.customerName || '').toLowerCase().includes(searchVal) ||
      (inv.supplierName || '').toLowerCase().includes(searchVal);
    const pt = inv.paymentType || 'cash';
    const matchPay = payFilter === 'all' ||
      (payFilter === 'deferred' && pt === 'deferred') ||
      (payFilter === 'cash' && pt !== 'deferred');
    return matchSearch && matchPay;
  });

  const recentEl = document.getElementById('recent-invoices');
  if (!recentEl) return;

  // عداد النتائج
  const countEl = document.getElementById('invoices-count');
  if (countEl) countEl.textContent = filtered.length + ' فاتورة';

  if (filtered.length === 0) {
    recentEl.innerHTML = searchVal
      ? '<div class="empty-state">🔍 لا توجد نتائج لـ "' + searchVal + '"</div>'
      : '<div class="empty-state">لا توجد فواتير بعد</div>';
    return;
  }

  recentEl.innerHTML = filtered.map(function(inv) {
    const num = inv.number;
    const party = inv.customerName || inv.supplierName || '—';
    const isSale = inv.type === 'بيع';
    const payBadge = paymentStatusBadge(inv);
    const creditBadge = inv.creditApplied > 0
      ? '<span style="font-size:10px;color:#16a34a;font-weight:700;margin-right:4px">💳 ' + fmtUSD(inv.creditApplied) + '</span>'
      : '';
    return '<div class="invoice-row" onclick="openInvoiceDetail(\'' + num + '\')" style="cursor:pointer">' +
      '<span class="inv-num">' + num + '</span>' +
      '<span class="inv-customer">' + party + '</span>' +
      '<span class="inv-type ' + (isSale ? 'type-sale' : 'type-purchase') + '">' + inv.type + '</span>' +
      payBadge + creditBadge +
      '<span class="inv-total">' + fmtUSD(inv.total) + '</span>' +
      '<span class="inv-date">' + inv.date + '</span>' +
      '</div>';
  }).join('');
}

// ============================================================
// SALE INVOICE
// ============================================================
let saleLines = [{ itemId:'', qty:1, price:0, total:0 }];

// ============================================================
// يضمن وجود سطر فارغ في نهاية الجدول، فيتولّد سطر جديد تلقائياً
// بمجرد إكمال السطر الحالي (اختيار مادة) دون حاجة لزر "إضافة سطر".
// ============================================================
function ensureTrailingBlankLine(lines) {
  const last = lines[lines.length - 1];
  if (!last || last.itemId) {
    lines.push({ itemId:'', qty:1, price:0, total:0, unitType:'unit' });
    return true;
  }
  return false;
}

function renderSaleInvoice() {
  const nextNum = 'INV-' + String(db.invoiceCounters.sale+1).padStart(3,'0');
  document.getElementById('sale-inv-num').textContent = nextNum;
  // ✅ لا تغير التاريخ لو كان المستخدم شغال على فاتورة
  const dateEl = document.getElementById('sale-date');
  if (dateEl && !dateEl.value) dateEl.value = todayStr();
  else if (dateEl && !dateEl.value) dateEl.value = todayStr();
  // ✅ لا تمسح السطور إذا كان في بيانات — فقط إذا كانت فاضية
  if (saleLines.length === 0 || (saleLines.length === 1 && !saleLines[0].itemId)) {
    saleLines = [{ itemId:'', qty:1, price:0, total:0 }];
  }
  renderSaleLines();
  renderSaleTotal();
  // Customer input - datalist
  const datalist = document.getElementById('customers-datalist');
  if(datalist) datalist.innerHTML = db.customers.filter(c=>c.name).map(c=>`<option value="${c.name}">`).join('');
  // باركود datalist
  updateBarcodeDatalist('sale');
  updateBarcodeDatalist('purchase');
  // تحديث كروات الإحصائيات
  renderSaleStats();
  // تحديث آخر الفواتير في صفحة البيع
  renderSaleRecentInvoices();
}

function renderSaleStats() {
  const stats = getStats();
  const el = document.getElementById('sale-kpi-sales');
  if(el) el.textContent = fmtUSD(stats.totalSales);
  const el4 = document.getElementById('sale-kpi-sales-count');
  if(el4) el4.textContent = stats.salesCount + ' فاتورة';
}

function renderSaleRecentInvoices() {
  const el = document.getElementById('sale-recent-invoices');
  if(!el) return;
  const searchVal = (document.getElementById('sale-invoices-search') ? document.getElementById('sale-invoices-search').value : '').toLowerCase().trim();
  const all = activeSalesInvoices().sort((a,b)=>new Date(b.date)-new Date(a.date));
  const salePayFilter = document.getElementById('sale-pay-filter') ? document.getElementById('sale-pay-filter').value : 'all';
  const filtered = all.filter(inv => {
    const matchSearch = !searchVal ||
      (inv.number||'').toLowerCase().includes(searchVal) ||
      (inv.customerName||'').toLowerCase().includes(searchVal);
    const pt = inv.paymentType || 'cash';
    const matchPay = salePayFilter === 'all' ||
      (salePayFilter === 'deferred' && pt === 'deferred') ||
      (salePayFilter === 'cash' && pt !== 'deferred');
    return matchSearch && matchPay;
  });
  const countEl = document.getElementById('sale-invoices-count');
  if(countEl) countEl.textContent = filtered.length + ' فاتورة';
  if(filtered.length === 0) {
    el.innerHTML = searchVal ? '<div class="empty-state">🔍 لا توجد نتائج لـ "' + searchVal + '"</div>' : '<div class="empty-state">لا توجد فواتير بيع بعد</div>';
    return;
  }
  el.innerHTML = filtered.map(inv => {
    const spb = paymentStatusBadge(inv);
    return '<div class="invoice-row" onclick="openInvoiceDetail(\'' + inv.number + '\')" style="cursor:pointer">' +
      '<span class="inv-num">' + inv.number + '</span>' +
      '<span class="inv-customer">' + (inv.customerName||'—') + '</span>' +
      '<span class="inv-type type-sale">بيع</span>' +
      spb +
      '<span class="inv-total">' + fmtUSD(inv.total) + '</span>' +
      '<span class="inv-date">' + inv.date + '</span>' +
      '<button class="btn btn-ghost btn-sm" title="نقل للمحذوفات" onclick="event.stopPropagation();softDeleteInvoice(\'' + inv.number + '\', true)" style="color:var(--danger-600, #dc2626);">🗑️</button>' +
      '</div>';
  }).join('');
}

function renderSaleLines() {
  const tbody = document.getElementById('sale-lines');
  if (!tbody) return;
  tbody.innerHTML = saleLines.map((line,i) => {
    const item = db.items.find(it=>it.id===line.itemId);
    const inv = calcInventory();
    const stockNum = item ? (inv[item.id]||0) : 0;
    const stockColor = !item ? '' : stockNum === 0 ? 'var(--danger-500)' : stockNum < item.minStock ? 'var(--warning-500)' : 'var(--success-600)';

    // Unit selector
    let unitSelect = '';
    if(item) {
      const hasUnit2 = item.unit2 && item.unit2.trim();
      if(hasUnit2) {
        unitSelect = `<select onchange="onSaleUnitChange(${i},this.value)" class="input input-sm">
          <option value="unit" ${(line.unitType||'unit')==='unit'?'selected':''}>${item.unit}</option>
          <option value="unit2" ${line.unitType==='unit2'?'selected':''}>${item.unit2}</option>
        </select>`;
      } else {
        unitSelect = `<span style="font-size:12px;font-weight:700;color:var(--text-muted);padding:0 4px;">${item.unit||'—'}</span>`;
      }
    } else {
      unitSelect = '<span style="color:var(--text-subtle);">—</span>';
    }

    // Stock badge
    const stockBadge = item ? `<span style="font-size:10px;color:${stockColor};font-weight:700;display:block;margin-top:2px;">مخزون: ${stockNum} ${item.unit}</span>` : '';

    return `<tr style="${line.total > 0 ? '' : ''}">
      <td style="text-align:center;color:var(--text-muted);font-size:12px;font-weight:700;">${i+1}</td>
      <td>
        <select onchange="onSaleItemChange(${i},this.value)" class="input input-sm" style="min-width:180px;">
          <option value="">— اختر مادة —</option>
          ${db.items.map(it=>`<option value="${it.id}" ${it.id===line.itemId?'selected':''}>${it.name}</option>`).join('')}
        </select>
        ${stockBadge}
      </td>
      <td>${unitSelect}</td>
      <td style="text-align:center;">
        <input type="number" id="sale-qty-${i}" class="input input-sm" value="${line.qty}" min="0.01" step="0.01"
          onchange="onSaleQtyChange(${i},this.value)" style="width:76px;text-align:center;">
      </td>
      <td style="text-align:center;">
        <input type="number" class="input input-sm" value="${line.price}" min="0" step="0.01"
          onchange="onSalePriceChange(${i},this.value)" style="width:110px;text-align:center;">
      </td>
      <td style="text-align:center;">
        <span style="font-size:14px;font-weight:900;color:${line.total > 0 ? 'var(--text-primary)' : 'var(--text-subtle)'};">${line.total ? fmtUSD(line.total) : '—'}</span>
      </td>
      <td style="text-align:center;">
        <button onclick="removeSaleLine(${i})" style="background:none;border:none;cursor:pointer;color:var(--text-subtle);font-size:16px;padding:4px 8px;border-radius:6px;transition:all .15s;" onmouseover="this.style.color='var(--danger-500)';this.style.background='var(--danger-50)';" onmouseout="this.style.color='var(--text-subtle)';this.style.background='none';">✕</button>
      </td>
    </tr>`;
  }).join('');
}

function onSaleItemChange(i,itemId) {
  const item = db.items.find(it=>it.id===itemId);
  saleLines[i].itemId = itemId;
  saleLines[i].unitType = 'unit';
  if(item) {
    const priceType = document.getElementById('sale-price-type')?.value || 'retail';
    if(priceType === 'wholesale' && item.price2 > 0) saleLines[i].price = item.price2;
    else if(priceType === 'special' && item.price3 > 0) saleLines[i].price = item.price3;
    else saleLines[i].price = item.price;
  } else {
    saleLines[i].price = 0;
  }
  saleLines[i].total = saleLines[i].price * saleLines[i].qty;
  if (itemId) ensureTrailingBlankLine(saleLines);
  renderSaleLines(); renderSaleTotal();
  // انتقال التركيز لحقل الكمية لتسريع الإدخال
  if (itemId) document.getElementById('sale-qty-'+i)?.focus();
}

function onSaleUnitChange(i, unitType) {
  const item = db.items.find(it=>it.id===saleLines[i].itemId);
  if(!item) return;
  saleLines[i].unitType = unitType;
  if(unitType === 'unit2') {
    // سعر الوحدة الثانية = سعر الأساسية × عامل التحويل
    saleLines[i].price = item.price * (item.factor || 1);
  } else {
    saleLines[i].price = item.price;
  }
  saleLines[i].total = saleLines[i].price * saleLines[i].qty;
  renderSaleLines(); renderSaleTotal();
}
function onSaleQtyChange(i,qty) {
  saleLines[i].qty = parseFloat(qty)||0;
  saleLines[i].total = saleLines[i].price*saleLines[i].qty;
  ensureTrailingBlankLine(saleLines);
  renderSaleLines(); renderSaleTotal();
}
function onSalePriceChange(i,price) {
  saleLines[i].price = parseFloat(price)||0;
  saleLines[i].total = saleLines[i].price*saleLines[i].qty;
  ensureTrailingBlankLine(saleLines);
  renderSaleLines(); renderSaleTotal();
}
function removeSaleLine(i) {
  saleLines.splice(i,1);
  if(saleLines.length===0) saleLines.push({itemId:'',qty:1,price:0,total:0});
  renderSaleLines(); renderSaleTotal();
}
function addSaleLine() { saleLines.push({itemId:'',qty:1,price:0,total:0}); renderSaleLines(); }
function renderSaleTotal() {
  const subtotal  = saleLines.reduce((s,l)=>s+l.total,0);
  const discount  = parseFloat(document.getElementById('sale-discount')?.value||0);
  const taxRate   = parseFloat(document.getElementById('sale-tax-rate')?.value||0);
  const afterDisc = subtotal * (1 - discount/100);
  const taxAmt    = afterDisc * (taxRate/100);
  const total     = afterDisc + taxAmt;

  const subEl = document.getElementById('sale-subtotal');
  if(subEl) subEl.textContent = fmtUSD(subtotal);

  const totalEl = document.getElementById('sale-total');
  if(totalEl) {
    totalEl.textContent = fmtUSD(total);
    // animate color if big change
    totalEl.style.color = total > 0 ? 'var(--brand-600)' : 'var(--text-muted)';
  }

  // Paid amount placeholder
  const paidEl = document.getElementById('sale-paid-amount');
  if(paidEl && !paidEl.value) paidEl.placeholder = fmtUSD(total) + ' (الكامل)';

  // Equivalent in SYP
  const eqEl = document.getElementById('sale-total-equiv');
  if(eqEl && total > 0) {
    eqEl.innerHTML =
      '<span style="font-size:11.5px;color:var(--text-muted);">' +
      fmtOld(usdToOld(total)) + ' &nbsp;|&nbsp; ' + fmtNew(usdToNew(total)) +
      '</span>';
  } else if(eqEl) {
    eqEl.innerHTML = '';
  }
}

function saveSaleInvoice() {
  const lines = saleLines.filter(l=>l.itemId&&l.qty>0);
  if(lines.length===0){showToast('أضف مادة واحدة على الأقل','error');return;}

  // تنبيه إعلامي غير مانع: أصناف في الفاتورة كميتها المتاحة نفدت أو وصلت لحدها الأدنى
  const lowItems = lowStockItemsInLines(lines);
  if (lowItems.length > 0) {
    showLowStockSaleWarning(lowItems, () => finalizeSaleInvoice(lines));
  } else {
    finalizeSaleInvoice(lines);
  }
}

// أصناف سطور الفاتورة التي كميتها الحالية (قبل هذا البيع) نفدت أو <= الحد الأدنى
function lowStockItemsInLines(lines) {
  const inv = calcInventory();
  const seen = new Set();
  const result = [];
  lines.forEach(l => {
    const item = db.items.find(it => it.id === l.itemId);
    if (!item || seen.has(item.id)) return;
    const stock = inv[item.id] || 0;
    const isOut = stock <= 0;
    const isLow = (item.minStock||0) > 0 && stock <= item.minStock;
    if (isOut || isLow) {
      seen.add(item.id);
      result.push({ id: item.id, name: item.name, unit: item.unit||'', stock, minStock: item.minStock||0, isOut });
    }
  });
  return result;
}

// تحذير غير مانع قبل إتمام البيع لأصناف نفدت أو دون الحد الأدنى — نفس نمط تحذيرات الاستعادة
function showLowStockSaleWarning(items, onContinue) {
  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:9999;display:flex;align-items:center;justify-content:center;font-family:inherit;';
  const rows = items.map(it => `
    <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;padding:8px 12px;background:#fef3c7;border-radius:8px;margin-bottom:6px;">
      <span style="font-weight:700;color:#0f172a;">${it.name}</span>
      <span style="font-weight:700;color:${it.isOut ? '#dc2626' : '#d97706'};font-size:12.5px;white-space:nowrap;">
        ${it.isOut ? '⚠️ نفد من المخزون' : `⚠️ متبقي ${it.stock} ${it.unit} (الحد الأدنى ${it.minStock})`}
      </span>
    </div>`).join('');
  overlay.innerHTML = `
    <div style="background:#fff;border-radius:16px;padding:32px;width:420px;max-width:90vw;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,0.3);">
      <div style="font-size:40px;margin-bottom:12px;">⚠️</div>
      <h3 style="margin:0 0 8px;font-size:18px;color:#0f172a;">تنبيه مخزون منخفض</h3>
      <p style="margin:0 0 14px;font-size:14px;color:#64748b;">هذه الفاتورة تحتوي على أصناف كميتها المتاحة نفدت أو وصلت للحد الأدنى:</p>
      <div style="text-align:right;max-height:220px;overflow-y:auto;margin-bottom:18px;">${rows}</div>
      <p style="margin:0 0 20px;font-size:12px;color:#94a3b8;">تنبيه إعلامي فقط — لن يمنع إتمام عملية البيع.</p>
      <div style="display:flex;gap:12px;justify-content:center;">
        <button id="low-stock-warning-ok" style="padding:10px 24px;border-radius:8px;border:none;background:#4f46e5;color:#fff;font-size:14px;font-weight:600;cursor:pointer;font-family:inherit;">متابعة إتمام البيع</button>
      </div>
    </div>`;
  document.body.appendChild(overlay);
  document.getElementById('low-stock-warning-ok').onclick = () => {
    if (document.body.contains(overlay)) document.body.removeChild(overlay);
    onContinue();
  };
}

function finalizeSaleInvoice(lines) {
  const subtotal = lines.reduce((s,l)=>s+l.total,0);
  const discount  = parseFloat(document.getElementById('sale-discount')?.value||0);
  const taxRate   = parseFloat(document.getElementById('sale-tax-rate')?.value||0);
  const taxAmount = subtotal * (1 - discount/100) * (taxRate/100);
  const total     = subtotal * (1 - discount/100) + taxAmount;
  const paidAmount  = parseFloat(document.getElementById('sale-paid-amount')?.value||total);
  const paymentType = document.getElementById('sale-payment-type')?.value || 'cash';
  const priceType   = document.getElementById('sale-price-type')?.value   || 'retail';
  const saleNote    = document.getElementById('sale-note')?.value || '';
  const customerName = document.getElementById('sale-customer-input').value.trim();
  const now = new Date();
  const timeStr = now.toTimeString().slice(0,5);

  // إضافة الزبون تلقائياً
  if(customerName && !db.customers.find(c=>c.name===customerName)) {
    const newId = 'CUS-' + String(db.customers.length+1).padStart(3,'0');
    db.customers.push({id:newId, name:customerName, phone:'', address:'', balance:0, creditBalance:0});
    showToast(`✅ تم إضافة الزبون "${customerName}" تلقائياً`,'success');
  }

  // خصم الرصيد الإضافي أولاً (إن وُجد) قبل حساب المتبقي على الفاتورة
  const cust = db.customers.find(c=>c.name===customerName);
  let creditApplied = 0;
  let effectivePaid = paidAmount;
  if(cust && (cust.creditBalance||0) > CREDIT_EPSILON) {
    const res = applyCreditToInvoice(cust.creditBalance, total, 0);
    creditApplied = res.creditApplied; // يُخصم من الرصيد عبر السجل بعد توليد رقم الفاتورة
    // العميل يدفع نقداً بحد أقصى المتبقي بعد الخصم
    effectivePaid = Math.min(paidAmount, res.amountDue);
    const dueOnInvoice = roundMoney(res.amountDue - effectivePaid);
    showToast('💳 خُصِم ' + fmtUSD(creditApplied) + ' من الرصيد الإضافي — الرصيد المتبقي ' + fmtUSD(res.remainingCredit) + ' — المتبقي على الفاتورة ' + fmtUSD(dueOnInvoice), 'success');
  }
  const settledNow = roundMoney(effectivePaid + creditApplied);

  // تحديث رصيد الزبون (الآجل فقط)
  if(paymentType === 'deferred') {
    if(cust) cust.balance = (cust.balance||0) + (total - settledNow);
  }

  db.invoiceCounters.sale++;
  const inv = {
    number: 'INV-'+String(db.invoiceCounters.sale).padStart(3,'0'),
    date: document.getElementById('sale-date').value,
    time: timeStr,
    customerName,
    lines, subtotal, discount, total,
    paidAmount: settledNow, paymentType, priceType,
    taxRate, taxAmount,
    creditApplied,
    note: saleNote,
    currency: 'USD',
    usdToOld: getRate()
  };
  db.salesInvoices.push(inv);

  // خصم الرصيد الإضافي عبر السجل الموحّد — مربوط برقم الفاتورة (يمنع الخصم مرتين)
  if (creditApplied > CREDIT_EPSILON) {
    applyCreditMovement({ partyType:'customer', partyName:customerName, delta:-creditApplied,
      refType:'invoice', ref:inv.number, date:inv.date, key:'invoice-deduct:'+inv.number });
  }

  // إيصال قبض تلقائي لو دفع نقدي جزئي (الرصيد الإضافي محسوب ضمن paidAmount)
  if(effectivePaid > 0 && settledNow < total) {
    db.invoiceCounters.receipt = (db.invoiceCounters.receipt||0) + 1;
    db.customerPayments.push({
      receiptNum: 'REC-'+String(db.invoiceCounters.receipt).padStart(3,'0'),
      customerName, amount: effectivePaid, paymentMethod: 'cash',
      chequeNum:'', description:'دفعة مع الفاتورة '+inv.number,
      discountOnPayment:0, note:'', date: inv.date,
      linkedInvoice: inv.number, _deposit: true
    });
  }

  saveData(db);
  saleLines = [{itemId:'',qty:1,price:0,total:0}];
  document.getElementById('sale-customer-input').value = '';
  if(document.getElementById('sale-tax-rate'))    document.getElementById('sale-tax-rate').value = '0';
  if(document.getElementById('sale-paid-amount')) document.getElementById('sale-paid-amount').value = '';
  if(document.getElementById('sale-note'))        document.getElementById('sale-note').value = '';
  showToast('✅ تم حفظ الفاتورة '+inv.number,'success');
  navigate('dashboard');
}

// ============================================================
// PRINT / PDF
// ============================================================
function printInvoice(invNumber) {
  const inv = activeSalesInvoices().find(i=>i.number===invNumber) ||
              activePurchaseInvoices().find(i=>i.number===invNumber);
  if(!inv) return;
  const isSale = !!activeSalesInvoices().find(i=>i.number===invNumber);
  const type = isSale ? 'فاتورة بيع' : 'فاتورة شراء';
  const party = inv.customerName || inv.supplierName || '—';
  const partyLabel = isSale ? 'الزبون' : 'المورد';
  const partyOwnerLabel = isSale ? 'للزبون' : 'للمورد';
  const co = db.company || {};
  const bal = invoiceBalance(inv);           // المدفوع والمتبقي محسوبان حياً بنفس منطق الحساب الحالي
  const note = inv.note || '';
  // الرصيد الإضافي المستخدم على هذه الفاتورة تحديداً (مصدره حقل الفاتورة نفسه)
  const creditApplied = parseFloat(inv.creditApplied) || 0;
  // الرصيد الإضافي المتبقي للطرف بعد هذه الفاتورة (حقل حي على سجل الزبون/المورد)
  const partyRecord = isSale
    ? (db.customers || []).find(c => c.name === party)
    : (db.suppliers || []).find(s => s.name === party);
  const creditBalance = partyRecord ? (parseFloat(partyRecord.creditBalance) || 0) : 0;

  const linesHTML = inv.lines.map(l => {
    const item = db.items.find(it=>it.id===l.itemId);
    return `<tr>
      <td style="font-weight:600">${item?.name||l.itemId}</td>
      <td class="col-qty">${l.qty}</td>
      <td class="col-price">${fmtUSD(l.price)}</td>
      <td class="col-total">${fmtUSD(l.total)}</td>
    </tr>`;
  }).join('');

  const html = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<title>${type} — ${inv.number}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;600;700;800;900&display=swap" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Tajawal','Tahoma','Arial',sans-serif; background:#fff; color:#111; padding:24px; font-size:13px; -webkit-print-color-adjust:exact; print-color-adjust:exact; }
  .print-header { display:flex; align-items:center; justify-content:space-between; border-bottom:3px solid #4f46e5; padding-bottom:16px; margin-bottom:20px; }
  .print-company-name { font-size:22px; font-weight:900; color:#312e81; margin-bottom:4px; }
  .print-company-details { font-size:11px; color:#6b7280; line-height:1.7; }
  .print-invoice-title { text-align:center; margin:0 20px; }
  .print-invoice-type { display:inline-block; background:#4f46e5; color:#fff; font-size:15px; font-weight:900; padding:6px 20px; border-radius:8px; margin-bottom:6px; }
  .print-invoice-num { font-size:13px; font-weight:800; color:#312e81; font-family:monospace; }
  .print-info-grid { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:20px; }
  .print-info-box { background:#f8fafc; border:1px solid #e5e7eb; border-radius:10px; padding:12px 14px; }
  .print-info-box-title { font-size:10px; font-weight:800; color:#6b7280; text-transform:uppercase; letter-spacing:.6px; margin-bottom:6px; }
  .print-info-row { display:flex; align-items:center; gap:6px; font-size:12px; }
  .print-info-label { color:#9ca3af; font-weight:600; min-width:60px; }
  .print-info-value { font-weight:700; color:#111; }
  .print-table { width:100%; border-collapse:collapse; margin-bottom:20px; font-size:12px; }
  .print-table thead th { background:#4f46e5; color:#fff; padding:9px 10px; font-weight:800; text-align:right; font-size:11px; letter-spacing:.3px; }
  .print-table thead th:first-child { border-radius:0 8px 0 0; }
  .print-table thead th:last-child  { border-radius:8px 0 0 0; }
  .print-table tbody td { padding:8px 10px; border-bottom:1px solid #f1f5f9; color:#374151; }
  .print-table tbody tr:nth-child(even) td { background:#fafbff; }
  .print-table tbody tr:last-child td { border-bottom:none; }
  .col-qty   { width:70px; text-align:center; font-weight:700; }
  .col-price { width:100px; text-align:center; font-family:monospace; }
  .col-total { width:110px; text-align:center; font-weight:800; color:#312e81; font-family:monospace; }
  .print-totals { display:flex; justify-content:flex-end; margin-bottom:16px; }
  .print-totals-box { background:#f8fafc; border:1px solid #e5e7eb; border-radius:12px; padding:14px 20px; min-width:300px; }
  .print-total-row { display:flex; justify-content:space-between; align-items:center; gap:24px; padding:7px 0; font-size:13px; border-bottom:1px solid #f1f5f9; }
  .print-total-row:last-child { border-bottom:none; }
  .print-total-label { color:#6b7280; font-weight:700; }
  .print-total-value { font-weight:800; color:#374151; font-family:monospace; }
  .print-total-row.total .print-total-label,
  .print-total-row.total .print-total-value { font-size:15px; font-weight:900; color:#312e81; }
  .print-total-row.due .print-total-label,
  .print-total-row.due .print-total-value { color:#dc2626; font-size:14px; font-weight:900; }
  .print-total-row.settled .print-total-label,
  .print-total-row.settled .print-total-value { color:#16a34a; font-size:14px; font-weight:900; }
  .print-total-row.credit-applied .print-total-label,
  .print-total-row.credit-applied .print-total-value { color:#16a34a; }
  .print-total-row.credit-balance .print-total-label,
  .print-total-row.credit-balance .print-total-value { color:#2563eb; }
  .print-note { background:#fffbeb; border:1px solid #fde68a; border-radius:8px; padding:10px 14px; margin-bottom:16px; font-size:12px; color:#92400e; }
  .print-footer { text-align:center; padding-top:14px; border-top:2px dashed #e5e7eb; margin-top:20px; }
  .print-footer-msg { font-size:13px; font-weight:800; color:#4f46e5; }
  @media print { body { padding:10px; } @page { margin:12mm 10mm; size:A4; } }
</style>
</head>
<body>
  <div class="print-header">
    <div class="print-company-info">
      <div class="print-company-name">${co.name || 'شركتي'}</div>
      <div class="print-company-details">
        ${co.address ? co.address + '<br>' : ''}
        ${co.phone ? '☎ ' + co.phone : ''}
        ${co.email ? ' &nbsp;|&nbsp; ✉ ' + co.email : ''}
      </div>
    </div>
    <div class="print-invoice-title">
      <div class="print-invoice-type">${type}</div><br>
      <div class="print-invoice-num"># ${inv.number}</div>
    </div>
  </div>

  <div class="print-info-grid">
    <div class="print-info-box">
      <div class="print-info-box-title">${partyLabel}</div>
      <div class="print-info-row"><span class="print-info-label">الاسم:</span><span class="print-info-value">${party}</span></div>
    </div>
    <div class="print-info-box">
      <div class="print-info-box-title">التاريخ</div>
      <div class="print-info-row"><span class="print-info-value">${inv.date}</span></div>
    </div>
  </div>

  <table class="print-table">
    <thead>
      <tr>
        <th>اسم المادة</th>
        <th class="col-qty">الكمية</th>
        <th class="col-price">السعر</th>
        <th class="col-total">الإجمالي</th>
      </tr>
    </thead>
    <tbody>${linesHTML}</tbody>
  </table>

  <div class="print-totals">
    <div class="print-totals-box">
      <div class="print-total-row total">
        <span class="print-total-label">المبلغ الإجمالي</span>
        <span class="print-total-value">${fmtUSD(inv.total)}</span>
      </div>
      <div class="print-total-row">
        <span class="print-total-label">المدفوع</span>
        <span class="print-total-value">${fmtUSD(bal.paid)}</span>
      </div>
      <div class="print-total-row ${bal.remaining > 0.005 ? 'due' : 'settled'}">
        <span class="print-total-label">المتبقي (الدين)</span>
        <span class="print-total-value">${fmtUSD(bal.remaining)}</span>
      </div>
      ${creditApplied > 0 ? `<div class="print-total-row credit-applied">
        <span class="print-total-label">💳 مستخدم من الرصيد الإضافي</span>
        <span class="print-total-value">${fmtUSD(creditApplied)}</span>
      </div>` : ''}
      ${creditBalance > 0 ? `<div class="print-total-row credit-balance">
        <span class="print-total-label">💰 الرصيد الإضافي المتبقي ${partyOwnerLabel}</span>
        <span class="print-total-value">${fmtUSD(creditBalance)}</span>
      </div>` : ''}
    </div>
  </div>

  ${note ? `<div class="print-note">📝 ملاحظة: ${note}</div>` : ''}

  <div class="print-footer">
    <div class="print-footer-msg">${co.slogan || 'شكراً لتعاملكم معنا'} 🌟</div>
  </div>

<script>window.onload=()=>{document.fonts.ready.then(()=>window.print());};<\/script>
</body></html>`;

  const win = window.open('','_blank');
  win.document.write(html);
  win.document.close();
}

// ============================================================
// PURCHASE INVOICE
// ============================================================
let purchaseLines = [{itemId:'',qty:1,price:0,total:0}];

function renderPurchaseInvoice() {
  const nextNum = 'PUR-'+String(db.invoiceCounters.purchase+1).padStart(3,'0');
  document.getElementById('pur-inv-num').textContent = nextNum;
  const purDateEl = document.getElementById('pur-date');
  if (purDateEl && !purDateEl.value) purDateEl.value = todayStr();
  // ✅ لا تمسح السطور إذا كان في بيانات
  if (purchaseLines.length === 0 || (purchaseLines.length === 1 && !purchaseLines[0].itemId)) {
    purchaseLines = [{itemId:'',qty:1,price:0,total:0}];
  }
  renderPurchaseLines(); renderPurchaseTotal();
  const datalist = document.getElementById('suppliers-datalist');
  if(datalist) datalist.innerHTML = db.suppliers.filter(s=>s.name).map(s=>`<option value="${s.name}">`).join('');
  renderPurchaseRecentInvoices();
}

function renderPurchaseLines() {
  const tbody = document.getElementById('pur-lines');
  tbody.innerHTML = purchaseLines.map((line,i) => {
    const item = db.items.find(it=>it.id===line.itemId);
    let unitSelect = '';
    if(item) {
      const hasUnit2 = item.unit2 && item.unit2.trim();
      if(hasUnit2) {
        unitSelect = `<select onchange="onPurUnitChange(${i},this.value)" class="input input-sm" style="width:90px">
          <option value="unit" ${(line.unitType||'unit')==='unit'?'selected':''}>${item.unit}</option>
          <option value="unit2" ${line.unitType==='unit2'?'selected':''}>${item.unit2}</option>
        </select>`;
      } else {
        unitSelect = `<span class="text-muted">${item.unit||''}</span>`;
      }
    } else {
      unitSelect = '<span class="text-muted">—</span>';
    }
    return `<tr>
      <td>${i+1}</td>
      <td>
        <select onchange="onPurItemChange(${i},this.value)" class="input input-sm">
          <option value="">-- اختر --</option>
          ${db.items.map(it=>`<option value="${it.id}" ${it.id===line.itemId?'selected':''}>${it.id} - ${it.name}</option>`).join('')}
        </select>
      </td>
      <td>${unitSelect}</td>
      <td><input type="number" id="pur-qty-${i}" class="input input-sm" value="${line.qty}" min="0.01" step="0.01" onchange="onPurQtyChange(${i},this.value)" style="width:80px"></td>
      <td><input type="number" class="input input-sm" value="${line.price}" min="0" onchange="onPurPriceChange(${i},this.value)" style="width:110px"></td>
      <td><strong>${line.total?fmtUSD(line.total):'—'}</strong></td>
      <td><button class="btn btn-ghost btn-sm" onclick="removePurLine(${i})">✕</button></td>
    </tr>`;
  }).join('');
}

function onPurItemChange(i,itemId) {
  const item = db.items.find(it=>it.id===itemId);
  purchaseLines[i].itemId = itemId;
  purchaseLines[i].unitType = 'unit';
  purchaseLines[i].price = item ? item.cost : 0;
  purchaseLines[i].total = purchaseLines[i].price * purchaseLines[i].qty;
  if (itemId) ensureTrailingBlankLine(purchaseLines);
  renderPurchaseLines(); renderPurchaseTotal();
  if (itemId) document.getElementById('pur-qty-'+i)?.focus();
}

function onPurUnitChange(i, unitType) {
  const item = db.items.find(it=>it.id===purchaseLines[i].itemId);
  if(!item) return;
  purchaseLines[i].unitType = unitType;
  if(unitType === 'unit2') {
    purchaseLines[i].price = item.cost * (item.factor || 1);
  } else {
    purchaseLines[i].price = item.cost;
  }
  purchaseLines[i].total = purchaseLines[i].price * purchaseLines[i].qty;
  renderPurchaseLines(); renderPurchaseTotal();
}
function onPurQtyChange(i,qty) {
  purchaseLines[i].qty=parseFloat(qty)||0;
  purchaseLines[i].total=purchaseLines[i].price*purchaseLines[i].qty;
  ensureTrailingBlankLine(purchaseLines);
  renderPurchaseLines(); renderPurchaseTotal();
}
function onPurPriceChange(i,price) {
  purchaseLines[i].price=parseFloat(price)||0;
  purchaseLines[i].total=purchaseLines[i].price*purchaseLines[i].qty;
  ensureTrailingBlankLine(purchaseLines);
  renderPurchaseLines(); renderPurchaseTotal();
}
function removePurLine(i) {
  purchaseLines.splice(i,1);
  if(purchaseLines.length===0) purchaseLines.push({itemId:'',qty:1,price:0,total:0});
  renderPurchaseLines(); renderPurchaseTotal();
}
function addPurLine() { purchaseLines.push({itemId:'',qty:1,price:0,total:0}); renderPurchaseLines(); }
function renderPurchaseTotal() {
  // الإجمالي المعروض يجب أن يطابق المحفوظ: يطبّق الخصم ويضيف الشحن
  const subtotal = purchaseLines.reduce((s,l)=>s+l.total,0);
  const discount = parseFloat(document.getElementById('pur-discount')?.value||0);
  const shipping = parseFloat(document.getElementById('pur-shipping')?.value||0);
  const total = subtotal*(1-discount/100) + shipping;
  const totalEl = document.getElementById('pur-total');
  if(totalEl) totalEl.textContent = fmtUSD(total);
  const eqEl = document.getElementById('pur-total-equiv');
  if(eqEl) eqEl.innerHTML =
    '<span style="color:var(--text-muted);font-size:13px">' +
    fmtOld(usdToOld(total)) + ' &nbsp;|&nbsp; ' + fmtNew(usdToNew(total)) +
    '</span>';
  const paidEl = document.getElementById('pur-paid-amount');
  if(paidEl && !paidEl.value) paidEl.placeholder = fmtUSD(total) + ' (الكامل)';
}
function renderPurchaseRecentInvoices() {
  const el = document.getElementById('pur-recent-invoices');
  if(!el) return;
  const searchVal = (document.getElementById('pur-invoices-search') ? document.getElementById('pur-invoices-search').value : '').toLowerCase().trim();
  const all = activePurchaseInvoices().sort((a,b)=>new Date(b.date)-new Date(a.date));
  const purPayFilter = document.getElementById('pur-pay-filter') ? document.getElementById('pur-pay-filter').value : 'all';
  const filtered = all.filter(inv => {
    const matchSearch = !searchVal ||
      (inv.number||'').toLowerCase().includes(searchVal) ||
      (inv.supplierName||'').toLowerCase().includes(searchVal);
    const pt = inv.paymentType || 'cash';
    const matchPay = purPayFilter === 'all' ||
      (purPayFilter === 'deferred' && pt === 'deferred') ||
      (purPayFilter === 'cash' && pt !== 'deferred');
    return matchSearch && matchPay;
  });
  const countEl = document.getElementById('pur-invoices-count');
  if(countEl) countEl.textContent = filtered.length + ' فاتورة';
  if(filtered.length === 0) {
    el.innerHTML = searchVal ? '<div class="empty-state">🔍 لا توجد نتائج لـ "' + searchVal + '"</div>' : '<div class="empty-state">لا توجد فواتير شراء بعد</div>';
    return;
  }
  el.innerHTML = filtered.map(inv => {
    const ppb = paymentStatusBadge(inv);
    return '<div class="invoice-row" onclick="openInvoiceDetail(\'' + inv.number + '\')" style="cursor:pointer">' +
      '<span class="inv-num">' + inv.number + '</span>' +
      '<span class="inv-customer">' + (inv.supplierName||'—') + '</span>' +
      '<span class="inv-type type-purchase">شراء</span>' +
      ppb +
      '<span class="inv-total">' + fmtUSD(inv.total) + '</span>' +
      '<span class="inv-date">' + inv.date + '</span>' +
      '<button class="btn btn-ghost btn-sm" title="نقل للمحذوفات" onclick="event.stopPropagation();softDeleteInvoice(\'' + inv.number + '\', false)" style="color:var(--danger-600, #dc2626);">🗑️</button>' +
      '</div>';
  }).join('');
}

function savePurchaseInvoice() {
  const lines = purchaseLines.filter(l=>l.itemId&&l.qty>0);
  if(lines.length===0){showToast('أضف مادة واحدة على الأقل','error');return;}
  const subtotal     = lines.reduce((s,l)=>s+l.total,0);
  const discount     = parseFloat(document.getElementById('pur-discount')?.value||0);
  const shippingCost = parseFloat(document.getElementById('pur-shipping')?.value||0);
  const total        = subtotal*(1-discount/100) + shippingCost;
  const paidAmount   = parseFloat(document.getElementById('pur-paid-amount')?.value||total);
  const paymentType  = document.getElementById('pur-payment-type')?.value || 'cash';
  const supplierInvoiceNum = document.getElementById('pur-supplier-invoice')?.value || '';
  const purNote      = document.getElementById('pur-note')?.value || '';
  const supplierName = document.getElementById('pur-supplier-input').value.trim();
  const now = new Date();
  const timeStr = now.toTimeString().slice(0,5);

  if(!supplierName){showToast('أدخل اسم المورد','error');return;}

  // إضافة المورد تلقائياً
  if(!db.suppliers.find(s=>s.name===supplierName)) {
    const newId = 'SUP-'+String(db.suppliers.length+1).padStart(3,'0');
    db.suppliers.push({id:newId, name:supplierName, phone:'', address:'', balance:0, creditBalance:0});
  }

  // تحديث تكلفة المادة بسعر الشراء الجديد
  lines.forEach(l => {
    const item = db.items.find(it=>it.id===l.itemId);
    if(item) item.cost = l.price;
  });

  // خصم الرصيد الإضافي المستحق لنا من المورد أولاً (إن وُجد) قبل حساب المتبقي
  const sup = db.suppliers.find(s=>s.name===supplierName);
  let creditApplied = 0;
  let effectivePaid = paidAmount;
  if(sup && (sup.creditBalance||0) > CREDIT_EPSILON) {
    const res = applyCreditToInvoice(sup.creditBalance, total, 0);
    creditApplied = res.creditApplied; // يُخصم من الرصيد عبر السجل بعد توليد رقم الفاتورة
    effectivePaid = Math.min(paidAmount, res.amountDue);
    const dueOnInvoice = roundMoney(res.amountDue - effectivePaid);
    showToast('💳 خُصِم ' + fmtUSD(creditApplied) + ' من الرصيد الإضافي للمورد — الرصيد المتبقي ' + fmtUSD(res.remainingCredit) + ' — المتبقي على الفاتورة ' + fmtUSD(dueOnInvoice), 'success');
  }
  const settledNow = roundMoney(effectivePaid + creditApplied);

  // تحديث رصيد المورد (آجل)
  if(paymentType === 'deferred') {
    if(sup) sup.balance = (sup.balance||0) + (total - settledNow);
  }

  db.invoiceCounters.purchase++;
  const inv = {
    number: 'PUR-'+String(db.invoiceCounters.purchase).padStart(3,'0'),
    date: document.getElementById('pur-date').value,
    time: timeStr,
    supplierName, supplierInvoiceNum,
    lines, subtotal, discount, total,
    paidAmount: settledNow, paymentType,
    shippingCost, shippingAccount:'',
    creditApplied,
    note: purNote,
    currency:'USD', usdToOld: getRate()
  };
  db.purchaseInvoices.push(inv);

  // خصم الرصيد الإضافي للمورد عبر السجل الموحّد — مربوط برقم الفاتورة (يمنع الخصم مرتين)
  if (creditApplied > CREDIT_EPSILON) {
    applyCreditMovement({ partyType:'supplier', partyName:supplierName, delta:-creditApplied,
      refType:'invoice', ref:inv.number, date:inv.date, key:'invoice-deduct:'+inv.number });
  }

  saveData(db);
  purchaseLines = [{itemId:'',qty:1,price:0,total:0}];
  document.getElementById('pur-supplier-input').value = '';
  ['pur-discount','pur-shipping','pur-paid-amount','pur-supplier-invoice','pur-note'].forEach(id=>{
    const el=document.getElementById(id); if(el) el.value = id.includes('discount')||id.includes('shipping') ? '0' : '';
  });
  showToast('✅ تم حفظ فاتورة الشراء '+inv.number,'success');
  navigate('dashboard');
}

// ============================================================
// ITEMS — مع حذف مادة
// ============================================================
function renderItems() {
  const inv = calcInventory();
  const search = document.getElementById('items-search')?.value?.toLowerCase()||'';
  const filtered = db.items.filter(item =>
    item.name.toLowerCase().includes(search)||item.id.toLowerCase().includes(search)||item.type.toLowerCase().includes(search)
  );
  const tbody = document.getElementById('items-tbody');
  tbody.innerHTML = filtered.map(item => {
    const stock = inv[item.id]||0;
    const isLow = stock < item.minStock;
    const isDefault = DEFAULT_ITEMS.find(d=>d.id===item.id);
    const barcodeIcon = item.barcode
      ? `<span title="${item.barcode}" style="cursor:default;font-size:14px;">📊</span>`
      : `<span style="color:var(--text-muted);font-size:11px;">—</span>`;
    return `<tr class="${isLow?'row-warning':''}">
      <td><span class="item-id">${item.id}</span></td>
      <td><strong>${item.name}</strong></td>
      <td><span class="badge">${item.type}</span></td>
      <td>${item.unit}</td>
      <td>${fmtUSD(item.cost)}</td>
      <td>${fmtUSD(item.price)}</td>
      <td><span class="stock-num">${stock}</span></td>
      <td style="text-align:center">${barcodeIcon}</td>
      <td>
        <button class="btn btn-ghost btn-sm" onclick="editItem('${item.id}')">✏️</button>
        <button class="btn btn-ghost btn-sm" onclick="deleteItem('${item.id}')" title="حذف" style="color:var(--red-600)">🗑️</button>
      </td>
    </tr>`;
  }).join('');
  document.getElementById('items-count').textContent = filtered.length + ' مادة';
}

// ✅ حذف مادة
function deleteItem(id) {
  const item = db.items.find(i=>i.id===id);
  if(!item) return;
  if(!confirm(`هل تريد حذف "${item.name}"؟\nلا يمكن التراجع عن هذا الإجراء.`)) return;
  db.items = db.items.filter(i=>i.id!==id);
  saveData(db);
  renderItems();
  showToast('🗑️ تم حذف المادة','success');
}

function editItem(id) {
  const item = db.items.find(i=>i.id===id);
  if(!item) return;
  document.getElementById('modal-item-id').value = item.id;
  document.getElementById('modal-item-name').value = item.name;
  document.getElementById('modal-item-type').value = item.type;
  document.getElementById('modal-item-unit').value = item.unit || '';
  document.getElementById('modal-item-unit2').value = item.unit2 || '';
  document.getElementById('modal-item-factor').value = item.factor || 1;
  document.getElementById('modal-item-barcode').value = item.barcode || '';
  // حقول جديدة
  const el2 = document.getElementById('modal-item-barcode2'); if(el2) el2.value = item.barcode2||'';
  const elTax = document.getElementById('modal-item-tax'); if(elTax) elTax.value = item.taxRate||0;
  const elMax = document.getElementById('modal-item-maxstock'); if(elMax) elMax.value = item.maxStock||0;
  const elMin = document.getElementById('modal-item-minstock'); if(elMin) elMin.value = item.minStock||0;
  const elBrand = document.getElementById('modal-item-brand'); if(elBrand) elBrand.value = item.brand||'';
  const elDefsup = document.getElementById('modal-item-defsup'); if(elDefsup) elDefsup.value = item.defaultSupplier||'';
  // العملة والأسعار
  const currency = item.priceCurrency || 'USD';
  document.getElementById('modal-price-currency').value = currency;
  const rate = getRate();
  let costDisplay = item.cost;
  let priceDisplay = item.price;
  let price2Display = item.price2||0;
  let price3Display = item.price3||0;
  if(currency === 'OLD') {
    costDisplay *= rate; priceDisplay *= rate;
    price2Display *= rate; price3Display *= rate;
  } else if(currency === 'NEW') {
    costDisplay *= rate/100; priceDisplay *= rate/100;
    price2Display *= rate/100; price3Display *= rate/100;
  }
  document.getElementById('modal-item-cost').value = Math.round(costDisplay * 100) / 100;
  document.getElementById('modal-item-price').value = Math.round(priceDisplay * 100) / 100;
  const elP2 = document.getElementById('modal-item-price2'); if(elP2) elP2.value = Math.round(price2Display*100)/100;
  const elP3 = document.getElementById('modal-item-price3'); if(elP3) elP3.value = Math.round(price3Display*100)/100;
  updateModalCurrencyLabel();
  document.getElementById('item-modal').classList.remove('hidden');
}

function updateModalCurrencyLabel() {
  const cur = document.getElementById('modal-price-currency').value;
  const labels = { USD: '$', OLD: 'ل.س ق', NEW: 'ل.س ج' };
  document.querySelectorAll('.modal-cur-label').forEach(el => el.textContent = labels[cur] || '$');
}

function saveItemModal() {
  const id = document.getElementById('modal-item-id').value;
  const item = db.items.find(i=>i.id===id);
  if(!item) return;
  const _oldPrice = parseFloat(item.price) || 0; // سعر البيع قبل التعديل (للتدقيق)
  item.name = document.getElementById('modal-item-name').value;
  item.type = document.getElementById('modal-item-type').value;
  item.unit = document.getElementById('modal-item-unit').value;
  item.unit2 = document.getElementById('modal-item-unit2').value;
  item.factor = parseFloat(document.getElementById('modal-item-factor').value) || 1;
  item.barcode = document.getElementById('modal-item-barcode').value.trim();
  // حقول جديدة
  const el2 = document.getElementById('modal-item-barcode2'); if(el2) item.barcode2 = el2.value.trim();
  const elTax = document.getElementById('modal-item-tax'); if(elTax) item.taxRate = parseFloat(elTax.value)||0;
  const elMax = document.getElementById('modal-item-maxstock'); if(elMax) item.maxStock = parseFloat(elMax.value)||0;
  const elBrand = document.getElementById('modal-item-brand'); if(elBrand) item.brand = elBrand.value.trim();
  const elDefsup = document.getElementById('modal-item-defsup'); if(elDefsup) item.defaultSupplier = elDefsup.value.trim();
  // تحويل الأسعار للدولار
  const currency = document.getElementById('modal-price-currency').value;
  const rate = getRate();
  const toUSD = (v) => {
    if(currency === 'OLD') return v / rate;
    if(currency === 'NEW') return v / (rate/100);
    return v;
  };
  item.cost  = Math.round(toUSD(parseFloat(document.getElementById('modal-item-cost').value)||0) * 10000) / 10000;
  item.price = Math.round(toUSD(parseFloat(document.getElementById('modal-item-price').value)||0) * 10000) / 10000;
  const elP2 = document.getElementById('modal-item-price2');
  const elP3 = document.getElementById('modal-item-price3');
  if(elP2) item.price2 = Math.round(toUSD(parseFloat(elP2.value)||0) * 10000) / 10000;
  if(elP3) item.price3 = Math.round(toUSD(parseFloat(elP3.value)||0) * 10000) / 10000;
  item.priceCurrency = currency;
  item.minStock = parseFloat(document.getElementById('modal-item-minstock')?.value)||0;
  // تدقيق: سجّل أي تعديل فعلي على سعر البيع الرئيسي
  const _newPrice = parseFloat(item.price) || 0;
  if (Math.abs(_newPrice - _oldPrice) > 0.0001) {
    logAudit(AUDIT_TYPES.PRICE_EDIT,
      `تعديل سعر بيع المادة ${item.id}${item.name ? ' (' + item.name + ')' : ''} من ${fmtUSD(_oldPrice)} إلى ${fmtUSD(_newPrice)}`);
  }
  saveData(db);
  document.getElementById('item-modal').classList.add('hidden');
  renderItems();
  showToast('✅ تم تحديث المادة','success');
}

function addNewItem() {
  const newId = 'NUM-'+ String(db.items.length+1).padStart(3,'0');
  db.items.push({id:newId,name:'مادة جديدة',type:'مواد بناء',unit:'قطعة',unit2:'',factor:1,cost:0,price:0,minStock:0,priceCurrency:'USD'});
  saveData(db);
  renderItems();
  editItem(newId);
}

// ============================================================
// CUSTOMERS
// ============================================================
function renderCustomers() {
  const tbody = document.getElementById('customers-tbody');
  if(db.customers.length===0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;padding:24px;color:var(--text-muted)">لا يوجد زبائن بعد — سيُضافون تلقائياً عند إنشاء فاتورة بيع</td></tr>`;
    return;
  }
  tbody.innerHTML = db.customers.map((c,i) => {
    const sales = activeSalesInvoices().filter(s=>s.customerName===c.name);
    const total = sales.reduce((s,inv)=>s+inv.total,0);
    const invoicesList = sales.length > 0
      ? sales.map(s=>`<span class="inv-link" onclick="openInvoiceDetail('${s.number}')">${s.number}</span>`).join(' ')
      : '—';
    const acc = getCustomerAccount(c.name);
    const remainingColor = acc.remaining > 0 ? 'var(--red-600)' : 'var(--green-700)';
    return `<tr>
      <td><span class="item-id">${c.id}</span></td>
      <td><input class="input input-sm" value="${c.name}" onchange="updateCustomer(${i},'name',this.value)" placeholder="اسم الزبون"></td>
      <td><input class="input input-sm" value="${c.phone||''}" onchange="updateCustomer(${i},'phone',this.value)" placeholder="الهاتف"></td>
      <td><input class="input input-sm" value="${c.address||''}" onchange="updateCustomer(${i},'address',this.value)" placeholder="العنوان"></td>
      <td><strong>${fmtUSD(acc.totalInvoices)}</strong></td>
      <td><strong style="color:var(--green-700)">${fmtUSD(acc.totalPaid)}</strong></td>
      <td><strong style="color:${remainingColor}">${fmtUSD(acc.remaining)}</strong></td>
      <td><button class="btn btn-primary btn-sm" onclick="openCustomerAccount('${c.name}')">💳 الحساب</button></td>
    </tr>`;
  }).join('');
}

// ===== SUPPLIERS =====
function renderSuppliers() {
  const tbody = document.getElementById('suppliers-tbody');
  if (!tbody) return;
  const suppliers = db.suppliers || [];
  if (suppliers.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:24px;color:var(--text-muted)">لا يوجد موردين بعد — سيُضافون تلقائياً عند إنشاء فاتورة شراء</td></tr>';
    return;
  }
  tbody.innerHTML = suppliers.map(function(s, i) {
    const purchases = activePurchaseInvoices().filter(function(p){ return p.supplierName === s.name; });
    const total = purchases.reduce(function(sum,inv){ return sum + inv.total; }, 0);
    const invLinks = purchases.length > 0
      ? purchases.map(function(p){ return '<span class="inv-link" onclick="openInvoiceDetail(\'' + p.number + '\')">' + p.number + '</span>'; }).join('')
      : '<span style="color:var(--text-muted);font-size:12px">—</span>';
    const sAcc = getSupplierAccount(s.name);
    const sRemColor = sAcc.remaining > 0 ? 'var(--red-600)' : 'var(--green-700)';
    return '<tr>' +
      '<td><span class="item-id">' + (s.id || String(i+1).padStart(3,'0')) + '</span></td>' +
      '<td><input class="input input-sm" value="' + (s.name||'') + '" onchange="updateSupplier(' + i + ',\'name\',this.value)" placeholder="اسم المورد"></td>' +
      '<td><input class="input input-sm" value="' + (s.phone||'') + '" onchange="updateSupplier(' + i + ',\'phone\',this.value)" placeholder="الهاتف"></td>' +
      '<td><input class="input input-sm" value="' + (s.address||'') + '" onchange="updateSupplier(' + i + ',\'address\',this.value)" placeholder="العنوان"></td>' +
      '<td style="font-weight:700;color:var(--blue-link)">' + fmtUSD(sAcc.totalInvoices) + '</td>' +
      '<td style="font-weight:700;color:var(--green-700)">' + fmtUSD(sAcc.totalPaid) + '</td>' +
      '<td style="font-weight:700;color:' + sRemColor + '">' + fmtUSD(sAcc.remaining) + '</td>' +
      '<td><button class="btn btn-primary btn-sm" onclick="openSupplierAccount(\'' + s.name + '\')">' + '💳 الحساب</button></td>' +
      '</tr>';
  }).join('');
}

function addSupplier() {
  if (!db.suppliers) db.suppliers = [];
  const newId = 'SUP-' + String(db.suppliers.length + 1).padStart(3, '0');
  db.suppliers.push({ id: newId, name: '', phone: '', address: '', balance: 0, creditBalance: 0 });
  saveData(db);
  renderSuppliers();
  showToast('✅ تمت إضافة مورد جديد — أدخل بياناته');
}

function updateSupplier(i, field, val) {
  if (!db.suppliers || !db.suppliers[i]) return;
  const sup = db.suppliers[i];
  if (field === 'balance' || field === 'creditBalance') {
    const _old = parseFloat(sup[field]) || 0;
    const _new = parseFloat(val) || 0;
    val = _new; // خزّن الرصيد رقماً دائماً
    if (Math.abs(_new - _old) > 0.0001) {
      logAudit(AUDIT_TYPES.BALANCE_EDIT,
        `تعديل ${field === 'creditBalance' ? 'الرصيد الإضافي للمورد' : 'رصيد المورد'} ${sup.name || sup.id} من ${fmtUSD(_old)} إلى ${fmtUSD(_new)}`);
    }
  }
  db.suppliers[i][field] = val;
  saveData(db);
}


function updateCustomer(i,field,val) {
  if (!db.customers || !db.customers[i]) return;
  const cust = db.customers[i];
  if (field === 'balance' || field === 'creditBalance') {
    const _old = parseFloat(cust[field]) || 0;
    const _new = parseFloat(val) || 0;
    val = _new; // خزّن الرصيد رقماً دائماً
    if (Math.abs(_new - _old) > 0.0001) {
      logAudit(AUDIT_TYPES.BALANCE_EDIT,
        `تعديل ${field === 'creditBalance' ? 'الرصيد الإضافي للزبون' : 'رصيد الزبون'} ${cust.name || cust.id} من ${fmtUSD(_old)} إلى ${fmtUSD(_new)}`);
    }
  }
  db.customers[i][field]=val;
  saveData(db);
}

// تعديل رصيد طرف (زبون/مورد) يدوياً — يمرّ عبر updateCustomer/updateSupplier
// ليُسجّل في سجل التدقيق تلقائياً.
function manualEditBalance(kind, name) {
  const list = kind === 'supplier' ? (db.suppliers || []) : (db.customers || []);
  const idx = list.findIndex(p => p.name === name);
  if (idx < 0) { showToast('لم يتم العثور على الحساب', 'error'); return; }
  const current = parseFloat(list[idx].balance) || 0;
  showPromptModal({
    title: '✏️ تعديل الرصيد يدوياً',
    message: `الرصيد المخزّن الحالي لـ "${name}": ${fmtUSD(current)}\nأدخل الرصيد الجديد (بالدولار):`,
    defaultValue: current,
    onConfirm: (raw) => {
      const val = parseFloat(raw);
      if (isNaN(val)) { showToast('قيمة غير صالحة', 'error'); return; }
      if (kind === 'supplier') updateSupplier(idx, 'balance', val);
      else updateCustomer(idx, 'balance', val);
      showToast('✅ تم تعديل الرصيد', 'success');
      renderCustomerBalances();
    }
  });
}

function addCustomer() {
  const newId = 'CUS-'+String(db.customers.length+1).padStart(3,'0');
  db.customers.push({id:newId,name:'',phone:'',address:'',balance:0,creditBalance:0});
  saveData(db); renderCustomers();
}

// ============================================================
// SETTINGS
// ============================================================
function updateRateDisplay(val) {
  const rate = parseFloat(val) || 0;
  const oldEl = document.getElementById('rate-display-old');
  const newEl = document.getElementById('rate-display-new');
  if(oldEl) oldEl.textContent = rate ? new Intl.NumberFormat('ar-SY').format(rate) + ' ل.س ق' : '—';
  if(newEl) newEl.textContent = rate ? new Intl.NumberFormat('ar-SY').format(rate/100) + ' ل.س ج' : '—';
}

function renderSettings() {
  document.getElementById('set-name').value = db.company.name;
  document.getElementById('set-address').value = db.company.address;
  document.getElementById('set-phone').value = db.company.phone;
  document.getElementById('set-email').value = db.company.email;
  document.getElementById('set-slogan').value = db.company.slogan;
  if(!db.exchange) db.exchange = { usdToOld: 12000 };
  const rate = db.exchange.usdToOld;
  document.getElementById('set-usd-rate').value = rate;
  updateRateDisplay(rate);
}

// ✅ استعادة المواد الافتراضية — تضيف المواد الناقصة فقط دون حذف الموجودة
function restoreDefaultItems() {
  let added = 0;
  DEFAULT_ITEMS.forEach(def => {
    const exists = db.items.find(i => i.id === def.id);
    if (!exists) {
      db.items.push(JSON.parse(JSON.stringify(def)));
      added++;
    }
  });
  if (added > 0) {
    saveData(db);
    showToast('✅ تم استعادة ' + added + ' مادة افتراضية', 'success');
  } else {
    showToast('ℹ️ المواد الافتراضية موجودة بالفعل', 'info');
  }
  navigate('items');
}


function saveCompanyName(name) {
  if (!name || name === db.company.name) return;
  db.company.name = name;
  saveData(db);
  // حدّث حقل الإعدادات كمان
  const setName = document.getElementById('set-name');
  if (setName) setName.value = name;
  showToast('✅ تم حفظ اسم الشركة');
}

function saveSettings() {
  db.company.name = document.getElementById('set-name').value;
  db.company.address = document.getElementById('set-address').value;
  db.company.phone = document.getElementById('set-phone').value;
  db.company.email = document.getElementById('set-email').value;
  db.company.slogan = document.getElementById('set-slogan').value;
  if(!db.exchange) db.exchange = { usdToOld: 12000 };
  db.exchange.usdToOld = parseFloat(document.getElementById('set-usd-rate').value) || 12000;
  saveData(db);
  const hdr = document.getElementById('company-name-header');
  if (hdr) hdr.value = db.company.name;
  updateRateWidget();
  showToast('✅ تم حفظ الإعدادات — سعر الصرف: ' + db.exchange.usdToOld + ' ل.س ق/$','success');
}

// ويجت سعر الصرف في لوحة التحكم
function onRateInput(val) {
  const rate = parseFloat(val);
  const newEl = document.getElementById('rate-widget-new');
  if (newEl) newEl.textContent = (rate && rate > 0)
    ? new Intl.NumberFormat('ar-SY').format(rate / 100) + ' ل.س ج'
    : '—';
  if (!rate || rate < 1) return;
  if (!db.exchange) db.exchange = {};
  db.exchange.usdToOld = rate;
  saveData(db);
}

function updateRateWidget() {
  if(!db.exchange) db.exchange = { usdToOld: 12000 };
  const rate = db.exchange.usdToOld;
  const el = document.getElementById('rate-widget-val');
  if(el) el.textContent = new Intl.NumberFormat('ar-SY').format(rate);
  const el2 = document.getElementById('rate-widget-new');
  if(el2) el2.textContent = new Intl.NumberFormat('ar-SY').format(rate/100);
  const inp = document.getElementById('rate-quick-input');
  if(inp) inp.value = rate;
}

function saveQuickRate() {
  const val = parseFloat(document.getElementById('rate-quick-input').value);
  if(!val || val < 1) { showToast('سعر صرف غير صحيح','error'); return; }
  if(!db.exchange) db.exchange = {};
  db.exchange.usdToOld = val;
  saveData(db);
  updateRateWidget();
  showToast('✅ تم تحديث سعر الصرف: ' + val + ' ل.س ق/$','success');
}

// ✅ إعادة التعيين — تحتفظ بالمواد
function resetData() {
  // confirm() بيتعطل أحياناً في Electron — نستخدم modal بسيط بدله
  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:9999;display:flex;align-items:center;justify-content:center;font-family:inherit;';
  overlay.innerHTML = `
    <div style="background:#fff;border-radius:16px;padding:32px;width:360px;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,0.3);">
      <div style="font-size:40px;margin-bottom:12px;">⚠️</div>
      <h3 style="margin:0 0 8px;font-size:18px;color:#0f172a;">إعادة تعيين البيانات</h3>
      <p style="margin:0 0 24px;font-size:14px;color:#64748b;">سيتم حذف الفواتير والزبائن والموردين.<br>المواد لن تُحذف.</p>
      <div style="display:flex;gap:12px;justify-content:center;">
        <button id="reset-cancel" style="padding:10px 24px;border-radius:8px;border:1px solid #e2e8f0;background:#f8fafc;font-size:14px;cursor:pointer;font-family:inherit;">إلغاء</button>
        <button id="reset-confirm" style="padding:10px 24px;border-radius:8px;border:none;background:#ef4444;color:#fff;font-size:14px;font-weight:600;cursor:pointer;font-family:inherit;">تأكيد الحذف</button>
      </div>
    </div>`;
  document.body.appendChild(overlay);
  document.getElementById('reset-cancel').onclick = () => document.body.removeChild(overlay);
  document.getElementById('reset-confirm').onclick = () => {
    document.body.removeChild(overlay);
    db.salesInvoices = [];
    db.purchaseInvoices = [];
    db.customers = [];
    db.suppliers = [];
    db.invoiceCounters = {sale:0,purchase:0,returnSale:0,returnPurchase:0};
    saveData(db);
    showToast('✅ تم إعادة التعيين — المواد محفوظة', 'success');
    navigate('dashboard');
  };
}

// ============================================================
// تصدير واستيراد قاعدة البيانات (SQLite)
// ============================================================
async function exportDatabase() {
  if (!window.electronAPI || !window.electronAPI.exportDatabase) {
    showToast('هذه الميزة تعمل فقط داخل البرنامج', 'error');
    return;
  }
  const result = await window.electronAPI.exportDatabase();
  if (result && result.success) {
    showToast('✅ تم تصدير قاعدة البيانات بنجاح', 'success');
  } else if (result && !result.canceled) {
    showToast('❌ ' + (result.error || 'فشل التصدير'), 'error');
  }
}

async function importDatabase() {
  if (!window.electronAPI || !window.electronAPI.importDatabase) {
    showToast('هذه الميزة تعمل فقط داخل البرنامج', 'error');
    return;
  }
  const result = await window.electronAPI.importDatabase();
  if (result && result.success) {
    showToast('✅ تم استيراد قاعدة البيانات — سيُعاد تشغيل البرنامج', 'success');
    setTimeout(() => location.reload(), 1500);
  } else if (result && result.error) {
    showToast('❌ ' + result.error, 'error');
  }
}

// ============================================================
// TOAST
// ============================================================
function showToast(msg,type='success') {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.className = 'toast toast-'+type+' show';
  setTimeout(()=>toast.classList.remove('show'),3000);
}



// ============================================================
// التقارير
// ============================================================

function renderReports() {
  const filterType = document.getElementById('report-filter-type')?.value || 'monthly';
  const filterMonth = document.getElementById('report-filter-month')?.value || '';
  const filterYear  = document.getElementById('report-filter-year')?.value  || new Date().getFullYear();

  function matchPeriod(inv) {
    const d = new Date(inv.date);
    if (filterType === 'daily') {
      const today = document.getElementById('report-filter-date')?.value || new Date().toISOString().split('T')[0];
      return inv.date === today;
    } else if (filterType === 'monthly') {
      return d.getMonth() + 1 === parseInt(filterMonth) && d.getFullYear() === parseInt(filterYear);
    } else if (filterType === 'yearly') {
      return d.getFullYear() === parseInt(filterYear);
    } else if (filterType === 'custom') {
      const from = document.getElementById('report-from')?.value;
      const to   = document.getElementById('report-to')?.value;
      if (from && to) return inv.date >= from && inv.date <= to;
      return true;
    }
    return true;
  }

  const sales     = activeSalesInvoices().filter(matchPeriod);
  const purchases = activePurchaseInvoices().filter(matchPeriod);
  const returns   = (db.returns || []).filter(matchPeriod);

  const totalSales     = sales.reduce((s, i) => s + (i.total || 0), 0);
  const totalPurchases = purchases.reduce((s, i) => s + (i.total || 0), 0);
  const totalReturns   = returns.reduce((s, r) => s + (r.total || 0), 0);
  // خسائر التوالف لنفس فترة التقرير المعروضة — تُخصم من صافي الربح.
  const damagesLoss  = (db.damages || []).filter(matchPeriod).reduce((s, d) => s + damageLoss(d), 0);
  const grossProfit  = totalSales - totalPurchases;
  const profit  = grossProfit - damagesLoss;   // صافي الربح = الربح − إجمالي خسائر التوالف
  const margin  = totalSales > 0 ? ((profit / totalSales) * 100).toFixed(1) : 0;
  const avgInv  = sales.length > 0 ? totalSales / sales.length : 0;
  const activeCusts = [...new Set(sales.map(i => i.customerName).filter(Boolean))].length;

  // ── KPI بطاقات رئيسية ──
  document.getElementById('rep-total-sales').textContent     = fmtUSD(totalSales);
  document.getElementById('rep-sales-sub').textContent       = sales.length + ' فاتورة';
  document.getElementById('rep-sales-count').textContent     = fmtOld(usdToOld(totalSales));
  document.getElementById('rep-total-purchases').textContent = fmtUSD(totalPurchases);
  document.getElementById('rep-purchases-sub').textContent   = purchases.length + ' فاتورة';
  document.getElementById('rep-purchases-count').textContent = fmtOld(usdToOld(totalPurchases));
  document.getElementById('rep-profit').textContent          = fmtUSD(profit);
  document.getElementById('rep-margin').textContent          = 'هامش الربح: ' + margin + '%';
  document.getElementById('rep-profit-old').textContent      = fmtOld(usdToOld(profit));
  const dmgLossEl = document.getElementById('rep-damages-loss');
  if (dmgLossEl) dmgLossEl.textContent = damagesLoss > 0
    ? 'ربح إجمالي ' + fmtUSD(grossProfit) + ' − توالف ' + fmtUSD(damagesLoss)
    : '';

  // لون بطاقة الربح
  const profitCard = document.getElementById('rep-profit-card');
  if (profitCard) {
    profitCard.style.background = profit >= 0
      ? 'linear-gradient(135deg,#10b981,#059669)'
      : 'linear-gradient(135deg,#ef4444,#dc2626)';
    profitCard.style.boxShadow = profit >= 0
      ? '0 4px 16px rgba(16,185,129,.3)'
      : '0 4px 16px rgba(239,68,68,.3)';
  }

  // ── بطاقات ثانوية ──
  const retEl = document.getElementById('rep-returns-total');
  const retCnt = document.getElementById('rep-returns-count');
  const avgEl  = document.getElementById('rep-avg-invoice');
  const custEl = document.getElementById('rep-active-customers');
  const salesBadge = document.getElementById('rep-sales-badge');
  const purBadge   = document.getElementById('rep-pur-badge');
  if (retEl)  retEl.textContent  = fmtUSD(totalReturns);
  if (retCnt) retCnt.textContent = returns.length + ' مرتجع';
  if (avgEl)  avgEl.textContent  = fmtUSD(avgInv);
  if (custEl) custEl.textContent = activeCusts;
  if (salesBadge) salesBadge.textContent = sales.length + ' فاتورة';
  if (purBadge)   purBadge.textContent   = purchases.length + ' فاتورة';

  // ── أعلى الزبائن ──
  const custMap = {};
  sales.forEach(inv => {
    const n = inv.customerName || '—';
    custMap[n] = (custMap[n] || 0) + (inv.total || 0);
  });
  const topCusts = Object.entries(custMap).sort((a,b)=>b[1]-a[1]).slice(0,5);
  const topCustsEl = document.getElementById('rep-top-customers');
  if (topCustsEl) {
    if (topCusts.length === 0) {
      topCustsEl.innerHTML = '<div style="padding:20px;text-align:center;color:var(--text-muted);font-size:13px">لا توجد بيانات</div>';
    } else {
      const maxVal = topCusts[0][1];
      topCustsEl.innerHTML = topCusts.map(([name, val], i) => {
        const pct = maxVal > 0 ? Math.round((val/maxVal)*100) : 0;
        const medals = ['🥇','🥈','🥉','4️⃣','5️⃣'];
        return `<div style="padding:10px 16px;border-bottom:1px solid var(--border-subtle);display:flex;align-items:center;gap:12px">
          <span style="font-size:18px">${medals[i]||''}</span>
          <div style="flex:1;min-width:0">
            <div style="font-size:13px;font-weight:600;color:var(--text-primary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${name}</div>
            <div style="background:#e5e7eb;border-radius:999px;height:5px;margin-top:5px;overflow:hidden">
              <div style="background:linear-gradient(90deg,#0ea5e9,#3b82f6);height:5px;width:${pct}%;border-radius:999px"></div>
            </div>
          </div>
          <span style="font-size:13px;font-weight:700;color:#0ea5e9;white-space:nowrap">${fmtUSD(val)}</span>
        </div>`;
      }).join('');
    }
  }

  // ── أعلى المواد مبيعاً ──
  const itemMap = {};
  sales.forEach(inv => {
    (inv.lines||[]).forEach(l => {
      const it = db.items.find(i=>i.id===l.itemId);
      const name = it ? it.name : (l.itemId||'—');
      itemMap[name] = (itemMap[name]||0) + (parseFloat(l.qty)||0);
    });
  });
  const topItems = Object.entries(itemMap).sort((a,b)=>b[1]-a[1]).slice(0,5);
  const topItemsEl = document.getElementById('rep-top-items');
  if (topItemsEl) {
    if (topItems.length === 0) {
      topItemsEl.innerHTML = '<div style="padding:20px;text-align:center;color:var(--text-muted);font-size:13px">لا توجد بيانات</div>';
    } else {
      const maxQty = topItems[0][1];
      topItemsEl.innerHTML = topItems.map(([name, qty], i) => {
        const pct = maxQty > 0 ? Math.round((qty/maxQty)*100) : 0;
        const medals = ['🥇','🥈','🥉','4️⃣','5️⃣'];
        const it = db.items.find(it=>it.name===name);
        const unit = it ? it.unit : '';
        return `<div style="padding:10px 16px;border-bottom:1px solid var(--border-subtle);display:flex;align-items:center;gap:12px">
          <span style="font-size:18px">${medals[i]||''}</span>
          <div style="flex:1;min-width:0">
            <div style="font-size:13px;font-weight:600;color:var(--text-primary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${name}</div>
            <div style="background:#e5e7eb;border-radius:999px;height:5px;margin-top:5px;overflow:hidden">
              <div style="background:linear-gradient(90deg,#8b5cf6,#6d28d9);height:5px;width:${pct}%;border-radius:999px"></div>
            </div>
          </div>
          <span style="font-size:13px;font-weight:700;color:#8b5cf6;white-space:nowrap">${qty} ${unit}</span>
        </div>`;
      }).join('');
    }
  }

  // ── جدول المبيعات ──
  const salesTbody = document.getElementById('rep-sales-tbody');
  if (salesTbody) {
    if (sales.length === 0) {
      salesTbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:24px;color:var(--text-muted)">لا توجد فواتير بيع في هذه الفترة</td></tr>';
    } else {
      salesTbody.innerHTML = sales.map(inv => {
        const payBadge = paymentStatusBadge(inv, 'lg');
        return `<tr onclick="openInvoiceDetail('${inv.number}')" style="cursor:pointer">
          <td><span class="inv-num">${inv.number}</span></td>
          <td style="font-weight:500">${inv.customerName || '—'}</td>
          <td style="color:var(--text-muted)">${inv.date}</td>
          <td style="text-align:center">${inv.discount > 0 ? `<span style="color:#f59e0b;font-weight:600">${inv.discount}%</span>` : '—'}</td>
          <td style="text-align:center">${payBadge}</td>
          <td style="text-align:left"><strong style="color:#0ea5e9">${fmtUSD(inv.total)}</strong></td>
        </tr>`;
      }).join('');
    }
  }

  // ── جدول المشتريات ──
  const purTbody = document.getElementById('rep-purchases-tbody');
  if (purTbody) {
    if (purchases.length === 0) {
      purTbody.innerHTML = '<tr><td colspan="5" style="text-align:center;padding:24px;color:var(--text-muted)">لا توجد فواتير شراء في هذه الفترة</td></tr>';
    } else {
      purTbody.innerHTML = purchases.map(inv => {
        const payBadge = paymentStatusBadge(inv, 'lg');
        return `<tr onclick="openInvoiceDetail('${inv.number}')" style="cursor:pointer">
          <td><span class="inv-num">${inv.number}</span></td>
          <td style="font-weight:500">${inv.supplierName || '—'}</td>
          <td style="color:var(--text-muted)">${inv.date}</td>
          <td style="text-align:center">${payBadge}</td>
          <td style="text-align:left"><strong style="color:#f59e0b">${fmtUSD(inv.total)}</strong></td>
        </tr>`;
      }).join('');
    }
  }

  // ── جدول هامش الربح الحقيقي لكل صنف ──
  const marginRows = computeItemProfitMargins(sales);
  const marginTbody = document.getElementById('rep-margin-tbody');
  const marginTfoot = document.getElementById('rep-margin-tfoot');
  const marginBadge = document.getElementById('rep-margin-badge');
  if (marginBadge) marginBadge.textContent = marginRows.length + ' صنف';
  if (marginTbody) {
    if (marginRows.length === 0) {
      marginTbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:24px;color:var(--text-muted)">لا توجد مبيعات أصناف في هذه الفترة</td></tr>';
    } else {
      marginTbody.innerHTML = marginRows.map(r => {
        const marginColor = r.profit >= 0 ? '#10b981' : '#ef4444';
        return `<tr>
          <td style="font-weight:500">${r.name}</td>
          <td style="text-align:center">${r.qty}${r.unit ? ' ' + r.unit : ''}</td>
          <td style="text-align:left">${fmtUSD(r.revenue)}</td>
          <td style="text-align:left">${fmtUSD(r.cost)}</td>
          <td style="text-align:left"><strong style="color:${marginColor}">${fmtUSD(r.profit)}</strong></td>
          <td style="text-align:center"><strong style="color:${marginColor}">${r.marginPct.toFixed(1)}%</strong></td>
        </tr>`;
      }).join('');
    }
  }
  if (marginTfoot) {
    if (marginRows.length === 0) {
      marginTfoot.innerHTML = '';
    } else {
      const totalQty     = marginRows.reduce((s, r) => s + r.qty, 0);
      const totalRevenue = marginRows.reduce((s, r) => s + r.revenue, 0);
      const totalCost    = marginRows.reduce((s, r) => s + r.cost, 0);
      const totalProfit  = totalRevenue - totalCost;
      const totalMarginPct = totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0;
      const totalColor = totalProfit >= 0 ? '#10b981' : '#ef4444';
      marginTfoot.innerHTML = `<tr style="background:var(--surface-secondary);font-weight:700">
        <td>الإجمالي العام</td>
        <td style="text-align:center">${totalQty}</td>
        <td style="text-align:left">${fmtUSD(totalRevenue)}</td>
        <td style="text-align:left">${fmtUSD(totalCost)}</td>
        <td style="text-align:left;color:${totalColor}">${fmtUSD(totalProfit)}</td>
        <td style="text-align:center;color:${totalColor}">${totalMarginPct.toFixed(1)}%</td>
      </tr>`;
    }
  }


  updateReportTitle(filterType, filterMonth, filterYear);
}

function updateReportTitle(type, month, year) {
  const months = ['','يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];
  let title = 'تقرير ';
  if (type === 'daily') {
    const d = document.getElementById('report-filter-date')?.value || new Date().toISOString().split('T')[0];
    title += 'يومي — ' + d;
  } else if (type === 'monthly') {
    title += 'شهري — ' + (months[parseInt(month)] || '') + ' ' + year;
  } else if (type === 'yearly') {
    title += 'سنوي — ' + year;
  } else {
    const from = document.getElementById('report-from')?.value || '';
    const to = document.getElementById('report-to')?.value || '';
    title += 'مخصص — ' + from + ' إلى ' + to;
  }
  const el = document.getElementById('report-title');
  if (el) el.textContent = title;
}

function onReportFilterChange() {
  const type = document.getElementById('report-filter-type')?.value;
  document.getElementById('report-daily-row').style.display = type === 'daily' ? '' : 'none';
  document.getElementById('report-monthly-row').style.display = type === 'monthly' ? '' : 'none';
  document.getElementById('report-yearly-row').style.display = type === 'yearly' ? '' : 'none';
  document.getElementById('report-custom-row').style.display = type === 'custom' ? '' : 'none';
  renderReports();
}

function printReport() {
  const area = document.getElementById('report-print-area');
  if (!area) return;
  const win = window.open('', '_blank');
  win.document.write(`<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<title>تقرير</title>
<style>
  body { font-family:'Segoe UI',Tahoma,Arial,sans-serif; margin:0; padding:20px; color:#1a1a1a; direction:rtl; }
  h1 { font-size:20px; color:#1F3864; margin-bottom:4px; }
  .sub { font-size:12px; color:#64748b; margin-bottom:20px; }
  .kpi-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; margin-bottom:24px; }
  .kpi { background:#f0f4ff; border-radius:8px; padding:12px; text-align:center; }
  .kpi-label { font-size:11px; color:#64748b; margin-bottom:4px; }
  .kpi-value { font-size:18px; font-weight:700; color:#1F3864; }
  .kpi-sub { font-size:11px; color:#64748b; }
  table { width:100%; border-collapse:collapse; margin-bottom:20px; }
  thead th { background:#1F3864; color:white; padding:8px; font-size:12px; text-align:right; -webkit-print-color-adjust:exact; print-color-adjust:exact; }
  tbody td { padding:7px 8px; border-bottom:1px solid #e2e8f0; font-size:12px; }
  tbody tr:nth-child(even) { background:#f8fafc; }
  h3 { font-size:14px; color:#1F3864; margin:16px 0 8px; }
  .footer { text-align:center; font-size:11px; color:#94a3b8; margin-top:24px; border-top:1px solid #e2e8f0; padding-top:8px; }
  @media print { body { padding:10px; } }
</style>
</head>
<body>
${area.innerHTML}
<div class="footer">تم إنشاء التقرير بواسطة برنامج المحاسبة والمستودعات — ${new Date().toLocaleDateString('ar-SY')}</div>
<script>window.onload=()=>window.print();<\/script>
</body></html>`);
  win.document.close();
}


// ============================================================
// التقرير اليومي الشامل (Daily Comprehensive Report)
// ============================================================

// تكلفة البضاعة المباعة لأسطر فاتورة — نفس منهجية كشف حركة المادة
// (renderItemStatement: totalCost = Σ qty × item.cost). نعيد استخدامها هنا
// بدل إعادة تطبيق منطق كلفة جديد.
function saleLinesCOGS(lines) {
  return (lines || []).reduce((s, l) => {
    const item = db.items.find(it => it.id === l.itemId);
    return s + (parseFloat(l.qty) || 0) * (item?.cost || 0);
  }, 0);
}

// تجميع هامش الربح الحقيقي لكل صنف ضمن مجموعة فواتير بيع (لتقرير هامش الربح الحقيقي).
// لكل سطر بيع: الإيراد = الكمية × سعر البيع الفعلي بالسطر، والتكلفة = الكمية × item.cost (تكلفة آخر شراء).
function computeItemProfitMargins(sales) {
  const map = {};
  (sales || []).forEach(inv => {
    (inv.lines || []).forEach(l => {
      if (!l.itemId) return;
      const item = db.items.find(it => it.id === l.itemId);
      const qty = parseFloat(l.qty) || 0;
      const revenue = qty * (parseFloat(l.price) || 0);
      const cost = qty * (item?.cost || 0);
      if (!map[l.itemId]) {
        map[l.itemId] = { itemId: l.itemId, name: item ? item.name : l.itemId, unit: item ? item.unit : '', qty: 0, revenue: 0, cost: 0 };
      }
      map[l.itemId].qty     += qty;
      map[l.itemId].revenue += revenue;
      map[l.itemId].cost    += cost;
    });
  });
  return Object.values(map)
    .map(r => {
      const profit = r.revenue - r.cost;
      const marginPct = r.revenue > 0 ? (profit / r.revenue) * 100 : 0;
      return { ...r, profit, marginPct };
    })
    .sort((a, b) => b.profit - a.profit);
}


function dailyReportToday() {
  const el = document.getElementById('daily-report-date');
  if (el) el.value = new Date().toISOString().split('T')[0];
  renderDailyReport();
}

function renderDailyReport() {
  const dateInput = document.getElementById('daily-report-date');
  const day = (dateInput && dateInput.value) || new Date().toISOString().split('T')[0];
  if (dateInput && !dateInput.value) dateInput.value = day;

  const setText = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  const fmtTime = (iso) => { try { return new Date(iso).toLocaleTimeString('ar-SY', { hour: '2-digit', minute: '2-digit' }); } catch (e) { return '—'; } };

  // ── فواتير اليوم (النشطة فقط) ──
  const sales     = activeSalesInvoices().filter(i => i.date === day);
  const purchases = activePurchaseInvoices().filter(i => i.date === day);
  const salesTotal     = sales.reduce((s, i) => s + (i.total || 0), 0);
  const purchasesTotal = purchases.reduce((s, i) => s + (i.total || 0), 0);

  // ── المرتجعات ──
  const returns           = (db.returns || []).filter(r => r.date === day);
  const salesReturns      = returns.filter(r => r.type === 'sale');
  const returnsTotal      = returns.reduce((s, r) => s + (r.total || 0), 0);
  const salesReturnsTotal = salesReturns.reduce((s, r) => s + (r.total || 0), 0);

  // ── الدفعات (مقبوضات من الزبائن / مدفوعات للموردين) ──
  const paymentsIn  = (db.customerPayments || []).filter(p => p.date === day);
  const paymentsOut = (db.supplierPayments || []).filter(p => p.date === day);
  const paymentsInTotal  = paymentsIn.reduce((s, p) => s + (parseFloat(p.amount) || 0), 0);
  const paymentsOutTotal = paymentsOut.reduce((s, p) => s + (parseFloat(p.amount) || 0), 0);

  // ── صافي الربح/الخسارة: الإيراد − COGS − المصاريف ──
  // COGS بنفس منطق كشف حركة المادة؛ نخصم أيضاً كلفة المرتجعات المباعة.
  const cogsSales        = sales.reduce((s, inv) => s + saleLinesCOGS(inv.lines), 0);
  const cogsSalesReturns = salesReturns.reduce((s, r) => s + saleLinesCOGS(r.lines), 0);
  const netRevenue = salesTotal - salesReturnsTotal;
  const netCOGS    = cogsSales - cogsSalesReturns;
  const expenses   = 0; // لا يوجد باب مصاريف مستقل في البرنامج حالياً
  const netProfit  = netRevenue - netCOGS - expenses;

  // ── بطاقات KPI ──
  setText('daily-sales-total', fmtUSD(salesTotal));
  setText('daily-sales-count', sales.length + ' فاتورة');
  setText('daily-purchases-total', fmtUSD(purchasesTotal));
  setText('daily-purchases-count', purchases.length + ' فاتورة');
  setText('daily-payments-in', fmtUSD(paymentsInTotal));
  setText('daily-payments-in-count', paymentsIn.length + ' دفعة');
  setText('daily-payments-out', fmtUSD(paymentsOutTotal));
  setText('daily-payments-out-count', paymentsOut.length + ' دفعة');
  setText('daily-returns-total', fmtUSD(returnsTotal));
  setText('daily-returns-count', returns.length + ' مرتجع');

  setText('daily-net-profit', fmtUSD(netProfit));
  setText('daily-net-profit-old', fmtOld(usdToOld(netProfit)));
  const profitCard = document.getElementById('daily-profit-card');
  if (profitCard) {
    profitCard.style.background = netProfit >= 0
      ? 'linear-gradient(135deg,#10b981,#059669)'
      : 'linear-gradient(135deg,#ef4444,#dc2626)';
    profitCard.style.boxShadow = netProfit >= 0
      ? '0 4px 16px rgba(16,185,129,.3)'
      : '0 4px 16px rgba(239,68,68,.3)';
  }

  // ── تفصيل الربح/الخسارة ──
  setText('daily-pl-revenue', fmtUSD(netRevenue));
  setText('daily-pl-cogs', '− ' + fmtUSD(netCOGS));
  setText('daily-pl-expenses', '− ' + fmtUSD(expenses));
  setText('daily-pl-expenses-note', '(غير مسجّلة في البرنامج)');
  const netEl = document.getElementById('daily-pl-net');
  if (netEl) { netEl.textContent = fmtUSD(netProfit); netEl.style.color = netProfit >= 0 ? '#16a34a' : '#dc2626'; }

  // ── جدول فواتير البيع ──
  const salesTbody = document.getElementById('daily-sales-tbody');
  if (salesTbody) {
    salesTbody.innerHTML = sales.length === 0
      ? '<tr><td colspan="4" style="text-align:center;padding:20px;color:var(--text-muted)">لا توجد فواتير بيع في هذا اليوم</td></tr>'
      : sales.map(inv => `<tr onclick="openInvoiceDetail('${inv.number}')" style="cursor:pointer">
          <td><span class="inv-num">${inv.number}</span></td>
          <td style="font-weight:500">${inv.customerName || '—'}</td>
          <td style="text-align:center">${paymentStatusBadge(inv, 'lg')}</td>
          <td style="text-align:left"><strong style="color:#0ea5e9">${fmtUSD(inv.total)}</strong></td>
        </tr>`).join('');
  }

  // ── جدول فواتير الشراء ──
  const purTbody = document.getElementById('daily-purchases-tbody');
  if (purTbody) {
    purTbody.innerHTML = purchases.length === 0
      ? '<tr><td colspan="4" style="text-align:center;padding:20px;color:var(--text-muted)">لا توجد فواتير شراء في هذا اليوم</td></tr>'
      : purchases.map(inv => `<tr onclick="openInvoiceDetail('${inv.number}')" style="cursor:pointer">
          <td><span class="inv-num">${inv.number}</span></td>
          <td style="font-weight:500">${inv.supplierName || '—'}</td>
          <td style="text-align:center">${paymentStatusBadge(inv, 'lg')}</td>
          <td style="text-align:left"><strong style="color:#f59e0b">${fmtUSD(inv.total)}</strong></td>
        </tr>`).join('');
  }

  // ── جدول المقبوضات ──
  const inTbody = document.getElementById('daily-payments-in-tbody');
  if (inTbody) {
    inTbody.innerHTML = paymentsIn.length === 0
      ? '<tr><td colspan="3" style="text-align:center;padding:20px;color:var(--text-muted)">لا توجد مقبوضات في هذا اليوم</td></tr>'
      : paymentsIn.map(p => `<tr>
          <td style="font-weight:500">${p.customerName || '—'}</td>
          <td style="color:var(--text-muted)">${p.linkedInvoice || '—'}</td>
          <td style="text-align:left"><strong style="color:#16a34a">${fmtUSD(parseFloat(p.amount) || 0)}</strong></td>
        </tr>`).join('');
  }

  // ── جدول المدفوعات ──
  const outTbody = document.getElementById('daily-payments-out-tbody');
  if (outTbody) {
    outTbody.innerHTML = paymentsOut.length === 0
      ? '<tr><td colspan="3" style="text-align:center;padding:20px;color:var(--text-muted)">لا توجد مدفوعات في هذا اليوم</td></tr>'
      : paymentsOut.map(p => `<tr>
          <td style="font-weight:500">${p.supplierName || '—'}</td>
          <td style="color:var(--text-muted)">${p.linkedInvoice || '—'}</td>
          <td style="text-align:left"><strong style="color:#dc2626">${fmtUSD(parseFloat(p.amount) || 0)}</strong></td>
        </tr>`).join('');
  }

  // ── التغييرات: مرتجعات + حذف فواتير في هذا اليوم ──
  const deletedSales     = (db.salesInvoices || []).filter(i => i.deletedAt && String(i.deletedAt).split('T')[0] === day);
  const deletedPurchases = (db.purchaseInvoices || []).filter(i => i.deletedAt && String(i.deletedAt).split('T')[0] === day);

  const changeRows = [];
  returns.forEach(r => changeRows.push({
    kind: r.type === 'sale' ? '🔄 مرتجع بيع' : '🔄 مرتجع شراء',
    ref: r.number || '—', party: r.party || '—', time: '—', color: '#8b5cf6', value: r.total || 0
  }));
  deletedSales.forEach(inv => changeRows.push({
    kind: '🗑️ حذف فاتورة بيع', ref: inv.number, party: inv.customerName || '—',
    time: fmtTime(inv.deletedAt), color: '#dc2626', value: inv.total || 0
  }));
  deletedPurchases.forEach(inv => changeRows.push({
    kind: '🗑️ حذف فاتورة شراء', ref: inv.number, party: inv.supplierName || '—',
    time: fmtTime(inv.deletedAt), color: '#dc2626', value: inv.total || 0
  }));

  const changesTbody = document.getElementById('daily-changes-tbody');
  if (changesTbody) {
    changesTbody.innerHTML = changeRows.length === 0
      ? '<tr><td colspan="5" style="text-align:center;padding:20px;color:var(--text-muted)">لا توجد تغييرات مسجّلة في هذا اليوم</td></tr>'
      : changeRows.map(c => `<tr>
          <td style="font-weight:600;color:${c.color}">${c.kind}</td>
          <td><span class="inv-num">${c.ref}</span></td>
          <td>${c.party}</td>
          <td style="color:var(--text-muted)">${c.time}</td>
          <td style="text-align:left"><strong>${fmtUSD(c.value)}</strong></td>
        </tr>`).join('');
  }
  setText('daily-changes-note', 'ملاحظة: يعرض هذا القسم المرتجعات وحذف الفواتير في هذا اليوم. تعديلات الفواتير لا تُسجَّل في قاعدة البيانات الحالية (لا يوجد سجل تدقيق) لذلك لا يمكن عرضها.');

  setText('daily-report-title', 'تقرير يوم — ' + day);
}

// طباعة التقرير اليومي — نفس آلية printReport (نافذة جديدة + نفس ستايل الطباعة)
function printDailyReport() {
  const area = document.getElementById('daily-print-area');
  if (!area) return;
  const win = window.open('', '_blank');
  win.document.write(`<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<title>التقرير اليومي الشامل</title>
<style>
  body { font-family:'Segoe UI',Tahoma,Arial,sans-serif; margin:0; padding:20px; color:#1a1a1a; direction:rtl; }
  h1 { font-size:20px; color:#1F3864; margin-bottom:4px; }
  .sub { font-size:12px; color:#64748b; margin-bottom:20px; }
  .kpi-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; margin-bottom:24px; }
  .kpi { background:#f0f4ff; border-radius:8px; padding:12px; text-align:center; }
  .kpi-label { font-size:11px; color:#64748b; margin-bottom:4px; }
  .kpi-value { font-size:18px; font-weight:700; color:#1F3864; }
  .kpi-sub { font-size:11px; color:#64748b; }
  table { width:100%; border-collapse:collapse; margin-bottom:20px; }
  thead th { background:#1F3864; color:white; padding:8px; font-size:12px; text-align:right; -webkit-print-color-adjust:exact; print-color-adjust:exact; }
  tbody td { padding:7px 8px; border-bottom:1px solid #e2e8f0; font-size:12px; }
  tbody tr:nth-child(even) { background:#f8fafc; }
  h3 { font-size:14px; color:#1F3864; margin:16px 0 8px; }
  .footer { text-align:center; font-size:11px; color:#94a3b8; margin-top:24px; border-top:1px solid #e2e8f0; padding-top:8px; }
  @media print { body { padding:10px; } }
</style>
</head>
<body>
${area.innerHTML}
<div class="footer">تم إنشاء التقرير بواسطة برنامج المحاسبة والمستودعات — ${new Date().toLocaleDateString('ar-SY')}</div>
<script>window.onload=()=>window.print();<\/script>
</body></html>`);
  win.document.close();
}


// ============================================================
// حساب الزبون — دين / دفع / باقي
// ============================================================

// ============================================================
// المصدر الوحيد لحالة السداد — يُحسب دائماً من سجلات الدفع الفعلية
// لا نثق أبداً بـ paymentType/paidAmount المجمّدة وقت الإنشاء
// ============================================================

// سجل الوديعة التلقائي المُنشأ مع الفاتورة مضمّن أصلاً في paidAmount،
// لذلك نستثنيه عند جمع الدفعات حتى لا تُحتسب الوديعة مرتين.
function isAutoDepositRecord(p) {
  return !!p && (p._deposit === true || /^دفعة مع الفاتورة /.test(p.description || ''));
}

// ============================================================
// رصيد إضافي (Credit balance) — دوال نقية تعكس نفس منطق db.js
// (renderer لا يستطيع require('./db')، لذا نكرر المنطق النقي هنا)
// ============================================================
const CREDIT_EPSILON = 0.005;

function roundMoney(n) {
  return Math.round((Number(n) || 0) * 100) / 100;
}

// دفعة تتجاوز إجمالي المطلوب → يُطبَّق المطلوب على الفواتير ويتحول الفائض إلى رصيد إضافي
function computeOverpayment(paymentAmount, outstanding) {
  const pay = Math.max(0, roundMoney(paymentAmount));
  const due = Math.max(0, roundMoney(outstanding));
  const appliedToInvoices = Math.min(pay, due);
  const creditAdded = roundMoney(pay - appliedToInvoices);
  return { appliedToInvoices: roundMoney(appliedToInvoices), creditAdded,
           isOverpayment: creditAdded > CREDIT_EPSILON };
}

// فاتورة جديدة لطرف لديه رصيد إضافي → يُخصَم من الرصيد أولاً قبل حساب المتبقي
function applyCreditToInvoice(creditBalance, invoiceTotal, alreadyPaid = 0) {
  const credit = Math.max(0, roundMoney(creditBalance));
  const due    = Math.max(0, roundMoney(roundMoney(invoiceTotal) - roundMoney(alreadyPaid)));
  const creditApplied = Math.min(credit, due);
  return { creditApplied: roundMoney(creditApplied),
           remainingCredit: roundMoney(credit - creditApplied),
           amountDue: roundMoney(due - creditApplied) };
}

// مردود المبيع — دوال نقية (مطابقة لـ db.js). الريندرر لا يستطيع require.
// أقصى كمية قابلة للإرجاع = المباع − المُرجع سابقاً لنفس البند.
function computeReturnableQty(soldQty, priorReturnedQty) {
  return roundMoney(Math.max(0, (Number(soldQty) || 0) - (Number(priorReturnedQty) || 0)));
}

// تحقق من كمية إرجاع مطلوبة — تُرفض إذا كانت صفراً أو تتجاوز المتاح.
function validateReturnQty(requestedQty, soldQty, priorReturnedQty) {
  const returnable = computeReturnableQty(soldQty, priorReturnedQty);
  const q = Number(requestedQty) || 0;
  if (q <= 0) return { ok: false, reason: 'zero', returnable };
  if (roundMoney(q) > roundMoney(returnable) + CREDIT_EPSILON) return { ok: false, reason: 'exceeds', returnable };
  return { ok: true, returnable };
}

// أثر المردود على الحساب: يُسدّد الدين المتبقي أولاً، والفائض يذهب لرصيد إضافي.
function computeSalesReturnEffect(invoiceRemaining, returnValue) {
  const rem = Math.max(0, roundMoney(invoiceRemaining));
  const val = Math.max(0, roundMoney(returnValue));
  const debtReduction = roundMoney(Math.min(val, rem));
  const creditAdded   = roundMoney(val - debtReduction);
  return { debtReduction, creditAdded };
}

// أثر مردود الشراء على حساب المورد — نفس منطق مردود المبيع بالاتجاه المعاكس
// (فاتورة شراء مسدّدة ← رصيد إضافي مستحق لنا من المورد، آجلة ← خصم من ديننا له).
const computePurchaseReturnEffect = computeSalesReturnEffect;

// ============================================================
// سجل حركة الرصيد الإضافي — المسار الموحّد (مطابق لـ db.js)
// كل المسارات الثلاثة (فاتورة / دفعة كشف / إيصال) تعدّل الرصيد الإضافي
// من هنا فقط — لا تعدّل party.creditBalance مباشرة في أي مكان.
// key يمنع تطبيق نفس العملية مرتين (إعادة حفظ/تطبيق).
// ============================================================
function creditLedger() {
  if (!db.creditLedger) db.creditLedger = [];
  return db.creditLedger;
}

function findPartyByName(partyType, name) {
  const arr = partyType === 'supplier' ? (db.suppliers || []) : (db.customers || []);
  return arr.find(p => p.name === name) || null;
}

// delta موجب = إضافة رصيد، سالب = خصم رصيد. يُعيد الحركة أو null.
function applyCreditMovement({ partyType, partyName, delta, refType, ref, date, key }) {
  const amount = roundMoney(delta);
  if (Math.abs(amount) <= CREDIT_EPSILON) return null;
  const ledger = creditLedger();
  if (key && ledger.some(m => m.key === key)) return null; // منع الازدواجية
  const party = findPartyByName(partyType, partyName);
  if (party) party.creditBalance = roundMoney((party.creditBalance || 0) + amount);
  const mv = {
    id: 'CM-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 7),
    partyType, partyName, amount,
    type: amount > 0 ? 'add' : 'deduct',
    refType: refType || '', ref: ref || '',
    date: date || todayStr(),
    key: key || ''
  };
  ledger.push(mv);
  return mv;
}

// عكس كل حركات مرجع معيّن لطرف محدّد (عند حذف/إلغاء دفعة أو فاتورة).
function reverseCreditMovements({ partyType, partyName, refType, ref }) {
  const ledger = creditLedger();
  let reversed = 0;
  const kept = [];
  for (const m of ledger) {
    const match = m.partyType === partyType && m.partyName === partyName &&
                  m.ref === ref && (!refType || m.refType === refType);
    if (match) {
      const party = findPartyByName(partyType, partyName);
      if (party) party.creditBalance = roundMoney((party.creditBalance || 0) - m.amount);
      reversed++;
      continue;
    }
    kept.push(m);
  }
  db.creditLedger = kept;
  return reversed;
}

// كل حركات طرف معيّن — مرتّبة زمنياً (للعرض في كشف الحساب).
function creditMovementsFor(partyType, name) {
  return creditLedger()
    .filter(m => m.partyType === partyType && m.partyName === name)
    .slice()
    .sort((a, b) => (new Date(a.date) - new Date(b.date)) || String(a.id).localeCompare(String(b.id)));
}

// معرّف ثابت لدفعة — يربط قيد السجل بالدفعة حتى عند الحذف/التعديل.
function newPaymentId() {
  return 'PID-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 7);
}

// عرض سجل حركة الرصيد الإضافي في كشف الحساب (مسار العرض الموحّد للزبون والمورد).
function renderCreditHistory(partyType, name, historyElId, tbodyElId) {
  const historyEl = document.getElementById(historyElId);
  const tbody = document.getElementById(tbodyElId);
  if (!historyEl || !tbody) return;
  const moves = creditMovementsFor(partyType, name);
  if (!moves.length) { historyEl.style.display = 'none'; tbody.innerHTML = ''; return; }
  const refLabel = { invoice: 'فاتورة', payment: 'دفعة', receipt: 'إيصال' };
  historyEl.style.display = 'block';
  tbody.innerHTML = moves.map(m => {
    const isAdd = m.amount > 0;
    const typeTxt = isAdd ? '➕ إضافة' : '➖ خصم';
    const color = isAdd ? 'var(--green-700)' : 'var(--red-600)';
    const ref = (refLabel[m.refType] ? refLabel[m.refType] + ' ' : '') + (m.ref || '—');
    return '<tr>' +
      '<td>' + (m.date || '—') + '</td>' +
      '<td style="color:' + color + ';font-weight:600">' + typeTxt + '</td>' +
      '<td style="color:' + color + ';font-weight:700">' + (isAdd ? '+' : '−') + fmtUSD(Math.abs(m.amount)) + '</td>' +
      '<td>' + ref + '</td>' +
      '</tr>';
  }).join('');
}

// كل دفعات زبون (بيع) أو مورد (شراء)
function paymentsForParty(name, isSale) {
  const arr = isSale ? (db.customerPayments || []) : (db.supplierPayments || []);
  const key = isSale ? 'customerName' : 'supplierName';
  return arr.filter(p => p[key] === name);
}

// الرصيد الحي لأي فاتورة:
// المدفوع = الوديعة عند الإنشاء + الدفعات اللاحقة المربوطة بها
function invoiceBalance(inv) {
  const total = inv.total || 0;
  // الفاتورة النقدية مسدّدة بالكامل بطبيعتها
  if ((inv.paymentType || 'cash') !== 'deferred') {
    return { total, paid: total, remaining: 0, status: 'paid', closed: true, isDeferred: false };
  }
  const isSale  = !inv.supplierName;              // فواتير الشراء وحدها تحمل اسم مورد
  const name    = isSale ? inv.customerName : inv.supplierName;
  const deposit = parseFloat(inv.paidAmount) || 0;
  const later = paymentsForParty(name, isSale)
    .filter(p => p.linkedInvoice === inv.number && !isAutoDepositRecord(p))
    // نستثني creditAdded: الفائض ذهب لرصيد إضافي وليس سداداً للفاتورة
    .reduce((s, p) => s + (parseFloat(p.amount) || 0) - (parseFloat(p.creditAdded) || 0) + (parseFloat(p.discountOnPayment) || 0), 0);
  // المردود المربوط بهذه الفاتورة يُسوّي جزءاً من دينها (debtReduction فقط):
  //  • فاتورة بيع ← مردود مبيع (type='sale') يخفّض دين الزبون.
  //  • فاتورة شراء ← مردود شراء (type='purchase') يخفّض ديننا للمورد.
  const returned = (db.returns || [])
    .filter(r => r.type === (isSale ? 'sale' : 'purchase') && r.refInvoice === inv.number)
    .reduce((s, r) => s + (parseFloat(r.debtReduction) || 0), 0);
  const paid = deposit + later + returned;
  const remaining = Math.max(0, total - paid);
  const closed = remaining <= 0.005;
  return { total, paid, remaining, closed,
           status: closed ? 'paid' : (paid > 0.005 ? 'partial' : 'unpaid'),
           isDeferred: true };
}

// شارة حالة السداد (محسوبة حياً) — size: 'sm' للقوائم، 'lg' للتقارير
function paymentStatusBadge(inv, size) {
  const b  = invoiceBalance(inv);
  const lg = size === 'lg';
  const st = lg
    ? 'padding:2px 8px;border-radius:999px;font-size:11px;font-weight:600'
    : 'font-size:10px;padding:1px 6px;border-radius:10px;margin-right:4px';
  let bg, fg, txt;
  if (!b.isDeferred)               { bg='#d1fae5'; fg='#065f46'; txt = lg ? 'نقداً'       : '💵 نقدي'; }
  else if (b.closed)               { bg='#dcfce7'; fg='#15803d'; txt = lg ? 'مسدّدة'      : '✅ مسدّدة'; }
  else if (b.status === 'partial') { bg='#fef9c3'; fg='#854d0e'; txt = lg ? 'آجل (جزئي)' : '⏳ جزئي'; }
  else                             { bg='#fef3c7'; fg='#92400e'; txt = lg ? 'آجل'         : '⏳ آجل'; }
  return `<span style="background:${bg};color:${fg};${st}">${txt}</span>`;
}

// شارة ربط الدفعة بفاتورة — توضّح للمستخدم الدفعة اليتيمة كبند مستقل (دون توزيع).
function paymentLinkBadge(p) {
  if (p && p.linkedInvoice) {
    return '<span style="font-size:10px;background:#dcfce7;color:#15803d;padding:1px 6px;border-radius:8px;margin-right:4px">🔗 ' + p.linkedInvoice + '</span>';
  }
  return '<span style="font-size:10px;background:#fef3c7;color:#92400e;padding:1px 6px;border-radius:8px;margin-right:4px">⚠️ دفعة غير مرتبطة</span>';
}

function getCustomerAccount(customerName) {
  const invoices = activeSalesInvoices().filter(i => i.customerName === customerName);
  const cashInvoices     = invoices.filter(i => (i.paymentType||'cash') === 'cash');
  const deferredInvoices = invoices.filter(i => (i.paymentType||'cash') === 'deferred');

  const totalCash     = cashInvoices.reduce((s,i) => s + (i.total||0), 0);
  const totalInvoices = invoices.reduce((s,i) => s + (i.total||0), 0);
  const totalDeferred = deferredInvoices.reduce((s,i) => s + (i.total||0), 0);

  const payments = (db.customerPayments || []).filter(p => p.customerName === customerName);
  // سجلات الوديعة التلقائية مضمّنة في paidAmount — نستثنيها لتفادي الاحتساب المزدوج
  const realPayments = payments.filter(p => !isAutoDepositRecord(p));

  const paidOnDeferred     = deferredInvoices.reduce((s,i) => s + (parseFloat(i.paidAmount)||0), 0);
  const linkedPayments     = realPayments.filter(p =>  p.linkedInvoice);
  const standalonePayments = realPayments.filter(p => !p.linkedInvoice);
  // نستثني creditAdded — الفائض ذهب لرصيد إضافي وليس سداداً على الفواتير
  const totalLinked     = roundMoney(linkedPayments.reduce((s,p) => s + (parseFloat(p.amount)||0) - (parseFloat(p.creditAdded)||0) + (parseFloat(p.discountOnPayment)||0), 0));
  const totalStandalone = roundMoney(standalonePayments.reduce((s,p) => s + (parseFloat(p.amount)||0) - (parseFloat(p.creditAdded)||0) + (parseFloat(p.discountOnPayment)||0), 0));
  const totalPayments   = roundMoney(totalLinked + totalStandalone);

  // الإجمالي العام = مجموع سطور الفواتير حرفياً (المصدر الوحيد invoiceBalance لكل فاتورة).
  // لا نطرح الدفعات اليتيمة ضمنياً؛ تبقى بنداً مستقلاً ظاهراً للمستخدم (لا توزيع خفي).
  const remaining = roundMoney(deferredInvoices.reduce((s,i) => s + invoiceBalance(i).remaining, 0));
  const totalPaid = roundMoney(totalInvoices - remaining);

  const cust = (db.customers || []).find(c => c.name === customerName);
  const creditBalance = cust ? (parseFloat(cust.creditBalance) || 0) : 0;

  // مردودات المبيع للزبون — بند مستقل ظاهر في كشف الحساب (دينها المُسوّى محتسب داخل invoiceBalance).
  const returns = (db.returns || [])
    .filter(r => (r.type || 'sale') === 'sale' && r.party === customerName)
    .slice()
    .sort((a, b) => (new Date(a.date) - new Date(b.date)) || String(a.number).localeCompare(String(b.number)));
  const totalReturns      = roundMoney(returns.reduce((s, r) => s + (r.total || 0), 0));
  const totalReturnDebt   = roundMoney(returns.reduce((s, r) => s + (parseFloat(r.debtReduction) || 0), 0));
  const totalReturnCredit = roundMoney(returns.reduce((s, r) => s + (parseFloat(r.creditAdded)   || 0), 0));

  return { invoices, cashInvoices, deferredInvoices, payments,
           totalInvoices, totalCash, totalDeferred,
           paidOnDeferred, standalonePayments, totalStandalone, totalLinked, totalPayments,
           totalPaid, remaining, creditBalance,
           returns, totalReturns, totalReturnDebt, totalReturnCredit };
}

function openCustomerAccount(customerName) {
  const acc = getCustomerAccount(customerName);
  const modal = document.getElementById('customer-account-modal');
  if (!modal) return;

  document.getElementById('ca-name').textContent = customerName;
  document.getElementById('ca-total-invoices').textContent = fmtUSD(acc.totalInvoices);
  document.getElementById('ca-total-paid').textContent = fmtUSD(acc.totalPaid);
  const remEl = document.getElementById('ca-remaining');
  remEl.textContent = fmtUSD(acc.remaining);
  remEl.style.color = acc.remaining > 0 ? 'var(--red-600)' : 'var(--green-700)';
  document.getElementById('ca-remaining-old').textContent = fmtOld(usdToOld(acc.remaining));

  // رصيد إضافي للزبون (فائض الدفعات فوق كل الفواتير) — يظهر فقط عند وجوده
  const creditRow = document.getElementById('ca-credit-row');
  if (creditRow) {
    if (acc.creditBalance > CREDIT_EPSILON) {
      creditRow.style.display = 'block';
      document.getElementById('ca-credit-balance').textContent = fmtUSD(acc.creditBalance);
    } else {
      creditRow.style.display = 'none';
    }
  }
  // دفعات غير مرتبطة (يتيمة) — بند مستقل ظاهر؛ لا يُوزّع على الفواتير
  const standaloneRow = document.getElementById('ca-standalone-row');
  if (standaloneRow) {
    if ((acc.totalStandalone || 0) > CREDIT_EPSILON) {
      standaloneRow.style.display = 'block';
      document.getElementById('ca-standalone-amount').textContent = fmtUSD(acc.totalStandalone);
    } else {
      standaloneRow.style.display = 'none';
    }
  }
  renderCreditHistory('customer', customerName, 'ca-credit-history', 'ca-credit-tbody');

  // مردودات المبيع — بند مستقل واضح في كشف الحساب
  const returnsSection = document.getElementById('ca-returns-section');
  const returnsTbody   = document.getElementById('ca-returns-tbody');
  if (returnsSection && returnsTbody) {
    if ((acc.returns || []).length) {
      returnsSection.style.display = 'block';
      returnsTbody.innerHTML = acc.returns.map(r => {
        const parts = [];
        if ((parseFloat(r.debtReduction) || 0) > CREDIT_EPSILON) parts.push('خصم من الدين ' + fmtUSD(r.debtReduction));
        if ((parseFloat(r.creditAdded)   || 0) > CREDIT_EPSILON) parts.push('رصيد إضافي ' + fmtUSD(r.creditAdded));
        const effect = parts.length ? parts.join(' + ') : '—';
        return '<tr onclick="printReturnInvoice(\'' + r.number + '\')" style="cursor:pointer" title="اضغط للطباعة">' +
          '<td><span class="inv-num">' + r.number + '</span></td>' +
          '<td>' + (r.date || '—') + '</td>' +
          '<td>' + (r.refInvoice ? '🔗 ' + r.refInvoice : '—') + '</td>' +
          '<td style="color:var(--red-600);font-weight:700">−' + fmtUSD(r.total) + '</td>' +
          '<td style="font-size:11px;color:var(--text-muted)">' + effect + '</td>' +
        '</tr>';
      }).join('');
    } else {
      returnsSection.style.display = 'none';
      returnsTbody.innerHTML = '';
    }
  }

  // جدول الفواتير — مع تمييز نقدي/آجل
  const invTbody = document.getElementById('ca-invoices-tbody');
  invTbody.innerHTML = acc.invoices.length === 0
    ? '<tr><td colspan="5" style="text-align:center;padding:12px;color:var(--text-muted)">لا توجد فواتير</td></tr>'
    : acc.invoices.map(inv => {
        const b   = invoiceBalance(inv);      // المتبقي والحالة محسوبان حياً
        const isDeferred = b.isDeferred;
        const rem  = b.remaining;
        const tag  = paymentStatusBadge(inv);
        const creditNote = inv.creditApplied > 0
          ? '<br><span style="font-size:10px;color:#16a34a;font-weight:700">💳 خُصم ' + fmtUSD(inv.creditApplied) + ' من الرصيد الإضافي</span>'
          : '';
        return '<tr onclick="openInvoiceDetail(\'' + inv.number + '\')" style="cursor:pointer">' +
          '<td><span class="inv-num">' + inv.number + '</span></td>' +
          '<td>' + inv.date + '</td>' +
          '<td>' + tag + creditNote + '</td>' +
          '<td><strong>' + fmtUSD(inv.total) + '</strong></td>' +
          '<td style="color:' + (rem>0?'#dc2626':'#16a34a') + ';font-weight:700">' + (isDeferred ? fmtUSD(rem) : '—') + '</td>' +
          '</tr>';
      }).join('');

  // جدول الدفعات
  const payTbody = document.getElementById('ca-payments-tbody');
  payTbody.innerHTML = acc.payments.length === 0
    ? '<tr><td colspan="3" style="text-align:center;padding:12px;color:var(--text-muted)">لا توجد دفعات مسجلة</td></tr>'
    : acc.payments.map((p, i) =>
        '<tr>' +
        '<td>' + p.date + '</td>' +
        '<td>' + (p.note || '—') + ' ' + paymentLinkBadge(p) + '</td>' +
        '<td style="color:var(--green-700)"><strong>' + fmtUSD(p.amount) + '</strong></td>' +
        '<td><button class="btn btn-ghost btn-sm" onclick="deleteCustomerPayment(\'' + customerName + '\',' + i + ')" style="color:var(--red-600)">✕</button></td>' +
        '</tr>'
      ).join('');

  // حقل إضافة دفعة
  document.getElementById('ca-payment-name').value = customerName;
  document.getElementById('ca-payment-amount').value = '';
  document.getElementById('ca-payment-note').value = '';
  document.getElementById('ca-payment-date').value = new Date().toISOString().split('T')[0];

  modal.classList.remove('hidden');
  modal.style.display = 'flex';
}

function addCustomerPayment() {
  const customerName = document.getElementById('ca-payment-name').value;
  const amount = parseFloat(document.getElementById('ca-payment-amount').value) || 0;
  const note = document.getElementById('ca-payment-note').value.trim();
  const date = document.getElementById('ca-payment-date').value;

  if (!amount || amount <= 0) { showToast('أدخل مبلغ صحيح', 'error'); return; }
  if (!db.customerPayments) db.customerPayments = [];

  // رصيد إضافي: إن تجاوز المبلغ إجمالي المطلوب على كل الفواتير المفتوحة
  // — يطبَّق المطلوب على الفواتير ويتحول الفائض إلى creditBalance (نفس منطق saveReceiptCustomer)
  const outstanding = getCustomerAccount(customerName).remaining;
  const over = computeOverpayment(amount, outstanding);
  let creditAdded = 0;
  if (over.isOverpayment) {
    creditAdded = over.creditAdded;
    const ok = confirm('المبلغ يتجاوز المطلوب بمقدار ' + fmtUSD(creditAdded) +
      ' — هل تريد حفظ الفرق كرصيد إضافي للعميل؟');
    if (!ok) return; // إيقاف الحفظ
  }

  // ربط تلقائي بأقدم فاتورة آجلة مفتوحة حتى يعكس رصيد الفاتورة كل الدفعات
  let linkedInvoice = '';
  const open = getDeferredInvoicesForCustomer(customerName)
    .slice()
    .sort((a, b) => (new Date(a.date) - new Date(b.date)) || String(a.number).localeCompare(String(b.number)));
  if (open.length) linkedInvoice = open[0].number;

  const pid = newPaymentId(); // معرّف ثابت — يربط قيد السجل بالدفعة
  db.customerPayments.push({
    pid, customerName, amount, note, date,
    creditAdded, // فائض محوّل لرصيد إضافي — يُستثنى من قوة السداد على الفواتير
    linkedInvoice,
    description: creditAdded > CREDIT_EPSILON
      ? 'دفعة زائدة — منها ' + fmtUSD(creditAdded) + ' رصيد إضافي'
      : (linkedInvoice ? 'سداد فاتورة ' + linkedInvoice : '')
  });

  // تحديث رصيد الزبون — الجزء المطبَّق على الفواتير فقط (نستثني الفائض)
  const cust = (db.customers || []).find(c => c.name === customerName);
  if (cust) {
    const appliedCash = amount - creditAdded;
    cust.balance = Math.max(0, (cust.balance || 0) - appliedCash);
  }
  // الفائض يُضاف للرصيد الإضافي عبر السجل الموحّد (مربوط بالدفعة)
  if (creditAdded > CREDIT_EPSILON) {
    applyCreditMovement({ partyType:'customer', partyName:customerName, delta:creditAdded,
      refType:'payment', ref:pid, date, key:'payment-add:'+pid });
  }

  // الفاتورة المربوطة — حدّث حالتها المجمّدة (المصدر الحي هو invoiceBalance)
  if (linkedInvoice) {
    const inv = (db.salesInvoices || []).find(i => i.number === linkedInvoice);
    if (inv) inv.paymentStatus = invoiceBalance(inv).closed ? 'paid' : 'partial';
  }

  saveData(db);
  if (creditAdded > CREDIT_EPSILON) {
    showToast('💰 تم تسجيل الدفعة — منها ' + fmtUSD(creditAdded) + ' رصيد إضافي (الرصيد الآن ' + fmtUSD(cust ? cust.creditBalance : creditAdded) + ')', 'success');
  } else {
    showToast('✅ تم تسجيل الدفعة: ' + fmtUSD(amount), 'success');
  }
  openCustomerAccount(customerName);
}

function deleteCustomerPayment(customerName, index) {
  if (!confirm('هل تريد حذف هذه الدفعة؟')) return;
  const allPayments = db.customerPayments || [];
  // find actual index in full array
  let removed = null;
  let count = 0;
  for (let i = 0; i < allPayments.length; i++) {
    if (allPayments[i].customerName === customerName) {
      if (count === index) { removed = allPayments.splice(i, 1)[0]; break; }
      count++;
    }
  }
  db.customerPayments = allPayments;
  if (removed) {
    // عكس أثر الدفعة بالكامل — منع بقاء الخصم/الإضافة بعد الحذف (ازدواجية)
    reverseCreditMovements({ partyType:'customer', partyName:customerName,
      ref: removed.pid || removed.receiptNum || '' });
    const cust = (db.customers || []).find(c => c.name === customerName);
    if (cust) {
      const appliedCash = (parseFloat(removed.amount) || 0) - (parseFloat(removed.creditAdded) || 0);
      cust.balance = roundMoney((cust.balance || 0) + appliedCash + (parseFloat(removed.discountOnPayment) || 0));
    }
    logAudit(AUDIT_TYPES.PAYMENT_DELETE,
      `حذف دفعة قبض من الزبون ${customerName} بقيمة ${fmtUSD(removed.amount || 0)}` +
      `${removed.date ? ' بتاريخ ' + removed.date : ''}` +
      `${removed.receiptNum ? ' (إيصال ' + removed.receiptNum + ')' : ''}`);
  }
  saveData(db);
  showToast('🗑️ تم حذف الدفعة', 'success');
  openCustomerAccount(customerName);
}

function closeCustomerAccount() {
  const modal = document.getElementById('customer-account-modal');
  if (modal) { modal.classList.add('hidden'); modal.style.display = 'none'; }
}

function printCustomerAccount() {
  const name = document.getElementById('ca-name').textContent;
  const acc = getCustomerAccount(name);
  const win = window.open('', '_blank');
  win.document.write(`<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head><meta charset="UTF-8"><title>حساب ${name}</title>
<style>
  body{font-family:'Segoe UI',Tahoma,Arial,sans-serif;margin:0;padding:20px;color:#1a1a1a;direction:rtl;}
  .header{background:#1F3864;color:white;padding:16px 20px;border-radius:8px;margin-bottom:20px;}
  .header h2{margin:0;font-size:18px;}
  .header p{margin:4px 0 0;font-size:12px;opacity:0.8;}
  .kpi-row{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:20px;}
  .kpi{background:#f0f4ff;border-radius:8px;padding:12px;text-align:center;}
  .kpi label{font-size:11px;color:#64748b;display:block;margin-bottom:4px;}
  .kpi span{font-size:16px;font-weight:700;color:#1F3864;}
  table{width:100%;border-collapse:collapse;margin-bottom:16px;}
  thead th{background:#1F3864;color:white;padding:8px;font-size:12px;-webkit-print-color-adjust:exact;print-color-adjust:exact;}
  tbody td{padding:7px 8px;border-bottom:1px solid #e2e8f0;font-size:12px;}
  h3{font-size:13px;color:#1F3864;margin:16px 0 8px;}
  .remaining{font-size:20px;font-weight:700;color:${acc.remaining > 0 ? '#dc2626' : '#16a34a'};}
</style></head><body>
<div class="header"><h2>حساب الزبون: ${name}</h2><p>تاريخ الطباعة: ${new Date().toLocaleDateString('ar-SY')}</p></div>
<div class="kpi-row">
  <div class="kpi"><label>إجمالي الفواتير</label><span>${fmtUSD(acc.totalInvoices)}</span></div>
  <div class="kpi"><label>إجمالي المدفوع</label><span>${fmtUSD(acc.totalPaid)}</span></div>
  <div class="kpi"><label>المتبقي</label><span class="remaining">${fmtUSD(acc.remaining)}</span></div>
</div>
<h3>🧾 الفواتير (${acc.invoices.length})</h3>
<table><thead><tr><th>رقم الفاتورة</th><th>التاريخ</th><th>الإجمالي</th></tr></thead>
<tbody>${acc.invoices.map(i => '<tr><td>' + i.number + '</td><td>' + i.date + '</td><td>' + fmtUSD(i.total) + '</td></tr>').join('')}</tbody></table>
<h3>💵 الدفعات (${acc.payments.length})</h3>
<table><thead><tr><th>التاريخ</th><th>ملاحظة</th><th>المبلغ</th></tr></thead>
<tbody>${acc.payments.map(p => '<tr><td>' + p.date + '</td><td>' + (p.note||'—') + (p.linkedInvoice ? ' — 🔗 ' + p.linkedInvoice : ' — ⚠️ غير مرتبطة') + '</td><td>' + fmtUSD(p.amount) + '</td></tr>').join('')}</tbody></table>
<script>window.onload=()=>window.print();<\/script>
</body></html>`);
  win.document.close();
}


// ============================================================
// حساب المورد — مشتريات / مدفوع / باقي
// ============================================================

function getSupplierAccount(supplierName) {
  const invoices = activePurchaseInvoices().filter(i => i.supplierName === supplierName);
  const cashInvoices     = invoices.filter(i => (i.paymentType||'cash') === 'cash');
  const deferredInvoices = invoices.filter(i => (i.paymentType||'cash') === 'deferred');

  const totalCash     = cashInvoices.reduce((s,i) => s + (i.total||0), 0);
  const totalInvoices = invoices.reduce((s,i) => s + (i.total||0), 0);
  const totalDeferred = deferredInvoices.reduce((s,i) => s + (i.total||0), 0);

  const payments = (db.supplierPayments || []).filter(p => p.supplierName === supplierName);
  // استبعاد أي سجل وديعة تلقائي لتفادي الاحتساب المزدوج
  const realPayments = payments.filter(p => !isAutoDepositRecord(p));

  const paidOnDeferred     = deferredInvoices.reduce((s,i) => s + (parseFloat(i.paidAmount)||0), 0);
  const linkedPayments     = realPayments.filter(p =>  p.linkedInvoice);
  const standalonePayments = realPayments.filter(p => !p.linkedInvoice);
  // نستثني creditAdded — الفائض ذهب لرصيد إضافي وليس سداداً على الفواتير
  const totalLinked     = roundMoney(linkedPayments.reduce((s,p) => s + (parseFloat(p.amount)||0) - (parseFloat(p.creditAdded)||0) + (parseFloat(p.discountOnPayment)||0), 0));
  const totalStandalone = roundMoney(standalonePayments.reduce((s,p) => s + (parseFloat(p.amount)||0) - (parseFloat(p.creditAdded)||0) + (parseFloat(p.discountOnPayment)||0), 0));
  const totalPayments   = roundMoney(totalLinked + totalStandalone);

  // الإجمالي العام = مجموع سطور الفواتير حرفياً (المصدر الوحيد invoiceBalance لكل فاتورة).
  // لا نطرح الدفعات اليتيمة ضمنياً؛ تبقى بنداً مستقلاً ظاهراً للمستخدم (لا توزيع خفي).
  const remaining = roundMoney(deferredInvoices.reduce((s,i) => s + invoiceBalance(i).remaining, 0));
  const totalPaid = roundMoney(totalInvoices - remaining);

  const sup = (db.suppliers || []).find(s => s.name === supplierName);
  const creditBalance = sup ? (parseFloat(sup.creditBalance) || 0) : 0;

  // مردودات الشراء للمورد — بند مستقل ظاهر في كشف الحساب (دينها المُسوّى محتسب داخل invoiceBalance).
  const returns = (db.returns || [])
    .filter(r => (r.type || '') === 'purchase' && r.party === supplierName)
    .slice()
    .sort((a, b) => (new Date(a.date) - new Date(b.date)) || String(a.number).localeCompare(String(b.number)));
  const totalReturns      = roundMoney(returns.reduce((s, r) => s + (r.total || 0), 0));
  const totalReturnDebt   = roundMoney(returns.reduce((s, r) => s + (parseFloat(r.debtReduction) || 0), 0));
  const totalReturnCredit = roundMoney(returns.reduce((s, r) => s + (parseFloat(r.creditAdded)   || 0), 0));

  return { invoices, cashInvoices, deferredInvoices, payments,
           totalInvoices, totalCash, totalDeferred,
           paidOnDeferred, standalonePayments, totalStandalone, totalLinked, totalPayments,
           totalPaid, remaining, creditBalance,
           returns, totalReturns, totalReturnDebt, totalReturnCredit };
}

function openSupplierAccount(supplierName) {
  const acc = getSupplierAccount(supplierName);
  const modal = document.getElementById('supplier-account-modal');
  if (!modal) return;

  document.getElementById('sa-name').textContent = supplierName;
  document.getElementById('sa-total-invoices').textContent = fmtUSD(acc.totalInvoices);
  document.getElementById('sa-total-paid').textContent = fmtUSD(acc.totalPaid);
  const remEl = document.getElementById('sa-remaining');
  remEl.textContent = fmtUSD(acc.remaining);
  remEl.style.color = acc.remaining > 0 ? 'var(--red-600)' : 'var(--green-700)';
  document.getElementById('sa-remaining-old').textContent = fmtOld(usdToOld(acc.remaining));

  // رصيد إضافي مستحق لنا من المورد (فائض الدفعات) — يظهر فقط عند وجوده
  const creditRow = document.getElementById('sa-credit-row');
  if (creditRow) {
    if (acc.creditBalance > CREDIT_EPSILON) {
      creditRow.style.display = 'block';
      document.getElementById('sa-credit-balance').textContent = fmtUSD(acc.creditBalance);
    } else {
      creditRow.style.display = 'none';
    }
  }
  // دفعات غير مرتبطة (يتيمة) — بند مستقل ظاهر؛ لا يُوزّع على الفواتير
  const standaloneRow = document.getElementById('sa-standalone-row');
  if (standaloneRow) {
    if ((acc.totalStandalone || 0) > CREDIT_EPSILON) {
      standaloneRow.style.display = 'block';
      document.getElementById('sa-standalone-amount').textContent = fmtUSD(acc.totalStandalone);
    } else {
      standaloneRow.style.display = 'none';
    }
  }
  renderCreditHistory('supplier', supplierName, 'sa-credit-history', 'sa-credit-tbody');

  // مردودات الشراء — بند مستقل واضح في كشف الحساب
  const returnsSection = document.getElementById('sa-returns-section');
  const returnsTbody   = document.getElementById('sa-returns-tbody');
  if (returnsSection && returnsTbody) {
    if ((acc.returns || []).length) {
      returnsSection.style.display = 'block';
      returnsTbody.innerHTML = acc.returns.map(r => {
        const parts = [];
        if ((parseFloat(r.debtReduction) || 0) > CREDIT_EPSILON) parts.push('خصم من الدين ' + fmtUSD(r.debtReduction));
        if ((parseFloat(r.creditAdded)   || 0) > CREDIT_EPSILON) parts.push('رصيد إضافي ' + fmtUSD(r.creditAdded));
        const effect = parts.length ? parts.join(' + ') : '—';
        return '<tr onclick="printReturnInvoice(\'' + r.number + '\')" style="cursor:pointer" title="اضغط للطباعة">' +
          '<td><span class="inv-num">' + r.number + '</span></td>' +
          '<td>' + (r.date || '—') + '</td>' +
          '<td>' + (r.refInvoice ? '🔗 ' + r.refInvoice : '—') + '</td>' +
          '<td style="color:var(--red-600);font-weight:700">−' + fmtUSD(r.total) + '</td>' +
          '<td style="font-size:11px;color:var(--text-muted)">' + effect + '</td>' +
        '</tr>';
      }).join('');
    } else {
      returnsSection.style.display = 'none';
      returnsTbody.innerHTML = '';
    }
  }

  // جدول الفواتير
  const invTbody = document.getElementById('sa-invoices-tbody');
  invTbody.innerHTML = acc.invoices.length === 0
    ? '<tr><td colspan="3" style="text-align:center;padding:12px;color:var(--text-muted)">لا توجد فواتير</td></tr>'
    : acc.invoices.map(inv => {
        const creditNote = inv.creditApplied > 0
          ? '<br><span style="font-size:10px;color:#16a34a;font-weight:700">💳 خُصم ' + fmtUSD(inv.creditApplied) + ' من الرصيد الإضافي</span>'
          : '';
        return '<tr onclick="openInvoiceDetail(\'' + inv.number + '\')" style="cursor:pointer">' +
        '<td><span class="inv-num">' + inv.number + '</span></td>' +
        '<td>' + inv.date + '</td>' +
        '<td><strong>' + fmtUSD(inv.total) + '</strong>' + creditNote + '</td>' +
        '</tr>';
      }).join('');

  // جدول الدفعات
  const payTbody = document.getElementById('sa-payments-tbody');
  payTbody.innerHTML = acc.payments.length === 0
    ? '<tr><td colspan="4" style="text-align:center;padding:12px;color:var(--text-muted)">لا توجد دفعات مسجلة</td></tr>'
    : acc.payments.map((p, i) =>
        '<tr>' +
        '<td>' + p.date + '</td>' +
        '<td>' + (p.note || '—') + ' ' + paymentLinkBadge(p) + '</td>' +
        '<td style="color:var(--green-700)"><strong>' + fmtUSD(p.amount) + '</strong></td>' +
        '<td><button class="btn btn-ghost btn-sm" onclick="deleteSupplierPayment(\'' + supplierName + '\',' + i + ')" style="color:var(--red-600)">✕</button></td>' +
        '</tr>'
      ).join('');

  document.getElementById('sa-payment-name').value = supplierName;
  document.getElementById('sa-payment-amount').value = '';
  document.getElementById('sa-payment-note').value = '';
  document.getElementById('sa-payment-date').value = new Date().toISOString().split('T')[0];

  modal.classList.remove('hidden');
  modal.style.display = 'flex';
}

function addSupplierPayment() {
  const supplierName = document.getElementById('sa-payment-name').value;
  const amount = parseFloat(document.getElementById('sa-payment-amount').value) || 0;
  const note = document.getElementById('sa-payment-note').value.trim();
  const date = document.getElementById('sa-payment-date').value;

  if (!amount || amount <= 0) { showToast('أدخل مبلغ صحيح', 'error'); return; }
  if (!db.supplierPayments) db.supplierPayments = [];

  // رصيد إضافي مستحق لنا من المورد: إن تجاوز المبلغ إجمالي المطلوب على كل الفواتير المفتوحة
  // — يطبَّق المطلوب على الفواتير ويتحول الفائض إلى creditBalance (نفس منطق saveReceiptSupplier)
  const outstanding = getSupplierAccount(supplierName).remaining;
  const over = computeOverpayment(amount, outstanding);
  let creditAdded = 0;
  if (over.isOverpayment) {
    creditAdded = over.creditAdded;
    const ok = confirm('المبلغ يتجاوز المطلوب بمقدار ' + fmtUSD(creditAdded) +
      ' — هل تريد حفظ الفرق كرصيد إضافي مستحق لنا من المورد؟');
    if (!ok) return; // إيقاف الحفظ
  }

  // ربط تلقائي بأقدم فاتورة شراء آجلة مفتوحة
  let linkedInvoice = '';
  const open = getDeferredInvoicesForSupplier(supplierName)
    .slice()
    .sort((a, b) => (new Date(a.date) - new Date(b.date)) || String(a.number).localeCompare(String(b.number)));
  if (open.length) linkedInvoice = open[0].number;

  const pid = newPaymentId(); // معرّف ثابت — يربط قيد السجل بالدفعة
  db.supplierPayments.push({
    pid, supplierName, amount, note, date,
    creditAdded, // فائض محوّل لرصيد إضافي — يُستثنى من قوة السداد على الفواتير
    linkedInvoice,
    description: creditAdded > CREDIT_EPSILON
      ? 'دفعة زائدة — منها ' + fmtUSD(creditAdded) + ' رصيد إضافي'
      : (linkedInvoice ? 'سداد فاتورة ' + linkedInvoice : '')
  });

  // تحديث رصيد المورد — الجزء المطبَّق على الفواتير فقط (نستثني الفائض)
  const sup = (db.suppliers || []).find(s => s.name === supplierName);
  if (sup) {
    const appliedCash = amount - creditAdded;
    sup.balance = Math.max(0, (sup.balance || 0) - appliedCash);
  }
  // الفائض يُضاف للرصيد الإضافي عبر السجل الموحّد (مربوط بالدفعة)
  if (creditAdded > CREDIT_EPSILON) {
    applyCreditMovement({ partyType:'supplier', partyName:supplierName, delta:creditAdded,
      refType:'payment', ref:pid, date, key:'payment-add:'+pid });
  }

  // الفاتورة المربوطة — حدّث حالتها المجمّدة (المصدر الحي هو invoiceBalance)
  if (linkedInvoice) {
    const inv = (db.purchaseInvoices || []).find(i => i.number === linkedInvoice);
    if (inv) inv.paymentStatus = invoiceBalance(inv).closed ? 'paid' : 'partial';
  }

  saveData(db);
  if (creditAdded > CREDIT_EPSILON) {
    showToast('💰 تم تسجيل الدفعة — منها ' + fmtUSD(creditAdded) + ' رصيد إضافي (الرصيد الآن ' + fmtUSD(sup ? sup.creditBalance : creditAdded) + ')', 'success');
  } else {
    showToast('✅ تم تسجيل الدفعة: ' + fmtUSD(amount), 'success');
  }
  openSupplierAccount(supplierName);
}

function deleteSupplierPayment(supplierName, index) {
  if (!confirm('هل تريد حذف هذه الدفعة؟')) return;
  const allPayments = db.supplierPayments || [];
  let removed = null;
  let count = 0;
  for (let i = 0; i < allPayments.length; i++) {
    if (allPayments[i].supplierName === supplierName) {
      if (count === index) { removed = allPayments.splice(i, 1)[0]; break; }
      count++;
    }
  }
  db.supplierPayments = allPayments;
  if (removed) {
    // عكس أثر الدفعة بالكامل — منع بقاء الخصم/الإضافة بعد الحذف (ازدواجية)
    reverseCreditMovements({ partyType:'supplier', partyName:supplierName,
      ref: removed.pid || removed.receiptNum || '' });
    const sup = (db.suppliers || []).find(s => s.name === supplierName);
    if (sup) {
      const appliedCash = (parseFloat(removed.amount) || 0) - (parseFloat(removed.creditAdded) || 0);
      sup.balance = roundMoney((sup.balance || 0) + appliedCash + (parseFloat(removed.discountOnPayment) || 0));
    }
    logAudit(AUDIT_TYPES.PAYMENT_DELETE,
      `حذف دفعة دفع للمورد ${supplierName} بقيمة ${fmtUSD(removed.amount || 0)}` +
      `${removed.date ? ' بتاريخ ' + removed.date : ''}` +
      `${removed.receiptNum ? ' (إيصال ' + removed.receiptNum + ')' : ''}`);
  }
  saveData(db);
  showToast('🗑️ تم حذف الدفعة', 'success');
  openSupplierAccount(supplierName);
}

function closeSupplierAccount() {
  const modal = document.getElementById('supplier-account-modal');
  if (modal) { modal.classList.add('hidden'); modal.style.display = 'none'; }
}

function printSupplierAccount() {
  const name = document.getElementById('sa-name').textContent;
  const acc = getSupplierAccount(name);
  const win = window.open('', '_blank');
  win.document.write(`<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head><meta charset="UTF-8"><title>حساب ${name}</title>
<style>
  body{font-family:'Segoe UI',Tahoma,Arial,sans-serif;margin:0;padding:20px;color:#1a1a1a;direction:rtl;}
  .header{background:#15803d;color:white;padding:16px 20px;border-radius:8px;margin-bottom:20px;}
  .header h2{margin:0;font-size:18px;}
  .header p{margin:4px 0 0;font-size:12px;opacity:0.8;}
  .kpi-row{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:20px;}
  .kpi{background:#f0fdf4;border-radius:8px;padding:12px;text-align:center;}
  .kpi label{font-size:11px;color:#64748b;display:block;margin-bottom:4px;}
  .kpi span{font-size:16px;font-weight:700;color:#15803d;}
  table{width:100%;border-collapse:collapse;margin-bottom:16px;}
  thead th{background:#15803d;color:white;padding:8px;font-size:12px;-webkit-print-color-adjust:exact;print-color-adjust:exact;}
  tbody td{padding:7px 8px;border-bottom:1px solid #e2e8f0;font-size:12px;}
  h3{font-size:13px;color:#15803d;margin:16px 0 8px;}
  .remaining{font-size:20px;font-weight:700;color:${acc.remaining > 0 ? '#dc2626' : '#16a34a'};}
</style></head><body>
<div class="header"><h2>حساب المورد: ${name}</h2><p>تاريخ الطباعة: ${new Date().toLocaleDateString('ar-SY')}</p></div>
<div class="kpi-row">
  <div class="kpi"><label>إجمالي المشتريات</label><span>${fmtUSD(acc.totalInvoices)}</span></div>
  <div class="kpi"><label>إجمالي المدفوع</label><span>${fmtUSD(acc.totalPaid)}</span></div>
  <div class="kpi"><label>المتبقي</label><span class="remaining">${fmtUSD(acc.remaining)}</span></div>
</div>
<h3>🛒 فواتير الشراء (${acc.invoices.length})</h3>
<table><thead><tr><th>رقم الفاتورة</th><th>التاريخ</th><th>الإجمالي</th></tr></thead>
<tbody>${acc.invoices.map(i => '<tr><td>' + i.number + '</td><td>' + i.date + '</td><td>' + fmtUSD(i.total) + '</td></tr>').join('')}</tbody></table>
<h3>💵 الدفعات (${acc.payments.length})</h3>
<table><thead><tr><th>التاريخ</th><th>ملاحظة</th><th>المبلغ</th></tr></thead>
<tbody>${acc.payments.map(p => '<tr><td>' + p.date + '</td><td>' + (p.note||'—') + (p.linkedInvoice ? ' — 🔗 ' + p.linkedInvoice : ' — ⚠️ غير مرتبطة') + '</td><td>' + fmtUSD(p.amount) + '</td></tr>').join('')}</tbody></table>
<script>window.onload=()=>window.print();<\/script>
</body></html>`);
  win.document.close();
}


// ============================================================
// المرتجعات — رد بضاعة بيع / رد بضاعة شراء
// ============================================================
let returnLines = [{ itemId:'', qty:1, price:0, total:0 }];

function renderReturns() {
  renderReturnLines();
  renderReturnTotal();
  renderReturnsList();
  // datalists
  const cdl = document.getElementById('return-customers-datalist');
  if(cdl) cdl.innerHTML = db.customers.filter(c=>c.name).map(c=>`<option value="${c.name}">`).join('');
  const sdl = document.getElementById('return-suppliers-datalist');
  if(sdl) sdl.innerHTML = (db.suppliers||[]).filter(s=>s.name).map(s=>`<option value="${s.name}">`).join('');
  // set date
  const dateEl = document.getElementById('return-date');
  if(dateEl) dateEl.value = todayStr();
  // set next number
  const type = document.getElementById('return-type')?.value || 'sale';
  updateReturnNumber(type);
}

function updateReturnNumber(type) {
  const returns = (db.returns || []);
  const saleCount = returns.filter(r=>r.type==='sale').length;
  const purCount = returns.filter(r=>r.type==='purchase').length;
  const numEl = document.getElementById('return-inv-num');
  if(numEl) {
    numEl.textContent = type === 'sale'
      ? 'RET-S-' + String(saleCount+1).padStart(3,'0')
      : 'RET-P-' + String(purCount+1).padStart(3,'0');
  }
  // show/hide party fields
  document.getElementById('return-customer-row').style.display = type === 'sale' ? '' : 'none';
  document.getElementById('return-supplier-row').style.display = type === 'purchase' ? '' : 'none';
}

function onReturnTypeChange() {
  const type = document.getElementById('return-type').value;
  updateReturnNumber(type);
  returnLines = [{ itemId:'', qty:1, price:0, total:0 }];
  renderReturnLines();
  renderReturnTotal();
}

function renderReturnLines() {
  const tbody = document.getElementById('return-lines');
  if(!tbody) return;
  const type = document.getElementById('return-type')?.value || 'sale';
  tbody.innerHTML = returnLines.map((line, i) => {
    const item = db.items.find(it=>it.id===line.itemId);
    // بناء dropdown الوحدة — مثل فاتورة البيع
    let unitSelect = '';
    if(item) {
      const hasUnit2 = item.unit2 && item.unit2.trim();
      if(hasUnit2) {
        unitSelect = `<select onchange="onReturnUnitChange(${i},this.value)" class="input input-sm" style="width:90px">
          <option value="unit" ${(line.unitType||'unit')==='unit'?'selected':''}>${item.unit}</option>
          <option value="unit2" ${line.unitType==='unit2'?'selected':''}>${item.unit2}</option>
        </select>`;
      } else {
        unitSelect = `<span class="text-muted">${item.unit||''}</span>`;
      }
    } else {
      unitSelect = '<span class="text-muted">—</span>';
    }
    return `<tr>
      <td>${i+1}</td>
      <td>
        <select onchange="onReturnItemChange(${i},this.value)" class="input input-sm">
          <option value="">-- اختر --</option>
          ${db.items.map(it=>`<option value="${it.id}" ${it.id===line.itemId?'selected':''}>${it.id} - ${it.name}</option>`).join('')}
        </select>
      </td>
      <td>${unitSelect}</td>
      <td><input type="number" class="input input-sm" value="${line.qty}" min="0.01" step="0.01"
          onchange="onReturnQtyChange(${i},this.value)" style="width:80px"></td>
      <td><input type="number" class="input input-sm" value="${line.price}" min="0"
          onchange="onReturnPriceChange(${i},this.value)" style="width:110px"></td>
      <td><strong>${line.total ? fmtUSD(line.total) : '—'}</strong></td>
      <td><button class="btn btn-ghost btn-sm" onclick="removeReturnLine(${i})" style="color:var(--red-600)">✕</button></td>
    </tr>`;
  }).join('');
}

function onReturnItemChange(i, itemId) {
  const type = document.getElementById('return-type')?.value || 'sale';
  const item = db.items.find(it=>it.id===itemId);
  returnLines[i].itemId = itemId;
  returnLines[i].unitType = 'unit'; // reset للوحدة الأساسية
  returnLines[i].price = item ? (type === 'sale' ? item.price : item.cost) : 0;
  returnLines[i].total = returnLines[i].price * returnLines[i].qty;
  renderReturnLines(); renderReturnTotal();
}
function onReturnUnitChange(i, unitType) {
  const type = document.getElementById('return-type')?.value || 'sale';
  const item = db.items.find(it=>it.id===returnLines[i].itemId);
  if(!item) return;
  returnLines[i].unitType = unitType;
  const basePrice = type === 'sale' ? item.price : item.cost;
  if(unitType === 'unit2') {
    returnLines[i].price = basePrice * (item.factor || 1);
  } else {
    returnLines[i].price = basePrice;
  }
  returnLines[i].total = returnLines[i].price * returnLines[i].qty;
  renderReturnLines(); renderReturnTotal();
}
function onReturnQtyChange(i, qty) {
  returnLines[i].qty = parseFloat(qty)||0;
  returnLines[i].total = returnLines[i].price * returnLines[i].qty;
  renderReturnLines(); renderReturnTotal();
}
function onReturnPriceChange(i, price) {
  returnLines[i].price = parseFloat(price)||0;
  returnLines[i].total = returnLines[i].price * returnLines[i].qty;
  renderReturnLines(); renderReturnTotal();
}
function removeReturnLine(i) {
  returnLines.splice(i,1);
  if(returnLines.length===0) returnLines.push({itemId:'',qty:1,price:0,total:0});
  renderReturnLines(); renderReturnTotal();
}
function addReturnLine() {
  returnLines.push({itemId:'',qty:1,price:0,total:0});
  renderReturnLines();
}
function renderReturnTotal() {
  const total = returnLines.reduce((s,l)=>s+l.total,0);
  const el = document.getElementById('return-total');
  if(el) el.textContent = fmtUSD(total);
  const eqEl = document.getElementById('return-total-equiv');
  if(eqEl) eqEl.innerHTML = '<span style="color:var(--text-muted);font-size:13px">' + fmtOld(usdToOld(total)) + ' | ' + fmtNew(usdToNew(total)) + '</span>';
}

function saveReturn() {
  const lines = returnLines.filter(l=>l.itemId&&l.qty>0);
  if(lines.length===0){ showToast('أضف مادة واحدة على الأقل','error'); return; }
  const type = document.getElementById('return-type').value;
  const total = lines.reduce((s,l)=>s+l.total,0);
  const party = type === 'sale'
    ? document.getElementById('return-customer-input').value.trim()
    : document.getElementById('return-supplier-input').value.trim();
  const date = document.getElementById('return-date').value;
  const note = document.getElementById('return-note').value.trim();
  const numEl = document.getElementById('return-inv-num');
  const number = numEl ? numEl.textContent : ('RET-' + Date.now());

  if(!db.returns) db.returns = [];
  const ret = { number, type, date, party, lines, total, note };
  db.returns.push(ret);

  // إعادة المخزون — رد البيع يزيد المخزون، رد الشراء ينقصه
  // (المخزون يحسب تلقائياً من calcInventory)

  saveData(db);
  returnLines = [{itemId:'',qty:1,price:0,total:0}];
  // مسح اسم الزبون أو المورد بعد الحفظ
  const custInput = document.getElementById('return-customer-input');
  const suppInput = document.getElementById('return-supplier-input');
  if(custInput) custInput.value = '';
  if(suppInput) suppInput.value = '';
  showToast('✅ تم حفظ المرتجع ' + number, 'success');
  renderReturns();
}

function renderReturnsList() {
  const el = document.getElementById('returns-list');
  if(!el) return;
  const returns = (db.returns || []).slice().reverse();
  const searchVal = (document.getElementById('returns-search')?.value||'').toLowerCase().trim();
  const typeFilter = document.getElementById('returns-type-filter')?.value || 'all';
  const filtered = returns.filter(r => {
    const matchType = typeFilter === 'all' || r.type === typeFilter;
    const matchSearch = !searchVal || (r.number||'').toLowerCase().includes(searchVal) || (r.party||'').toLowerCase().includes(searchVal);
    return matchType && matchSearch;
  });
  const countEl = document.getElementById('returns-count');
  if(countEl) countEl.textContent = filtered.length + ' مرتجع';
  if(filtered.length === 0) {
    el.innerHTML = '<div class="empty-state">لا توجد مرتجعات بعد</div>';
    return;
  }
  el.innerHTML = filtered.map(r =>
    '<div class="invoice-row" onclick="printReturnInvoice(\'' + r.number + '\')" style="cursor:pointer" title="اضغط للطباعة">' +
    '<span class="inv-num">' + r.number + '</span>' +
    '<span class="inv-customer">' + (r.party||'—') + '</span>' +
    '<span class="inv-type ' + (r.type==='sale'?'type-sale':'type-purchase') + '">' + (r.type==='sale'?'رد بيع':'رد شراء') + '</span>' +
    '<span class="inv-total">' + fmtUSD(r.total) + '</span>' +
    '<span class="inv-date">' + r.date + '</span>' +
    '</div>'
  ).join('');
}

function printReturnInvoice(number) {
  const ret = (db.returns||[]).find(r=>r.number===number);
  if(!ret) return;
  const linesHTML = ret.lines.map((l,i) => {
    const item = db.items.find(it=>it.id===l.itemId);
    return `<tr>
      <td style="padding:8px;border:1px solid #ddd;text-align:center">${i+1}</td>
      <td style="padding:8px;border:1px solid #ddd">${item?.name||l.itemId}</td>
      <td style="padding:8px;border:1px solid #ddd;text-align:center">${item?.unit||''}</td>
      <td style="padding:8px;border:1px solid #ddd;text-align:center">${l.qty}</td>
      <td style="padding:8px;border:1px solid #ddd;text-align:center">${fmtUSD(l.price)}</td>
      <td style="padding:8px;border:1px solid #ddd;text-align:center;font-weight:bold">${fmtUSD(l.total)}</td>
    </tr>`;
  }).join('');
  const win = window.open('','_blank');
  win.document.write(`<!DOCTYPE html>
<html lang="ar" dir="rtl"><head><meta charset="UTF-8"><title>مرتجع ${ret.number}</title>
<style>
  body{font-family:'Segoe UI',Tahoma,Arial,sans-serif;margin:0;padding:20px;color:#1a1a1a;}
  .header{background:#dc2626;color:white;padding:20px;border-radius:8px;margin-bottom:20px;text-align:center;}
  .header h1{margin:0;font-size:22px;}
  .header p{margin:4px 0;font-size:12px;opacity:0.85;}
  .badge{background:#fef2f2;color:#dc2626;padding:6px 16px;border-radius:6px;font-weight:700;font-size:15px;display:inline-block;margin-bottom:16px;}
  .info{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:20px;}
  .info-box{background:#f8f9fa;padding:10px;border-radius:6px;border-right:3px solid #dc2626;}
  .info-box label{font-size:11px;color:#666;display:block;}
  .info-box span{font-size:14px;font-weight:600;}
  table{width:100%;border-collapse:collapse;margin-bottom:16px;}
  thead th{background:#dc2626;color:white;padding:8px;text-align:center;font-size:12px;-webkit-print-color-adjust:exact;print-color-adjust:exact;}
  .total-box{background:#dc2626;color:white;padding:14px 20px;border-radius:8px;text-align:center;display:inline-block;min-width:180px;}
  .note{background:#fef2f2;padding:10px;border-radius:6px;font-size:13px;margin-top:12px;}
  @media print{body{padding:10px;}}
</style></head><body>
<div class="header">
  <h1>${db.company.name}</h1>
  <p>${db.company.address}${db.company.phone?' | ☎ '+db.company.phone:''}</p>
</div>
<div style="text-align:center;margin-bottom:16px;">
  <span class="badge">🔄 ${ret.type==='sale'?'مرتجع بيع':'مرتجع شراء'} — ${ret.number}</span>
</div>
<div class="info">
  <div class="info-box"><label>${ret.type==='sale'?'الزبون':'المورد'}</label><span>${ret.party||'—'}</span></div>
  <div class="info-box"><label>التاريخ</label><span>${ret.date}</span></div>
</div>
<table>
  <thead><tr><th>#</th><th>المادة</th><th>الوحدة</th><th>الكمية</th><th>السعر</th><th>الإجمالي</th></tr></thead>
  <tbody>${linesHTML}</tbody>
</table>
<div style="text-align:left;margin-top:8px;">
  <div class="total-box"><div style="font-size:11px;opacity:0.8;">الإجمالي</div><div style="font-size:20px;font-weight:700;">${fmtUSD(ret.total)}</div></div>
</div>
${ret.note?'<div class="note">📝 ملاحظة: '+ret.note+'</div>':''}
<div style="text-align:center;margin-top:24px;font-size:11px;color:#94a3b8;border-top:1px solid #eee;padding-top:8px;">${db.company.slogan}</div>
<script>window.onload=()=>window.print();<\/script>
</body></html>`);
  win.document.close();
}


// ============================================================
// تعديل كلمة السر
// ============================================================
function togglePassField(fieldId, btn) {
  const inp = document.getElementById(fieldId);
  if (inp.type === 'password') {
    inp.type = 'text';
    btn.textContent = '🙈';
  } else {
    inp.type = 'password';
    btn.textContent = '👁️';
  }
}

// التحقق من صيغة البريد الإلكتروني (validation بسيط)
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || '').trim());
}

function changePassword() {
  const currentPass = document.getElementById('pass-current').value;
  const newPass = document.getElementById('pass-new').value;
  const confirmPass = document.getElementById('pass-confirm').value;

  // تحقق من الحقول
  if (!currentPass || !newPass || !confirmPass) {
    showToast('يرجى تعبئة جميع الحقول', 'error'); return;
  }
  if (newPass.length < 4) {
    showToast('كلمة السر الجديدة يجب أن تكون 4 أحرف على الأقل', 'error'); return;
  }
  if (newPass !== confirmPass) {
    showToast('كلمة السر الجديدة وتأكيدها غير متطابقتين', 'error'); return;
  }

  // تحقق من كلمة السر الحالية
  const currentHash = btoa(unescape(encodeURIComponent(currentPass)));
  const storedHash = localStorage.getItem('app_password') || btoa(unescape(encodeURIComponent('Ali#1997')));

  if (currentHash !== storedHash) {
    showToast('❌ كلمة السر الحالية غير صحيحة', 'error');
    document.getElementById('pass-current').value = '';
    return;
  }

  // حفظ كلمة السر الجديدة
  const newHash = btoa(unescape(encodeURIComponent(newPass)));
  localStorage.setItem('app_password', newHash);

  // مسح الحقول
  document.getElementById('pass-current').value = '';
  document.getElementById('pass-new').value = '';
  document.getElementById('pass-confirm').value = '';

  showToast('✅ تم تغيير كلمة السر بنجاح', 'success');
}

// ============================================================
// SETUP SCREEN — يظهر مرة واحدة فقط
// ============================================================
function resetBusinessType() {
  const ADMIN_HASH = btoa(unescape(encodeURIComponent('AdminAli1997')));
  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:9999;display:flex;align-items:center;justify-content:center;font-family:inherit;';
  overlay.innerHTML = `
    <div style="background:#fff;border-radius:16px;padding:32px;width:380px;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,0.3);">
      <div style="font-size:40px;margin-bottom:12px;">🔐</div>
      <h3 style="margin:0 0 8px;font-size:18px;color:#0f172a;">إعادة اختيار نوع النشاط</h3>
      <p style="margin:0 0 16px;font-size:14px;color:#64748b;">أدخل كلمة سر المدير للمتابعة</p>
      <input id="rbt-pass" type="password" placeholder="كلمة السر" style="width:100%;padding:10px 14px;border:1px solid #e2e8f0;border-radius:8px;font-size:14px;font-family:inherit;margin-bottom:8px;box-sizing:border-box;text-align:right;">
      <div id="rbt-error" style="color:#ef4444;font-size:12px;margin-bottom:12px;display:none;">❌ كلمة السر غير صحيحة</div>
      <div style="display:flex;gap:12px;justify-content:center;">
        <button id="rbt-cancel" style="padding:10px 24px;border-radius:8px;border:1px solid #e2e8f0;background:#f8fafc;font-size:14px;cursor:pointer;font-family:inherit;">إلغاء</button>
        <button id="rbt-confirm" style="padding:10px 24px;border-radius:8px;border:none;background:#7c3aed;color:#fff;font-size:14px;font-weight:600;cursor:pointer;font-family:inherit;">تأكيد</button>
      </div>
    </div>`;
  document.body.appendChild(overlay);
  document.getElementById('rbt-cancel').onclick = () => document.body.removeChild(overlay);
  document.getElementById('rbt-pass').onkeydown = (e) => { if(e.key==='Enter') document.getElementById('rbt-confirm').click(); };
  document.getElementById('rbt-confirm').onclick = () => {
    const input = document.getElementById('rbt-pass').value;
    const inputHash = btoa(unescape(encodeURIComponent(input)));
    if(inputHash !== ADMIN_HASH) {
      document.getElementById('rbt-error').style.display = 'block';
      document.getElementById('rbt-pass').value = '';
      document.getElementById('rbt-pass').focus();
      return;
    }
    document.body.removeChild(overlay);
    localStorage.removeItem('business_type');
    showSetupScreen();
    showToast('اختر نوع النشاط الجديد', 'success');
  };
}

function checkSetup() {
  const chosen = localStorage.getItem('business_type');
  if (chosen) return; // سبق وتم الاختيار
  showSetupScreen();
}

function showSetupScreen() {
  const overlay = document.getElementById('setup-screen');
  if (overlay) {
    // إعادة تعبئة بريد الاستعادة إن كان محفوظاً (مثلاً عند إعادة اختيار النشاط)
    const emailInp = document.getElementById('setup-recovery-email');
    if (emailInp) emailInp.value = localStorage.getItem('app_recovery_email') || '';
    overlay.classList.remove('hidden');
    overlay.style.display = 'flex';
  }
}

function selectBusiness(type) {
  // بريد الاستعادة إلزامي عند أول تثبيت — تحقق قبل المتابعة
  const emailInp = document.getElementById('setup-recovery-email');
  const email = (emailInp ? emailInp.value : '').trim();
  if (!isValidEmail(email)) {
    showToast('⚠️ أدخل بريداً إلكترونياً صحيحاً للمتابعة', 'error');
    if (emailInp) emailInp.focus();
    return;
  }
  localStorage.setItem('app_recovery_email', email);

  // حفظ الاختيار
  localStorage.setItem('business_type', type);

  // تحميل المواد الافتراضية
  const items = BUSINESS_ITEMS[type];
  if (items && items.length > 0) {
    db.items = JSON.parse(JSON.stringify(items));
    saveData(db);
  }

  // إخفاء الشاشة
  const overlay = document.getElementById('setup-screen');
  if (overlay) overlay.classList.add('hidden');

  const info = BUSINESS_LABELS[type];
  showToast('✅ تم اختيار: ' + info.icon + ' ' + info.label, 'success');
  navigate('dashboard');
}

// ============================================================
// INIT
// ============================================================
// ============================================================
// LOGIN + INIT
// ============================================================
const PASS_HASH = btoa(unescape(encodeURIComponent('Ali#1997')));

function checkLogin() {
  const input = document.getElementById('login-password').value;
  const inputHash = btoa(unescape(encodeURIComponent(input)));
  const storedHash = localStorage.getItem('app_password') || PASS_HASH;
  const btn = document.getElementById('login-btn');
  if (inputHash === storedHash) {
    btn.style.background = 'linear-gradient(135deg,#10b981,#059669)';
    btn.textContent = '✓ جاري الدخول...';
    setTimeout(() => {
      document.getElementById('login-screen').style.display = 'none';
      sessionStorage.setItem('auth', '1');
      initApp();
    }, 400);
  } else {
    document.getElementById('login-error').style.display = 'block';
    document.getElementById('login-password').value = '';
    document.getElementById('login-password').focus();
    const screen = document.getElementById('login-screen');
    screen.style.animation = 'none';
    document.querySelector('#login-screen > div:nth-child(3)').style.animation = 'shake 0.4s ease';
    setTimeout(() => {
      document.querySelector('#login-screen > div:nth-child(3)').style.animation = '';
    }, 400);
  }
}

async function initApp() {
  await initDB();
  if(!db.exchange) db.exchange = { usdToOld: 12000 };
  const hdr = document.getElementById('company-name-header');
  if (hdr) hdr.value = db.company.name;
  updateRateWidget();
  navigate('dashboard');
  checkSetup();
}

window.addEventListener('DOMContentLoaded', () => {
  if (sessionStorage.getItem('auth') === '1') {
    document.getElementById('login-screen').style.display = 'none';
    initApp();
  }
});

// طباعة الفاتورة الحالية المفتوحة
function printCurrentInvoice() {
  const num = document.getElementById('sale-inv-num')?.textContent;
  // Get last saved invoice or build preview from current lines
  const lines = saleLines.filter(l=>l.itemId&&l.qty>0);
  if(lines.length===0){showToast('أضف مادة أولاً ثم احفظ الفاتورة للطباعة','error');return;}
  const subtotal = lines.reduce((s,l)=>s+l.total,0);
  const discount = parseFloat(document.getElementById('sale-discount')?.value||0);
  const total = subtotal*(1-discount/100);
  const customerName = document.getElementById('sale-customer-input')?.value||'';
  const date = document.getElementById('sale-date')?.value||'';
  const fakeInv = { number:num, date, customerName, lines, subtotal, discount, total };
  // Temporarily add to salesInvoices for print
  db.salesInvoices.push(fakeInv);
  printInvoice(num);
  db.salesInvoices.pop();
}

// ============================================================
// مردود المبيع (Sales Return) — مرتبط بفاتورة بيع فعلية
// زر "مردود" بالأعلى ← مودال كرتين ← كرت "مردود مبيع" يفتح هذا التدفق.
// الترقيم RET-001 مستقل، يعيد المخزون، ويوزّع القيمة بين خصم الدين والرصيد الإضافي.
// ============================================================
let srState = { invoiceNumber: '', lines: [] };

// مودال الاختيار (كرتان: مردود مبيع / مردود مشتريات)
function openReturnsMenu() {
  const m = document.getElementById('returns-menu-modal');
  if (m) { m.classList.remove('hidden'); m.style.display = 'flex'; }
}
function closeReturnsMenu() {
  const m = document.getElementById('returns-menu-modal');
  if (m) { m.classList.add('hidden'); m.style.display = 'none'; }
}

// رقم مردود تسلسلي RET-001 — مستقل عن ترقيم الفواتير وعن مرتجعات النظام القديم (RET-S-/RET-P-).
function nextSalesReturnNumber() {
  const nums = (db.returns || [])
    .map(r => { const m = /^RET-(\d+)$/.exec(r.number || ''); return m ? parseInt(m[1], 10) : 0; });
  const max = nums.length ? Math.max(0, ...nums) : 0;
  return 'RET-' + String(max + 1).padStart(3, '0');
}

// مجموع ما سبق إرجاعه لبند مصدر (srcLine) من مردودات مبيع فاتورة معيّنة.
function priorReturnedForSaleLine(invNumber, srcLine) {
  return roundMoney((db.returns || [])
    .filter(r => r.type === 'sale' && r.refInvoice === invNumber)
    .reduce((s, r) => s + (r.lines || [])
      .filter(l => l.srcLine === srcLine)
      .reduce((ss, l) => ss + (parseFloat(l.qty) || 0), 0), 0));
}

// رقم مردود شراء تسلسلي PRET-001 — مستقل عن ترقيم الفواتير وعن مردود المبيع (RET-).
function nextPurchaseReturnNumber() {
  const nums = (db.returns || [])
    .map(r => { const m = /^PRET-(\d+)$/.exec(r.number || ''); return m ? parseInt(m[1], 10) : 0; });
  const max = nums.length ? Math.max(0, ...nums) : 0;
  return 'PRET-' + String(max + 1).padStart(3, '0');
}

// مجموع ما سبق إرجاعه لبند مصدر (srcLine) من مردودات شراء فاتورة معيّنة.
function priorReturnedForPurchaseLine(invNumber, srcLine) {
  return roundMoney((db.returns || [])
    .filter(r => r.type === 'purchase' && r.refInvoice === invNumber)
    .reduce((s, r) => s + (r.lines || [])
      .filter(l => l.srcLine === srcLine)
      .reduce((ss, l) => ss + (parseFloat(l.qty) || 0), 0), 0));
}

function openSalesReturn() {
  closeReturnsMenu();
  srState = { invoiceNumber: '', lines: [] };
  const m = document.getElementById('sales-return-modal');
  if (m) { m.classList.remove('hidden'); m.style.display = 'flex'; }
  document.getElementById('sr-picker-view').style.display = 'block';
  document.getElementById('sr-detail-view').style.display = 'none';
  const s = document.getElementById('sr-invoice-search');
  if (s) s.value = '';
  srRenderInvoicePicker('');
}

function closeSalesReturn() {
  const m = document.getElementById('sales-return-modal');
  if (m) { m.classList.add('hidden'); m.style.display = 'none'; }
}

function srFilterInvoices() {
  srRenderInvoicePicker(document.getElementById('sr-invoice-search')?.value || '');
}

function srRenderInvoicePicker(filter) {
  const tbody = document.getElementById('sr-invoice-list');
  if (!tbody) return;
  const q = (filter || '').toLowerCase().trim();
  const list = activeSalesInvoices()
    .filter(inv => !q || (inv.number || '').toLowerCase().includes(q) || (inv.customerName || '').toLowerCase().includes(q))
    .slice().reverse();
  if (!list.length) {
    tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;color:var(--text-muted);padding:var(--s5)">لا توجد فواتير بيع مطابقة</td></tr>';
    return;
  }
  tbody.innerHTML = list.map(inv => {
    const bal = invoiceBalance(inv);
    const statusBadge = bal.closed
      ? '<span class="badge badge-green">مسدّدة</span>'
      : '<span class="badge badge-red">آجلة — متبقٍّ ' + fmtUSD(bal.remaining) + '</span>';
    return '<tr onclick="srSelectInvoice(\'' + inv.number + '\')" style="cursor:pointer">' +
      '<td><span class="inv-num">' + inv.number + '</span></td>' +
      '<td>' + (inv.customerName || '—') + '</td>' +
      '<td>' + (inv.date || '—') + '</td>' +
      '<td>' + fmtUSD(inv.total) + '</td>' +
      '<td>' + statusBadge + '</td>' +
    '</tr>';
  }).join('');
}

function srSelectInvoice(number) {
  const inv = activeSalesInvoices().find(i => i.number === number);
  if (!inv) { showToast('الفاتورة غير موجودة', 'error'); return; }
  srState.invoiceNumber = number;
  srState.lines = (inv.lines || []).map((l, idx) => {
    const item = db.items.find(it => it.id === l.itemId);
    const unitLabel = (l.unitType === 'unit2' && item && item.unit2) ? item.unit2 : (item ? item.unit : '');
    const prior = priorReturnedForSaleLine(number, idx);
    const soldQty = parseFloat(l.qty) || 0;
    return {
      srcLine: idx, itemId: l.itemId, name: item ? item.name : l.itemId,
      unitLabel, unitType: l.unitType || 'unit', price: parseFloat(l.price) || 0,
      soldQty, priorReturned: prior,
      returnable: computeReturnableQty(soldQty, prior), returnQty: 0,
    };
  });
  document.getElementById('sr-picker-view').style.display = 'none';
  document.getElementById('sr-detail-view').style.display = 'block';
  const bal = invoiceBalance(inv);
  document.getElementById('sr-inv-label').textContent = inv.number + ' — ' + (inv.customerName || '—');
  document.getElementById('sr-inv-meta').textContent = (inv.date || '') + ' · إجمالي ' + fmtUSD(inv.total) +
    ' · ' + (inv.paymentType === 'deferred' ? 'آجلة (متبقٍّ ' + fmtUSD(bal.remaining) + ')' : 'نقدية (مسدّدة)');
  document.getElementById('sr-return-number').textContent = nextSalesReturnNumber();
  const dEl = document.getElementById('sr-return-date');
  if (dEl) dEl.value = todayStr();
  srRenderLines();
}

function srBackToPicker() {
  document.getElementById('sr-picker-view').style.display = 'block';
  document.getElementById('sr-detail-view').style.display = 'none';
  srRenderInvoicePicker(document.getElementById('sr-invoice-search')?.value || '');
}

function srSetFull() { srState.lines.forEach(l => { l.returnQty = l.returnable; }); srRenderLines(); }
function srClearQty() { srState.lines.forEach(l => { l.returnQty = 0; }); srRenderLines(); }

function srOnReturnQtyChange(i, val) {
  const line = srState.lines[i];
  if (!line) return;
  let q = parseFloat(val) || 0;
  if (q < 0) q = 0;
  if (q > line.returnable) { q = line.returnable; showToast('الحد الأقصى للإرجاع ' + line.returnable + ' ' + line.unitLabel, 'error'); }
  line.returnQty = roundMoney(q);
  srRenderLines();
}

function srRenderLines() {
  const tbody = document.getElementById('sr-lines');
  if (!tbody) return;
  tbody.innerHTML = srState.lines.map((l, i) => {
    const disabled = l.returnable <= 0 ? 'disabled' : '';
    const lineTotal = roundMoney(l.returnQty * l.price);
    return '<tr>' +
      '<td>' + (i + 1) + '</td>' +
      '<td>' + l.name + '</td>' +
      '<td style="text-align:center">' + l.soldQty + ' ' + l.unitLabel + '</td>' +
      '<td style="text-align:center">' + (l.priorReturned > 0 ? l.priorReturned : '—') + '</td>' +
      '<td style="text-align:center;font-weight:700;color:var(--brand-600)">' + l.returnable + '</td>' +
      '<td><input type="number" class="input input-sm" style="width:90px" min="0" max="' + l.returnable + '" step="0.01" value="' + l.returnQty + '" ' + disabled + ' onchange="srOnReturnQtyChange(' + i + ',this.value)"></td>' +
      '<td style="text-align:center">' + fmtUSD(l.price) + '</td>' +
      '<td style="text-align:center;font-weight:700">' + (lineTotal > 0 ? fmtUSD(lineTotal) : '—') + '</td>' +
    '</tr>';
  }).join('');
  srRenderSummary();
}

function srComputeTotal() {
  return roundMoney(srState.lines.reduce((s, l) => s + (l.returnQty * l.price), 0));
}

function srRenderSummary() {
  const inv = activeSalesInvoices().find(i => i.number === srState.invoiceNumber);
  const total = srComputeTotal();
  const remaining = inv ? invoiceBalance(inv).remaining : 0;
  const eff = computeSalesReturnEffect(remaining, total);
  const totalEl = document.getElementById('sr-total');
  if (totalEl) totalEl.textContent = fmtUSD(total);
  const effEl = document.getElementById('sr-effect');
  if (!effEl) return;
  if (total <= 0) { effEl.innerHTML = '<span style="color:var(--text-muted)">حدّد كميات الإرجاع لمعاينة الأثر</span>'; return; }
  const parts = [];
  if (eff.debtReduction > CREDIT_EPSILON) parts.push('<span style="color:var(--danger-600);font-weight:700">خصم من الدين: ' + fmtUSD(eff.debtReduction) + '</span>');
  if (eff.creditAdded > CREDIT_EPSILON) parts.push('<span style="color:var(--success-600);font-weight:700">رصيد إضافي للزبون: ' + fmtUSD(eff.creditAdded) + '</span>');
  effEl.innerHTML = parts.join(' &nbsp;·&nbsp; ') || '—';
}

function saveSalesReturn() {
  const inv = activeSalesInvoices().find(i => i.number === srState.invoiceNumber);
  if (!inv) { showToast('اختر فاتورة بيع أولاً', 'error'); return; }
  const chosen = srState.lines.filter(l => (l.returnQty || 0) > 0);
  if (!chosen.length) { showToast('حدّد كمية إرجاع لصنف واحد على الأقل', 'error'); return; }

  // إعادة التحقق — منع تجاوز المتاح (يراعي مردودات سابقة)
  for (const l of chosen) {
    const prior = priorReturnedForSaleLine(srState.invoiceNumber, l.srcLine);
    const v = validateReturnQty(l.returnQty, l.soldQty, prior);
    if (!v.ok) { showToast('كمية إرجاع "' + l.name + '" غير صالحة (المتاح ' + v.returnable + ')', 'error'); return; }
  }

  const total = roundMoney(chosen.reduce((s, l) => s + (l.returnQty * l.price), 0));
  const remaining = invoiceBalance(inv).remaining;
  const eff = computeSalesReturnEffect(remaining, total);
  const number = nextSalesReturnNumber();
  const date = document.getElementById('sr-return-date')?.value || todayStr();
  const customerName = inv.customerName || '';

  const ret = {
    number, type: 'sale', date, party: customerName,
    refInvoice: inv.number, total,
    debtReduction: eff.debtReduction, creditAdded: eff.creditAdded,
    note: 'مردود مبيع للفاتورة ' + inv.number,
    lines: chosen.map(l => ({
      itemId: l.itemId, qty: roundMoney(l.returnQty), price: l.price,
      total: roundMoney(l.returnQty * l.price), unitType: l.unitType, srcLine: l.srcLine,
    })),
  };
  if (!db.returns) db.returns = [];
  db.returns.push(ret);

  // أثر الحساب — موازٍ تماماً لمنطق الدفعات:
  //  • تخفيض الدين المخزّن (balance) بمقدار debtReduction (invoiceBalance يعكسه اشتقاقياً).
  //  • الفائض (creditAdded) عبر سجل الرصيد الإضافي الموحّد (مفتاح يمنع الازدواج).
  const cust = (db.customers || []).find(c => c.name === customerName);
  if (cust && eff.debtReduction > CREDIT_EPSILON) {
    cust.balance = Math.max(0, roundMoney((cust.balance || 0) - eff.debtReduction));
  }
  if (eff.creditAdded > CREDIT_EPSILON) {
    applyCreditMovement({ partyType: 'customer', partyName: customerName, delta: eff.creditAdded,
      refType: 'return', ref: number, date, key: 'return-add:' + number });
  }

  if (inv.paymentType === 'deferred') inv.paymentStatus = invoiceBalance(inv).closed ? 'paid' : 'partial';

  saveData(db);
  showToast('✅ تم حفظ مردود المبيع ' + number + ' — المخزون والحساب تحدّثا', 'success');
  closeSalesReturn();
  if (typeof renderReturns === 'function') { try { renderReturns(); } catch (e) {} }
}

// ============================================================
// مردود الشراء (Purchase Return) — مرتبط بفاتورة شراء فعلية
// زر “مردود” بالأعلى ← مودال كرتين ← كرت “مردود مشتريات” يفتح هذا التدفق.
// الترقيم PRET-001 مستقل، يُنقّص المخزون (البضاعة ترجع للمورد)،
// ويوزّع القيمة بين خصم ديننا للمورد والرصيد الإضافي المستحق لنا. مرآة تامة لتدفق مردود المبيع.
// ============================================================
let prState = { invoiceNumber: '', lines: [] };

function openPurchaseReturn() {
  closeReturnsMenu();
  prState = { invoiceNumber: '', lines: [] };
  const m = document.getElementById('purchase-return-modal');
  if (m) { m.classList.remove('hidden'); m.style.display = 'flex'; }
  document.getElementById('pr-picker-view').style.display = 'block';
  document.getElementById('pr-detail-view').style.display = 'none';
  const s = document.getElementById('pr-invoice-search');
  if (s) s.value = '';
  prRenderInvoicePicker('');
}

function closePurchaseReturn() {
  const m = document.getElementById('purchase-return-modal');
  if (m) { m.classList.add('hidden'); m.style.display = 'none'; }
}

function prFilterInvoices() {
  prRenderInvoicePicker(document.getElementById('pr-invoice-search')?.value || '');
}

function prRenderInvoicePicker(filter) {
  const tbody = document.getElementById('pr-invoice-list');
  if (!tbody) return;
  const q = (filter || '').toLowerCase().trim();
  const list = activePurchaseInvoices()
    .filter(inv => !q || (inv.number || '').toLowerCase().includes(q) || (inv.supplierName || '').toLowerCase().includes(q))
    .slice().reverse();
  if (!list.length) {
    tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;color:var(--text-muted);padding:var(--s5)">لا توجد فواتير شراء مطابقة</td></tr>';
    return;
  }
  tbody.innerHTML = list.map(inv => {
    const bal = invoiceBalance(inv);
    const statusBadge = bal.closed
      ? '<span class="badge badge-green">مسدّدة</span>'
      : '<span class="badge badge-red">آجلة — متبقٍّ ' + fmtUSD(bal.remaining) + '</span>';
    return '<tr onclick="prSelectInvoice(\'' + inv.number + '\')" style="cursor:pointer">' +
      '<td><span class="inv-num">' + inv.number + '</span></td>' +
      '<td>' + (inv.supplierName || '—') + '</td>' +
      '<td>' + (inv.date || '—') + '</td>' +
      '<td>' + fmtUSD(inv.total) + '</td>' +
      '<td>' + statusBadge + '</td>' +
    '</tr>';
  }).join('');
}

function prSelectInvoice(number) {
  const inv = activePurchaseInvoices().find(i => i.number === number);
  if (!inv) { showToast('الفاتورة غير موجودة', 'error'); return; }
  prState.invoiceNumber = number;
  prState.lines = (inv.lines || []).map((l, idx) => {
    const item = db.items.find(it => it.id === l.itemId);
    const unitLabel = (l.unitType === 'unit2' && item && item.unit2) ? item.unit2 : (item ? item.unit : '');
    const prior = priorReturnedForPurchaseLine(number, idx);
    const boughtQty = parseFloat(l.qty) || 0;
    return {
      srcLine: idx, itemId: l.itemId, name: item ? item.name : l.itemId,
      unitLabel, unitType: l.unitType || 'unit', price: parseFloat(l.price) || 0,
      boughtQty, priorReturned: prior,
      returnable: computeReturnableQty(boughtQty, prior), returnQty: 0,
    };
  });
  document.getElementById('pr-picker-view').style.display = 'none';
  document.getElementById('pr-detail-view').style.display = 'block';
  const bal = invoiceBalance(inv);
  document.getElementById('pr-inv-label').textContent = inv.number + ' — ' + (inv.supplierName || '—');
  document.getElementById('pr-inv-meta').textContent = (inv.date || '') + ' · إجمالي ' + fmtUSD(inv.total) +
    ' · ' + (inv.paymentType === 'deferred' ? 'آجلة (متبقٍّ ' + fmtUSD(bal.remaining) + ')' : 'نقدية (مسدّدة)');
  document.getElementById('pr-return-number').textContent = nextPurchaseReturnNumber();
  const dEl = document.getElementById('pr-return-date');
  if (dEl) dEl.value = todayStr();
  prRenderLines();
}

function prBackToPicker() {
  document.getElementById('pr-picker-view').style.display = 'block';
  document.getElementById('pr-detail-view').style.display = 'none';
  prRenderInvoicePicker(document.getElementById('pr-invoice-search')?.value || '');
}

function prSetFull() { prState.lines.forEach(l => { l.returnQty = l.returnable; }); prRenderLines(); }
function prClearQty() { prState.lines.forEach(l => { l.returnQty = 0; }); prRenderLines(); }

function prOnReturnQtyChange(i, val) {
  const line = prState.lines[i];
  if (!line) return;
  let q = parseFloat(val) || 0;
  if (q < 0) q = 0;
  if (q > line.returnable) { q = line.returnable; showToast('الحد الأقصى للإرجاع ' + line.returnable + ' ' + line.unitLabel, 'error'); }
  line.returnQty = roundMoney(q);
  prRenderLines();
}

function prRenderLines() {
  const tbody = document.getElementById('pr-lines');
  if (!tbody) return;
  tbody.innerHTML = prState.lines.map((l, i) => {
    const disabled = l.returnable <= 0 ? 'disabled' : '';
    const lineTotal = roundMoney(l.returnQty * l.price);
    return '<tr>' +
      '<td>' + (i + 1) + '</td>' +
      '<td>' + l.name + '</td>' +
      '<td style="text-align:center">' + l.boughtQty + ' ' + l.unitLabel + '</td>' +
      '<td style="text-align:center">' + (l.priorReturned > 0 ? l.priorReturned : '—') + '</td>' +
      '<td style="text-align:center;font-weight:700;color:var(--brand-600)">' + l.returnable + '</td>' +
      '<td><input type="number" class="input input-sm" style="width:90px" min="0" max="' + l.returnable + '" step="0.01" value="' + l.returnQty + '" ' + disabled + ' onchange="prOnReturnQtyChange(' + i + ',this.value)"></td>' +
      '<td style="text-align:center">' + fmtUSD(l.price) + '</td>' +
      '<td style="text-align:center;font-weight:700">' + (lineTotal > 0 ? fmtUSD(lineTotal) : '—') + '</td>' +
    '</tr>';
  }).join('');
  prRenderSummary();
}

function prComputeTotal() {
  return roundMoney(prState.lines.reduce((s, l) => s + (l.returnQty * l.price), 0));
}

function prRenderSummary() {
  const inv = activePurchaseInvoices().find(i => i.number === prState.invoiceNumber);
  const total = prComputeTotal();
  const remaining = inv ? invoiceBalance(inv).remaining : 0;
  const eff = computePurchaseReturnEffect(remaining, total);
  const totalEl = document.getElementById('pr-total');
  if (totalEl) totalEl.textContent = fmtUSD(total);
  const effEl = document.getElementById('pr-effect');
  if (!effEl) return;
  if (total <= 0) { effEl.innerHTML = '<span style="color:var(--text-muted)">حدّد كميات الإرجاع لمعاينة الأثر</span>'; return; }
  const parts = [];
  if (eff.debtReduction > CREDIT_EPSILON) parts.push('<span style="color:var(--danger-600);font-weight:700">خصم من ديننا للمورد: ' + fmtUSD(eff.debtReduction) + '</span>');
  if (eff.creditAdded > CREDIT_EPSILON) parts.push('<span style="color:var(--success-600);font-weight:700">رصيد إضافي مستحق لنا: ' + fmtUSD(eff.creditAdded) + '</span>');
  effEl.innerHTML = parts.join(' &nbsp;·&nbsp; ') || '—';
}

function savePurchaseReturn() {
  const inv = activePurchaseInvoices().find(i => i.number === prState.invoiceNumber);
  if (!inv) { showToast('اختر فاتورة شراء أولاً', 'error'); return; }
  const chosen = prState.lines.filter(l => (l.returnQty || 0) > 0);
  if (!chosen.length) { showToast('حدّد كمية إرجاع لصنف واحد على الأقل', 'error'); return; }

  // إعادة التحقق — منع تجاوز المتاح (يراعي مردودات سابقة)
  for (const l of chosen) {
    const prior = priorReturnedForPurchaseLine(prState.invoiceNumber, l.srcLine);
    const v = validateReturnQty(l.returnQty, l.boughtQty, prior);
    if (!v.ok) { showToast('كمية إرجاع "' + l.name + '" غير صالحة (المتاح ' + v.returnable + ')', 'error'); return; }
  }

  const total = roundMoney(chosen.reduce((s, l) => s + (l.returnQty * l.price), 0));
  const remaining = invoiceBalance(inv).remaining;
  const eff = computePurchaseReturnEffect(remaining, total);
  const number = nextPurchaseReturnNumber();
  const date = document.getElementById('pr-return-date')?.value || todayStr();
  const supplierName = inv.supplierName || '';

  const ret = {
    number, type: 'purchase', date, party: supplierName,
    refInvoice: inv.number, total,
    debtReduction: eff.debtReduction, creditAdded: eff.creditAdded,
    note: 'مردود مشتريات للفاتورة ' + inv.number,
    lines: chosen.map(l => ({
      itemId: l.itemId, qty: roundMoney(l.returnQty), price: l.price,
      total: roundMoney(l.returnQty * l.price), unitType: l.unitType, srcLine: l.srcLine,
    })),
  };
  if (!db.returns) db.returns = [];
  db.returns.push(ret);

  // أثر الحساب — موازٍ تماماً لمردود المبيع لكن باتجاه المورد:
  //  • تخفيض ديننا المخزّن للمورد (balance) بمقدار debtReduction.
  //  • الفائض (creditAdded) رصيد إضافي مستحق لنا عبر السجل الموحّد (مفتاح يمنع الازدواج).
  const sup = (db.suppliers || []).find(s => s.name === supplierName);
  if (sup && eff.debtReduction > CREDIT_EPSILON) {
    sup.balance = Math.max(0, roundMoney((sup.balance || 0) - eff.debtReduction));
  }
  if (eff.creditAdded > CREDIT_EPSILON) {
    applyCreditMovement({ partyType: 'supplier', partyName: supplierName, delta: eff.creditAdded,
      refType: 'return', ref: number, date, key: 'return-add:' + number });
  }

  if (inv.paymentType === 'deferred') inv.paymentStatus = invoiceBalance(inv).closed ? 'paid' : 'partial';

  saveData(db);
  showToast('✅ تم حفظ مردود المشتريات ' + number + ' — المخزون والحساب تحدّثا', 'success');
  closePurchaseReturn();
  if (typeof renderReturns === 'function') { try { renderReturns(); } catch (e) {} }
}

// ============================================================
// عرض تفاصيل الفاتورة + تعديلها
// ============================================================
function openInvoiceDetail(number) {
  const inv = activeSalesInvoices().find(i=>i.number===number) ||
              activePurchaseInvoices().find(i=>i.number===number);
  if(!inv) return;
  const isSale = !!activeSalesInvoices().find(i=>i.number===number);

  // Fill modal
  document.getElementById('detail-inv-number').textContent = number;
  document.getElementById('detail-inv-type').textContent = isSale ? '🧾 فاتورة بيع' : '🛒 فاتورة شراء';
  document.getElementById('detail-inv-type').className = 'inv-type ' + (isSale ? 'type-sale' : 'type-purchase');
  document.getElementById('detail-date').value = inv.date;
  document.getElementById('detail-party-label').textContent = isSale ? 'اسم الزبون' : 'المورد';
  document.getElementById('detail-party').value = inv.customerName || inv.supplierName || '';
  document.getElementById('detail-discount-row').style.display = isSale ? '' : 'none';
  document.getElementById('detail-discount').value = inv.discount || 0;

  // Lines
  renderDetailLines(inv, isSale);

  // Store current invoice ref
  document.getElementById('invoice-detail-modal').dataset.number = number;
  document.getElementById('invoice-detail-modal').dataset.type = isSale ? 'sale' : 'purchase';
  document.getElementById('invoice-detail-modal').classList.remove('hidden');
}

let detailLines = [];

function renderDetailLines(inv, isSale) {
  detailLines = inv.lines.map(l => ({...l}));
  _renderDetailLinesTable(isSale);
  _calcDetailTotal(isSale);
}

function _renderDetailLinesTable(isSale) {
  const tbody = document.getElementById('detail-lines');
  tbody.innerHTML = detailLines.map((line, i) => {
    const item = db.items.find(it=>it.id===line.itemId);
    return `<tr>
      <td>${i+1}</td>
      <td>
        <select onchange="onDetailItemChange(${i},this.value)" class="input input-sm">
          <option value="">-- اختر --</option>
          ${db.items.map(it=>`<option value="${it.id}" ${it.id===line.itemId?'selected':''}>${it.id} - ${it.name}</option>`).join('')}
        </select>
      </td>
      <td><span class="text-muted">${item?.unit||''}</span></td>
      <td><input type="number" class="input input-sm" value="${line.qty}" min="0.01" step="0.01"
           onchange="onDetailQtyChange(${i},this.value)" style="width:75px"></td>
      ${isSale
        ? `<td><span class="price-display">${line.price?new Intl.NumberFormat('ar-SY').format(line.price):'—'}</span></td>`
        : `<td><input type="number" class="input input-sm" value="${line.price}" min="0"
             onchange="onDetailPriceChange(${i},this.value)" style="width:100px"></td>`
      }
      <td><strong>${line.total?new Intl.NumberFormat('ar-SY').format(line.total):'—'}</strong></td>
      <td><button class="btn btn-ghost btn-sm" onclick="removeDetailLine(${i})" style="color:var(--red-600)">✕</button></td>
    </tr>`;
  }).join('');
}

function onDetailItemChange(i, itemId) {
  const isSale = document.getElementById('invoice-detail-modal').dataset.type === 'sale';
  const item = db.items.find(it=>it.id===itemId);
  detailLines[i].itemId = itemId;
  detailLines[i].price = item ? (isSale ? item.price : item.cost) : 0;
  detailLines[i].total = detailLines[i].price * detailLines[i].qty;
  _renderDetailLinesTable(isSale); _calcDetailTotal(isSale);
}
function onDetailQtyChange(i, qty) {
  const isSale = document.getElementById('invoice-detail-modal').dataset.type === 'sale';
  detailLines[i].qty = parseFloat(qty)||0;
  detailLines[i].total = detailLines[i].price * detailLines[i].qty;
  _renderDetailLinesTable(isSale); _calcDetailTotal(isSale);
}
function onDetailPriceChange(i, price) {
  const isSale = document.getElementById('invoice-detail-modal').dataset.type === 'sale';
  detailLines[i].price = parseFloat(price)||0;
  detailLines[i].total = detailLines[i].price * detailLines[i].qty;
  _renderDetailLinesTable(isSale); _calcDetailTotal(isSale);
}
function removeDetailLine(i) {
  const isSale = document.getElementById('invoice-detail-modal').dataset.type === 'sale';
  detailLines.splice(i,1);
  if(detailLines.length===0) detailLines.push({itemId:'',qty:1,price:0,total:0});
  _renderDetailLinesTable(isSale); _calcDetailTotal(isSale);
}
function addDetailLine() {
  const isSale = document.getElementById('invoice-detail-modal').dataset.type === 'sale';
  detailLines.push({itemId:'',qty:1,price:0,total:0});
  _renderDetailLinesTable(isSale);
}
function _calcDetailTotal(isSale) {
  const subtotal = detailLines.reduce((s,l)=>s+l.total,0);
  const discount = isSale ? (parseFloat(document.getElementById('detail-discount').value)||0) : 0;
  const total = subtotal * (1 - discount/100);
  document.getElementById('detail-subtotal').textContent = new Intl.NumberFormat('ar-SY').format(subtotal);
  document.getElementById('detail-total').textContent = new Intl.NumberFormat('ar-SY').format(total);
}

function saveInvoiceDetail() {
  const modal = document.getElementById('invoice-detail-modal');
  const number = modal.dataset.number;
  const isSale = modal.dataset.type === 'sale';
  const lines = detailLines.filter(l=>l.itemId&&l.qty>0);
  if(lines.length===0){showToast('أضف مادة واحدة على الأقل','error');return;}

  const subtotal = lines.reduce((s,l)=>s+l.total,0);
  const discount = isSale ? (parseFloat(document.getElementById('detail-discount').value)||0) : 0;
  const total = subtotal*(1-discount/100);
  const party = document.getElementById('detail-party').value.trim();
  const date = document.getElementById('detail-date').value;

  if(isSale) {
    const idx = db.salesInvoices.findIndex(i=>i.number===number);
    if(idx>=0) {
      db.salesInvoices[idx] = {...db.salesInvoices[idx], date, customerName:party, lines, subtotal, discount, total};
      // Update customer if new name
      if(party && !db.customers.find(c=>c.name===party)) {
        db.customers.push({id:'CUS-'+String(db.customers.length+1).padStart(3,'0'),name:party,phone:'',address:''});
      }
    }
  } else {
    const idx = db.purchaseInvoices.findIndex(i=>i.number===number);
    if(idx>=0) {
      db.purchaseInvoices[idx] = {...db.purchaseInvoices[idx], date, supplierName:party, lines, total};
    }
  }

  saveData(db);
  modal.classList.add('hidden');
  showToast('✅ تم تحديث الفاتورة '+number,'success');
  render(currentPage);
}

function printDetailInvoice() {
  const number = document.getElementById('invoice-detail-modal').dataset.number;
  printInvoice(number);
}

function closeDetailModal() {
  document.getElementById('invoice-detail-modal').classList.add('hidden');
}


// ============================================================
// BARCODE SCAN — يضيف مادة تلقائياً عند مسح الباركود
// ============================================================
function handleBarcodeScan(page, value) {
  const code = value.trim();
  if (!code) return;

  // بحث بالباركود أولاً، ثم بالاسم، ثم بالكود
  let item = db.items.find(it => it.barcode && it.barcode === code)
          || db.items.find(it => it.barcode2 && it.barcode2 === code)
          || db.items.find(it => it.id && it.id.toLowerCase() === code.toLowerCase())
          || db.items.find(it => it.name && it.name.toLowerCase().includes(code.toLowerCase()));

  const el = document.getElementById(page + '-barcode-input');

  if (!item) {
    showToast('❌ لا توجد مادة بـ: ' + code, 'error');
    if (el) { el.style.borderColor = '#ef4444'; setTimeout(() => { el.style.borderColor = ''; el.value = ''; }, 1200); }
    return;
  }

  // إضافة المادة — لو موجودة بسطر يزيد الكمية، لو لأ يضيف سطر جديد
  function addToLines(lines, getPrice) {
    const existIdx = lines.findIndex(l => l.itemId === item.id);
    if (existIdx >= 0) {
      lines[existIdx].qty += 1;
      lines[existIdx].total = lines[existIdx].price * lines[existIdx].qty;
      showToast('➕ ' + item.name + ' — الكمية: ' + lines[existIdx].qty, 'success');
    } else {
      const price = getPrice(item);
      const emptyIdx = lines.findIndex(l => !l.itemId);
      if (emptyIdx >= 0) {
        lines[emptyIdx].itemId = item.id;
        lines[emptyIdx].price = price;
        lines[emptyIdx].total = price * lines[emptyIdx].qty;
        lines[emptyIdx].unitType = 'unit';
      } else {
        lines.push({ itemId: item.id, qty: 1, price, total: price, unitType: 'unit' });
      }
      showToast('✅ ' + item.name + ' — ' + fmtUSD(price), 'success');
    }
  }

  if (page === 'sale') {
    const priceType = document.getElementById('sale-price-type')?.value || 'retail';
    addToLines(saleLines, (it) => {
      if (priceType === 'wholesale' && it.price2 > 0) return it.price2;
      if (priceType === 'special'   && it.price3 > 0) return it.price3;
      return it.price;
    });
    ensureTrailingBlankLine(saleLines);
    renderSaleLines(); renderSaleTotal();
  } else if (page === 'purchase') {
    addToLines(purchaseLines, (it) => it.cost);
    ensureTrailingBlankLine(purchaseLines);
    renderPurchaseLines(); renderPurchaseTotal();
  }

  // تأثير بصري على الحقل عند النجاح
  if (el) {
    el.style.borderColor = '#10b981';
    el.style.background = '#f0fdf4';
    setTimeout(() => { el.style.borderColor = ''; el.style.background = ''; el.value = ''; el.focus(); }, 800);
  }
}

// تحديث الـ datalist للباركود ليشمل الاسم والكود
function updateBarcodeDatalist(page) {
  const dl = document.getElementById(page + '-barcode-datalist');
  if (!dl) return;
  dl.innerHTML = db.items.map(it =>
    `<option value="${it.barcode||it.id}">${it.name} — ${it.id}${it.barcode?' ('+it.barcode+')':''}</option>`
  ).join('');
}



// ============================================================
// إيصالات القبض والدفع
// ============================================================
// ============================================================
// إيصالات القبض — مع جدول الفواتير الآجل المحدّث
// ============================================================

// ============================================================
// قبض من زبون — كامل ومترابط مع فواتير البيع الآجلة
// ============================================================

// ============================================================
// قبض من زبون — دوال مساعدة حيّة (تُحسب من سجلات الدفع الفعلية)
// الحالة والمتبقي لا يُقرآن أبداً من paymentType/paidAmount المجمّدة
// ============================================================

// فواتير بيع آجلة لم تُسدَّد بالكامل بعد (متبقٍّ > 0)
function getDeferredInvoicesForCustomer(customerName) {
  return activeSalesInvoices().filter(inv =>
    inv.customerName === customerName &&
    (inv.paymentType || 'cash') === 'deferred' &&
    invoiceBalance(inv).remaining > 0.005);
}

// المتبقي على فاتورة بيع — المصدر الوحيد هو invoiceBalance
// (الوسيط الثاني يُتجاهل؛ محفوظ للتوافق مع مواضع النداء القديمة)
function rcGetInvoiceRemaining(inv) {
  return invoiceBalance(inv).remaining;
}

function renderDeferredSuppliers() {
  var el = document.getElementById('rec-deferred-suppliers');
  if(!el) return;

  var debtors = (db.suppliers||[])
    .map(function(s){ return Object.assign({}, s, {acc: getSupplierAccount(s.name)}); })
    .filter(function(s){ return s.acc.remaining > 0; })
    .sort(function(a,b){ return b.acc.remaining - a.acc.remaining; });

  if(debtors.length === 0) {
    el.innerHTML = '<div style="padding:20px;text-align:center;color:var(--text-muted);background:#f0fdf4;border-radius:8px;font-size:13px;">✅ لا توجد مستحقات للموردين</div>';
    return;
  }

  var html = '';
  debtors.forEach(function(s) {
    var deferredInvs = s.acc.deferredInvoices || [];
    var rowsHTML = '';
    deferredInvs.forEach(function(inv) {
      var invBal    = invoiceBalance(inv);   // محسوب حياً — مصدر وحيد
      var paidOnInv = invBal.paid;
      var invRem    = invBal.remaining;
      if(invRem <= 0.005) return;
      rowsHTML += '<tr style="border-bottom:1px solid #e2e8f0;">' +
        '<td style="padding:7px 10px;font-weight:600;color:#15803d;font-size:12px;">' + inv.number + '</td>' +
        '<td style="padding:7px 10px;color:var(--text-muted);font-size:12px;">' + inv.date + '</td>' +
        '<td style="padding:7px 10px;font-size:12px;">' + fmtUSD(inv.total) + '</td>' +
        '<td style="padding:7px 10px;color:#16a34a;font-size:12px;">' + fmtUSD(paidOnInv) + '</td>' +
        '<td style="padding:7px 10px;color:#dc2626;font-weight:700;font-size:12px;">' + fmtUSD(invRem) + '</td>' +
        '<td style="padding:7px 10px;text-align:center;">' +
          '<button data-sname="' + s.name + '" data-invnum="' + inv.number + '" data-invrem="' + invRem + '" ' +
            'onclick="paySupplierInvoiceAmountBtn(this)" ' +
            'style="padding:4px 12px;font-size:11px;background:#15803d;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:600;">دفع</button>' +
        '</td>' +
        '</tr>';
    });
    if(!rowsHTML) return;
    html += '<div style="margin-bottom:10px;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">' +
      '<div data-sname="' + s.name + '" data-srem="' + s.acc.remaining + '" onclick="selectDeferredSupplierBtn(this)" ' +
        'style="background:#15803d;color:white;padding:10px 14px;display:flex;justify-content:space-between;align-items:center;cursor:pointer;">' +
        '<span style="font-weight:700;font-size:13px;">🏭 ' + s.name + '</span>' +
        '<div style="display:flex;gap:12px;align-items:center;font-size:12px;">' +
          '<span>إجمالي الآجل: ' + fmtUSD(s.acc.totalDeferred) + '</span>' +
          '<span style="background:#dc2626;padding:3px 10px;border-radius:10px;font-weight:700;">المتبقي: ' + fmtUSD(s.acc.remaining) + '</span>' +
        '</div>' +
      '</div>' +
      '<table style="width:100%;border-collapse:collapse;">' +
        '<thead><tr style="background:#f0fdf4;">' +
          '<th style="padding:6px 10px;text-align:right;font-size:11px;color:#64748b;font-weight:600;">رقم الفاتورة</th>' +
          '<th style="padding:6px 10px;text-align:right;font-size:11px;color:#64748b;font-weight:600;">التاريخ</th>' +
          '<th style="padding:6px 10px;text-align:right;font-size:11px;color:#64748b;font-weight:600;">الإجمالي</th>' +
          '<th style="padding:6px 10px;text-align:right;font-size:11px;color:#64748b;font-weight:600;">المدفوع</th>' +
          '<th style="padding:6px 10px;text-align:right;font-size:11px;color:#64748b;font-weight:600;">المتبقي</th>' +
          '<th style="padding:6px 10px;text-align:center;font-size:11px;color:#64748b;font-weight:600;">دفع</th>' +
        '</tr></thead>' +
        '<tbody>' + rowsHTML + '</tbody>' +
      '</table>' +
    '</div>';
  });
  el.innerHTML = html || '<div style="padding:20px;text-align:center;color:var(--text-muted);background:#f0fdf4;border-radius:8px;font-size:13px;">✅ كل الفواتير مسددة</div>';
}

function paySupplierInvoiceAmountBtn(btn) {
  paySupplierInvoiceAmount(btn.dataset.sname, btn.dataset.invnum, parseFloat(btn.dataset.invrem));
}
function selectDeferredSupplierBtn(el) {
  selectDeferredSupplier(el.dataset.sname, parseFloat(el.dataset.srem));
}
function paySupplierInvoiceAmount(supplierName, invoiceNumber, remaining) {
  const nameEl = document.getElementById('rec-sup-name');
  const amtEl  = document.getElementById('rec-sup-amount');
  const descEl = document.getElementById('rec-sup-desc');
  if(nameEl) nameEl.value = supplierName;
  if(amtEl)  amtEl.value  = Math.round(remaining * 100) / 100;
  if(descEl) descEl.value = 'سداد فاتورة ' + invoiceNumber;
  document.getElementById('rec-sup-amount').dataset.linkedInvoice = invoiceNumber;
  document.getElementById('rec-sup-name')?.scrollIntoView({ behavior:'smooth', block:'center' });
}

function selectDeferredSupplier(name, remaining) {
  const nameEl = document.getElementById('rec-sup-name');
  const amtEl  = document.getElementById('rec-sup-amount');
  if(nameEl) nameEl.value = name;
  if(amtEl)  { amtEl.value = Math.round(remaining * 100) / 100; amtEl.dataset.linkedInvoice = ''; }
  document.getElementById('rec-sup-name')?.scrollIntoView({ behavior:'smooth', block:'center' });
}

function renderReceiptSupplierList() {
  const el = document.getElementById('rec-sup-list');
  if(!el) return;
  const list = (db.supplierPayments||[]).slice().sort((a,b)=>new Date(b.date)-new Date(a.date)).slice(0,20);
  if(list.length===0){ el.innerHTML='<div class="empty-state">لا توجد إيصالات دفع بعد</div>'; return; }
  el.innerHTML = list.map(p=>`
    <div class="invoice-row">
      <span class="inv-num">${p.receiptNum||'—'}</span>
      <span class="inv-customer">${p.supplierName||'—'}</span>
      <span class="inv-type type-purchase">دفع</span>
      <span class="inv-total">${fmtUSD(p.amount)}</span>
      <span class="inv-date">${p.date||''}</span>
      ${p.linkedInvoice ? `<span style="font-size:11px;color:#15803d;background:#f0fdf4;padding:2px 6px;border-radius:10px">${p.linkedInvoice}</span>` : ''}
    </div>`).join('');
}

// ============================================================
// دوال مساعدة لصفحتي الإيصالات
// ============================================================

function onCustNameInput(name) {
  updateCustBalance();
  // لو اختار زبون موجود - اعرض فواتيره
  if(db.customers.find(c=>c.name===name)) {
    renderDeferredCustomers();
  }
}

function printReceiptCustomer() {
  const customerName = document.getElementById('rec-cust-name')?.value?.trim();
  const amount = parseFloat(document.getElementById('rec-cust-amount')?.value||0);
  if(!customerName||!amount){ showToast('أدخل اسم الزبون والمبلغ أولاً','error'); return; }
  const date = document.getElementById('rec-cust-date')?.value||new Date().toISOString().split('T')[0];
  const desc = document.getElementById('rec-cust-desc')?.value||'';
  const method = document.getElementById('rec-cust-method')?.value||'cash';
  const methodLabel = {cash:'نقداً', cheque:'شيك', transfer:'حوالة'}[method]||'نقداً';
  const acc = getCustomerAccount(customerName);
  const discount = parseFloat(document.getElementById('rec-cust-discount')?.value||0);
  const after = Math.max(0, acc.remaining - amount - discount);
  const win = window.open('','_blank');
  win.document.write(`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8">
<title>إيصال قبض</title>
<style>body{font-family:'Segoe UI',Tahoma,Arial,sans-serif;margin:0;padding:20px;direction:rtl;}
.header{background:#1F3864;color:white;padding:16px 20px;border-radius:8px;margin-bottom:16px;text-align:center;}
.row{display:grid;grid-template-columns:150px 1fr 150px 1fr;gap:8px;margin-bottom:10px;align-items:center;border-bottom:1px dashed #e2e8f0;padding-bottom:8px;}
.lbl{font-size:12px;color:#64748b;font-weight:600;}
.val{font-size:14px;font-weight:600;color:#1a1a1a;}
.total{background:#1F3864;color:white;padding:16px;border-radius:8px;text-align:center;margin:16px 0;}
.signs{display:grid;grid-template-columns:1fr 1fr;gap:40px;margin-top:30px;}
.sign{text-align:center;border-top:1px solid #ccc;padding-top:8px;font-size:12px;color:#666;}
@media print{body{padding:10px;}}</style></head><body>
<div class="header"><h2 style="margin:0">🧾 إيصال قبض</h2><p style="margin:4px 0;font-size:12px;opacity:.85">${db.company.name}</p></div>
<div class="row"><span class="lbl">رقم السند</span><span class="val" style="color:#1F3864">REC-PREVIEW</span><span class="lbl">التاريخ</span><span class="val">${date}</span></div>
<div class="row"><span class="lbl">اسم الزبون</span><span class="val">${customerName}</span><span class="lbl">طريقة الدفع</span><span class="val">${methodLabel}</span></div>
<div class="row"><span class="lbl">البيان</span><span class="val" style="grid-column:span 3">${desc||'—'}</span></div>
<div class="total"><div style="font-size:12px;opacity:.8">المبلغ المقبوض</div><div style="font-size:28px;font-weight:700">${fmtUSD(amount)}</div><div style="font-size:13px;opacity:.85;margin-top:4px">${fmtOld(usdToOld(amount))}</div></div>
<div class="row"><span class="lbl">الرصيد السابق</span><span class="val" style="color:#dc2626">${fmtUSD(acc.remaining)}</span><span class="lbl">الرصيد بعد الإيصال</span><span class="val" style="color:${after>0?'#dc2626':'#16a34a'}">${fmtUSD(after)}</span></div>
<div class="signs"><div class="sign">توقيع المحاسب</div><div class="sign">توقيع الزبون</div></div>
<script>window.onload=()=>window.print();<\/script></body></html>`);
  win.document.close();
}

function onSupNameInput(name) {
  updateSupBalance();
  if((db.suppliers||[]).find(s=>s.name===name)) {
    renderDeferredSuppliers();
  }
}

function updateSupBalance() {
  const name   = document.getElementById('rec-sup-name')?.value?.trim();
  const amount = parseFloat(document.getElementById('rec-sup-amount')?.value||0);
  const discount= parseFloat(document.getElementById('rec-sup-discount')?.value||0);
  const el     = document.getElementById('rec-sup-balance-preview');
  if(!el) return;
  if(!name) { el.textContent = '—'; return; }
  const acc = getSupplierAccount(name);
  const after = Math.max(0, acc.remaining - amount - discount);
  el.textContent = fmtUSD(after) + ' | ' + fmtOld(usdToOld(after));
  el.style.color = after > 0 ? '#dc2626' : '#16a34a';
  el.style.background = after > 0 ? '#fef2f2' : '#f0fdf4';
  el.style.borderColor = after > 0 ? '#fecaca' : '#bbf7d0';
}

function printReceiptSupplier() {
  const supplierName = document.getElementById('rec-sup-name')?.value?.trim();
  const amount = parseFloat(document.getElementById('rec-sup-amount')?.value||0);
  if(!supplierName||!amount){ showToast('أدخل اسم المورد والمبلغ أولاً','error'); return; }
  const date = document.getElementById('rec-sup-date')?.value||new Date().toISOString().split('T')[0];
  const desc = document.getElementById('rec-sup-desc')?.value||'';
  const method = document.getElementById('rec-sup-method')?.value||'cash';
  const methodLabel = {cash:'نقداً', cheque:'شيك', transfer:'حوالة'}[method]||'نقداً';
  const acc = getSupplierAccount(supplierName);
  const discount = parseFloat(document.getElementById('rec-sup-discount')?.value||0);
  const after = Math.max(0, acc.remaining - amount - discount);
  const win = window.open('','_blank');
  win.document.write(`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8">
<title>إيصال دفع</title>
<style>body{font-family:'Segoe UI',Tahoma,Arial,sans-serif;margin:0;padding:20px;direction:rtl;}
.header{background:#15803d;color:white;padding:16px 20px;border-radius:8px;margin-bottom:16px;text-align:center;}
.row{display:grid;grid-template-columns:150px 1fr 150px 1fr;gap:8px;margin-bottom:10px;align-items:center;border-bottom:1px dashed #e2e8f0;padding-bottom:8px;}
.lbl{font-size:12px;color:#64748b;font-weight:600;}
.val{font-size:14px;font-weight:600;color:#1a1a1a;}
.total{background:#15803d;color:white;padding:16px;border-radius:8px;text-align:center;margin:16px 0;}
.signs{display:grid;grid-template-columns:1fr 1fr;gap:40px;margin-top:30px;}
.sign{text-align:center;border-top:1px solid #ccc;padding-top:8px;font-size:12px;color:#666;}
@media print{body{padding:10px;}}</style></head><body>
<div class="header"><h2 style="margin:0">💸 إيصال دفع لمورد</h2><p style="margin:4px 0;font-size:12px;opacity:.85">${db.company.name}</p></div>
<div class="row"><span class="lbl">رقم السند</span><span class="val" style="color:#15803d">PAY-PREVIEW</span><span class="lbl">التاريخ</span><span class="val">${date}</span></div>
<div class="row"><span class="lbl">اسم المورد</span><span class="val">${supplierName}</span><span class="lbl">طريقة الدفع</span><span class="val">${methodLabel}</span></div>
<div class="row"><span class="lbl">البيان</span><span class="val" style="grid-column:span 3">${desc||'—'}</span></div>
<div class="total"><div style="font-size:12px;opacity:.8">المبلغ المدفوع</div><div style="font-size:28px;font-weight:700">${fmtUSD(amount)}</div><div style="font-size:13px;opacity:.85;margin-top:4px">${fmtOld(usdToOld(amount))}</div></div>
<div class="row"><span class="lbl">الرصيد السابق</span><span class="val" style="color:#dc2626">${fmtUSD(acc.remaining)}</span><span class="lbl">الرصيد بعد الإيصال</span><span class="val" style="color:${after>0?'#dc2626':'#16a34a'}">${fmtUSD(after)}</span></div>
<div class="signs"><div class="sign">توقيع المحاسب</div><div class="sign">توقيع المورد</div></div>
<script>window.onload=()=>window.print();<\/script></body></html>`);
  win.document.close();
}

// ============================================================
// النسخ الاحتياطية
// ============================================================

// استقبال طلب النسخة التلقائية من main process
if (window.electronAPI) {
  window.electronAPI.onRequestBackupData(() => {
    const jsonStr = JSON.stringify(buildBackupSnapshot());
    window.electronAPI.sendBackupData(jsonStr);
  });
}

// يجمع كل كيانات التطبيق في لقطة واحدة (فواتير، عملاء، موردون، أصناف، مخزون، مدفوعات، أرصدة)
function buildBackupSnapshot() {
  return {
    company:          db.company          || {},
    exchange:         db.exchange         || {},
    invoiceCounters:  db.invoiceCounters  || {},
    items:            db.items            || [],
    customers:        db.customers        || [],
    suppliers:        db.suppliers        || [],
    books:            db.books            || [],
    salesInvoices:    db.salesInvoices    || [],
    purchaseInvoices: db.purchaseInvoices || [],
    returns:          db.returns          || [],
    warehouses:       db.warehouses       || [],
    transfers:        db.transfers        || [],
    damages:          db.damages          || [],
    customerPayments: db.customerPayments || [],
    supplierPayments: db.supplierPayments || [],
    creditLedger:     db.creditLedger     || [],
    auditLog:         db.auditLog         || [],
  };
}

// تصدير يدوي
async function exportBackupManual() {
  if (!window.electronAPI) { showToast('هذه الميزة تعمل فقط داخل البرنامج', 'error'); return; }
  const jsonStr = JSON.stringify(buildBackupSnapshot(), null, 2);
  const result = await window.electronAPI.exportBackup(jsonStr);
  if (result.success) {
    showToast('✅ تم حفظ النسخة الاحتياطية', 'success');
  } else {
    showToast('تم الإلغاء', 'error');
  }
}

// التحقق من أن الملف المستورد نسخة احتياطية صالحة البنية
function isValidBackup(obj) {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return false;
  const requiredArrays = [
    'items', 'customers', 'suppliers',
    'salesInvoices', 'purchaseInvoices',
    'customerPayments', 'supplierPayments', 'creditLedger',
  ];
  for (const key of requiredArrays) {
    if (!Array.isArray(obj[key])) return false;
  }
  if (!obj.company || typeof obj.company !== 'object') return false;
  if (!obj.invoiceCounters || typeof obj.invoiceCounters !== 'object') return false;
  return true;
}

// استعادة نسخة احتياطية — تستبدل البيانات الحالية بالكامل بعد التأكيد
async function importBackupManual() {
  if (!window.electronAPI) { showToast('هذه الميزة تعمل فقط داخل البرنامج', 'error'); return; }

  // 1) اختيار الملف
  const result = await window.electronAPI.importBackup();
  if (!result || !result.success) return; // ألغى المستخدم

  // 2) قراءة والتحقق من البنية
  let imported;
  try {
    imported = JSON.parse(result.data);
  } catch(e) {
    showToast('❌ الملف غير صالح — تعذّر قراءة محتواه', 'error');
    return;
  }
  if (!isValidBackup(imported)) {
    showToast('❌ بنية الملف غير صحيحة — ليست نسخة احتياطية صالحة', 'error');
    return;
  }

  // 3) تأكيد صريح — تحذير واضح بأن الإجراء لا رجعة فيه
  const warning =
    '⚠️ تحذير هام\n\n' +
    'ستؤدي استعادة هذه النسخة إلى محو جميع البيانات الحالية نهائياً ' +
    '(الفواتير، العملاء، الموردون، الأصناف، المخزون، المدفوعات، الأرصدة) ' +
    'واستبدالها بمحتوى الملف المستورد.\n\n' +
    '⛔ لا يمكن التراجع عن هذا الإجراء ما لم يكن لديك نسخة احتياطية أخرى.\n\n' +
    'هل أنت متأكد من المتابعة؟';
  if (!confirm(warning)) return;

  // 4) الاستبدال الفعلي
  db = imported;
  saveData(db);
  showToast('✅ تم استعادة البيانات بنجاح', 'success');
  navigate('dashboard');
}

// عرض قائمة النسخ المحفوظة
async function showBackupsList() {
  if (!window.electronAPI) { showToast('هذه الميزة تعمل فقط داخل البرنامج', 'error'); return; }
  const result = await window.electronAPI.listBackups();
  const el = document.getElementById('backups-list');
  if (!el) return;
  if (!result.success || result.files.length === 0) {
    el.innerHTML = '<div style="color:var(--text-muted);font-size:13px;padding:8px 0;">لا توجد نسخ احتياطية بعد</div>';
    return;
  }
  el.innerHTML = '<div style="font-size:12px;color:var(--text-muted);margin-bottom:8px;">📁 ' + result.dir + '</div>' +
    result.files.map(f =>
      '<div style="display:flex;align-items:center;justify-content:space-between;padding:6px 0;border-bottom:1px solid var(--border-subtle);font-size:13px;">' +
      '<span>📄 ' + f + '</span>' +
      '</div>'
    ).join('');
}


// ============================================================
// نظام المستودعات — Warehouses
// ============================================================

function renderWarehouses() {
  fillTodayDates('tr-date');
  const inv = calcInventoryByWarehouse();
  const search = document.getElementById('wh-search')?.value?.toLowerCase() || '';

  // بطاقات المستودعات
  const whGrid = document.getElementById('wh-cards');
  if (whGrid) {
    const whs = (db.warehouses || []).filter(w =>
      !search || w.name.toLowerCase().includes(search) || (w.location||'').toLowerCase().includes(search)
    );
    if (whs.length === 0) {
      whGrid.innerHTML = '<div class="empty-state">لا توجد مستودعات — أضف مستودعاً جديداً</div>';
    } else {
      whGrid.innerHTML = whs.map(w => {
        const whInv = inv[w.id] || {};
        const itemCount = Object.values(whInv).filter(q => q > 0).length;
        const totalVal = db.items.reduce((s, item) => s + (whInv[item.id] || 0) * item.cost, 0);
        return `<div class="wh-card" onclick="openWarehouseDetail('${w.id}')">
          <div class="wh-card-header">
            <span class="wh-icon">🏭</span>
            <div>
              <div class="wh-name">${w.name}</div>
              <div class="wh-loc">${w.location || '—'}</div>
            </div>
            <button class="btn btn-ghost btn-sm" onclick="event.stopPropagation();deleteWarehouse('${w.id}')" style="color:var(--red-600);margin-right:auto">🗑️</button>
          </div>
          <div class="wh-stats">
            <div><span class="wh-stat-val">${itemCount}</span><span class="wh-stat-lbl">مادة</span></div>
            <div><span class="wh-stat-val">${fmtUSD(totalVal)}</span><span class="wh-stat-lbl">قيمة المخزون</span></div>
          </div>
        </div>`;
      }).join('');
    }
  }

  // جدول نقل البضاعة — آخر العمليات
  renderTransfersList();
}

function calcInventoryByWarehouse() {
  // inv[warehouseId][itemId] = qty
  const inv = {};
  const defaultWh = getDefaultWarehouse();

  (db.warehouses || []).forEach(w => { inv[w.id] = {}; });
  if (defaultWh) {
    if (!inv[defaultWh]) inv[defaultWh] = {};
  }

  // فواتير الشراء تضيف للمستودع المحدد (أو الافتراضي)
  activePurchaseInvoices().forEach(pinv => {
    const whId = pinv.warehouseId || defaultWh;
    if (!whId) return;
    if (!inv[whId]) inv[whId] = {};
    (pinv.lines || []).forEach(l => {
      inv[whId][l.itemId] = (inv[whId][l.itemId] || 0) + (parseFloat(l.qty) || 0);
    });
  });

  // فواتير البيع تنقص من المستودع المحدد (أو الافتراضي)
  activeSalesInvoices().forEach(sinv => {
    const whId = sinv.warehouseId || defaultWh;
    if (!whId) return;
    if (!inv[whId]) inv[whId] = {};
    (sinv.lines || []).forEach(l => {
      inv[whId][l.itemId] = (inv[whId][l.itemId] || 0) - (parseFloat(l.qty) || 0);
    });
  });

  // المرتجعات
  (db.returns || []).forEach(ret => {
    const whId = ret.warehouseId || defaultWh;
    if (!whId) return;
    if (!inv[whId]) inv[whId] = {};
    (ret.lines || []).forEach(l => {
      if (ret.type === 'sale') inv[whId][l.itemId] = (inv[whId][l.itemId] || 0) + (parseFloat(l.qty) || 0);
      else inv[whId][l.itemId] = (inv[whId][l.itemId] || 0) - (parseFloat(l.qty) || 0);
    });
  });

  // عمليات النقل
  (db.transfers || []).forEach(t => {
    if (!inv[t.fromWh]) inv[t.fromWh] = {};
    if (!inv[t.toWh]) inv[t.toWh] = {};
    inv[t.fromWh][t.itemId] = (inv[t.fromWh][t.itemId] || 0) - (parseFloat(t.qty) || 0);
    inv[t.toWh][t.itemId] = (inv[t.toWh][t.itemId] || 0) + (parseFloat(t.qty) || 0);
  });

  // التالف يخصم من المستودع
  (db.damages || []).forEach(d => {
    const whId = d.warehouseId || defaultWh;
    if (!whId) return;
    if (!inv[whId]) inv[whId] = {};
    inv[whId][d.itemId] = (inv[whId][d.itemId] || 0) - (parseFloat(d.qty) || 0);
  });

  return inv;
}

function getDefaultWarehouse() {
  if (!db.warehouses || db.warehouses.length === 0) return null;
  return db.warehouses[0].id;
}

function addWarehouse() {
  const name = document.getElementById('wh-new-name')?.value?.trim();
  const loc  = document.getElementById('wh-new-loc')?.value?.trim();
  if (!name) { showToast('أدخل اسم المستودع', 'error'); return; }
  if (!db.warehouses) db.warehouses = [];
  if (db.warehouses.find(w => w.name === name)) { showToast('المستودع موجود مسبقاً', 'error'); return; }
  const id = 'WH-' + String(db.warehouses.length + 1).padStart(3, '0');
  db.warehouses.push({ id, name, location: loc || '' });
  saveData(db);
  document.getElementById('wh-new-name').value = '';
  if (document.getElementById('wh-new-loc')) document.getElementById('wh-new-loc').value = '';
  showToast('✅ تم إضافة المستودع: ' + name, 'success');
  renderWarehouses();
  updateWarehouseSelects();
}

function deleteWarehouse(id) {
  const wh = (db.warehouses || []).find(w => w.id === id);
  if (!wh) return;
  if (!confirm('هل تريد حذف المستودع "' + wh.name + '"؟\nسيتم حذف كل عمليات النقل المرتبطة به.')) return;
  db.warehouses = db.warehouses.filter(w => w.id !== id);
  saveData(db);
  showToast('🗑️ تم حذف المستودع', 'success');
  renderWarehouses();
  updateWarehouseSelects();
}

function openWarehouseDetail(whId) {
  const wh = (db.warehouses || []).find(w => w.id === whId);
  if (!wh) return;
  const inv = calcInventoryByWarehouse();
  const whInv = inv[whId] || {};

  const modal = document.getElementById('wh-detail-modal');
  document.getElementById('wh-detail-name').textContent = wh.name;
  document.getElementById('wh-detail-loc').textContent = wh.location || '—';

  const tbody = document.getElementById('wh-detail-tbody');
  const items = db.items.filter(item => (whInv[item.id] || 0) !== 0);
  if (items.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;padding:16px;color:var(--text-muted)">لا يوجد مخزون في هذا المستودع</td></tr>';
  } else {
    tbody.innerHTML = items.map(item => {
      const qty = whInv[item.id] || 0;
      const val = qty * item.cost;
      const isLow = qty < item.minStock;
      return `<tr class="${isLow ? 'row-warning' : ''}">
        <td><span class="item-id">${item.id}</span></td>
        <td><strong>${item.name}</strong></td>
        <td><span class="stock-num ${isLow ? 'badge-warning' : ''}">${qty} ${item.unit}</span></td>
        <td>${fmtUSD(val)}</td>
      </tr>`;
    }).join('');
  }

  modal.classList.remove('hidden');
  modal.style.display = 'flex';
}

function closeWhDetailModal() {
  const modal = document.getElementById('wh-detail-modal');
  if (modal) { modal.classList.add('hidden'); modal.style.display = 'none'; }
}

// نقل بضاعة بين مستودعات
function updateTransferItems() {
  const fromWh = document.getElementById('tr-from-wh')?.value;
  const inv = calcInventoryByWarehouse();
  const whInv = fromWh ? (inv[fromWh] || {}) : {};
  const sel = document.getElementById('tr-item');
  if (!sel) return;
  sel.innerHTML = '<option value="">-- اختر مادة --</option>';
  db.items.forEach(item => {
    const qty = whInv[item.id] || 0;
    if (qty > 0) {
      const opt = document.createElement('option');
      opt.value = item.id;
      opt.textContent = item.name + '  (متاح: ' + qty + ' ' + item.unit + ')';
      sel.appendChild(opt);
    }
  });
}

function updateTransferMaxQty() {
  const fromWh = document.getElementById('tr-from-wh')?.value;
  const itemId = document.getElementById('tr-item')?.value;
  if (!fromWh || !itemId) return;
  const inv = calcInventoryByWarehouse();
  const available = (inv[fromWh] || {})[itemId] || 0;
  const qtyEl = document.getElementById('tr-qty');
  if (qtyEl) { qtyEl.max = available; qtyEl.placeholder = 'الحد الأقصى: ' + available; }
}

function saveTransfer() {
  const fromWh = document.getElementById('tr-from-wh')?.value;
  const toWh   = document.getElementById('tr-to-wh')?.value;
  const itemId = document.getElementById('tr-item')?.value;
  const qty    = parseFloat(document.getElementById('tr-qty')?.value || 0);
  const date   = document.getElementById('tr-date')?.value || new Date().toISOString().split('T')[0];
  const note   = document.getElementById('tr-note')?.value || '';

  if (!fromWh) { showToast('اختر مستودع المصدر', 'error'); return; }
  if (!toWh)   { showToast('اختر مستودع الوجهة', 'error'); return; }
  if (fromWh === toWh) { showToast('المستودعان متماثلان!', 'error'); return; }
  if (!itemId) { showToast('اختر المادة', 'error'); return; }
  if (!qty || qty <= 0) { showToast('أدخل كمية صحيحة', 'error'); return; }

  // تحقق من الكمية المتاحة
  const inv = calcInventoryByWarehouse();
  const available = (inv[fromWh] || {})[itemId] || 0;
  if (qty > available) { showToast('الكمية المطلوبة أكبر من المتاح (' + available + ')', 'error'); return; }

  if (!db.transfers) db.transfers = [];
  const id = 'TRF-' + String(db.transfers.length + 1).padStart(3, '0');
  const fromName = (db.warehouses || []).find(w => w.id === fromWh)?.name || fromWh;
  const toName   = (db.warehouses || []).find(w => w.id === toWh)?.name || toWh;
  const item = db.items.find(i => i.id === itemId);

  db.transfers.push({ id, fromWh, toWh, fromName, toName, itemId, itemName: item?.name || itemId, qty, date, note });
  saveData(db);

  // مسح الحقول
  ['tr-item','tr-qty','tr-note'].forEach(id => { const el = document.getElementById(id); if(el) el.value = ''; });
  showToast('✅ تم نقل ' + qty + ' ' + (item?.unit||'') + ' من ' + fromName + ' إلى ' + toName, 'success');
  renderWarehouses();
}

function renderTransfersList() {
  const el = document.getElementById('transfers-list');
  if (!el) return;
  const transfers = (db.transfers || []).slice().reverse();
  if (transfers.length === 0) {
    el.innerHTML = '<div class="empty-state">لا توجد عمليات نقل بعد</div>';
    return;
  }
  el.innerHTML = transfers.map(t => {
    const item = db.items.find(i => i.id === t.itemId);
    return `<div class="invoice-row">
      <span class="item-id">${t.id}</span>
      <span>${t.itemName || t.itemId}</span>
      <span style="color:var(--red-600)">من: ${t.fromName}</span>
      <span style="color:var(--green-700)">إلى: ${t.toName}</span>
      <span class="stock-num">${t.qty} ${item?.unit||''}</span>
      <span class="inv-date">${t.date}</span>
    </div>`;
  }).join('');
}

function updateWarehouseSelects() {
  const whs = db.warehouses || [];
  ['tr-from-wh', 'tr-to-wh', 'sale-warehouse', 'pur-warehouse'].forEach(selId => {
    const sel = document.getElementById(selId);
    if (!sel) return;
    const cur = sel.value;
    sel.innerHTML = '<option value="">-- اختر مستودع --</option>';
    whs.forEach(w => {
      const opt = document.createElement('option');
      opt.value = w.id;
      opt.textContent = w.name;
      if (w.id === cur) opt.selected = true;
      sel.appendChild(opt);
    });
  });
}


// ============================================================
// نظام التالف — Damages
// ============================================================

function renderDamageStats() {
  const damages = db.damages || [];
  const totalLoss = damages.reduce((s, d) => s + damageLoss(d), 0);
  const el = document.getElementById('dmg-total-loss');
  if (el) el.textContent = fmtUSD(totalLoss);
  const el2 = document.getElementById('dmg-count');
  if (el2) el2.textContent = damages.length + ' سجل';
  const el3 = document.getElementById('dmg-num');
  if (el3) el3.textContent = nextDamageNumber();
}

// توليد رقم تسلسلي متزايد لا يتكرر: DMG-XXX = أكبر رقم موجود + 1.
// يعتمد على أكبر قيمة وليس طول المصفوفة، فلا يتكرر الرقم بعد الحذف.
function nextDamageNumber() {
  const nums = (db.damages || []).map(d => {
    const m = /^DMG-(\d+)$/.exec(d.number || '');
    return m ? parseInt(m[1], 10) : 0;
  });
  const max = nums.length ? Math.max(...nums) : 0;
  return 'DMG-' + String(max + 1).padStart(3, '0');
}

// قيمة خسارة سجل تالف = الكمية × سعر تكلفة الشراء (وليس سعر البيع).
// تُفضّل التكلفة المخزّنة وقت التسجيل (لقطة ثابتة) حتى لا تتغير الخسارة التاريخية
// إذا عُدّل سعر تكلفة الصنف لاحقاً؛ وإن غابت تُستخدم تكلفة الصنف الحالية.
function damageLoss(d) {
  const qty = parseFloat(d.qty) || 0;
  let cost = (d.cost != null && d.cost !== '') ? parseFloat(d.cost) : NaN;
  if (!(cost >= 0)) {
    const item = db.items.find(i => i.id === d.itemId);
    cost = item?.cost || 0;
  }
  return qty * cost;
}

function renderDamagesList(search, period) {
  const el = document.getElementById('damages-list');
  const all = (db.damages || []).slice().reverse();
  let filtered = all.filter(d => damageInPeriod(d, period));
  if (search) {
    filtered = filtered.filter(d => (d.itemName || '').toLowerCase().includes(search) || (d.reason || '').toLowerCase().includes(search) || (d.number || '').toLowerCase().includes(search));
  }

  // إجمالي خسائر الفترة المفلترة (اليوم/الشهر/الكل)
  const periodLoss = filtered.reduce((s, d) => s + damageLoss(d), 0);
  const lossEl = document.getElementById('dmg-period-loss');
  if (lossEl) lossEl.textContent = fmtUSD(periodLoss);
  const cntEl = document.getElementById('dmg-period-count');
  if (cntEl) cntEl.textContent = '(' + filtered.length + ' سجل)';

  if (!el) return;
  if (filtered.length === 0) {
    const hasFilter = !!search || (period && period.type !== 'all' && !!period.value);
    el.innerHTML = hasFilter ? '<div class="empty-state">🔍 لا توجد نتائج ضمن الفلترة</div>' : '<div class="empty-state">لا توجد سجلات تالف بعد</div>';
    return;
  }

  el.innerHTML = filtered.map(d => {
    const item = db.items.find(i => i.id === d.itemId);
    const loss = damageLoss(d);
    const whName = d.warehouseId ? ((db.warehouses || []).find(w => w.id === d.warehouseId)?.name || d.warehouseId) : '—';
    return `<div class="invoice-row">
      <span class="item-id">${d.number || '—'}</span>
      <span><strong>${d.itemName || d.itemId}</strong></span>
      <span class="badge-warning">${d.qty} ${item?.unit || ''}</span>
      <span style="color:var(--text-muted);font-size:12px">${d.reason || '—'}</span>
      <span style="color:var(--red-600);font-weight:600">${fmtUSD(loss)}</span>
      <span style="color:var(--text-muted);font-size:12px">🏭 ${whName}</span>
      <span class="inv-date">${d.date}</span>
      <button class="btn btn-ghost btn-sm" onclick="deleteDamage('${d.number}')" style="color:var(--red-600)">🗑️</button>
    </div>`;
  }).join('');
}

function saveDamage() {
  const itemId = document.getElementById('dmg-item')?.value;
  const qty    = parseFloat(document.getElementById('dmg-qty')?.value || 0);
  const reason = document.getElementById('dmg-reason')?.value?.trim() || '';
  const date   = document.getElementById('dmg-date')?.value || new Date().toISOString().split('T')[0];
  const note   = document.getElementById('dmg-note')?.value?.trim() || '';
  const whId   = document.getElementById('dmg-warehouse')?.value || getDefaultWarehouse() || '';

  if (!itemId) { showToast('اختر المادة', 'error'); return; }
  if (!qty || qty <= 0) { showToast('أدخل كمية صحيحة', 'error'); return; }

  // تحقق من المخزون المتاح
  const inv = calcInventoryByWarehouse();
  const defaultWh = whId || getDefaultWarehouse();
  const available = defaultWh ? ((inv[defaultWh] || {})[itemId] || 0) : (calcInventory()[itemId] || 0);
  if (qty > available + 0.001) {
    showToast('الكمية التالفة (' + qty + ') أكبر من المخزون المتاح (' + available + ')', 'error');
    return;
  }

  if (!db.damages) db.damages = [];
  const item = db.items.find(i => i.id === itemId);
  const number = nextDamageNumber();
  const cost = item?.cost || 0;

  // تخزين السجل مع لقطة سعر التكلفة ووقت الإنشاء.
  // خصم الكمية من المخزون يتم تلقائياً عبر calcInventory/computeInventory (التالف −).
  db.damages.push({
    number, itemId, itemName: item?.name || itemId,
    qty, reason, date, note,
    cost,
    warehouseId: whId || '',
    createdAt: new Date().toISOString()
  });

  saveData(db);

  // مسح الحقول
  ['dmg-item', 'dmg-qty', 'dmg-reason', 'dmg-note'].forEach(id => {
    const el = document.getElementById(id);
    if (el) { if (el.tagName === 'SELECT') el.value = ''; else el.value = ''; }
  });
  const dateEl = document.getElementById('dmg-date');
  if (dateEl) dateEl.value = new Date().toISOString().split('T')[0];

  const loss = qty * cost;
  showToast('✅ تم تسجيل التالف: ' + item?.name + ' — خسارة: ' + fmtUSD(loss), 'success');
  renderDamages();
}

function deleteDamage(number) {
  if (!confirm('هل تريد حذف هذا السجل؟')) return;
  db.damages = (db.damages || []).filter(d => d.number !== number);
  saveData(db);
  showToast('🗑️ تم حذف السجل', 'success');
  renderDamages();
}

function printDamagesReport() {
  const damages = db.damages || [];
  const totalLoss = damages.reduce((s, d) => s + damageLoss(d), 0);

  const rows = damages.map((d, i) => {
    const item = db.items.find(it => it.id === d.itemId);
    const loss = damageLoss(d);
    return `<tr>
      <td>${i+1}</td>
      <td>${d.number}</td>
      <td>${d.itemName || d.itemId}</td>
      <td>${d.qty} ${item?.unit||''}</td>
      <td>${d.reason || '—'}</td>
      <td>${d.date}</td>
      <td style="color:#dc2626;font-weight:700">${fmtUSD(loss)}</td>
    </tr>`;
  }).join('');

  const win = window.open('', '_blank');
  win.document.write(`<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head><meta charset="UTF-8"><title>تقرير المواد التالفة</title>
<style>
  body{font-family:'Segoe UI',Tahoma,Arial,sans-serif;margin:0;padding:20px;color:#1a1a1a;}
  .header{background:#dc2626;color:white;padding:20px;border-radius:8px;margin-bottom:20px;text-align:center;}
  .header h1{margin:0;font-size:22px;}
  .header p{margin:4px 0;font-size:12px;opacity:.85;}
  .kpi{display:inline-block;background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:12px 24px;margin-bottom:20px;text-align:center;}
  .kpi-val{font-size:22px;font-weight:700;color:#dc2626;}
  .kpi-lbl{font-size:12px;color:#64748b;}
  table{width:100%;border-collapse:collapse;}
  thead th{background:#dc2626;color:white;padding:8px;font-size:12px;-webkit-print-color-adjust:exact;print-color-adjust:exact;}
  tbody td{padding:7px 8px;border-bottom:1px solid #e2e8f0;font-size:12px;}
  tbody tr:nth-child(even){background:#fef2f2;}
  .footer{text-align:center;margin-top:20px;font-size:11px;color:#94a3b8;border-top:1px solid #eee;padding-top:8px;}
  @media print{body{padding:10px;}}
</style></head><body>
<div class="header">
  <h1>${db.company.name}</h1>
  <p>تقرير المواد التالفة — ${new Date().toLocaleDateString('ar-SY')}</p>
</div>
<div class="kpi">
  <div class="kpi-val">${fmtUSD(totalLoss)}</div>
  <div class="kpi-lbl">إجمالي الخسائر من التالف</div>
</div>
<table>
  <thead><tr><th>#</th><th>رقم السجل</th><th>المادة</th><th>الكمية</th><th>السبب</th><th>التاريخ</th><th>الخسارة</th></tr></thead>
  <tbody>${rows}</tbody>
</table>
<div class="footer">تم إنشاء التقرير بواسطة برنامج المحاسبة والمستودعات</div>
<script>window.onload=()=>window.print();<\/script>
</body></html>`);
  win.document.close();
}

// حساب المخزون — يشمل التالف
function calcInventory() {
  const inv = {};
  activePurchaseInvoices().forEach(pinv => {
    (pinv.lines || []).forEach(l => {
      inv[l.itemId] = (inv[l.itemId] || 0) + (parseFloat(l.qty) || 0);
    });
  });
  activeSalesInvoices().forEach(sinv => {
    (sinv.lines || []).forEach(l => {
      inv[l.itemId] = (inv[l.itemId] || 0) - (parseFloat(l.qty) || 0);
    });
  });
  (db.returns || []).forEach(r => {
    (r.lines || []).forEach(l => {
      if (r.type === 'sale') inv[l.itemId] = (inv[l.itemId] || 0) + (parseFloat(l.qty) || 0);
      else inv[l.itemId] = (inv[l.itemId] || 0) - (parseFloat(l.qty) || 0);
    });
  });
  // خصم التالف
  (db.damages || []).forEach(d => {
    if (!inv[d.itemId]) inv[d.itemId] = 0;
    inv[d.itemId] -= parseFloat(d.qty) || 0;
  });
  return inv;
}

// تحديث قوائم المواد في صفحة التالف
function populateDamageItems() {
  const sel = document.getElementById('dmg-item');
  if (!sel) return;
  const inv = calcInventory();
  sel.innerHTML = '<option value="">-- اختر مادة --</option>';
  db.items.forEach(item => {
    const qty = inv[item.id] || 0;
    if (qty > 0) {
      const opt = document.createElement('option');
      opt.value = item.id;
      opt.textContent = item.name + '  (مخزون: ' + qty + ' ' + item.unit + ')';
      sel.appendChild(opt);
    }
  });
}

// تجميع عرض صفحة التالف: الإحصاءات + القائمة (مع فلترة الفترة) + تعبئة المواد + تاريخ اليوم.
// (استبدال تغليف قديم كان يستدعي نفسه فيسبّب تكراراً لا نهائياً ولا يعرض القائمة/الإحصاءات.)
function renderDamages() {
  const search = (document.getElementById('dmg-search')?.value || '').toLowerCase().trim();
  const period = getDamagePeriodFilter();
  renderDamageStats();
  renderDamagesList(search, period);
  populateDamageItems();
  fillTodayDates('dmg-date');
}

// قراءة فلتر الفترة في شاشة سجل التوالف: الكل / يوم محدد / شهر محدد.
function getDamagePeriodFilter() {
  const type = document.getElementById('dmg-filter-type')?.value || 'all';
  if (type === 'day')   return { type, value: document.getElementById('dmg-filter-day')?.value || '' };
  if (type === 'month') return { type, value: document.getElementById('dmg-filter-month')?.value || '' };
  return { type: 'all', value: '' };
}

// هل يقع سجل التالف ضمن الفترة المختارة؟ (اعتماداً على d.date بصيغة YYYY-MM-DD)
function damageInPeriod(d, period) {
  if (!period || period.type === 'all' || !period.value) return true;
  const date = (d.date || '').slice(0, 10);
  if (period.type === 'day')   return date === period.value;
  if (period.type === 'month') return date.slice(0, 7) === period.value;
  return true;
}

// تبديل حقول فلتر الفترة (يوم/شهر) ثم إعادة العرض.
function onDamageFilterChange() {
  const type = document.getElementById('dmg-filter-type')?.value || 'all';
  const dayEl   = document.getElementById('dmg-filter-day');
  const monthEl = document.getElementById('dmg-filter-month');
  if (dayEl)   dayEl.style.display   = type === 'day'   ? '' : 'none';
  if (monthEl) monthEl.style.display = type === 'month' ? '' : 'none';
  if (type === 'day'   && dayEl   && !dayEl.value)   dayEl.value   = new Date().toISOString().split('T')[0];
  if (type === 'month' && monthEl && !monthEl.value) monthEl.value = new Date().toISOString().slice(0, 7);
  renderDamages();
}


// ============================================================
// دوال العملة في إيصالات القبض والدفع
// ============================================================

function getAmountInUSD(amount, currency) {
  const rate = db.exchange ? db.exchange.usdToOld : 12000;
  if (currency === 'SYP_OLD') return amount / rate;
  if (currency === 'SYP_NEW') return amount / (rate / 100);
  return amount; // USD
}

function formatEquiv(amountUSD) {
  const rate = db.exchange ? db.exchange.usdToOld : 12000;
  return fmtUSD(amountUSD) + ' = ' + fmtOld(amountUSD * rate) + ' = ' + fmtNew(amountUSD * rate / 100);
}

// ====== إيصال الزبون ======
function updateCustCurrency() {
  const currency = document.getElementById('rec-cust-currency')?.value || 'USD';
  const raw = parseFloat(document.getElementById('rec-cust-amount')?.value || 0);
  const el = document.getElementById('rec-cust-equiv');
  if (!el) return;
  if (!raw || raw <= 0) { el.textContent = '—'; return; }
  const usd = getAmountInUSD(raw, currency);
  el.textContent = formatEquiv(usd);
  updateCustBalance();
}

// override updateCustBalance لتحسب بالعملة الصحيحة
const _origUpdateCustBalance = typeof updateCustBalance === 'function' ? updateCustBalance : null;
function updateCustBalance() {
  const name     = document.getElementById('rec-cust-name')?.value?.trim();
  const raw      = parseFloat(document.getElementById('rec-cust-amount')?.value || 0);
  const currency = document.getElementById('rec-cust-currency')?.value || 'USD';
  const amount   = getAmountInUSD(raw, currency);
  const discount = parseFloat(document.getElementById('rec-cust-discount')?.value || 0);
  const el       = document.getElementById('rec-cust-balance-preview');
  if (!el) return;
  if (!name || !amount) { el.style.display = 'none'; return; }
  const acc = getCustomerAccount(name);
  const after = Math.max(0, acc.remaining - amount + discount);
  el.style.display = 'block';
  el.innerHTML = `متبقي بعد الدفع: <strong style="color:${after<0.01?'var(--green-700)':'var(--red-600)'}">${fmtUSD(after)}</strong>`;
  // تحديث المعادل
  const equiv = document.getElementById('rec-cust-equiv');
  if (equiv && raw > 0) equiv.textContent = formatEquiv(amount);
}

// override saveReceiptCustomer لتحويل العملة قبل الحفظ
const _origSaveReceiptCustomer = typeof saveReceiptCustomer === 'function' ? saveReceiptCustomer : null;
// ====== إيصال المورد ======
function updateSupCurrency() {
  const currency = document.getElementById('rec-sup-currency')?.value || 'USD';
  const raw = parseFloat(document.getElementById('rec-sup-amount')?.value || 0);
  const el = document.getElementById('rec-sup-equiv');
  if (!el) return;
  if (!raw || raw <= 0) { el.textContent = '—'; return; }
  const usd = getAmountInUSD(raw, currency);
  el.textContent = formatEquiv(usd);
}

// override saveReceiptSupplier
const _origSaveReceiptSupplier = typeof saveReceiptSupplier === 'function' ? saveReceiptSupplier : null;
// ============================================================
// ربط الإيصالات بالفواتير — زبون ومورد
// ============================================================

// ====== متغيرات الربط ======
let _custLinkedInvoice = null;  // رقم فاتورة البيع المربوطة
let _supLinkedInvoice  = null;  // رقم فاتورة الشراء المربوطة

// ====== جانب الزبون ======

function loadCustDeferredInvoices() {
  const name = document.getElementById('rec-cust-name')?.value?.trim();
  const panel = document.getElementById('cust-deferred-panel');
  const list  = document.getElementById('cust-deferred-list');
  if (!panel || !list) return;

  // إلغاء الربط عند تغيير الزبون
  _custLinkedInvoice = null;
  hideCustLinkedBadge();

  if (!name) { panel.style.display = 'none'; return; }

  // فواتير آجلة غير مسددة بالكامل
  const invs = getDeferredInvoicesForCustomer(name);
  if (invs.length === 0) { panel.style.display = 'none'; return; }

  panel.style.display = 'block';
  list.innerHTML = invs.map(inv => {
    const rem = rcGetInvoiceRemaining(inv, name);
    return `<div class="inv-link-row" onclick="linkCustInvoice('${inv.number}', ${rem})"
      style="display:flex;align-items:center;justify-content:space-between;background:white;border:1px solid #fde68a;border-radius:8px;padding:8px 12px;cursor:pointer;transition:background .15s;"
      onmouseover="this.style.background='#fef9c3'" onmouseout="this.style.background='white'">
      <span style="font-weight:700;font-family:monospace;color:#92400e">${inv.number}</span>
      <span style="font-size:12px;color:#64748b">${inv.date}</span>
      <span style="font-size:12px">إجمالي: <strong>${fmtUSD(inv.total)}</strong></span>
      <span style="color:#dc2626;font-weight:700">متبقي: ${fmtUSD(rem)}</span>
      <span style="font-size:11px;background:#fef3c7;color:#92400e;padding:2px 8px;border-radius:10px">اضغط للربط</span>
    </div>`;
  }).join('');
}

function linkCustInvoice(invNum, remaining) {
  _custLinkedInvoice = invNum;

  // تعبئة المبلغ تلقائياً بالمتبقي
  const amtEl = document.getElementById('rec-cust-amount');
  if (amtEl) { amtEl.value = Math.round(remaining * 100) / 100; }

  // تعبئة البيان
  const descEl = document.getElementById('rec-cust-desc');
  if (descEl && !descEl.value) descEl.value = 'سداد فاتورة ' + invNum;

  // إظهار badge الربط
  const badge = document.getElementById('cust-linked-inv');
  const num   = document.getElementById('cust-linked-inv-num');
  if (badge) badge.style.display = 'block';
  if (num)   num.textContent = invNum;

  updateCustBalance();
  updateCustCurrency();
  showToast('🔗 تم ربط الإيصال بالفاتورة ' + invNum, 'success');
}

function unlinkCustInvoice() {
  _custLinkedInvoice = null;
  hideCustLinkedBadge();
  showToast('تم إلغاء ربط الفاتورة', 'success');
}

function hideCustLinkedBadge() {
  const badge = document.getElementById('cust-linked-inv');
  if (badge) badge.style.display = 'none';
}

// ====== جانب المورد ======

function loadSupDeferredInvoices() {
  const name  = document.getElementById('rec-sup-name')?.value?.trim();
  const panel = document.getElementById('sup-deferred-panel');
  const list  = document.getElementById('sup-deferred-list');
  if (!panel || !list) return;

  _supLinkedInvoice = null;
  hideSupLinkedBadge();

  if (!name) { panel.style.display = 'none'; return; }

  // فواتير شراء آجلة غير مسددة
  const invs = getDeferredInvoicesForSupplier(name);
  if (invs.length === 0) { panel.style.display = 'none'; return; }

  panel.style.display = 'block';
  list.innerHTML = invs.map(inv => {
    const rem = getSupInvoiceRemaining(inv, name);
    return `<div onclick="linkSupInvoice('${inv.number}', ${rem})"
      style="display:flex;align-items:center;justify-content:space-between;background:white;border:1px solid #bbf7d0;border-radius:8px;padding:8px 12px;cursor:pointer;transition:background .15s;"
      onmouseover="this.style.background='#f0fdf4'" onmouseout="this.style.background='white'">
      <span style="font-weight:700;font-family:monospace;color:#15803d">${inv.number}</span>
      <span style="font-size:12px;color:#64748b">${inv.date}</span>
      <span style="font-size:12px">إجمالي: <strong>${fmtUSD(inv.total)}</strong></span>
      <span style="color:#dc2626;font-weight:700">متبقي: ${fmtUSD(rem)}</span>
      <span style="font-size:11px;background:#dcfce7;color:#15803d;padding:2px 8px;border-radius:10px">اضغط للربط</span>
    </div>`;
  }).join('');
}

function getDeferredInvoicesForSupplier(supplierName) {
  return activePurchaseInvoices().filter(inv => {
    if (inv.supplierName !== supplierName) return false;
    if ((inv.paymentType || 'cash') !== 'deferred') return false;
    return getSupInvoiceRemaining(inv, supplierName) > 0.005;
  });
}

// المتبقي على فاتورة شراء — المصدر الوحيد هو invoiceBalance
function getSupInvoiceRemaining(inv) {
  return invoiceBalance(inv).remaining;
}

function linkSupInvoice(invNum, remaining) {
  _supLinkedInvoice = invNum;

  const amtEl = document.getElementById('rec-sup-amount');
  if (amtEl) { amtEl.value = Math.round(remaining * 100) / 100; }

  const descEl = document.getElementById('rec-sup-desc');
  if (descEl && !descEl.value) descEl.value = 'سداد فاتورة ' + invNum;

  const badge = document.getElementById('sup-linked-inv');
  const num   = document.getElementById('sup-linked-inv-num');
  if (badge) badge.style.display = 'block';
  if (num)   num.textContent = invNum;

  updateSupCurrency();
  showToast('🔗 تم ربط الدفعة بالفاتورة ' + invNum, 'success');
}

function unlinkSupInvoice() {
  _supLinkedInvoice = null;
  hideSupLinkedBadge();
  showToast('تم إلغاء ربط الفاتورة', 'success');
}

function hideSupLinkedBadge() {
  const badge = document.getElementById('sup-linked-inv');
  if (badge) badge.style.display = 'none';
}

// ====== override saveReceiptCustomer لتضمين الربط ======
function saveReceiptCustomer() {
  const customerName = document.getElementById('rec-cust-name')?.value?.trim();
  const raw          = parseFloat(document.getElementById('rec-cust-amount')?.value || 0);
  const currency     = document.getElementById('rec-cust-currency')?.value || 'USD';
  const amountUSD    = getAmountInUSD(raw, currency);
  const date         = document.getElementById('rec-cust-date')?.value || new Date().toISOString().split('T')[0];
  const desc         = document.getElementById('rec-cust-desc')?.value || '';
  const method       = document.getElementById('rec-cust-method')?.value || 'cash';
  const cheque       = document.getElementById('rec-cust-cheque')?.value || '';
  const note         = document.getElementById('rec-cust-note')?.value || '';
  const discount     = parseFloat(document.getElementById('rec-cust-discount')?.value || 0);

  if (!customerName) { showToast('اختر اسم الزبون', 'error'); return; }
  if (!amountUSD || amountUSD <= 0) { showToast('أدخل المبلغ', 'error'); return; }

  // ربط يدوي؟ تحقق من عدم تجاوز المتبقي على الفاتورة المربوطة
  if (_custLinkedInvoice) {
    const inv = db.salesInvoices.find(i => i.number === _custLinkedInvoice);
    if (inv) {
      const rem = rcGetInvoiceRemaining(inv);
      if (amountUSD > rem + 0.005) {
        showToast('المبلغ أكبر من المتبقي على الفاتورة ' + _custLinkedInvoice + ' (' + fmtUSD(rem) + ')', 'error');
        return;
      }
    }
  }

  // رصيد إضافي: إن تجاوز المبلغ إجمالي المطلوب على كل الفواتير المفتوحة
  // (المسار العام بدون ربط يدوي) — أوقف الحفظ واسأل عن حفظ الفرق كرصيد إضافي
  let creditAdded = 0;
  if (!_custLinkedInvoice) {
    const outstanding = getCustomerAccount(customerName).remaining;
    const netDue = Math.max(0, roundMoney(outstanding - discount));
    const over = computeOverpayment(amountUSD, netDue);
    if (over.isOverpayment) {
      creditAdded = over.creditAdded;
      const ok = confirm('المبلغ يتجاوز المطلوب بمقدار ' + fmtUSD(creditAdded) +
        ' — هل تريد حفظ الفرق كرصيد إضافي للعميل؟');
      if (!ok) return; // إيقاف الحفظ الطبيعي
    }
  }

  // ربط تلقائي: إن لم يربط المستخدم يدوياً، اربط الدفعة بأقدم فاتورة آجلة مفتوحة
  let linkedInvoice = _custLinkedInvoice || '';
  if (!linkedInvoice) {
    const open = getDeferredInvoicesForCustomer(customerName)
      .slice()
      .sort((a, b) => (new Date(a.date) - new Date(b.date)) || String(a.number).localeCompare(String(b.number)));
    if (open.length) linkedInvoice = open[0].number;
  }

  db.invoiceCounters.receipt = (db.invoiceCounters.receipt || 0) + 1;
  const receiptNum = 'REC-' + String(db.invoiceCounters.receipt).padStart(3, '0');

  db.customerPayments = db.customerPayments || [];
  db.customerPayments.push({
    receiptNum, customerName,
    amount: amountUSD,
    rawAmount: raw,
    currency,
    discountOnPayment: discount,
    paymentMethod: method,
    chequeNum: cheque,
    description: desc || (creditAdded > CREDIT_EPSILON
      ? 'دفعة زائدة — منها ' + fmtUSD(creditAdded) + ' رصيد إضافي'
      : (linkedInvoice ? 'سداد فاتورة ' + linkedInvoice : '')),
    creditAdded, // فائض محوَّل لرصيد إضافي — يُستثنى من قوة السداد على الفواتير
    linkedInvoice,
    note, date
  });

  // تحديث رصيد الزبون — الجزء المطبَّق على الفواتير فقط (نستثني الفائض)
  const cust = db.customers.find(c => c.name === customerName);
  if (cust) {
    const appliedCash = amountUSD - creditAdded;
    cust.balance = Math.max(0, (cust.balance || 0) - appliedCash - discount);
  }
  // الفائض يُضاف للرصيد الإضافي عبر السجل الموحّد — مربوط برقم الإيصال
  if (creditAdded > CREDIT_EPSILON) {
    applyCreditMovement({ partyType:'customer', partyName:customerName, delta:creditAdded,
      refType:'receipt', ref:receiptNum, date, key:'receipt-add:'+receiptNum });
    showToast('💰 تم حفظ ' + fmtUSD(creditAdded) + ' كرصيد إضافي للعميل — الرصيد الآن ' + fmtUSD(cust ? cust.creditBalance : creditAdded), 'success');
  }

  // الفاتورة المربوطة — احسب حالتها حياً بعد إضافة الدفعة
  if (linkedInvoice) {
    const inv = db.salesInvoices.find(i => i.number === linkedInvoice);
    if (inv) {
      if (invoiceBalance(inv).closed) {
        inv.paymentStatus = 'paid';
        showToast('🎉 تمت تسوية الفاتورة ' + linkedInvoice + ' بالكامل!', 'success');
      } else {
        inv.paymentStatus = 'partial';
      }
    }
  }

  saveData(db);

  const currencyLabel = { USD: 'دولار', SYP_NEW: 'ل.س جديدة', SYP_OLD: 'ل.س قديمة' }[currency] || '';
  const linkMsg = linkedInvoice ? ' ← ' + linkedInvoice : '';
  showToast('✅ تم حفظ الإيصال ' + receiptNum + linkMsg + ' — ' + raw + ' ' + currencyLabel, 'success');

  // reset
  _custLinkedInvoice = null;
  hideCustLinkedBadge();
  ['rec-cust-name','rec-cust-amount','rec-cust-cheque','rec-cust-desc','rec-cust-note'].forEach(id => {
    const el = document.getElementById(id); if (el) el.value = '';
  });
  if (document.getElementById('rec-cust-discount')) document.getElementById('rec-cust-discount').value = '0';
  if (document.getElementById('rec-cust-equiv'))    document.getElementById('rec-cust-equiv').textContent = '—';
  if (document.getElementById('rec-cust-currency')) document.getElementById('rec-cust-currency').value = 'USD';
  const panel = document.getElementById('cust-deferred-panel');
  if (panel) panel.style.display = 'none';
  renderReceiptCustomer();
}

// ====== override saveReceiptSupplier لتضمين الربط ======
function saveReceiptSupplier() {
  const supplierName = document.getElementById('rec-sup-name')?.value?.trim();
  const raw          = parseFloat(document.getElementById('rec-sup-amount')?.value || 0);
  const currency     = document.getElementById('rec-sup-currency')?.value || 'USD';
  const amountUSD    = getAmountInUSD(raw, currency);
  const date         = document.getElementById('rec-sup-date')?.value || new Date().toISOString().split('T')[0];
  const desc         = document.getElementById('rec-sup-desc')?.value || '';
  const method       = document.getElementById('rec-sup-method')?.value || 'cash';
  const cheque       = document.getElementById('rec-sup-cheque')?.value || '';
  const note         = document.getElementById('rec-sup-note')?.value || '';
  const discount     = parseFloat(document.getElementById('rec-sup-discount')?.value || 0);

  if (!supplierName) { showToast('اختر اسم المورد', 'error'); return; }
  if (!amountUSD || amountUSD <= 0) { showToast('أدخل المبلغ', 'error'); return; }

  // ربط يدوي؟ تحقق من عدم تجاوز المتبقي
  if (_supLinkedInvoice) {
    const inv = db.purchaseInvoices.find(i => i.number === _supLinkedInvoice);
    if (inv) {
      const rem = getSupInvoiceRemaining(inv);
      if (amountUSD > rem + 0.005) {
        showToast('المبلغ أكبر من المتبقي على الفاتورة ' + _supLinkedInvoice + ' (' + fmtUSD(rem) + ')', 'error');
        return;
      }
    }
  }

  // رصيد إضافي مستحق لنا من المورد: إن تجاوز المدفوع إجمالي المطلوب على كل الفواتير المفتوحة
  let creditAdded = 0;
  if (!_supLinkedInvoice) {
    const outstanding = getSupplierAccount(supplierName).remaining;
    const netDue = Math.max(0, roundMoney(outstanding - discount));
    const over = computeOverpayment(amountUSD, netDue);
    if (over.isOverpayment) {
      creditAdded = over.creditAdded;
      const ok = confirm('المبلغ يتجاوز المطلوب بمقدار ' + fmtUSD(creditAdded) +
        ' — هل تريد حفظ الفرق كرصيد إضافي مستحق لنا من المورد؟');
      if (!ok) return; // إيقاف الحفظ الطبيعي
    }
  }

  // ربط تلقائي بأقدم فاتورة شراء آجلة مفتوحة
  let linkedInvoice = _supLinkedInvoice || '';
  if (!linkedInvoice) {
    const open = getDeferredInvoicesForSupplier(supplierName)
      .slice()
      .sort((a, b) => (new Date(a.date) - new Date(b.date)) || String(a.number).localeCompare(String(b.number)));
    if (open.length) linkedInvoice = open[0].number;
  }

  db.invoiceCounters.receipt = (db.invoiceCounters.receipt || 0) + 1;
  const receiptNum = 'REC-' + String(db.invoiceCounters.receipt).padStart(3, '0');

  db.supplierPayments = db.supplierPayments || [];
  db.supplierPayments.push({
    receiptNum, supplierName,
    amount: amountUSD,
    rawAmount: raw,
    currency,
    discountOnPayment: discount,
    paymentMethod: method,
    chequeNum: cheque,
    description: desc || (creditAdded > CREDIT_EPSILON
      ? 'دفعة زائدة — منها ' + fmtUSD(creditAdded) + ' رصيد إضافي'
      : (linkedInvoice ? 'سداد فاتورة ' + linkedInvoice : '')),
    creditAdded, // فائض محوَّل لرصيد إضافي — يُستثنى من قوة السداد على الفواتير
    linkedInvoice,
    note, date
  });

  // تحديث رصيد المورد — الجزء المطبَّق على الفواتير فقط (نستثني الفائض)
  const sup = (db.suppliers || []).find(s => s.name === supplierName);
  if (sup) {
    const appliedCash = amountUSD - creditAdded;
    sup.balance = Math.max(0, (sup.balance || 0) - appliedCash - discount);
  }
  // الفائض يُضاف للرصيد الإضافي عبر السجل الموحّد — مربوط برقم الإيصال
  if (creditAdded > CREDIT_EPSILON) {
    applyCreditMovement({ partyType:'supplier', partyName:supplierName, delta:creditAdded,
      refType:'receipt', ref:receiptNum, date, key:'receipt-add:'+receiptNum });
    showToast('💰 تم حفظ ' + fmtUSD(creditAdded) + ' كرصيد إضافي مستحق لنا من المورد — الرصيد الآن ' + fmtUSD(sup ? sup.creditBalance : creditAdded), 'success');
  }

  // الفاتورة المربوطة — احسب حالتها حياً بعد إضافة الدفعة
  if (linkedInvoice) {
    const inv = db.purchaseInvoices.find(i => i.number === linkedInvoice);
    if (inv) {
      if (invoiceBalance(inv).closed) {
        inv.paymentStatus = 'paid';
        showToast('🎉 تمت تسوية الفاتورة ' + linkedInvoice + ' بالكامل!', 'success');
      } else {
        inv.paymentStatus = 'partial';
      }
    }
  }

  saveData(db);

  const currencyLabel = { USD: 'دولار', SYP_NEW: 'ل.س جديدة', SYP_OLD: 'ل.س قديمة' }[currency] || '';
  const linkMsg = linkedInvoice ? ' ← ' + linkedInvoice : '';
  showToast('✅ تم حفظ إيصال الدفع ' + receiptNum + linkMsg + ' — ' + raw + ' ' + currencyLabel, 'success');

  // reset
  _supLinkedInvoice = null;
  hideSupLinkedBadge();
  ['rec-sup-name','rec-sup-amount','rec-sup-cheque','rec-sup-desc','rec-sup-note'].forEach(id => {
    const el = document.getElementById(id); if (el) el.value = '';
  });
  if (document.getElementById('rec-sup-currency')) document.getElementById('rec-sup-currency').value = 'USD';
  if (document.getElementById('rec-sup-equiv'))    document.getElementById('rec-sup-equiv').textContent = '—';
  if (document.getElementById('rec-sup-discount')) document.getElementById('rec-sup-discount').value = '0';
  const panel = document.getElementById('sup-deferred-panel');
  if (panel) panel.style.display = 'none';
  renderReceiptSupplier();
}

// ============================================================
// دوال مساعدة للصفحتين المعادتَين
// ============================================================

function clearReceiptCustomerForm() {
  ['rec-cust-name','rec-cust-amount','rec-cust-cheque','rec-cust-desc','rec-cust-note'].forEach(id => {
    const el = document.getElementById(id); if (el) el.value = '';
  });
  if (document.getElementById('rec-cust-discount')) document.getElementById('rec-cust-discount').value = '0';
  if (document.getElementById('rec-cust-equiv'))    document.getElementById('rec-cust-equiv').textContent = '—';
  if (document.getElementById('rec-cust-currency')) document.getElementById('rec-cust-currency').value = 'USD';
  if (document.getElementById('rec-cust-balance-preview')) document.getElementById('rec-cust-balance-preview').textContent = '—';
  const panel = document.getElementById('cust-deferred-panel');
  if (panel) panel.style.display = 'none';
  _custLinkedInvoice = null;
  hideCustLinkedBadge();
}

function clearReceiptSupplierForm() {
  ['rec-sup-name','rec-sup-amount','rec-sup-cheque','rec-sup-desc','rec-sup-note'].forEach(id => {
    const el = document.getElementById(id); if (el) el.value = '';
  });
  if (document.getElementById('rec-sup-discount')) document.getElementById('rec-sup-discount').value = '0';
  if (document.getElementById('rec-sup-equiv'))    document.getElementById('rec-sup-equiv').textContent = '—';
  if (document.getElementById('rec-sup-currency')) document.getElementById('rec-sup-currency').value = 'USD';
  if (document.getElementById('rec-sup-balance-preview')) document.getElementById('rec-sup-balance-preview').textContent = '—';
  const panel = document.getElementById('sup-deferred-panel');
  if (panel) panel.style.display = 'none';
  _supLinkedInvoice = null;
  hideSupLinkedBadge();
}

// تحديث renderReceiptCustomer لتعبئة رقم السند والتاريخ والقائمة
const _origRRC = renderReceiptCustomer;
function renderReceiptCustomer() {
  const nextNum = 'REC-' + String((db.invoiceCounters.receipt||0)+1).padStart(3,'0');
  ['rec-cust-num','rec-cust-num-display'].forEach(id => {
    const el = document.getElementById(id); if (el) el.textContent = nextNum;
  });
  const dateEl = document.getElementById('rec-cust-date');
  if (dateEl) dateEl.value = todayStr();
  // datalist
  const dl = document.getElementById('rec-cust-datalist');
  if (dl) dl.innerHTML = db.customers.filter(c=>c.name).map(c=>`<option value="${c.name}">`).join('');
  // قائمة آخر الإيصالات
  const listEl = document.getElementById('rec-cust-list');
  if (listEl) {
    const payments = (db.customerPayments||[]).slice().reverse().slice(0,20);
    if (payments.length === 0) {
      listEl.innerHTML = '<div class="empty-state">لا توجد إيصالات بعد</div>';
    } else {
      listEl.innerHTML = payments.map(p => {
        const linked = p.linkedInvoice ? `<span style="font-size:10px;background:#dcfce7;color:#15803d;padding:1px 6px;border-radius:8px;margin-right:4px">🔗 ${p.linkedInvoice}</span>` : '';
        const cur = { USD:'$', SYP_NEW:'ل.ج', SYP_OLD:'ل.ق' }[p.currency||'USD']||'$';
        return `<div class="invoice-row">
          <span class="item-id">${p.receiptNum||'—'}</span>
          <span><strong>${p.customerName}</strong></span>
          ${linked}
          <span style="color:var(--green-700);font-weight:700">${p.rawAmount||p.amount} ${cur}</span>
          <span style="color:var(--text-muted);font-size:11px">≈ ${fmtUSD(p.amount)}</span>
          <span class="inv-date">${p.date}</span>
        </div>`;
      }).join('');
    }
  }
}

// تحديث renderReceiptSupplier
const _origRRS = renderReceiptSupplier;
function renderReceiptSupplier() {
  const nextNum = 'PAY-' + String((db.invoiceCounters.receipt||0)+1).padStart(3,'0');
  ['rec-sup-num','rec-sup-num-display'].forEach(id => {
    const el = document.getElementById(id); if (el) el.textContent = nextNum;
  });
  const dateEl = document.getElementById('rec-sup-date');
  if (dateEl) dateEl.value = todayStr();
  // datalist
  const dl = document.getElementById('rec-sup-datalist');
  if (dl) dl.innerHTML = (db.suppliers||[]).filter(s=>s.name).map(s=>`<option value="${s.name}">`).join('');
  // قائمة آخر الإيصالات
  const listEl = document.getElementById('rec-sup-list');
  if (listEl) {
    const payments = (db.supplierPayments||[]).slice().reverse().slice(0,20);
    if (payments.length === 0) {
      listEl.innerHTML = '<div class="empty-state">لا توجد إيصالات بعد</div>';
    } else {
      listEl.innerHTML = payments.map(p => {
        const linked = p.linkedInvoice ? `<span style="font-size:10px;background:#dcfce7;color:#15803d;padding:1px 6px;border-radius:8px;margin-right:4px">🔗 ${p.linkedInvoice}</span>` : '';
        const cur = { USD:'$', SYP_NEW:'ل.ج', SYP_OLD:'ل.ق' }[p.currency||'USD']||'$';
        return `<div class="invoice-row">
          <span class="item-id">${p.receiptNum||'—'}</span>
          <span><strong>${p.supplierName}</strong></span>
          ${linked}
          <span style="color:var(--blue-link);font-weight:700">${p.rawAmount||p.amount} ${cur}</span>
          <span style="color:var(--text-muted);font-size:11px">≈ ${fmtUSD(p.amount)}</span>
          <span class="inv-date">${p.date}</span>
        </div>`;
      }).join('');
    }
  }
}

// ============================================================
// 📦 صفحة المخزون
// ============================================================
function renderStock() {
  const inv = calcInventory();
  const search = (document.getElementById('stock-search')?.value || '').toLowerCase();

  // إحصائيات
  let totalItems = 0, lowItems = 0, outItems = 0, totalValue = 0;
  db.items.forEach(item => {
    const qty = inv[item.id] || 0;
    totalItems++;
    if (qty <= 0) outItems++;
    else if (qty < item.minStock) lowItems++;
    totalValue += qty * (item.cost || 0);
  });

  // شريط التنبيه العلوي
  const alertBar = document.getElementById('stock-alert-bar');
  const lowList = db.items.filter(i => {
    const qty = inv[i.id] || 0;
    return qty < i.minStock;
  });
  if (alertBar) {
    if (lowList.length > 0) {
      alertBar.style.display = 'flex';
      alertBar.innerHTML = `<span style="font-size:16px;">⚠️</span>
        <strong>${lowList.length} مادة</strong> بحاجة لإعادة تخزين:
        ${lowList.slice(0,5).map(i => {
          const q = inv[i.id]||0;
          return `<span style="background:rgba(255,255,255,0.2);padding:2px 8px;border-radius:6px;font-size:12px;">
            ${i.name} (${q}/${i.minStock})
          </span>`;
        }).join('')}
        ${lowList.length > 5 ? `<span style="font-size:12px;opacity:.8;">+${lowList.length-5} أخرى</span>` : ''}`;
    } else {
      alertBar.style.display = 'none';
    }
  }

  // بطاقات الإحصائيات
  const statsEl = document.getElementById('stock-stats');
  if (statsEl) {
    statsEl.innerHTML = `
      <div class="kpi-card blue" style="margin:0">
        <div class="kpi-icon">📦</div>
        <div class="kpi-label">إجمالي المواد</div>
        <div class="kpi-value">${totalItems}</div>
      </div>
      <div class="kpi-card orange" style="margin:0">
        <div class="kpi-icon">⚠️</div>
        <div class="kpi-label">مواد منخفضة</div>
        <div class="kpi-value" style="color:#f59e0b">${lowItems}</div>
      </div>
      <div class="kpi-card" style="margin:0;border-top:3px solid #ef4444">
        <div class="kpi-icon">🚫</div>
        <div class="kpi-label">نفدت من المخزون</div>
        <div class="kpi-value" style="color:#ef4444">${outItems}</div>
      </div>
      <div class="kpi-card green" style="margin:0">
        <div class="kpi-icon">💰</div>
        <div class="kpi-label">قيمة المخزون</div>
        <div class="kpi-value" style="font-size:16px">${fmtUSD(totalValue)}</div>
      </div>`;
  }

  // فلتر
  const filterVal = document.getElementById('stock-filter')?.value || 'all';
  const filtered = db.items.filter(item => {
    const qty = inv[item.id] || 0;
    const matchSearch = !search ||
      item.name.toLowerCase().includes(search) ||
      item.id.toLowerCase().includes(search) ||
      item.type.toLowerCase().includes(search);
    const matchFilter =
      filterVal === 'all' ? true :
      filterVal === 'low' ? (qty > 0 && qty < item.minStock) :
      filterVal === 'out' ? (qty <= 0) :
      filterVal === 'ok'  ? (qty >= item.minStock) : true;
    return matchSearch && matchFilter;
  });

  const tbody = document.getElementById('stock-tbody');
  if (!tbody) return;
  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:32px;color:var(--text-muted)">لا توجد مواد مطابقة</td></tr>`;
    document.getElementById('stock-count').textContent = '0 مادة';
    return;
  }

  tbody.innerHTML = filtered.map(item => {
    const qty = inv[item.id] || 0;
    const isOut = qty <= 0;
    const isLow = !isOut && qty < item.minStock;
    const pct = item.minStock > 0 ? Math.min(100, Math.round((qty / item.minStock) * 100)) : 100;
    const barColor = isOut ? '#ef4444' : isLow ? '#f59e0b' : '#10b981';
    const statusBadge = isOut
      ? `<span style="background:#fee2e2;color:#dc2626;padding:2px 10px;border-radius:999px;font-size:11px;font-weight:700;">نفد ❌</span>`
      : isLow
        ? `<span style="background:#fef3c7;color:#d97706;padding:2px 10px;border-radius:999px;font-size:11px;font-weight:700;">منخفض ⚠️</span>`
        : `<span style="background:#d1fae5;color:#065f46;padding:2px 10px;border-radius:999px;font-size:11px;font-weight:700;">كافٍ ✅</span>`;
    return `<tr class="${isOut?'row-warning':''}">
      <td><span class="item-id">${item.id}</span></td>
      <td><strong>${item.name}</strong><br><span style="font-size:11px;color:var(--text-muted)">${item.type}</span></td>
      <td style="text-align:center;font-size:16px;font-weight:800;color:${isOut?'#ef4444':isLow?'#f59e0b':'#10b981'}">${qty}</td>
      <td style="text-align:center;color:var(--text-muted)">${item.minStock}</td>
      <td style="text-align:center">${item.unit}</td>
      <td>
        <div style="background:#e5e7eb;border-radius:999px;height:8px;overflow:hidden;min-width:80px">
          <div style="background:${barColor};height:8px;width:${pct}%;border-radius:999px;transition:.3s"></div>
        </div>
        <div style="font-size:10px;color:var(--text-muted);margin-top:2px;text-align:center">${pct}%</div>
      </td>
      <td>${statusBadge}</td>
    </tr>`;
  }).join('');

  document.getElementById('stock-count').textContent = filtered.length + ' مادة';
}

// ============================================================
// 📋 صفحة الكشوفات
// ============================================================
let statementsTab = 'account'; // 'account' | 'item'

function renderStatements() {
  renderStatementsTab();
}

function switchStatementsTab(tab) {
  statementsTab = tab;
  document.getElementById('stmt-tab-account')?.classList.toggle('active', tab === 'account');
  document.getElementById('stmt-tab-item')?.classList.toggle('active', tab === 'item');
  document.getElementById('stmt-account-section')?.classList.toggle('hidden', tab !== 'account');
  document.getElementById('stmt-item-section')?.classList.toggle('hidden', tab !== 'item');
}

function renderStatementsTab() {
  // تعبئة datalist الأشخاص
  const allNames = [
    ...db.customers.map(c => c.name),
    ...db.suppliers.map(s => s.name)
  ];
  const dl = document.getElementById('stmt-person-datalist');
  if (dl) dl.innerHTML = [...new Set(allNames)].map(n => `<option value="${n}">`).join('');

  // تعبئة datalist المواد
  const dlItem = document.getElementById('stmt-item-datalist');
  if (dlItem) dlItem.innerHTML = db.items.map(i => `<option value="${i.name} — ${i.id}">`).join('');
}

function loadAccountStatement() {
  const name = (document.getElementById('stmt-person-name')?.value || '').trim();
  if (!name) { showToast('اكتب اسم زبون أو مورد', 'error'); return; }

  const isCust = db.customers.find(c => c.name === name);
  const isSupp = db.suppliers.find(s => s.name === name);
  const type = isCust ? 'customer' : isSupp ? 'supplier' : null;

  // فواتير البيع للزبون أو الشراء للمورد
  let invoices = [], payments = [];
  if (isCust || (!type)) {
    invoices = activeSalesInvoices().filter(i => i.customerName === name);
    payments = (db.customerPayments||[]).filter(p => p.customerName === name);
  }
  if (isSupp) {
    invoices = activePurchaseInvoices().filter(i => i.supplierName === name);
    payments = (db.supplierPayments||[]).filter(p => p.supplierName === name);
  }

  // استخدم نفس منطق getCustomerAccount/getSupplierAccount للدقة
  const acc2 = isCust ? getCustomerAccount(name) : (isSupp ? getSupplierAccount(name) : null);
  const totalInv  = acc2 ? acc2.totalInvoices : invoices.reduce((s,i) => s+(i.total||0), 0);
  const totalPaid = acc2 ? acc2.totalPaid     : payments.reduce((s,p) => s+(parseFloat(p.amount)||0), 0);
  const remaining = acc2 ? acc2.remaining     : Math.max(0, totalInv - totalPaid);
  const totalDeferred2 = acc2 ? acc2.totalDeferred : 0;
  const totalCash2     = acc2 ? acc2.totalCash     : 0;

  const el = document.getElementById('stmt-account-result');
  if (!el) return;

  el.innerHTML = `
    <!-- ملخص -->
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:20px">
      <div style="background:#eff6ff;border-radius:12px;padding:14px;text-align:center">
        <div style="font-size:10px;color:#3b82f6;font-weight:700;margin-bottom:5px;text-transform:uppercase;letter-spacing:.5px">إجمالي الفواتير</div>
        <div style="font-size:18px;font-weight:800;color:#1d4ed8">${fmtUSD(totalInv)}</div>
        <div style="font-size:10px;color:#64748b;margin-top:2px">${invoices.length} فاتورة</div>
      </div>
      <div style="background:#f0f9ff;border-radius:12px;padding:14px;text-align:center;border:1px solid #bae6fd">
        <div style="font-size:10px;color:#0284c7;font-weight:700;margin-bottom:5px;text-transform:uppercase;letter-spacing:.5px">💵 نقدي</div>
        <div style="font-size:18px;font-weight:800;color:#0369a1">${fmtUSD(totalCash2)}</div>
        <div style="font-size:10px;color:#64748b;margin-top:2px">${(acc2?acc2.cashInvoices:invoices).length} فاتورة</div>
      </div>
      <div style="background:#fef3c7;border-radius:12px;padding:14px;text-align:center;border:1px solid #fcd34d">
        <div style="font-size:10px;color:#d97706;font-weight:700;margin-bottom:5px;text-transform:uppercase;letter-spacing:.5px">⏳ آجل</div>
        <div style="font-size:18px;font-weight:800;color:#b45309">${fmtUSD(totalDeferred2)}</div>
        <div style="font-size:10px;color:#64748b;margin-top:2px">مدفوع: ${fmtUSD(totalPaid)}</div>
      </div>
      <div style="background:${remaining>0?'#fef2f2':'#f0fdf4'};border-radius:12px;padding:14px;text-align:center;border:1.5px solid ${remaining>0?'#fca5a5':'#86efac'}">
        <div style="font-size:10px;color:${remaining>0?'#ef4444':'#10b981'};font-weight:700;margin-bottom:5px;text-transform:uppercase;letter-spacing:.5px">
          ${remaining>0?'🔴 الدين المتبقي':'✅ مسوّى'}
        </div>
        <div style="font-size:20px;font-weight:900;color:${remaining>0?'#dc2626':'#065f46'}">${fmtUSD(remaining)}</div>
        <div style="font-size:10px;color:#64748b;margin-top:2px">${type==='customer'?'على الزبون':'على الشركة'}</div>
      </div>
    </div>

    <!-- جدول الفواتير -->
    <div style="font-size:14px;font-weight:700;margin-bottom:8px;padding-bottom:6px;border-bottom:2px solid var(--border)">
      🧾 الفواتير
    </div>
    <div style="overflow-x:auto;margin-bottom:20px">
      <table style="width:100%;border-collapse:collapse;font-size:13px">
        <thead>
          <tr style="background:var(--bg-table-hd)">
            <th style="padding:8px 12px;text-align:right;font-size:11px;color:var(--text-muted)">رقم الفاتورة</th>
            <th style="padding:8px 12px;text-align:right;font-size:11px;color:var(--text-muted)">التاريخ</th>
            <th style="padding:8px 12px;text-align:right;font-size:11px;color:var(--text-muted)">المواد</th>
            <th style="padding:8px 12px;text-align:right;font-size:11px;color:var(--text-muted)">الإجمالي</th>
            <th style="padding:8px 12px;text-align:right;font-size:11px;color:var(--text-muted)">الدفع</th>
          </tr>
        </thead>
        <tbody>
          ${invoices.length === 0
            ? `<tr><td colspan="5" style="padding:20px;text-align:center;color:var(--text-muted)">لا توجد فواتير</td></tr>`
            : invoices.map(inv => `
            <tr style="border-bottom:1px solid var(--border)">
              <td style="padding:8px 12px;font-weight:600;color:#3b82f6">${inv.number||'—'}</td>
              <td style="padding:8px 12px;color:var(--text-muted)">${inv.date||'—'}</td>
              <td style="padding:8px 12px">${(inv.lines||[]).length} مادة</td>
              <td style="padding:8px 12px;font-weight:700">${fmtUSD(inv.total||0)}</td>
              <td style="padding:8px 12px">
                <span style="background:${inv.paymentType==='cash'?'#d1fae5':'#fef3c7'};color:${inv.paymentType==='cash'?'#065f46':'#92400e'};padding:2px 8px;border-radius:999px;font-size:11px">
                  ${inv.paymentType==='cash'?'نقداً':'آجل'}
                </span>
              </td>
            </tr>`).join('')
          }
        </tbody>
      </table>
    </div>

    <!-- جدول الدفعات -->
    <div style="font-size:14px;font-weight:700;margin-bottom:8px;padding-bottom:6px;border-bottom:2px solid var(--border)">
      💵 الدفعات المسجلة
    </div>
    <div style="overflow-x:auto">
      <table style="width:100%;border-collapse:collapse;font-size:13px">
        <thead>
          <tr style="background:var(--bg-table-hd)">
            <th style="padding:8px 12px;text-align:right;font-size:11px;color:var(--text-muted)">التاريخ</th>
            <th style="padding:8px 12px;text-align:right;font-size:11px;color:var(--text-muted)">المبلغ</th>
            <th style="padding:8px 12px;text-align:right;font-size:11px;color:var(--text-muted)">ملاحظة</th>
          </tr>
        </thead>
        <tbody>
          ${payments.length === 0
            ? `<tr><td colspan="3" style="padding:20px;text-align:center;color:var(--text-muted)">لا توجد دفعات مسجلة</td></tr>`
            : payments.map(p => `
            <tr style="border-bottom:1px solid var(--border)">
              <td style="padding:8px 12px;color:var(--text-muted)">${p.date||'—'}</td>
              <td style="padding:8px 12px;font-weight:700;color:#10b981">${fmtUSD(parseFloat(p.amount)||0)}</td>
              <td style="padding:8px 12px;color:var(--text-muted)">${p.note||p.description||'—'}</td>
            </tr>`).join('')
          }
        </tbody>
      </table>
    </div>`;
}

function loadItemStatement() {
  const val = (document.getElementById('stmt-item-name')?.value || '').trim();
  // استخرج ID من النمط "اسم المادة — NUM-001"
  const idMatch = val.match(/—\s*([\w-]+)\s*$/);
  const itemId = idMatch ? idMatch[1] : null;
  const item = itemId
    ? db.items.find(i => i.id === itemId)
    : db.items.find(i => i.name === val);

  if (!item) { showToast('اختر مادة صحيحة', 'error'); return; }

  const inv = calcInventory();
  const currentStock = inv[item.id] || 0;

  // حركة المادة
  let movements = [];

  // مشتريات
  activePurchaseInvoices().forEach(pinv => {
    (pinv.lines||[]).forEach(l => {
      if (l.itemId === item.id) {
        movements.push({
          type: 'purchase', date: pinv.date, ref: pinv.number,
          qty: parseFloat(l.qty)||0,
          price: parseFloat(l.price)||0,
          total: (parseFloat(l.qty)||0) * (parseFloat(l.price)||0),
          party: pinv.supplierName||'—'
        });
      }
    });
  });

  // مبيعات
  activeSalesInvoices().forEach(sinv => {
    (sinv.lines||[]).forEach(l => {
      if (l.itemId === item.id) {
        movements.push({
          type: 'sale', date: sinv.date, ref: sinv.number,
          qty: parseFloat(l.qty)||0,
          price: parseFloat(l.price)||0,
          total: (parseFloat(l.qty)||0) * (parseFloat(l.price)||0),
          party: sinv.customerName||'—'
        });
      }
    });
  });

  // مرتجعات
  (db.returns||[]).forEach(r => {
    (r.lines||[]).forEach(l => {
      if (l.itemId === item.id) {
        movements.push({
          type: r.type==='sale'?'return-sale':'return-purchase',
          date: r.date, ref: r.number,
          qty: parseFloat(l.qty)||0,
          price: parseFloat(l.price)||0,
          total: (parseFloat(l.qty)||0) * (parseFloat(l.price)||0),
          party: r.customerName||r.supplierName||'—'
        });
      }
    });
  });

  // ترتيب تاريخي
  movements.sort((a,b) => (a.date||'').localeCompare(b.date||''));

  // إحصائيات
  const totalBought  = movements.filter(m=>m.type==='purchase').reduce((s,m)=>s+m.qty,0);
  const totalSold    = movements.filter(m=>m.type==='sale').reduce((s,m)=>s+m.qty,0);
  const totalRevenue = movements.filter(m=>m.type==='sale').reduce((s,m)=>s+m.total,0);
  const totalCost    = movements.filter(m=>m.type==='sale').reduce((s,m)=>s+m.qty*(item.cost||0),0);
  const profit       = totalRevenue - totalCost;

  const el = document.getElementById('stmt-item-result');
  if (!el) return;

  el.innerHTML = `
    <!-- رأس المادة -->
    <div class="stmt-item-head">
      <div class="stmt-item-head-icon">📦</div>
      <div>
        <div class="stmt-item-head-name">${item.name}</div>
        <div class="stmt-item-head-meta">${item.id} · ${item.type} · ${item.unit}</div>
      </div>
      <div class="stmt-item-head-stock">
        <div class="stmt-item-head-stock-label">المخزون الحالي</div>
        <div class="stmt-item-head-stock-value">${currentStock}</div>
        <div class="stmt-item-head-stock-unit">${item.unit}</div>
      </div>
    </div>

    <!-- إحصائيات -->
    <div class="stmt-item-stats">
      <div class="stmt-item-stat" style="background:#f0fdf4">
        <div class="stmt-item-stat-label" style="color:#10b981">إجمالي المشتريات</div>
        <div class="stmt-item-stat-value" style="color:#065f46">${totalBought}</div>
        <div class="stmt-item-stat-sub">${item.unit}</div>
      </div>
      <div class="stmt-item-stat" style="background:#eff6ff">
        <div class="stmt-item-stat-label" style="color:#3b82f6">إجمالي المبيعات</div>
        <div class="stmt-item-stat-value" style="color:#1d4ed8">${totalSold}</div>
        <div class="stmt-item-stat-sub">${item.unit}</div>
      </div>
      <div class="stmt-item-stat" style="background:#faf5ff">
        <div class="stmt-item-stat-label" style="color:#8b5cf6">إيرادات البيع</div>
        <div class="stmt-item-stat-value" style="color:#6d28d9">${fmtUSD(totalRevenue)}</div>
      </div>
      <div class="stmt-item-stat" style="background:${profit>=0?'#f0fdf4':'#fef2f2'}">
        <div class="stmt-item-stat-label" style="color:${profit>=0?'#10b981':'#ef4444'}">صافي الربح</div>
        <div class="stmt-item-stat-value" style="color:${profit>=0?'#065f46':'#dc2626'}">${fmtUSD(profit)}</div>
      </div>
    </div>

    <!-- جدول الحركات -->
    <div class="stmt-item-table-title">📋 سجل حركة المادة (${movements.length} حركة)</div>
    <div class="stmt-item-table-wrap">
      <table>
        <thead>
          <tr style="background:var(--bg-table-hd)">
            <th>التاريخ</th>
            <th>النوع</th>
            <th>المرجع</th>
            <th>الطرف</th>
            <th>الكمية</th>
            <th>السعر</th>
            <th>الإجمالي</th>
          </tr>
        </thead>
        <tbody>
          ${movements.length === 0
            ? `<tr><td colspan="7" style="padding:24px;text-align:center;color:var(--text-muted)">لا توجد حركات لهذه المادة</td></tr>`
            : movements.map(m => {
                const typeMap = {
                  purchase:       {label:'شراء 🛒',   bg:'#d1fae5', color:'#065f46', sign:'+'},
                  sale:           {label:'بيع 🧾',    bg:'#dbeafe', color:'#1d4ed8', sign:'-'},
                  'return-sale':  {label:'رد بيع 🔄', bg:'#fef3c7', color:'#92400e', sign:'+'},
                  'return-purchase':{label:'رد شراء 🔄',bg:'#fee2e2',color:'#991b1b',sign:'-'}
                };
                const t = typeMap[m.type] || {label:m.type, bg:'#f1f5f9', color:'#64748b', sign:''};
                return `<tr style="border-bottom:1px solid var(--border)">
                  <td style="padding:8px 12px;color:var(--text-muted)">${m.date||'—'}</td>
                  <td style="padding:8px 12px">
                    <span style="background:${t.bg};color:${t.color};padding:2px 8px;border-radius:999px;font-size:11px;font-weight:600">${t.label}</span>
                  </td>
                  <td style="padding:8px 12px;font-weight:600;color:#6366f1">${m.ref||'—'}</td>
                  <td style="padding:8px 12px;color:var(--text-secondary)">${m.party}</td>
                  <td style="padding:8px 12px;font-weight:700;color:${t.sign==='+'?'#10b981':'#ef4444'}">${t.sign}${m.qty} ${item.unit}</td>
                  <td style="padding:8px 12px">${fmtUSD(m.price)}</td>
                  <td style="padding:8px 12px;font-weight:600">${fmtUSD(m.total)}</td>
                </tr>`;
              }).join('')
          }
        </tbody>
      </table>
    </div>`;
}

// ============================================================
// STATEMENTS HUB — مركز الكشوفات (بطاقات توجيهية + كشوفات مبدئية)
// ============================================================

// الصفحة الرئيسية عبارة عن شبكة بطاقات ثابتة، لا بيانات ديناميكية بعد —
// نقطة توسّع جاهزة إن احتجنا إحصائيات سريعة على البطاقات لاحقاً.
function renderStatementsHub() {}

function paymentMethodLabel(method) {
  return {cash:'نقداً', cheque:'شيك', transfer:'حوالة'}[method] || 'نقداً';
}

// كشف فواتير — دمج فواتير البيع والشراء في جدول واحد
function renderInvoicesStatement() {
  const tbody = document.getElementById('invoices-statement-tbody');
  if (!tbody) return;

  const sales     = activeSalesInvoices().map(i => ({ ...i, kind: 'sale', party: i.customerName }));
  const purchases = activePurchaseInvoices().map(i => ({ ...i, kind: 'purchase', party: i.supplierName }));
  const rows = [...sales, ...purchases].sort((a,b) => (b.date||'').localeCompare(a.date||''));

  if (rows.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;padding:24px;color:var(--text-muted)">لا توجد فواتير بعد</td></tr>`;
    return;
  }

  tbody.innerHTML = rows.map(inv => `
    <tr>
      <td><span class="inv-link" onclick="openInvoiceDetail('${inv.number}')">${inv.number||'—'}</span></td>
      <td>${inv.kind === 'sale' ? '🧾 بيع' : '🛒 شراء'}</td>
      <td>${inv.party||'—'}</td>
      <td>${inv.date||'—'}</td>
      <td style="text-align:center">${(inv.paymentType||'cash')==='cash' ? 'نقداً' : 'آجل'}</td>
      <td style="text-align:left;font-weight:700">${fmtUSD(inv.total||0)}</td>
    </tr>`).join('');
}

// كشف دفعات — دمج إيصالات القبض من الزبائن والدفع للموردين في جدول واحد
function renderPaymentsStatement() {
  const tbody = document.getElementById('payments-statement-tbody');
  if (!tbody) return;

  const custPayments = (db.customerPayments||[]).map(p => ({ ...p, kind: 'customer', party: p.customerName }));
  const suppPayments = (db.supplierPayments||[]).map(p => ({ ...p, kind: 'supplier', party: p.supplierName }));
  const rows = [...custPayments, ...suppPayments].sort((a,b) => (b.date||'').localeCompare(a.date||''));

  if (rows.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;padding:24px;color:var(--text-muted)">لا توجد دفعات مسجلة بعد</td></tr>`;
    return;
  }

  tbody.innerHTML = rows.map(p => `
    <tr>
      <td>${p.receiptNum || '—'}</td>
      <td>${p.kind === 'customer' ? '⬇️ قبض من زبون' : '⬆️ دفع لمورد'}</td>
      <td>${p.party || '—'}</td>
      <td>${p.date || '—'}</td>
      <td style="text-align:center">${paymentMethodLabel(p.paymentMethod)}</td>
      <td style="text-align:left;font-weight:700;color:var(--success-600)">${fmtUSD(parseFloat(p.amount)||0)}</td>
    </tr>`).join('');
}

// تسكير حساب — عرض مبدئي لرصيد الطرف تمهيداً لإضافة منطق الإقفال لاحقاً
function renderAccountClosing() {
  const dl = document.getElementById('close-acc-datalist');
  if (!dl) return;
  const names = [...db.customers.map(c => c.name), ...(db.suppliers||[]).map(s => s.name)];
  dl.innerHTML = [...new Set(names)].map(n => `<option value="${n}">`).join('');
}

function loadAccountClosing() {
  const name = (document.getElementById('close-acc-name')?.value || '').trim();
  if (!name) { showToast('اكتب اسم زبون أو مورد', 'error'); return; }

  const isCust = db.customers.find(c => c.name === name);
  const isSupp = (db.suppliers||[]).find(s => s.name === name);
  if (!isCust && !isSupp) { showToast('لم يتم العثور على هذا الاسم', 'error'); return; }

  const acc = isCust ? getCustomerAccount(name) : getSupplierAccount(name);
  const el = document.getElementById('close-acc-result');
  if (!el) return;

  el.innerHTML = `
    <div style="width:100%;padding:24px">
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:20px">
        <div style="background:var(--brand-50);border-radius:12px;padding:16px;text-align:center">
          <div style="font-size:11px;color:var(--brand-600);font-weight:700;margin-bottom:6px">إجمالي الفواتير</div>
          <div style="font-size:19px;font-weight:800;color:var(--text-primary)">${fmtUSD(acc.totalInvoices)}</div>
        </div>
        <div style="background:var(--success-50);border-radius:12px;padding:16px;text-align:center">
          <div style="font-size:11px;color:var(--success-700);font-weight:700;margin-bottom:6px">إجمالي المدفوع</div>
          <div style="font-size:19px;font-weight:800;color:var(--text-primary)">${fmtUSD(acc.totalPaid)}</div>
        </div>
        <div style="background:${acc.remaining>0?'var(--danger-50)':'var(--success-50)'};border-radius:12px;padding:16px;text-align:center;border:1.5px solid ${acc.remaining>0?'var(--danger-100)':'var(--success-100)'}">
          <div style="font-size:11px;color:${acc.remaining>0?'var(--danger-600)':'var(--success-700)'};font-weight:700;margin-bottom:6px">الرصيد المتبقي</div>
          <div style="font-size:20px;font-weight:900;color:${acc.remaining>0?'var(--danger-600)':'var(--success-700)'}">${fmtUSD(acc.remaining)}</div>
        </div>
      </div>
      <button class="btn btn-primary" disabled style="opacity:.55;cursor:not-allowed" title="ميزة تسكير الحساب الكاملة قيد التطوير">
        🔒 تسكير الحساب (قريباً)
      </button>
    </div>`;
}

// كشف أرصدة العملاء — رصيد كل زبون ومورد دفعة واحدة (يعتمد على الحسابات الموجودة)
function renderCustomerBalances() {
  const tbody = document.getElementById('customer-balances-tbody');
  if (!tbody) return;

  const custRows = db.customers.map(c => ({ name: c.name, kind: 'زبون', kindKey: 'customer', storedBalance: parseFloat(c.balance) || 0, ...getCustomerAccount(c.name) }));
  const suppRows = (db.suppliers||[]).map(s => ({ name: s.name, kind: 'مورد', kindKey: 'supplier', storedBalance: parseFloat(s.balance) || 0, ...getSupplierAccount(s.name) }));
  const rows = [...custRows, ...suppRows];

  if (rows.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;padding:24px;color:var(--text-muted)">لا يوجد زبائن أو موردون بعد</td></tr>`;
    return;
  }

  tbody.innerHTML = rows.map(r => `
    <tr>
      <td style="font-weight:600">${r.name}</td>
      <td>${r.kind}</td>
      <td>${fmtUSD(r.totalInvoices||0)}</td>
      <td style="color:var(--success-600)">${fmtUSD(r.totalPaid||0)}</td>
      <td style="text-align:left;font-weight:800;color:${(r.remaining||0)>0?'var(--danger-600)':'var(--success-700)'}">${fmtUSD(r.remaining||0)}</td>
      <td style="text-align:center;white-space:nowrap">
        <span style="font-weight:700;margin-left:8px">${fmtUSD(r.storedBalance||0)}</span>
        <button class="btn btn-ghost btn-sm" title="تعديل الرصيد يدوياً" onclick="manualEditBalance('${r.kindKey}', '${(r.name||'').replace(/'/g, "\\'")}')">✏️</button>
      </td>
    </tr>`).join('');
}

// ============================================================
// GLOBAL SEARCH — بحث سريع عالمي
// ============================================================
let gsTimer = null;

function initGlobalSearch() {
  const inp = document.getElementById('global-search');
  const results = document.getElementById('global-search-results');
  if (!inp || !results) return;

  inp.addEventListener('input', function() {
    clearTimeout(gsTimer);
    gsTimer = setTimeout(() => renderGlobalSearch(this.value.trim()), 220);
  });

  inp.addEventListener('focus', function() {
    if (this.value.trim().length >= 1) {
      results.classList.add('open');
    }
  });

  document.addEventListener('click', function(e) {
    if (!inp.contains(e.target) && !results.contains(e.target)) {
      results.classList.remove('open');
    }
  });

  inp.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') { results.classList.remove('open'); inp.blur(); }
  });
}

function renderGlobalSearch(q) {
  const results = document.getElementById('global-search-results');
  if (!results) return;

  if (!q || q.length < 1) {
    results.classList.remove('open');
    return;
  }
  results.classList.add('open');

  const lq = q.toLowerCase();
  let html = '';
  let total = 0;

  // ── فواتير البيع
  const sales = activeSalesInvoices().filter(i =>
    (i.number||'').toLowerCase().includes(lq) ||
    (i.customerName||'').toLowerCase().includes(lq)
  ).slice(0, 4);

  if (sales.length) {
    html += `<div class="gs-section-title">🧾 فواتير البيع</div>`;
    sales.forEach(i => {
      html += `<div class="gs-result-item" onclick="openInvoiceDetail('${i.number}');document.getElementById('global-search-results').classList.remove('open')">
        <div class="gs-result-icon" style="background:#eef2ff;color:#4f46e5">📄</div>
        <div class="gs-result-main">
          <div class="gs-result-title">${i.number} — ${i.customerName||'—'}</div>
          <div class="gs-result-sub">${i.date}</div>
        </div>
        <span class="gs-result-badge" style="color:#4f46e5;font-weight:800">$${(i.total||0).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}</span>
      </div>`;
      total++;
    });
  }

  // ── فواتير الشراء
  const purs = activePurchaseInvoices().filter(i =>
    (i.number||'').toLowerCase().includes(lq) ||
    (i.supplierName||'').toLowerCase().includes(lq)
  ).slice(0, 4);

  if (purs.length) {
    html += `<div class="gs-section-title">🏭 فواتير الشراء</div>`;
    purs.forEach(i => {
      html += `<div class="gs-result-item" onclick="openInvoiceDetail('${i.number}');document.getElementById('global-search-results').classList.remove('open')">
        <div class="gs-result-icon" style="background:#f0fdf4;color:#16a34a">📦</div>
        <div class="gs-result-main">
          <div class="gs-result-title">${i.number} — ${i.supplierName||'—'}</div>
          <div class="gs-result-sub">${i.date}</div>
        </div>
        <span class="gs-result-badge" style="color:#16a34a;font-weight:800">$${(i.total||0).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}</span>
      </div>`;
      total++;
    });
  }

  // ── العملاء
  const custs = db.customers.filter(c =>
    (c.name||'').toLowerCase().includes(lq) ||
    (c.phone||'').includes(lq)
  ).slice(0, 3);

  if (custs.length) {
    html += `<div class="gs-section-title">👤 العملاء</div>`;
    custs.forEach(c => {
      const bal = c.balance || 0;
      html += `<div class="gs-result-item" onclick="navigate('customers');document.getElementById('global-search-results').classList.remove('open')">
        <div class="gs-result-icon" style="background:#fdf4ff;color:#9333ea">👤</div>
        <div class="gs-result-main">
          <div class="gs-result-title">${c.name}</div>
          <div class="gs-result-sub">${c.phone||''}</div>
        </div>
        <span class="gs-result-badge" style="color:${bal>0?'#dc2626':bal<0?'#16a34a':'#6b7280'}">${bal !== 0 ? '$'+Math.abs(bal).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2}) : ''}</span>
      </div>`;
      total++;
    });
  }

  // ── الموردون
  const sups = (db.suppliers||[]).filter(s =>
    (s.name||'').toLowerCase().includes(lq) ||
    (s.phone||'').includes(lq)
  ).slice(0, 3);

  if (sups.length) {
    html += `<div class="gs-section-title">🏭 الموردون</div>`;
    sups.forEach(s => {
      html += `<div class="gs-result-item" onclick="navigate('suppliers');document.getElementById('global-search-results').classList.remove('open')">
        <div class="gs-result-icon" style="background:#fff7ed;color:#ea580c">🏭</div>
        <div class="gs-result-main">
          <div class="gs-result-title">${s.name}</div>
          <div class="gs-result-sub">${s.phone||''}</div>
        </div>
      </div>`;
      total++;
    });
  }

  // ── المواد
  const items = db.items.filter(it =>
    (it.name||'').toLowerCase().includes(lq) ||
    (it.id||'').toLowerCase().includes(lq) ||
    (it.barcode||'').includes(lq)
  ).slice(0, 4);

  if (items.length) {
    html += `<div class="gs-section-title">📦 المواد والبضائع</div>`;
    const inv = calcInventory();
    items.forEach(it => {
      const stock = inv[it.id] || 0;
      const stockColor = stock === 0 ? '#dc2626' : stock < it.minStock ? '#d97706' : '#16a34a';
      html += `<div class="gs-result-item" onclick="navigate('items');document.getElementById('global-search-results').classList.remove('open')">
        <div class="gs-result-icon" style="background:#f0fdf4;color:#16a34a">🔖</div>
        <div class="gs-result-main">
          <div class="gs-result-title">${it.name}</div>
          <div class="gs-result-sub">${it.id} — ${it.type||''}</div>
        </div>
        <span class="gs-result-badge" style="color:${stockColor};font-weight:800">${stock} ${it.unit}</span>
      </div>`;
      total++;
    });
  }

  if (total === 0) {
    html = `<div class="gs-empty">🔍 لا نتائج لـ "<strong>${q}</strong>"</div>`;
  }

  results.innerHTML = html;
}
