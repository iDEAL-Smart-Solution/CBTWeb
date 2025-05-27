import SubjectCreationForm from "../../Component/Subject/subjectCreationForm";
import { useSubject } from "../../Zustand/subjectSlice";
import { useClass } from "../../Zustand/classSlice";
import { useStaff } from "../../Zustand/staffSlice";
import { useNotification } from "../../Context/notificationContext";
import { useState, useEffect } from "react";

export default function SubjectCreation() {
     const { subject, createSubject } = useSubject();
     const { schClass, fetchClassList } = useClass();
     const { staff, fetchAllStaffsUsername } = useStaff();
     const { loading } = subject;

     const { showSuccess, showError } = useNotification();

     const [formData, setFormData] = useState({
          name: "",
          code: "",
          description: "",
          className: "",
          userName: "",
          testTotalScore: 0,
          examTotalScore: 0,
     });


     const handleInputChange = (event) => {
          const { name, value } = event.target;
          let parsedValue = value;
          setFormData({
               ...formData,
               [name]: parsedValue
          });
     };

     useEffect(() => {
          fetchClassList();
          fetchAllStaffsUsername();
     }, [])

     const { allschClass } = schClass;
     const { staffsUsernames } = staff;


     const handleSubmit = async (e) => {
          e.preventDefault();

          try {
               let res = await createSubject(formData);
               if (res.success) {
                    showSuccess(res.message);
               } else {
                    showError(res.message);
               }
          } catch (_error) {
               showError(_error);
          }
     };

     const handleReset = async () => {
          setFormData({
               name: "",
               code: "",
               description: "",
               className: "",
               userName: "",
               totalTestScore: 0,
               totalExamScore: 0,
          })
     }

     return (
          <div className="min-h-screen bg-gray-100 py-6 px-4 md:px-6">
               <div className="max-w-2xl mx-auto">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6">Create Subject</h1>
                    <SubjectCreationForm
                         handleReset={handleReset}
                         handleSubmit={handleSubmit}
                         staffsUsernames={staffsUsernames}
                         allschClass={allschClass}
                         handleInputChange={handleInputChange}
                         formData={formData}
                         loading={loading}
                    />
               </div>
          </div>
     );
}