import { useExam } from "../../Zustand/examSlice";
import { useState, useEffect } from "react";
import { useNotification } from "../../Context/notificationContext";
import Passage from "../../Zustand/passageSlice";
import PassageUploadForm from "../../Component/Passage/passageUploadForm";

export default function PassageUpload() {
     const { exam, fetchExamNamesAndId } = useExam();
     const { loading, uploadPassage } = Passage();


     const { showSuccess, showError } = useNotification();

     const [formData, setFormData] = useState({
          examId: "",
          title: "",
          content: "",
     });

     const handleInputChange = (event) => {
          const { name, value } = event.target;
          let parsedValue = value;
          setFormData({
               ...formData,
               [name]: parsedValue,
          });
     };

     useEffect(() => {
          fetchExamNamesAndId();
     }, []);

     const { exams } = exam;

     const handleSubmit = async (e) => {
          e.preventDefault();

          console.log(formData);
          try {
               let res = await uploadPassage(formData);
               if (res.success) {
                    showSuccess(res.message);
               } else {
                    showError(res.message)
               }
          } catch (_error) {
               console.log(_error);
          }
     };
     const handleReset = async () => {
          setFormData({
               examId: "",
               title: "",
               content: "",
          });
     };

     return (
          <div>
               <div className="page-center-2">
                    <div style={{ width: '60%', padding: '30px' }} className="box-shadow">
                         <PassageUploadForm handleInputChange={handleInputChange} handleReset={handleReset} handleSubmit={handleSubmit} formData={formData} exams={exams} loading={loading} />
                    </div>
               </div>
          </div>
     )
}