import React, { useEffect, useState } from "react";
import { useStudent } from "../../Zustand/studentSlice";
import { useClass } from "../../Zustand/classSlice";
import { SearchField, Submit } from "../../Component/ReUsableComponents/input";
import { Dropdown } from "../../Component/ReUsableComponents/dropDown";
import PromotionTableTemplate from "../../Component/student/promotionTableTemplate";
import { useNotification } from "../../Context/notificationContext";
import axiosInstance from "../../Constant/axiosInstance";
import { BASE_URL } from "../../Constant";

export default function StudentPromotion() {
  const { student, fetchStudents } = useStudent();
  const { schClass, fetchClassList } = useClass();
  const { students, loading } = student;
  const { allschClass, loading: classLoading } = schClass;
  const { showSuccess, showError } = useNotification();

  const [searchParam, setSearchParam] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedClassId, setSelectedClassId] = useState("");

  useEffect(() => {
    fetchClassList();
  }, [fetchClassList]);

  const handleSearchChange = (e) => setSearchParam(e.target.value);
  const handleSearchSubmit = async (e) => {
    e?.preventDefault?.();
    if (!searchParam.trim()) return;
    await fetchStudents(searchParam.trim());
    setSelectedStudent(null);
  };

  const handleSelectStudent = (studentObj) => {
    setSelectedStudent(studentObj);
    setSelectedClassId("");
  };

  const handleClassChange = (e) => {
    setSelectedClassId(e.target.value);
  };

  const handlePromote = async () => {
    if (!selectedStudent) return showError("Select a student first");
    if (!selectedClassId) return showError("Select a target class");

    const classObj = allschClass.find((c) => String(c.classId) === String(selectedClassId));
    const newClassName = classObj?.className || "";
    const studentKey = selectedStudent.id || selectedStudent.uin || selectedStudent.studentId;

    try {
      const { updateStudentClass } = useStudent.getState();
      const result = await updateStudentClass(studentKey, selectedClassId);
      if (result.success) {
        showSuccess(result.message);
        if (searchParam) await fetchStudents(searchParam);
        setSelectedStudent(null);
      } else {
        showError(result.message);
      }
    } catch (error) {
      console.error("Error updating student class:", error);
      showError(error.response?.data?.message || "An error occurred while updating student class");
    }
  };

  const classOptions = allschClass.map((c) => ({ classId: c.classId, className: c.className }));

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Student Promotion / Demotion</h1>

        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-lg font-semibold mb-4">Search Student</h2>
          <form onSubmit={handleSearchSubmit} className="flex gap-3 items-center">
            <SearchField
              type="search"
              placeholder="Search by name, UIN, class..."
              handleChange={handleSearchChange}
              className="flex-1"
              onKeyDown={null}
            />
            <Submit name="search" loading={false} isloading={"Searching..."} isNotLoading={"Search"} />
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">Search Results</h2>
              <PromotionTableTemplate data={students} loading={loading} onSelectStudent={handleSelectStudent} />
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">Selected Student</h2>
              {selectedStudent ? (
                <div>
                  <p className="font-semibold">{selectedStudent.studentName}</p>
                  <p className="text-sm text-gray-600 mb-3">UIN: {selectedStudent.uin}</p>

                  <label className="text-sm font-medium text-gray-600 mb-1 block">Target Class</label>
                  <Dropdown
                    name="class"
                    value={selectedClassId}
                    handleChange={handleClassChange}
                    options={classOptions}
                    width={'100%'}
                    firstOption={'Select class'}
                    optionKey={'classId'}
                    optionValue={'classId'}
                    optionLabel={'className'}
                  />

                  <button
                    onClick={handlePromote}
                    className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Update Class
                  </button>
                </div>
              ) : (
                <p className="text-sm text-gray-500">No student selected. Click "Select" beside a student in the results to choose.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
