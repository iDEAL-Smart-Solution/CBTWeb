import { BASE_URL } from '../Constant/index';
import { create } from "zustand";
import axiosInstance from "../Constant/axiosInstance";

const useBackupStore = create((set, get) => ({
     loading: false,
     backupInProgress: false,
     configuration: {
          backupFolderPath: '',
          isEnabled: true
     },
     backupHistory: [],
     message: { type: '', text: '' },

     setMessage: (type, text) => set({ message: { type, text } }),
     clearMessage: () => set({ message: { type: '', text: '' } }),

     fetchConfiguration: async () => {
          set({ loading: true });
          try {
               const res = await axiosInstance.get(`${BASE_URL}/api/v1/Backup/configuration`);
               set({ 
                    configuration: {
                         backupFolderPath: res.data.backupFolderPath || '',
                         isEnabled: res.data.isEnabled ?? true
                    }
               });
          } catch (error) {
               console.error('Error fetching backup configuration:', error);
          } finally {
               set({ loading: false });
          }
     },

     saveConfiguration: async (configData) => {
          set({ loading: true, message: { type: '', text: '' } });
          try {
               const res = await axiosInstance.post(`${BASE_URL}/api/v1/Backup/configuration`, configData);
               set({ 
                    message: { type: 'success', text: 'Configuration saved successfully!' },
                    configuration: configData
               });
               return { success: true, message: res.data.message };
          } catch (error) {
               const errorMsg = error.response?.data?.message || 'Failed to save configuration';
               set({ message: { type: 'error', text: errorMsg } });
               return { success: false, message: errorMsg };
          } finally {
               set({ loading: false });
          }
     },

     executeBackup: async () => {
          const { configuration } = get();
          
          if (!configuration.backupFolderPath) {
               set({ message: { type: 'error', text: 'Please configure a backup folder path first' } });
               return { success: false };
          }

          set({ backupInProgress: true, message: { type: '', text: '' } });
          try {
               const res = await axiosInstance.post(`${BASE_URL}/api/v1/Backup/execute`);
               const data = res.data;

               if (data.success) {
                    set({ 
                         message: { 
                              type: 'success', 
                              text: `Backup completed successfully! File: ${data.fileName} (${(data.fileSizeBytes / (1024 * 1024)).toFixed(2)} MB)` 
                         }
                    });
                    // Refresh history after successful backup
                    get().fetchBackupHistory();
                    return { success: true };
               } else {
                    set({ message: { type: 'error', text: data.message || 'Backup failed' } });
                    return { success: false };
               }
          } catch (error) {
               const errorMsg = error.response?.data?.message || 'An error occurred during backup execution';
               set({ message: { type: 'error', text: errorMsg } });
               return { success: false };
          } finally {
               set({ backupInProgress: false });
          }
     },

     fetchBackupHistory: async (count = 10) => {
          try {
               const res = await axiosInstance.get(`${BASE_URL}/api/v1/Backup/history?count=${count}`);
               set({ backupHistory: res.data });
          } catch (error) {
               console.error('Error fetching backup history:', error);
          }
     }
}));

export default useBackupStore;
