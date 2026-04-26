import { create } from 'zustand';
import axiosInstance from '../Constant/axiosInstance';

const usePortalMigrationStore = create((set) => ({
  loadingStudents: false,
  loadingStaff: false,
  resultStudents: null,
  resultStaff: null,
  error: null,

  exportStudentsToPortal: async () => {
    set({ loadingStudents: true, error: null });
    try {
      const schoolId = sessionStorage.getItem('SchoolId');
      if (!schoolId) {
        const errorMsg = 'School ID not found in session. Please log in again.';
        set({ error: errorMsg });
        return { success: false, error: errorMsg };
      }
      const res = await axiosInstance.post(
        `/api/SuitMigration/export-students-to-portal`,
        null,
        { params: { schoolId } }
      );
      const payload = res.data?.data ?? res.data;
      set({ resultStudents: payload });
      return { success: true, data: payload };
    } catch (err) {
      const errorPayload = err.response?.data?.message || err.message || 'Error exporting students to portal';
      set({ error: errorPayload });
      return { success: false, error: errorPayload };
    } finally {
      set({ loadingStudents: false });
    }
  },

  exportStaffToPortal: async () => {
    set({ loadingStaff: true, error: null });
    try {
      const schoolId = sessionStorage.getItem('SchoolId');
      if (!schoolId) {
        const errorMsg = 'School ID not found in session. Please log in again.';
        set({ error: errorMsg });
        return { success: false, error: errorMsg };
      }
      const res = await axiosInstance.post(
        `/api/SuitMigration/export-staff-to-portal`,
        null,
        { params: { schoolId } }
      );
      const payload = res.data?.data ?? res.data;
      set({ resultStaff: payload });
      return { success: true, data: payload };
    } catch (err) {
      const errorPayload = err.response?.data?.message || err.message || 'Error exporting staff to portal';
      set({ error: errorPayload });
      return { success: false, error: errorPayload };
    } finally {
      set({ loadingStaff: false });
    }
  },

  clear: () => set({ resultStudents: null, resultStaff: null, error: null }),
}));

export default usePortalMigrationStore;
