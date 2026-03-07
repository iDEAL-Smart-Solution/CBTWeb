import { create } from 'zustand';
import axiosInstance from '../Constant/axiosInstance';

const useSuitMigrationStore = create((set) => ({
  loading: false,
  result: null,
  error: null,
  migrateStudents: async () => {
    set({ loading: true, error: null });
    try {
      const schoolId = sessionStorage.getItem('SchoolId');
      if (!schoolId) {
        const errorMsg = 'School ID not found in session. Please log in again.';
        set({ error: errorMsg });
        return { success: false, error: errorMsg };
      }
      const res = await axiosInstance.post(`/api/SuitMigration/migrate-students/${encodeURIComponent(schoolId)}`);
      const payload = res.data?.data ?? res.data;
      set({ result: payload });
      return { success: true, data: payload };
    } catch (err) {
      const errorPayload = err.response?.data?.message || err.message || 'Error migrating students';
      set({ error: errorPayload });
      return { success: false, error: errorPayload };
    } finally {
      set({ loading: false });
    }
  },
  clear: () => set({ result: null, error: null }),
}));

export default useSuitMigrationStore;
