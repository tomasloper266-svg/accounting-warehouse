// ============================================================
// preload.js — محدَّث لدعم SQLite
// أُضيفت: dbLoad, dbSave, dbMigrate, dbHasData
// كل الـ API القديم محفوظ كما هو
// ============================================================

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {

  // ============================================================
  // SQLite API (جديد)
  // ============================================================

  // تحميل كل البيانات من SQLite
  dbLoad: () => ipcRenderer.invoke('db-load'),

  // حفظ كل البيانات إلى SQLite
  dbSave: (data) => ipcRenderer.invoke('db-save', data),

  // ترحيل بيانات localStorage القديمة (يُستدعى مرة واحدة)
  dbMigrate: (jsonData) => ipcRenderer.invoke('db-migrate', jsonData),

  // التحقق هل في بيانات في SQLite
  dbHasData: () => ipcRenderer.invoke('db-has-data'),

  // تصدير واستيراد DB
  exportDatabase: () => ipcRenderer.invoke('export-database'),
  importDatabase: () => ipcRenderer.invoke('import-database'),

  // ============================================================
  // Backup API (محفوظ كما هو)
  // ============================================================

  // Auto backup
  onRequestBackupData: (cb) => ipcRenderer.on('request-backup-data', cb),
  sendBackupData: (data) => ipcRenderer.send('backup-data', data),

  // تصدير يدوي
  exportBackup: (data) => ipcRenderer.invoke('export-backup', data),

  // استيراد
  importBackup: () => ipcRenderer.invoke('import-backup'),

  // قائمة النسخ
  listBackups: () => ipcRenderer.invoke('list-backups'),


});
