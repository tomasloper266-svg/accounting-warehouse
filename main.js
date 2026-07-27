// ============================================================
// main.js — محدَّث لدعم SQLite
// التغييرات: إضافة db.js + 3 IPC handlers جديدة
// كل الكود القديم محفوظ كما هو
// ============================================================

const { app, BrowserWindow, Menu, session, ipcMain } = require('electron');
const path = require('path');
const fs   = require('fs');

// ===== مسار userData =====
app.setPath('userData', path.join(app.getPath('appData'), 'AccountingWarehouse'));

// منع تعدد النوافذ
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) { app.quit(); }

// ===== تهيئة SQLite مبكراً =====
const dbModule = require('./db');
let dbReady = false;

function initDatabase() {
  try {
    const dbPath = dbModule.openDatabase(app.getPath('userData'));
    dbReady = true;
    console.log('✅ SQLite ready:', dbPath);
  } catch (e) {
    console.error('❌ SQLite init error:', e);
    // نعرض الخطأ الحقيقي للمستخدم
    dbInitError = e.message;
  }
}

let dbInitError = null;

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    title: 'برنامج المحاسبة والمستودعات',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
      partition: 'persist:accounting',
    },
    show: false,
  });

  win.loadFile(path.join(__dirname, 'index.html'));

  win.once('ready-to-show', () => {
    win.show();
    win.focus();
    setTimeout(() => runDailyBackup(win), 3000);
  });

  Menu.setApplicationMenu(null);
}

// ============================================================
// IPC — SQLite (جديد)
// ============================================================

// تحميل البيانات
ipcMain.handle('db-load', () => {
  if (!dbReady) return null;
  try {
    return dbModule.loadAll();
  } catch (e) {
    console.error('db-load error:', e);
    return null;
  }
});

// حفظ البيانات
ipcMain.handle('db-save', (event, data) => {
  if (!dbReady) return { success: false, error: 'DB not ready' };
  try {
    dbModule.saveAll(data);
    return { success: true };
  } catch (e) {
    console.error('db-save error:', e);
    return { success: false, error: e.message };
  }
});

// ترحيل بيانات localStorage القديمة
ipcMain.handle('db-migrate', (event, jsonData) => {
  if (!dbReady) return { success: false, error: 'DB not ready' };
  // لو في بيانات موجودة بالفعل في SQLite ما نكتب فوقها
  if (dbModule.hasData()) {
    return { success: true, skipped: true };
  }
  return dbModule.migrateFromJSON(jsonData);
});

// التحقق هل في بيانات في SQLite
ipcMain.handle('db-has-data', () => {
  if (!dbReady) return false;
  return dbModule.hasData();
});

// تصدير ملف data.db — باستخدام db.backup() لضمان WAL checkpoint
ipcMain.handle('export-database', async () => {
  const { dialog } = require('electron');
  if (!dbReady) {
    return { success: false, error: 'قاعدة البيانات لم تُفتح. السبب: ' + (dbInitError || 'unknown') };
  }
  const today = new Date().toISOString().split('T')[0];
  const result = await dialog.showSaveDialog({
    title: 'تصدير قاعدة البيانات',
    defaultPath: `accounting-data-${today}.db`,
    filters: [{ name: 'SQLite Database', extensions: ['db'] }]
  });
  if (!result.canceled && result.filePath) {
    try {
      console.log('📦 Exporting DB to:', result.filePath);
      console.log('📦 dbReady:', dbReady);
      dbModule.backupTo(result.filePath);
      console.log('✅ Export success');
      return { success: true };
    } catch(e) {
      console.error('❌ export-database error:', e.message);
      return { success: false, error: e.message };
    }
  }
  return { success: false, canceled: true };
});

// استيراد ملف data.db
ipcMain.handle('import-database', async () => {
  const { dialog } = require('electron');
  const result = await dialog.showOpenDialog({
    title: 'استيراد قاعدة البيانات',
    filters: [{ name: 'SQLite Database', extensions: ['db'] }],
    properties: ['openFile']
  });
  if (!result.canceled && result.filePaths.length > 0) {
    try {
      const destPath = require('path').join(app.getPath('userData'), 'data.db');
      // نسخة احتياطية من الملف الحالي قبل الاستبدال
      const backupPath = destPath + '.bak';
      if (require('fs').existsSync(destPath)) {
        require('fs').copyFileSync(destPath, backupPath);
      }
      require('fs').copyFileSync(result.filePaths[0], destPath);
      return { success: true };
    } catch(e) {
      return { success: false, error: e.message };
    }
  }
  return { success: false, canceled: true };
});

// ============================================================
// BACKUP HELPERS (محفوظة كما هي)
// ============================================================
function getBackupDir() {
  const docs = app.getPath('documents');
  const dir = path.join(docs, 'AccountingBackups');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  return dir;
}

function runDailyBackup(win) {
  try {
    const dir = getBackupDir();
    const today = new Date().toISOString().split('T')[0];
    const filePath = path.join(dir, `backup-${today}.json`);
    if (fs.existsSync(filePath)) return;
    win.webContents.send('request-backup-data');
  } catch(e) {
    console.error('Backup error:', e);
  }
}

function cleanOldBackups(keepDays = 30) {
  try {
    const dir = getBackupDir();
    const files = fs.readdirSync(dir).filter(f => f.startsWith('backup-') && f.endsWith('.json'));
    const cutoff = Date.now() - keepDays * 24 * 60 * 60 * 1000;
    files.forEach(f => {
      const full = path.join(dir, f);
      const stat = fs.statSync(full);
      if (stat.mtimeMs < cutoff) fs.unlinkSync(full);
    });
  } catch(e) {}
}

ipcMain.on('backup-data', (event, jsonStr) => {
  try {
    const dir = getBackupDir();
    const today = new Date().toISOString().split('T')[0];
    const filePath = path.join(dir, `backup-${today}.json`);
    fs.writeFileSync(filePath, jsonStr, 'utf-8');
    cleanOldBackups(30);
    console.log('✅ Backup saved:', filePath);
  } catch(e) {
    console.error('Save backup error:', e);
  }
});

ipcMain.handle('export-backup', async (event, jsonStr) => {
  const { dialog } = require('electron');
  const today = new Date().toISOString().split('T')[0];
  const result = await dialog.showSaveDialog({
    title: 'حفظ نسخة احتياطية',
    defaultPath: `accounting-backup-${today}.json`,
    filters: [{ name: 'JSON', extensions: ['json'] }]
  });
  if (!result.canceled && result.filePath) {
    fs.writeFileSync(result.filePath, jsonStr, 'utf-8');
    return { success: true, path: result.filePath };
  }
  return { success: false };
});

ipcMain.handle('import-backup', async () => {
  const { dialog } = require('electron');
  const result = await dialog.showOpenDialog({
    title: 'استيراد نسخة احتياطية',
    filters: [{ name: 'JSON', extensions: ['json'] }],
    properties: ['openFile']
  });
  if (!result.canceled && result.filePaths.length > 0) {
    const data = fs.readFileSync(result.filePaths[0], 'utf-8');
    return { success: true, data };
  }
  return { success: false };
});

ipcMain.handle('list-backups', () => {
  try {
    const dir = getBackupDir();
    const files = fs.readdirSync(dir)
      .filter(f => f.startsWith('backup-') && f.endsWith('.json'))
      .sort().reverse();
    return { success: true, files, dir };
  } catch(e) {
    return { success: false, files: [] };
  }
});

// ============================================================
// تشغيل التطبيق
// ============================================================
app.whenReady().then(() => {
  // تهيئة قاعدة البيانات قبل أي شيء
  initDatabase();

  session.fromPartition('persist:accounting').setPermissionRequestHandler(
    (webContents, permission, callback) => { callback(true); }
  );

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => { app.quit(); });

app.on('second-instance', () => {
  const windows = BrowserWindow.getAllWindows();
  if (windows.length > 0) {
    if (windows[0].isMinimized()) windows[0].restore();
    windows[0].focus();
  }
});


