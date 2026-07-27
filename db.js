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
      id      TEXT PRIMARY KEY,
      name    TEXT,
      phone   TEXT,
      address TEXT,
      balance REAL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS suppliers (
      id      TEXT PRIMARY KEY,
      name    TEXT,
      phone   TEXT,
      address TEXT,
      balance REAL DEFAULT 0
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
      note            TEXT DEFAULT ''
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
      note                TEXT DEFAULT ''
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
      number TEXT PRIMARY KEY,
      type   TEXT,
      date   TEXT,
      party  TEXT,
      total  REAL DEFAULT 0,
      note   TEXT
    );

    CREATE TABLE IF NOT EXISTS return_lines (
      id           INTEGER PRIMARY KEY AUTOINCREMENT,
      returnNumber TEXT REFERENCES returns(number) ON DELETE CASCADE,
      itemId       TEXT,
      qty          REAL DEFAULT 0,
      price        REAL DEFAULT 0,
      total        REAL DEFAULT 0,
      unitType     TEXT DEFAULT 'unit'
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
      note         TEXT,
      date         TEXT
    );

    CREATE TABLE IF NOT EXISTS books (
      id   TEXT PRIMARY KEY,
      name TEXT
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
    // customers / suppliers — رصيد
    { table: 'customers', column: 'balance', def: "REAL DEFAULT 0" },
    { table: 'suppliers', column: 'balance', def: "REAL DEFAULT 0" },
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

  return { company, exchange, invoiceCounters, items, customers, suppliers, books,
           salesInvoices, purchaseInvoices, returns, customerPayments, supplierPayments };
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
    const insCus = db.prepare('INSERT INTO customers (id, name, phone, address, balance) VALUES (@id, @name, @phone, @address, @balance)');
    (data.customers || []).forEach(c => insCus.run({
      id: c.id || ('CUS-' + Date.now() + Math.random()),
      name: c.name || '', phone: c.phone || '', address: c.address || '', balance: c.balance || 0
    }));

    // suppliers
    db.prepare('DELETE FROM suppliers').run();
    const insSup = db.prepare('INSERT INTO suppliers (id, name, phone, address, balance) VALUES (@id, @name, @phone, @address, @balance)');
    (data.suppliers || []).forEach(s => insSup.run({
      id: s.id || ('SUP-' + Date.now() + Math.random()),
      name: s.name || '', phone: s.phone || '', address: s.address || '', balance: s.balance || 0
    }));

    // sales invoices
    db.prepare('DELETE FROM sales_lines').run();
    db.prepare('DELETE FROM sales_invoices').run();
    const insSaleInv = db.prepare(`
      INSERT INTO sales_invoices
        (number, date, time, customerName, subtotal, discount, total, paidAmount,
         paymentType, priceType, currency, usdToOld, taxRate, taxAmount, note)
      VALUES
        (@number, @date, @time, @customerName, @subtotal, @discount, @total, @paidAmount,
         @paymentType, @priceType, @currency, @usdToOld, @taxRate, @taxAmount, @note)
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
        note: inv.note || ''
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
         paidAmount, paymentType, shippingCost, shippingAccount, currency, usdToOld, note)
      VALUES
        (@number, @date, @time, @supplierName, @supplierInvoiceNum, @subtotal, @discount, @total,
         @paidAmount, @paymentType, @shippingCost, @shippingAccount, @currency, @usdToOld, @note)
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
        note: inv.note || ''
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
    const insRet = db.prepare(`INSERT INTO returns (number, type, date, party, total, note) VALUES (@number, @type, @date, @party, @total, @note)`);
    const insRetLine = db.prepare(`INSERT INTO return_lines (returnNumber, itemId, qty, price, total, unitType) VALUES (@returnNumber, @itemId, @qty, @price, @total, @unitType)`);
    (data.returns || []).forEach(r => {
      insRet.run({ number: r.number, type: r.type || '', date: r.date || '', party: r.party || '', total: r.total || 0, note: r.note || '' });
      (r.lines || []).forEach(l => insRetLine.run({ returnNumber: r.number, itemId: l.itemId || '', qty: l.qty || 0, price: l.price || 0, total: l.total || 0, unitType: l.unitType || 'unit' }));
    });

    // customer payments — إيصالات القبض
    db.prepare('DELETE FROM customer_payments').run();
    const insCusPay = db.prepare(`
      INSERT INTO customer_payments
        (receiptNum, customerName, amount, paymentMethod, chequeNum, description, discountOnPayment, note, date)
      VALUES (@receiptNum, @customerName, @amount, @paymentMethod, @chequeNum, @description, @discountOnPayment, @note, @date)
    `);
    (data.customerPayments || []).forEach(p => insCusPay.run({
      receiptNum: p.receiptNum || '', customerName: p.customerName || '',
      amount: p.amount || 0, paymentMethod: p.paymentMethod || 'cash',
      chequeNum: p.chequeNum || '', description: p.description || '',
      discountOnPayment: p.discountOnPayment || 0,
      note: p.note || '', date: p.date || ''
    }));

    // supplier payments
    db.prepare('DELETE FROM supplier_payments').run();
    const insSupPay = db.prepare(`
      INSERT INTO supplier_payments
        (receiptNum, supplierName, amount, paymentMethod, chequeNum, description, note, date)
      VALUES (@receiptNum, @supplierName, @amount, @paymentMethod, @chequeNum, @description, @note, @date)
    `);
    (data.supplierPayments || []).forEach(p => insSupPay.run({
      receiptNum: p.receiptNum || '', supplierName: p.supplierName || '',
      amount: p.amount || 0, paymentMethod: p.paymentMethod || 'cash',
      chequeNum: p.chequeNum || '', description: p.description || '',
      note: p.note || '', date: p.date || ''
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

module.exports = { openDatabase, loadAll, saveAll, migrateFromJSON, hasData, backupTo };
