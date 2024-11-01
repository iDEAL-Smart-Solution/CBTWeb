

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
          <div className="page-center-2">
          <div className="register-box-3 box-shadow">
               <form onSubmit={handleSubmit} className="form" >
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
                    <div className="form-grouping-buttom">
                         <input className="submit-button bg-color-mute text-center" type="reset" value="reset" onClick={handleReset} />
                         <Submit className={`submit-button text-center color-light`} loading={loading} isNotLoading={`submit`} isloading={`please wait...`} />
                    </div>
               </form>
          </div>
     </div>

     )
}