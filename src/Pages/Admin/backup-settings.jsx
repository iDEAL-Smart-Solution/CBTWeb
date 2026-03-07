import React, { useState, useEffect } from 'react';
import { Database, Folder, Play, CheckCircle, XCircle, Clock, HardDrive, AlertCircle, Info } from 'lucide-react';
import useBackupStore from '../../Zustand/backupSlice';

export default function BackupSettings() {
  const { 
    loading, 
    backupInProgress, 
    configuration, 
    backupHistory, 
    message,
    fetchConfiguration,
    saveConfiguration,
    executeBackup,
    fetchBackupHistory,
    setMessage,
    clearMessage
  } = useBackupStore();

  const [formData, setFormData] = useState({
    backupFolderPath: '',
    isEnabled: true
  });

  useEffect(() => {
    fetchConfiguration();
    fetchBackupHistory();
  }, []);

  useEffect(() => {
    if (configuration) {
      setFormData({
        backupFolderPath: configuration.backupFolderPath || '',
        isEnabled: configuration.isEnabled ?? true
      });
    }
  }, [configuration]);

  const handleSaveConfiguration = async (e) => {
    e.preventDefault();
    await saveConfiguration(formData);
  };

  const handleExecuteBackup = async () => {
    await executeBackup();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <Database className="text-blue-600" size={32} />
            Database Backup Settings
          </h1>
          <p className="text-gray-600 mt-2">Configure and manage database backups using Google Drive Desktop Sync</p>
        </div>

        {/* Information Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <div className="flex gap-3">
            <Info className="text-blue-600 flex-shrink-0" size={24} />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">How It Works</h3>
              <ul className="text-sm text-blue-800 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>Configure a local folder path that is synced with Google Drive Desktop (e.g., D:\GoogleDrive\CBTBackup)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>Click "Backup Now" to create a compressed database backup file</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>The backup file will be saved to your configured folder and automatically synced to Google Drive</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>Each backup is named with a timestamp (cbt_backup_YYYY-MM-DD_HH-mm-ss.sql.gz)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span><strong>Prerequisites:</strong> Ensure Google Drive Desktop is installed and the folder is set to sync</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Configuration Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Folder className="text-gray-600" size={24} />
            Google Drive Desktop Sync Configuration
          </h2>

          <form onSubmit={handleSaveConfiguration} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Backup Folder Path <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.backupFolderPath}
                onChange={(e) => setFormData({ ...formData, backupFolderPath: e.target.value })}
                placeholder="D:\GoogleDrive\CBTBackup"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Enter the full path to your Google Drive synced folder
              </p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isEnabled"
                checked={formData.isEnabled}
                onChange={(e) => setFormData({ ...formData, isEnabled: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <label htmlFor="isEnabled" className="text-sm font-medium text-gray-700">
                Enable backup functionality
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Clock className="animate-spin" size={20} />
                  Saving...
                </>
              ) : (
                <>
                  <CheckCircle size={20} />
                  Save Configuration
                </>
              )}
            </button>
          </form>
        </div>

        {/* Backup Execution */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <HardDrive className="text-gray-600" size={24} />
            Execute Backup
          </h2>

          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Click the button below to create a new database backup. The backup will be compressed and saved to your configured Google Drive folder.
            </p>

            <button
              onClick={handleExecuteBackup}
              disabled={backupInProgress || !formData.backupFolderPath || !formData.isEnabled}
              className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center gap-2 text-lg font-semibold"
            >
              {backupInProgress ? (
                <>
                  <Clock className="animate-spin" size={24} />
                  Creating Backup...
                </>
              ) : (
                <>
                  <Play size={24} />
                  Backup Now
                </>
              )}
            </button>

            {!formData.backupFolderPath && (
              <div className="flex items-center gap-2 text-amber-600">
                <AlertCircle size={20} />
                <span className="text-sm">Please configure a backup folder path before running a backup</span>
              </div>
            )}
          </div>
        </div>

        {/* Message Display */}
        {message.text && (
          <div className={`rounded-lg p-4 mb-6 flex items-center gap-3 ${
            message.type === 'success' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
          }`}>
            {message.type === 'success' ? (
              <CheckCircle className="text-green-600 flex-shrink-0" size={24} />
            ) : (
              <XCircle className="text-red-600 flex-shrink-0" size={24} />
            )}
            <p className={message.type === 'success' ? 'text-green-800' : 'text-red-800'}>
              {message.text}
            </p>
          </div>
        )}

        {/* Backup History */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Clock className="text-gray-600" size={24} />
            Recent Backup History
          </h2>

          {backupHistory.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No backup history available</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">Date & Time</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">Admin User</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">Status</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">File Name</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">Size</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {backupHistory.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-800">{formatDate(log.backupDate)}</td>
                      <td className="px-4 py-3 text-sm text-gray-800">{log.adminUserName}</td>
                      <td className="px-4 py-3 text-sm">
                        {log.status === 'Success' ? (
                          <span className="flex items-center gap-1 text-green-600">
                            <CheckCircle size={16} />
                            Success
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-red-600">
                            <XCircle size={16} />
                            Failed
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-800 truncate max-w-xs" title={log.fileName}>
                        {log.fileName || 'N/A'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-800">{log.fileSizeMB || 'N/A'}</td>
                      <td className="px-4 py-3 text-sm text-gray-800">{log.durationSeconds}s</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
