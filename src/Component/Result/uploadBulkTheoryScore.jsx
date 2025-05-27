import { useExam } from "../../Zustand/examSlice";
import { useResult } from "../../Zustand/resultSlice";
import { useNotification } from "../../Context/notificationContext";
import { useState, useEffect } from "react";
import { Dropdown } from "../ReUsableComponents/dropDown";
import { FileUploader } from "../ReUsableComponents/file";
import { Submit } from "../ReUsableComponents/input";


export default function UploadBulkTheoryScore() {
     const { exam, fetchExams } = useExam();
     const { result, uploadTheoryScore } = useResult();
     const { exams } = exam;
     const { loading } = result;

     const { showError, showSuccess } = useNotification();

     const [formData, setFormData] = useState({
          examId: "",
          scores: null,
     });

     useEffect(() => {
          fetchExams();
     }, [])
     const handleInputChange = (event) => {
          const { name, value, files } = event.target;
          let parsedValue = value;
          if (name === "scores") {
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
     const handleSubmit = async (e) => {
          e.preventDefault();
          try {
               let res = await uploadTheoryScore(formData);
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
               examId: "",
               scores: null,
          })
     }
     return(
           <div className="bg-white shadow-lg rounded-lg p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
                    <small className="bold color-mute">Please update batch by batch</small>
                    <div className="form-grouping">
                         <Dropdown
                              name={`examId`}
                              value={formData.examId}
                              handleChange={handleInputChange}
                              width={`100%`}
                              options={exams}
                              optionKey='id'
                              optionValue='id'
                              firstOption={`Select Exam`}
                              optionLabel='examName'
                              mb={`15px`}

                         />
                    </div>
                    <div className="form-grouping">
                         <FileUploader
                              className={``}
                              name={`scores`}
                              handleChange={handleInputChange}
                              width='100%'
                         />
                    </div>
                    <div className="flex flex-col md:flex-row gap-4">
                    <button
                        type="reset"
                        onClick={handleReset}
                        className="w-full md:w-auto px-6 py-2 bg-gray-300 text-gray-800 font-semibold rounded-md hover:bg-gray-400 transition-colors duration-200 shadow-sm"
                    >
                        Reset
                    </button>
                    <Submit
                        className="w-full md:w-auto"
                        loading={loading}
                        isNotLoading="Submit"
                        isloading="Please wait..."
                    />
                </div>
               </form>
          </div>

     )
}