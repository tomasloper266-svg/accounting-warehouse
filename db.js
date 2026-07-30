// ============================================================
// db.js — منطق SQLite الكامل لبرنامج المحاسبة والمستودعات
// يُستخدم من main.js فقط (process الرئيسي)
// ============================================================

const path = require('path');
const fs   = require('fs');

let db = null; // better-sqlite3 instance

// ============================================================
// المواد الافتراضية — تُستخدم عند إنشاء قاعدة بيانات جديدة أو فارغة
// ============================================================
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



// ============================================================
// فتح / إنشاء قاعدة البيانات
// ============================================================
function openDatabase(userDataPath) {
  if (!fs.existsSync(userDataPath)) {
    fs.mkdirSync(userDataPath, { recursive: true });
  }

  const Database = require('better-sqlite3');
  const dbPath = path.join(userDataPath, 'data.db');
  db = new Database(dbPath);

  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');

  createTables();
  migrateSchema(); // ✅ ترقية الـ schema تلقائياً
  return dbPath;
}

// ============================================================
// إنشاء الجداول
// ============================================================
function createTables() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS company (
      key   TEXT PRIMARY KEY,
      value TEXT
    );

    CREATE TABLE IF NOT EXISTS exchange (
      key   TEXT PRIMARY KEY,
      value TEXT
    );

    CREATE TABLE IF NOT EXISTS invoice_counters (
      key   TEXT PRIMARY KEY,
      value INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS items (
      id            TEXT PRIMARY KEY,
      name          TEXT,
      type          TEXT,
      unit          TEXT,
      unit2         TEXT,
      factor        REAL DEFAULT 1,
      cost          REAL DEFAULT 0,
      price         REAL DEFAULT 0,
      price2        REAL DEFAULT 0,
      price3        REAL DEFAULT 0,
      minStock      REAL DEFAULT 0,
      maxStock      REAL DEFAULT 0,
      barcode       TEXT DEFAULT '',
      barcode2      TEXT DEFAULT '',
      taxRate       REAL DEFAULT 0,
      brand         TEXT DEFAULT '',
      defaultSupplier TEXT DEFAULT '',
      priceCurrency TEXT DEFAULT 'USD'
    );

    CREATE TABLE IF NOT EXISTS customers (
      id            TEXT PRIMARY KEY,
      name          TEXT,
      phone         TEXT,
      address       TEXT,
      balance       REAL DEFAULT 0,
      creditBalance REAL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS suppliers (
      id            TEXT PRIMARY KEY,
      name          TEXT,
      phone         TEXT,
      address       TEXT,
      balance       REAL DEFAULT 0,
      creditBalance REAL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS sales_invoices (
      number          TEXT PRIMARY KEY,
      date            TEXT,
      time            TEXT DEFAULT '',
      customerName    TEXT,
      subtotal        REAL DEFAULT 0,
      discount        REAL DEFAULT 0,
      total           REAL DEFAULT 0,
      paidAmount      REAL DEFAULT 0,
      paymentType     TEXT DEFAULT 'cash',
      priceType       TEXT DEFAULT 'retail',
      currency        TEXT DEFAULT 'USD',
      usdToOld        REAL DEFAULT 0,
      taxRate         REAL DEFAULT 0,
      taxAmount       REAL DEFAULT 0,
      note            TEXT DEFAULT '',
      paymentStatus   TEXT DEFAULT '',
      deletedAt       TEXT DEFAULT ''
    );

    CREATE TABLE IF NOT EXISTS sales_lines (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      invoiceNumber TEXT REFERENCES sales_invoices(number) ON DELETE CASCADE,
      itemId        TEXT,
      qty           REAL DEFAULT 0,
      price         REAL DEFAULT 0,
      total         REAL DEFAULT 0,
      unitType      TEXT DEFAULT 'unit',
      note          TEXT DEFAULT ''
    );

    CREATE TABLE IF NOT EXISTS purchase_invoices (
      number              TEXT PRIMARY KEY,
      date                TEXT,
      time                TEXT DEFAULT '',
      supplierName        TEXT,
      supplierInvoiceNum  TEXT DEFAULT '',
      subtotal            REAL DEFAULT 0,
      discount            REAL DEFAULT 0,
      total               REAL DEFAULT 0,
      paidAmount          REAL DEFAULT 0,
      paymentType         TEXT DEFAULT 'cash',
      shippingCost        REAL DEFAULT 0,
      shippingAccount     TEXT DEFAULT '',
      currency            TEXT DEFAULT 'USD',
      usdToOld            REAL DEFAULT 0,
      note                TEXT DEFAULT '',
      paymentStatus       TEXT DEFAULT '',
      deletedAt           TEXT DEFAULT ''
    );

    CREATE TABLE IF NOT EXISTS purchase_lines (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      invoiceNumber TEXT REFERENCES purchase_invoices(number) ON DELETE CASCADE,
      itemId        TEXT,
      qty           REAL DEFAULT 0,
      price         REAL DEFAULT 0,
      total         REAL DEFAULT 0,
      unitType      TEXT DEFAULT 'unit',
      note          TEXT DEFAULT ''
    );

    CREATE TABLE IF NOT EXISTS returns (
      number        TEXT PRIMARY KEY,
      type          TEXT,
      date          TEXT,
      party         TEXT,
      total         REAL DEFAULT 0,
      note          TEXT,
      refInvoice    TEXT DEFAULT '',
      debtReduction REAL DEFAULT 0,
      creditAdded   REAL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS return_lines (
      id           INTEGER PRIMARY KEY AUTOINCREMENT,
      returnNumber TEXT REFERENCES returns(number) ON DELETE CASCADE,
      itemId       TEXT,
      qty          REAL DEFAULT 0,
      price        REAL DEFAULT 0,
      total        REAL DEFAULT 0,
      unitType     TEXT DEFAULT 'unit',
      srcLine      INTEGER DEFAULT -1
    );

    CREATE TABLE IF NOT EXISTS customer_payments (
      id           INTEGER PRIMARY KEY AUTOINCREMENT,
      receiptNum   TEXT DEFAULT '',
      customerName TEXT,
      amount       REAL DEFAULT 0,
      paymentMethod TEXT DEFAULT 'cash',
      chequeNum    TEXT DEFAULT '',
      description  TEXT DEFAULT '',
      discountOnPayment REAL DEFAULT 0,
      linkedInvoice TEXT DEFAULT '',
      note         TEXT,
      date         TEXT
    );

    CREATE TABLE IF NOT EXISTS supplier_payments (
      id           INTEGER PRIMARY KEY AUTOINCREMENT,
      receiptNum   TEXT DEFAULT '',
      supplierName TEXT,
      amount       REAL DEFAULT 0,
      paymentMethod TEXT DEFAULT 'cash',
      chequeNum    TEXT DEFAULT '',
      description  TEXT DEFAULT '',
      discountOnPayment REAL DEFAULT 0,
      linkedInvoice TEXT DEFAULT '',
      note         TEXT,
      date         TEXT
    );

    CREATE TABLE IF NOT EXISTS books (
      id   TEXT PRIMARY KEY,
      name TEXT
    );

    CREATE TABLE IF NOT EXISTS credit_ledger (
      id        TEXT PRIMARY KEY,
      partyType TEXT,
      partyName TEXT,
      amount    REAL DEFAULT 0,
      type      TEXT DEFAULT '',
      refType   TEXT DEFAULT '',
      ref       TEXT DEFAULT '',
      date      TEXT DEFAULT '',
      key       TEXT DEFAULT ''
    );
  `);
}

// ============================================================
// ترقية الـ Schema — آمن على البيانات القديمة
// ============================================================
function migrateSchema() {
  const migrations = [
    // items — حقول جديدة
    { table: 'items', column: 'barcode',          def: "TEXT DEFAULT ''" },
    { table: 'items', column: 'priceCurrency',    def: "TEXT DEFAULT 'USD'" },
    { table: 'items', column: 'price2',           def: "REAL DEFAULT 0" },
    { table: 'items', column: 'price3',           def: "REAL DEFAULT 0" },
    { table: 'items', column: 'barcode2',         def: "TEXT DEFAULT ''" },
    { table: 'items', column: 'taxRate',          def: "REAL DEFAULT 0" },
    { table: 'items', column: 'maxStock',         def: "REAL DEFAULT 0" },
    { table: 'items', column: 'brand',            def: "TEXT DEFAULT ''" },
    { table: 'items', column: 'defaultSupplier',  def: "TEXT DEFAULT ''" },
    // sales_invoices
    { table: 'sales_invoices', column: 'time',        def: "TEXT DEFAULT ''" },
    { table: 'sales_invoices', column: 'paidAmount',  def: "REAL DEFAULT 0" },
    { table: 'sales_invoices', column: 'paymentType', def: "TEXT DEFAULT 'cash'" },
    { table: 'sales_invoices', column: 'priceType',   def: "TEXT DEFAULT 'retail'" },
    { table: 'sales_invoices', column: 'taxRate',     def: "REAL DEFAULT 0" },
    { table: 'sales_invoices', column: 'taxAmount',   def: "REAL DEFAULT 0" },
    { table: 'sales_invoices', column: 'note',        def: "TEXT DEFAULT ''" },
    // sales_lines
    { table: 'sales_lines', column: 'unitType', def: "TEXT DEFAULT 'unit'" },
    { table: 'sales_lines', column: 'note',     def: "TEXT DEFAULT ''" },
    // purchase_invoices
    { table: 'purchase_invoices', column: 'time',               def: "TEXT DEFAULT ''" },
    { table: 'purchase_invoices', column: 'supplierInvoiceNum', def: "TEXT DEFAULT ''" },
    { table: 'purchase_invoices', column: 'subtotal',           def: "REAL DEFAULT 0" },
    { table: 'purchase_invoices', column: 'discount',           def: "REAL DEFAULT 0" },
    { table: 'purchase_invoices', column: 'paidAmount',         def: "REAL DEFAULT 0" },
    { table: 'purchase_invoices', column: 'paymentType',        def: "TEXT DEFAULT 'cash'" },
    { table: 'purchase_invoices', column: 'shippingCost',       def: "REAL DEFAULT 0" },
    { table: 'purchase_invoices', column: 'shippingAccount',    def: "TEXT DEFAULT ''" },
    { table: 'purchase_invoices', column: 'usdToOld',           def: "REAL DEFAULT 0" },
    { table: 'purchase_invoices', column: 'note',               def: "TEXT DEFAULT ''" },
    // purchase_lines
    { table: 'purchase_lines', column: 'unitType', def: "TEXT DEFAULT 'unit'" },
    { table: 'purchase_lines', column: 'note',     def: "TEXT DEFAULT ''" },
    // return_lines
    { table: 'return_lines', column: 'unitType', def: "TEXT DEFAULT 'unit'" },
    { table: 'return_lines', column: 'srcLine',  def: "INTEGER DEFAULT -1" },
    // returns — ربط مردود المبيع بفاتورته المصدر وتفصيل أثره على الحساب
    { table: 'returns', column: 'refInvoice',    def: "TEXT DEFAULT ''" },
    { table: 'returns', column: 'debtReduction', def: "REAL DEFAULT 0" },
    { table: 'returns', column: 'creditAdded',   def: "REAL DEFAULT 0" },
    // customer_payments — إيصال قبض
    { table: 'customer_payments', column: 'receiptNum',         def: "TEXT DEFAULT ''" },
    { table: 'customer_payments', column: 'paymentMethod',      def: "TEXT DEFAULT 'cash'" },
    { table: 'customer_payments', column: 'chequeNum',          def: "TEXT DEFAULT ''" },
    { table: 'customer_payments', column: 'description',        def: "TEXT DEFAULT ''" },
    { table: 'customer_payments', column: 'discountOnPayment',  def: "REAL DEFAULT 0" },
    // supplier_payments
    { table: 'supplier_payments', column: 'receiptNum',    def: "TEXT DEFAULT ''" },
    { table: 'supplier_payments', column: 'paymentMethod', def: "TEXT DEFAULT 'cash'" },
    { table: 'supplier_payments', column: 'chequeNum',     def: "TEXT DEFAULT ''" },
    { table: 'supplier_payments', column: 'description',   def: "TEXT DEFAULT ''" },
    // linked invoice + closed-status persistence (fixes restart losing linked payments / paid status)
    { table: 'customer_payments', column: 'linkedInvoice',     def: "TEXT DEFAULT ''" },
    { table: 'supplier_payments', column: 'linkedInvoice',     def: "TEXT DEFAULT ''" },
    { table: 'supplier_payments', column: 'discountOnPayment', def: "REAL DEFAULT 0" },
    { table: 'sales_invoices',    column: 'paymentStatus',     def: "TEXT DEFAULT ''" },
    { table: 'purchase_invoices', column: 'paymentStatus',     def: "TEXT DEFAULT ''" },
    // سلة المحذوفات — حذف ناعم قابل للاسترجاع
    { table: 'sales_invoices',    column: 'deletedAt',         def: "TEXT DEFAULT ''" },
    { table: 'purchase_invoices', column: 'deletedAt',         def: "TEXT DEFAULT ''" },
    // customers / suppliers — رصيد
    { table: 'customers', column: 'balance', def: "REAL DEFAULT 0" },
    { table: 'suppliers', column: 'balance', def: "REAL DEFAULT 0" },
    // رصيد إضافي (credit balance) — فائض الدفع الزائد للعميل/المورد
    { table: 'customers', column: 'creditBalance', def: "REAL DEFAULT 0" },
    { table: 'suppliers', column: 'creditBalance', def: "REAL DEFAULT 0" },
    // الفائض المحوّل لرصيد إضافي + معرّف ثابت للدفعة (لربط قيود السجل)
    { table: 'customer_payments', column: 'creditAdded', def: "REAL DEFAULT 0" },
    { table: 'supplier_payments', column: 'creditAdded', def: "REAL DEFAULT 0" },
    { table: 'customer_payments', column: 'pid',         def: "TEXT DEFAULT ''" },
    { table: 'supplier_payments', column: 'pid',         def: "TEXT DEFAULT ''" },
  ];

  for (const m of migrations) {
    try {
      const cols = db.prepare(`PRAGMA table_info(${m.table})`).all();
      const exists = cols.some(c => c.name === m.column);
      if (!exists) {
        db.prepare(`ALTER TABLE ${m.table} ADD COLUMN ${m.column} ${m.def}`).run();
        console.log(`✅ Migration: added ${m.table}.${m.column}`);
      }
    } catch(e) {
      console.error(`Migration error (${m.table}.${m.column}):`, e.message);
    }
  }
}

// ============================================================
// تحميل كل البيانات
// ============================================================
function loadAll() {
  const companyRows = db.prepare('SELECT key, value FROM company').all();
  const company = {};
  companyRows.forEach(r => { company[r.key] = r.value; });

  const exchRows = db.prepare('SELECT key, value FROM exchange').all();
  const exchange = {};
  exchRows.forEach(r => { exchange[r.key] = r.value; });

  const cntRows = db.prepare('SELECT key, value FROM invoice_counters').all();
  const invoiceCounters = { sale: 0, purchase: 0, receipt: 0 };
  cntRows.forEach(r => { invoiceCounters[r.key] = r.value; });

  let items = db.prepare('SELECT * FROM items').all();
  // ✅ لو items فاضية — أضف الافتراضيين تلقائياً واحفظهم
  if (items.length === 0) {
    const insItem = db.prepare(`
      INSERT INTO items (id, name, type, unit, unit2, factor, cost, price, price2, price3,
                         minStock, maxStock, barcode, barcode2, taxRate, brand, defaultSupplier, priceCurrency)
      VALUES (@id, @name, @type, @unit, @unit2, @factor, @cost, @price, @price2, @price3,
              @minStock, @maxStock, @barcode, @barcode2, @taxRate, @brand, @defaultSupplier, @priceCurrency)
    `);
    const insertDefaults = db.transaction(() => {
      DEFAULT_ITEMS.forEach(item => insItem.run({
        id: item.id, name: item.name, type: item.type,
        unit: item.unit || '', unit2: item.unit2 || '',
        factor: item.factor || 1, cost: item.cost || 0, price: item.price || 0,
        price2: 0, price3: 0, minStock: item.minStock || 0, maxStock: 0,
        barcode: '', barcode2: '', taxRate: 0, brand: '', defaultSupplier: '',
        priceCurrency: 'USD'
      }));
    });
    insertDefaults();
    items = db.prepare('SELECT * FROM items').all();
  }
  const customers = db.prepare('SELECT * FROM customers').all();
  const suppliers = db.prepare('SELECT * FROM suppliers').all();
  const books = db.prepare('SELECT * FROM books').all();

  const salesInvoices = db.prepare('SELECT * FROM sales_invoices ORDER BY date DESC').all().map(inv => ({
    ...inv,
    lines: db.prepare('SELECT * FROM sales_lines WHERE invoiceNumber = ?').all(inv.number)
  }));

  const purchaseInvoices = db.prepare('SELECT * FROM purchase_invoices ORDER BY date DESC').all().map(inv => ({
    ...inv,
    lines: db.prepare('SELECT * FROM purchase_lines WHERE invoiceNumber = ?').all(inv.number)
  }));

  const returns = db.prepare('SELECT * FROM returns ORDER BY date DESC').all().map(r => ({
    ...r,
    lines: db.prepare('SELECT * FROM return_lines WHERE returnNumber = ?').all(r.number)
  }));

  const customerPayments = db.prepare('SELECT * FROM customer_payments ORDER BY date DESC').all();
  const supplierPayments = db.prepare('SELECT * FROM supplier_payments ORDER BY date DESC').all();
  const creditLedger = db.prepare('SELECT * FROM credit_ledger ORDER BY date ASC, id ASC').all();

  return { company, exchange, invoiceCounters, items, customers, suppliers, books,
           salesInvoices, purchaseInvoices, returns, customerPayments, supplierPayments,
           creditLedger };
}

// ============================================================
// حفظ كل البيانات
// ============================================================
function saveAll(data) {
  const run = db.transaction(() => {

    // company
    const upsertCompany = db.prepare('INSERT OR REPLACE INTO company (key, value) VALUES (?, ?)');
    const co = data.company || {};
    Object.entries(co).forEach(([k, v]) => upsertCompany.run(k, v));

    // exchange
    const upsertExch = db.prepare('INSERT OR REPLACE INTO exchange (key, value) VALUES (?, ?)');
    const ex = data.exchange || {};
    Object.entries(ex).forEach(([k, v]) => upsertExch.run(k, String(v)));

    // invoice counters
    const upsertCnt = db.prepare('INSERT OR REPLACE INTO invoice_counters (key, value) VALUES (?, ?)');
    const cnt = data.invoiceCounters || {};
    Object.entries(cnt).forEach(([k, v]) => upsertCnt.run(k, v));

    // books
    db.prepare('DELETE FROM books').run();
    const insBook = db.prepare('INSERT INTO books (id, name) VALUES (@id, @name)');
    (data.books || []).forEach(b => insBook.run({ id: b.id || '', name: b.name || '' }));

    // items — مع كل الحقول الجديدة
    db.prepare('DELETE FROM items').run();
    const insItem = db.prepare(`
      INSERT INTO items (id, name, type, unit, unit2, factor, cost, price, price2, price3,
                         minStock, maxStock, barcode, barcode2, taxRate, brand, defaultSupplier, priceCurrency)
      VALUES (@id, @name, @type, @unit, @unit2, @factor, @cost, @price, @price2, @price3,
              @minStock, @maxStock, @barcode, @barcode2, @taxRate, @brand, @defaultSupplier, @priceCurrency)
    `);
    (data.items || []).forEach(item => insItem.run({
      id:              item.id            || '',
      name:            item.name          || '',
      type:            item.type          || '',
      unit:            item.unit          || '',
      unit2:           item.unit2         || '',
      factor:          item.factor        || 1,
      cost:            item.cost          || 0,
      price:           item.price         || 0,
      price2:          item.price2        || 0,
      price3:          item.price3        || 0,
      minStock:        item.minStock      || 0,
      maxStock:        item.maxStock      || 0,
      barcode:         item.barcode       || '',
      barcode2:        item.barcode2      || '',
      taxRate:         item.taxRate       || 0,
      brand:           item.brand         || '',
      defaultSupplier: item.defaultSupplier || '',
      priceCurrency:   item.priceCurrency || 'USD',
    }));

    // customers
    db.prepare('DELETE FROM customers').run();
    const insCus = db.prepare('INSERT INTO customers (id, name, phone, address, balance, creditBalance) VALUES (@id, @name, @phone, @address, @balance, @creditBalance)');
    (data.customers || []).forEach(c => insCus.run({
      id: c.id || ('CUS-' + Date.now() + Math.random()),
      name: c.name || '', phone: c.phone || '', address: c.address || '', balance: c.balance || 0,
      creditBalance: c.creditBalance || 0
    }));

    // suppliers
    db.prepare('DELETE FROM suppliers').run();
    const insSup = db.prepare('INSERT INTO suppliers (id, name, phone, address, balance, creditBalance) VALUES (@id, @name, @phone, @address, @balance, @creditBalance)');
    (data.suppliers || []).forEach(s => insSup.run({
      id: s.id || ('SUP-' + Date.now() + Math.random()),
      name: s.name || '', phone: s.phone || '', address: s.address || '', balance: s.balance || 0,
      creditBalance: s.creditBalance || 0
    }));

    // sales invoices
    db.prepare('DELETE FROM sales_lines').run();
    db.prepare('DELETE FROM sales_invoices').run();
    const insSaleInv = db.prepare(`
      INSERT INTO sales_invoices
        (number, date, time, customerName, subtotal, discount, total, paidAmount,
         paymentType, priceType, currency, usdToOld, taxRate, taxAmount, note, paymentStatus, deletedAt)
      VALUES
        (@number, @date, @time, @customerName, @subtotal, @discount, @total, @paidAmount,
         @paymentType, @priceType, @currency, @usdToOld, @taxRate, @taxAmount, @note, @paymentStatus, @deletedAt)
    `);
    const insSaleLine = db.prepare(`
      INSERT INTO sales_lines (invoiceNumber, itemId, qty, price, total, unitType, note)
      VALUES (@invoiceNumber, @itemId, @qty, @price, @total, @unitType, @note)
    `);
    (data.salesInvoices || []).forEach(inv => {
      insSaleInv.run({
        number: inv.number, date: inv.date || '', time: inv.time || '',
        customerName: inv.customerName || '',
        subtotal: inv.subtotal || 0, discount: inv.discount || 0,
        total: inv.total || 0, paidAmount: inv.paidAmount || 0,
        paymentType: inv.paymentType || 'cash',
        priceType: inv.priceType || 'retail',
        currency: inv.currency || 'USD', usdToOld: inv.usdToOld || 0,
        taxRate: inv.taxRate || 0, taxAmount: inv.taxAmount || 0,
        note: inv.note || '',
        paymentStatus: inv.paymentStatus || '',
        deletedAt: inv.deletedAt || ''
      });
      (inv.lines || []).forEach(l => insSaleLine.run({
        invoiceNumber: inv.number, itemId: l.itemId || '',
        qty: l.qty || 0, price: l.price || 0, total: l.total || 0,
        unitType: l.unitType || 'unit', note: l.note || ''
      }));
    });

    // purchase invoices
    db.prepare('DELETE FROM purchase_lines').run();
    db.prepare('DELETE FROM purchase_invoices').run();
    const insPurInv = db.prepare(`
      INSERT INTO purchase_invoices
        (number, date, time, supplierName, supplierInvoiceNum, subtotal, discount, total,
         paidAmount, paymentType, shippingCost, shippingAccount, currency, usdToOld, note, paymentStatus, deletedAt)
      VALUES
        (@number, @date, @time, @supplierName, @supplierInvoiceNum, @subtotal, @discount, @total,
         @paidAmount, @paymentType, @shippingCost, @shippingAccount, @currency, @usdToOld, @note, @paymentStatus, @deletedAt)
    `);
    const insPurLine = db.prepare(`
      INSERT INTO purchase_lines (invoiceNumber, itemId, qty, price, total, unitType, note)
      VALUES (@invoiceNumber, @itemId, @qty, @price, @total, @unitType, @note)
    `);
    (data.purchaseInvoices || []).forEach(inv => {
      insPurInv.run({
        number: inv.number, date: inv.date || '', time: inv.time || '',
        supplierName: inv.supplierName || '',
        supplierInvoiceNum: inv.supplierInvoiceNum || '',
        subtotal: inv.subtotal || 0, discount: inv.discount || 0,
        total: inv.total || 0, paidAmount: inv.paidAmount || 0,
        paymentType: inv.paymentType || 'cash',
        shippingCost: inv.shippingCost || 0,
        shippingAccount: inv.shippingAccount || '',
        currency: inv.currency || 'USD', usdToOld: inv.usdToOld || 0,
        note: inv.note || '',
        paymentStatus: inv.paymentStatus || '',
        deletedAt: inv.deletedAt || ''
      });
      (inv.lines || []).forEach(l => insPurLine.run({
        invoiceNumber: inv.number, itemId: l.itemId || '',
        qty: l.qty || 0, price: l.price || 0, total: l.total || 0,
        unitType: l.unitType || 'unit', note: l.note || ''
      }));
    });

    // returns
    db.prepare('DELETE FROM return_lines').run();
    db.prepare('DELETE FROM returns').run();
    const insRet = db.prepare(`INSERT INTO returns (number, type, date, party, total, note, refInvoice, debtReduction, creditAdded) VALUES (@number, @type, @date, @party, @total, @note, @refInvoice, @debtReduction, @creditAdded)`);
    const insRetLine = db.prepare(`INSERT INTO return_lines (returnNumber, itemId, qty, price, total, unitType, srcLine) VALUES (@returnNumber, @itemId, @qty, @price, @total, @unitType, @srcLine)`);
    (data.returns || []).forEach(r => {
      insRet.run({ number: r.number, type: r.type || '', date: r.date || '', party: r.party || '', total: r.total || 0, note: r.note || '',
                   refInvoice: r.refInvoice || '', debtReduction: r.debtReduction || 0, creditAdded: r.creditAdded || 0 });
      (r.lines || []).forEach(l => insRetLine.run({ returnNumber: r.number, itemId: l.itemId || '', qty: l.qty || 0, price: l.price || 0, total: l.total || 0, unitType: l.unitType || 'unit', srcLine: (l.srcLine === undefined || l.srcLine === null) ? -1 : l.srcLine }));
    });

    // customer payments — إيصالات القبض
    db.prepare('DELETE FROM customer_payments').run();
    const insCusPay = db.prepare(`
      INSERT INTO customer_payments
        (receiptNum, customerName, amount, paymentMethod, chequeNum, description, discountOnPayment, linkedInvoice, note, date, creditAdded, pid)
      VALUES (@receiptNum, @customerName, @amount, @paymentMethod, @chequeNum, @description, @discountOnPayment, @linkedInvoice, @note, @date, @creditAdded, @pid)
    `);
    (data.customerPayments || []).forEach(p => insCusPay.run({
      receiptNum: p.receiptNum || '', customerName: p.customerName || '',
      amount: p.amount || 0, paymentMethod: p.paymentMethod || 'cash',
      chequeNum: p.chequeNum || '', description: p.description || '',
      discountOnPayment: p.discountOnPayment || 0,
      linkedInvoice: p.linkedInvoice || '',
      note: p.note || '', date: p.date || '',
      creditAdded: p.creditAdded || 0, pid: p.pid || ''
    }));

    // supplier payments
    db.prepare('DELETE FROM supplier_payments').run();
    const insSupPay = db.prepare(`
      INSERT INTO supplier_payments
        (receiptNum, supplierName, amount, paymentMethod, chequeNum, description, discountOnPayment, linkedInvoice, note, date, creditAdded, pid)
      VALUES (@receiptNum, @supplierName, @amount, @paymentMethod, @chequeNum, @description, @discountOnPayment, @linkedInvoice, @note, @date, @creditAdded, @pid)
    `);
    (data.supplierPayments || []).forEach(p => insSupPay.run({
      receiptNum: p.receiptNum || '', supplierName: p.supplierName || '',
      amount: p.amount || 0, paymentMethod: p.paymentMethod || 'cash',
      chequeNum: p.chequeNum || '', description: p.description || '',
      discountOnPayment: p.discountOnPayment || 0,
      linkedInvoice: p.linkedInvoice || '',
      note: p.note || '', date: p.date || '',
      creditAdded: p.creditAdded || 0, pid: p.pid || ''
    }));

    // credit ledger — سجل حركة الرصيد الإضافي
    db.prepare('DELETE FROM credit_ledger').run();
    const insLedger = db.prepare(`
      INSERT INTO credit_ledger (id, partyType, partyName, amount, type, refType, ref, date, key)
      VALUES (@id, @partyType, @partyName, @amount, @type, @refType, @ref, @date, @key)
    `);
    (data.creditLedger || []).forEach(m => insLedger.run({
      id: m.id, partyType: m.partyType || '', partyName: m.partyName || '',
      amount: m.amount || 0, type: m.type || '', refType: m.refType || '',
      ref: m.ref || '', date: m.date || '', key: m.key || ''
    }));
  });

  run();
}

// ============================================================
// ترحيل البيانات القديمة من localStorage JSON
// ============================================================
function migrateFromJSON(jsonData) {
  try {
    const data = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
    saveAll(data);
    return { success: true };
  } catch(e) {
    return { success: false, error: e.message };
  }
}

// ============================================================
// رصيد إضافي (Credit balance) — منطق الدفع الزائد والخصم التلقائي
// دوال نقية قابلة للاختبار. المصدر الوحيد لمنطق الرصيد الإضافي؛
// تعكسه واجهة app.js (renderer) بنفس الدلالة تماماً.
// ============================================================
const CREDIT_EPSILON = 0.005;

function roundMoney(n) {
  return Math.round((Number(n) || 0) * 100) / 100;
}

// عند تسجيل دفعة تتجاوز إجمالي المطلوب على الفواتير المفتوحة:
// يُطبَّق جزء بمقدار المطلوب على الفواتير، ويتحول الفائض (X) إلى رصيد إضافي.
// paymentAmount: المبلغ المُدخل (بالدولار)
// outstanding:   إجمالي المتبقي على كل الفواتير المفتوحة للطرف
function computeOverpayment(paymentAmount, outstanding) {
  const pay = Math.max(0, roundMoney(paymentAmount));
  const due = Math.max(0, roundMoney(outstanding));
  const appliedToInvoices = Math.min(pay, due);
  const creditAdded = roundMoney(pay - appliedToInvoices);
  return {
    appliedToInvoices: roundMoney(appliedToInvoices),
    creditAdded,
    isOverpayment: creditAdded > CREDIT_EPSILON,
  };
}

// عند إنشاء فاتورة جديدة لطرف لديه رصيد إضافي:
// يُخصَم من الرصيد الإضافي أولاً (كلياً أو جزئياً) قبل حساب المتبقي على الفاتورة.
// creditBalance: الرصيد الإضافي الحالي للطرف
// invoiceTotal:  إجمالي الفاتورة الجديدة
// alreadyPaid:   أي دفعة نقدية مُدخلة مع الفاتورة (اختياري)
function applyCreditToInvoice(creditBalance, invoiceTotal, alreadyPaid = 0) {
  const credit = Math.max(0, roundMoney(creditBalance));
  const due    = Math.max(0, roundMoney(roundMoney(invoiceTotal) - roundMoney(alreadyPaid)));
  const creditApplied = Math.min(credit, due);
  return {
    creditApplied:   roundMoney(creditApplied),
    remainingCredit: roundMoney(credit - creditApplied),
    amountDue:       roundMoney(due - creditApplied),
  };
}

// ============================================================
// كشف الحساب — دوال نقية مشتركة مع الواجهة (app.js)
// تضمن اتساقاً رياضياً دائماً بين ثلاثة أرقام:
//   الإجمالي العام (remaining) = مجموع سطور الفواتير في الجدول = مجموع (متبقي كل فاتورة)
//   مجموع الدفعات (totalPayments) يُحسب ويُعرض منفصلاً
//   الدفعات اليتيمة (totalStandalone) تبقى بنداً مستقلاً — لا تُوزَّع ضمنياً على الفواتير
// نفس المنطق مُكرَّر حرفياً في app.js (الـ renderer لا يستطيع require).
// ============================================================

// سجل وديعة تلقائي (مضمّن أصلاً في paidAmount للفاتورة) — يُستثنى لتفادي الاحتساب المزدوج.
function isAutoDepositRecord(p) {
  return !!p && (p._deposit === true || /^دفعة مع الفاتورة /.test(p.description || ''));
}

// صافي ما تسدّده الدفعة على الفواتير: المبلغ − الفائض المحوّل لرصيد إضافي + الخصم على الدفعة.
function paymentSettlement(p) {
  return (parseFloat(p.amount) || 0)
       - (parseFloat(p.creditAdded) || 0)
       + (parseFloat(p.discountOnPayment) || 0);
}

// المتبقي الحي على فاتورة واحدة — المصدر الوحيد لسطر الفاتورة في كشف الحساب.
// المدفوع = الوديعة عند الإنشاء + الدفعات اللاحقة المربوطة بهذه الفاتورة حصراً.
// الدفعات اليتيمة (بلا linkedInvoice) لا تُحتسب هنا — لا توزيع خفي على الفواتير.
function computeInvoiceRemaining(inv, payments, returns) {
  const total = roundMoney(inv.total || 0);
  if ((inv.paymentType || 'cash') !== 'deferred') {
    return { total, paid: total, remaining: 0, closed: true, isDeferred: false };
  }
  const deposit = roundMoney(parseFloat(inv.paidAmount) || 0);
  const later = (payments || [])
    .filter(p => p.linkedInvoice === inv.number && !isAutoDepositRecord(p))
    .reduce((s, p) => s + paymentSettlement(p), 0);
  // مردود المبيع المربوط بهذه الفاتورة يُسوّي جزءاً من دينها (debtReduction فقط، والفائض ذهب لرصيد إضافي).
  const returned = (returns || [])
    .filter(r => r.refInvoice === inv.number)
    .reduce((s, r) => s + (parseFloat(r.debtReduction) || 0), 0);
  const paid = roundMoney(deposit + later + returned);
  const remaining = Math.max(0, roundMoney(total - paid));
  return { total, paid, remaining, closed: remaining <= CREDIT_EPSILON, isDeferred: true };
}

// ملخّص كشف حساب طرف (زبون/مورد) — أرقام متسقة رياضياً دائماً.
// invoices: فواتير الطرف، payments: دفعاته، creditBalance: رصيده الإضافي.
function computeAccountSummary(args) {
  const invoices      = (args && args.invoices) || [];
  const allPayments   = (args && args.payments) || [];
  const returns       = (args && args.returns) || [];
  const creditBalance = roundMoney((args && args.creditBalance) || 0);

  // سجلات الوديعة التلقائية مضمّنة في paidAmount — تُستثنى لتفادي الاحتساب المزدوج.
  const realPayments     = allPayments.filter(p => !isAutoDepositRecord(p));
  const cashInvoices     = invoices.filter(i => (i.paymentType || 'cash') === 'cash');
  const deferredInvoices = invoices.filter(i => (i.paymentType || 'cash') === 'deferred');

  const totalInvoices = roundMoney(invoices.reduce((s, i) => s + (i.total || 0), 0));
  const totalCash     = roundMoney(cashInvoices.reduce((s, i) => s + (i.total || 0), 0));
  const totalDeferred = roundMoney(deferredInvoices.reduce((s, i) => s + (i.total || 0), 0));

  const linkedPayments     = realPayments.filter(p =>  p.linkedInvoice);
  const standalonePayments = realPayments.filter(p => !p.linkedInvoice);
  const totalLinked     = roundMoney(linkedPayments.reduce((s, p) => s + paymentSettlement(p), 0));
  const totalStandalone = roundMoney(standalonePayments.reduce((s, p) => s + paymentSettlement(p), 0));
  const totalPayments   = roundMoney(realPayments.reduce((s, p) => s + paymentSettlement(p), 0));

  // الإجمالي العام = مجموع سطور الفواتير حرفياً (المصدر الوحيد computeInvoiceRemaining لكل فاتورة).
  // لا نطرح الدفعات اليتيمة ضمنياً — تبقى بنداً مستقلاً ظاهراً للمستخدم.
  // مردودات المبيع تُسوّي جزءاً من دين فاتورتها المصدر داخل computeInvoiceRemaining (debtReduction).
  const saleReturns = returns.filter(r => (r.type || 'sale') === 'sale');
  const perInvoice = deferredInvoices.map(inv => computeInvoiceRemaining(inv, realPayments, saleReturns));
  const invoiceRemaining = roundMoney(perInvoice.reduce((s, b) => s + b.remaining, 0));
  const remaining  = invoiceRemaining;
  const totalPaid  = roundMoney(totalInvoices - remaining); // المدفوع على الفواتير = الإجمالي − المتبقي

  const totalReturns        = roundMoney(saleReturns.reduce((s, r) => s + (r.total || 0), 0));
  const totalReturnDebt     = roundMoney(saleReturns.reduce((s, r) => s + (parseFloat(r.debtReduction) || 0), 0));
  const totalReturnCredit   = roundMoney(saleReturns.reduce((s, r) => s + (parseFloat(r.creditAdded)   || 0), 0));

  return {
    totalInvoices, totalCash, totalDeferred,
    totalLinked, totalStandalone, totalPayments,
    standalonePayments,
    invoiceRemaining, remaining, totalPaid,
    totalReturns, totalReturnDebt, totalReturnCredit,
    creditBalance,
  };
}

// ============================================================
// سجل حركة الرصيد الإضافي (creditLedger) — محرك نقي مشترك
// كل إضافة/خصم للرصيد الإضافي يجب أن يمر عبر هذا المحرك (لا تعديل مباشر):
//   - recordCreditMovement: يطفّر رصيد الطرف ويضيف قيداً مدققاً.
//   - reverseCreditMovements: يعكس كل قيود مرجع معيّن (حذف دفعة/فاتورة).
// key (مفتاح الحركة) يمنع تطبيق نفس العملية مرتين تحت أي سيناريو
// (إعادة تطبيق فاتورة، تعديل دفعة، إعادة حفظ...).
// نفس المنطق مُكرَّر حرفياً في app.js (الـ renderer لا يستطيع require).
// ============================================================
function creditMovementKey(kind, ref) {
  return String(kind) + ':' + String(ref);
}

// ledger: مصفوفة الحركات — party: كائن الطرف (يُطفَّر creditBalance).
// delta موجب = إضافة رصيد، سالب = خصم رصيد.
// يُعيد الحركة المُنشأة، أو null إذا: المبلغ صفر / المفتاح مكرر / لا يوجد ledger.
function recordCreditMovement(ledger, party, opts) {
  const { partyType, partyName, delta, refType, ref, date, key } = opts || {};
  if (!Array.isArray(ledger)) return null;
  const amount = roundMoney(delta);
  if (Math.abs(amount) <= CREDIT_EPSILON) return null;
  if (key && ledger.some(m => m.key === key)) return null; // منع الازدواجية
  if (party) party.creditBalance = roundMoney((party.creditBalance || 0) + amount);
  const mv = {
    id: 'CM-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 7),
    partyType, partyName,
    amount,
    type: amount > 0 ? 'add' : 'deduct',
    refType: refType || '',
    ref: ref || '',
    date: date || new Date().toISOString().split('T')[0],
    key: key || ''
  };
  ledger.push(mv);
  return mv;
}

// عكس كل حركات مرجع معيّن لطرف محدّد — يعيد الرصيد ويحذف القيود.
// يُعيد عدد القيود التي عُكست.
function reverseCreditMovements(ledger, party, opts) {
  const { partyType, partyName, refType, ref } = opts || {};
  if (!Array.isArray(ledger)) return 0;
  let reversed = 0;
  const kept = [];
  for (const m of ledger) {
    const match = m.partyType === partyType && m.partyName === partyName &&
                  m.ref === ref && (!refType || m.refType === refType);
    if (match) {
      if (party) party.creditBalance = roundMoney((party.creditBalance || 0) - m.amount);
      reversed++;
      continue;
    }
    kept.push(m);
  }
  ledger.length = 0;
  kept.forEach(m => ledger.push(m));
  return reversed;
}

// ============================================================
// مردود المبيع (Sales Return) — دوال نقية مشتركة مع الواجهة (app.js)
// تضمن منطقاً واحداً للكمية القابلة للإرجاع وأثر المردود على الدين/الرصيد الإضافي.
// ============================================================

// أقصى كمية قابلة للإرجاع لبند = الكمية المباعة − ما سبق إرجاعه لنفس البند من نفس الفاتورة.
function computeReturnableQty(soldQty, priorReturnedQty) {
  return roundMoney(Math.max(0, (Number(soldQty) || 0) - (Number(priorReturnedQty) || 0)));
}

// تحقق من كمية إرجاع مطلوبة لبند — تُرفض إذا كانت صفراً أو تتجاوز المتاح.
function validateReturnQty(requestedQty, soldQty, priorReturnedQty) {
  const returnable = computeReturnableQty(soldQty, priorReturnedQty);
  const q = Number(requestedQty) || 0;
  if (q <= 0) return { ok: false, reason: 'zero', returnable };
  if (roundMoney(q) > roundMoney(returnable) + CREDIT_EPSILON) return { ok: false, reason: 'exceeds', returnable };
  return { ok: true, returnable };
}

// أثر مردود المبيع على حساب الزبون — يغطّي الحالات الثلاث:
//  • فاتورة مسدّدة بالكامل (المتبقي 0) ← كل القيمة تذهب للرصيد الإضافي (creditAdded).
//  • فاتورة آجلة فيها دين ← يُخصم من الدين (debtReduction) بمقدار الأقل من القيمة والدين.
//  • مدفوعة جزئياً ← يُسدّد الدين المتبقي أولاً والفائض يذهب للرصيد الإضافي.
function computeSalesReturnEffect(invoiceRemaining, returnValue) {
  const rem = Math.max(0, roundMoney(invoiceRemaining));
  const val = Math.max(0, roundMoney(returnValue));
  const debtReduction = roundMoney(Math.min(val, rem));
  const creditAdded   = roundMoney(val - debtReduction);
  return { debtReduction, creditAdded };
}

// حساب المخزون الحالي لكل صنف من الحركات: شراء (+)، بيع (−)، مردود بيع (+)، مردود شراء (−)، تالف (−).
// دالة نقية — تعكس calcInventory في app.js حرفياً. مردود البيع يُعيد الكمية تلقائياً للمخزون.
function computeInventory(data) {
  const inv = {};
  const add = (id, q) => { if (id) inv[id] = roundMoney((inv[id] || 0) + q); };
  (data.purchaseInvoices || []).filter(p => !p.deletedAt).forEach(p =>
    (p.lines || []).forEach(l => add(l.itemId, +(parseFloat(l.qty) || 0))));
  (data.salesInvoices || []).filter(i => !i.deletedAt).forEach(i =>
    (i.lines || []).forEach(l => add(l.itemId, -(parseFloat(l.qty) || 0))));
  (data.returns || []).forEach(r =>
    (r.lines || []).forEach(l => add(l.itemId, ((r.type === 'sale') ? 1 : -1) * (parseFloat(l.qty) || 0))));
  (data.damages || []).forEach(d => add(d.itemId, -(parseFloat(d.qty) || 0)));
  return inv;
}

function hasData() {
  try {
    // يعتبر في بيانات لو في فواتير أو زبائن أو موردين — مش items فقط
    const items    = db.prepare('SELECT COUNT(*) as c FROM items').get().c;
    const sales    = db.prepare('SELECT COUNT(*) as c FROM sales_invoices').get().c;
    const purchases= db.prepare('SELECT COUNT(*) as c FROM purchase_invoices').get().c;
    const customers= db.prepare('SELECT COUNT(*) as c FROM customers').get().c;
    const suppliers= db.prepare('SELECT COUNT(*) as c FROM suppliers').get().c;
    return (items + sales + purchases + customers + suppliers) > 0;
  } catch(e) { return false; }
}

function backupTo(destPath) {
  db.backup(destPath);
}

module.exports = {
  openDatabase, loadAll, saveAll, migrateFromJSON, hasData, backupTo,
  // رصيد إضافي — دوال نقية مشتركة مع الواجهة
  computeOverpayment, applyCreditToInvoice, roundMoney, CREDIT_EPSILON,
  // كشف الحساب — دوال نقية مشتركة مع الواجهة
  isAutoDepositRecord, paymentSettlement, computeInvoiceRemaining, computeAccountSummary,
  // سجل حركة الرصيد الإضافي — محرك نقي مشترك مع الواجهة
  recordCreditMovement, reverseCreditMovements, creditMovementKey,
  // مردود المبيع — دوال نقية مشتركة مع الواجهة
  computeReturnableQty, validateReturnQty, computeSalesReturnEffect, computeInventory,
};
