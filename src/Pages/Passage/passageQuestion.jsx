
import { useExam } from "../../Zustand/examSlice";
import { useState, useEffect } from "react";
import { useNotification } from "../../Context/notificationContext";
import Passage from "../../Zustand/passageSlice";
import PassageQuestionForm from "../../Component/Passage/passageQuestionForm";

export default function PassageQuestion() {
     const { exam, fetchExamNamesAndId } = useExam();
     const { passageTitleAndIds, loading, uploadPassageQuestions, fetchPassageTitleAndId } = Passage();


     const { showSuccess, showError } = useNotification();

     const [formData, setFormData] = useState({
          examId: "",
          passageId: "",
          question: null,
     });

     const handleInputChange = (event) => {
          const { name, value, files } = event.target;
          let parsedValue = value;
          if (name === "question") {
               setFormData({
                    ...formData,
                    [name]: files[0]
               });
          } else {
               setFormData({
                    ...formData,
                    [name]: parsedValue
               });
          }
     }

     useEffect(() => {
          fetchExamNamesAndId();
          fetchPassageTitleAndId();

     }, []);

     const { exams } = exam;

     const handleSubmit = async (e) => {
          e.preventDefault();

          try {
               console.log(formData);
               let res = await uploadPassageQuestions(formData);
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
               passageId: "",
               question: null,
          });
     };

     return (
          <div>
                         <PassageQuestionForm handleInputChange={handleInputChange} handleReset={handleReset} handleSubmit={handleSubmit} formData={formData} passageTitlesAndIds={passageTitleAndIds} exams={exams} loading={loading} />
                    </div>
     )
}