import { useExam } from "../../Zustand/examSlice";
import { useState, useEffect } from "react";
import { InputField, Submit } from "../ReUsableComponents/input";
import { useSubject } from "../../Zustand/subjectSlice";
import term from "../../lib/termOption";
import examType from "../../lib/examTypeOption";
import { Dropdown } from "../ReUsableComponents/dropDown";

export default function ExamCreationForm() {
     const { exam, createExam } = useExam();
     const { subject, fetchSubjectsLight } = useSubject();
     const { loading, message, errorMessage, setMessage, setErrorMessage } = exam;

     const [formData, setFormData] = useState({
          subjectCode: "",
          term: 0,
          session: "",
          examType: 0,
          examName: "",
          NumberOfQuestionsPerStudent: 0
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
          fetchSubjectsLight();
     }, [])

     const { subjects } = subject;


     const handleSubmit = async (e) => {
          e.preventDefault();

          try {
               await createExam(formData);
          } catch (_error) {
               console.log(_error);
          }
     };

     // const term = [
     //      { value: 0, text: 'Select term' },
     //      { value: 1, text: '1st term' },
     //      { value: 2, text: 'second term' },
     //      { value: 3, text: 'third term' }
     // ]

     // const examType = [
     //      { value: 0, text: 'Select exam type' },
     //      { value: 1, text: '1st_CA' },
     //      { value: 2, text: '2nd_CA' },
     //      { value: 3, text: '3rd_CA' },
     //      { value: 4, text: 'Exam' },

     // ]

     const handleReset = async () => {
          setFormData({
               subjectCode: "",
               term: 0,
               session: "",
               examType: 0,
               examName: "",
               NumberOfQuestionsPerStudent: 0
          })
          setMessage("");
          setErrorMessage("");
     }
     return (
          <div className="page-center-2 ">
               <div className="register-box box-shadow">
                    <form onSubmit={handleSubmit} className="form" >
                         <div style={{ height: "5vh" }}>
                              {message && <p style={{ backgroundColor: "var(--primary-color)" }} className="color-light text-center bold">{message}</p>}
                              {errorMessage && <p style={{ backgroundColor: "var(--danger-color)" }} className="color-light text-center bold">{errorMessage}</p>}
                         </div>
                         <InputField type={`text`} name={`examName`} value={formData.examName} placeholder={`exam name e.g ENG_JSS_1stCA_2ndTerm_2022/23`} className={`register-long-field`} handleChange={handleInputChange} />
                         {/* <select
                              name="subjectCode"
                              value={formData.subjectCode}
                              onChange={handleInputChange}
                              style={{
                                   height: '50px',
                                   border: 'none',
                                   width: '100%',
                                   padding: '10px',
                                   fontSize: '16px',
                                   borderRadius: '5px',
                                   outline: 'none',
                                   cursor: 'pointer',
                                   marginBottom: '15px'

                              }}  >
                              <option value="">Select subject code</option>

                              {subjects.map((option) => (
                                   <option key={option.id} value={option.code}>{option.code}</option>
                              ))}
                         </select> */}
                         <Dropdown
                              name={`subjectCode`}
                              value={formData.subjectCode}
                              handleChange={handleInputChange}
                              width={`100%`}
                              firstOption={`Select subject code`}
                              options={subjects}
                              optionKey='id'
                              optionValue='code'
                              optionLabel='code'
                              mb={`15px`}

                         />

                         <Dropdown
                              name={`term`}
                              value={formData.term}
                              handleChange={handleInputChange}
                              width={`100%`}
                              firstOption={`Select Term`}
                              options={term}
                              optionKey='value'
                              optionValue='value'
                              optionLabel='text'
                              mb={`15px`}
                         />

                         {/* <select
                              name="term"
                              value={formData.term}
                              onChange={handleInputChange}
                              style={{
                                   height: '50px',
                                   border: 'none',
                                   width: '99%',
                                   padding: '10px',
                                   fontSize: '16px',
                                   borderRadius: '5px',
                                   outline: 'none',
                                   cursor: 'pointer',
                                   marginBottom: '15px'
                              }}  >
                              {term.map((option) => (
                                   <option key={option.value} value={option.value}>{option.text}</option>
                              ))}
                         </select> */}
                         <InputField type={`text`} name={`session`} value={formData.session} placeholder={`session e.g 2022/2023`} className={`register-long-field`} handleChange={handleInputChange} />
                         <Dropdown
                              name={`examType`}
                              value={formData.examType}
                              handleChange={handleInputChange}
                              width={`100%`}
                              firstOption={`Select examType`}
                              options={examType}
                              optionKey='value'
                              optionValue='value'
                              optionLabel='text'
                              mb={`15px`}
                         />
                         {/* <select
                              name="examType"jjjjjjjjjjmj
                              value={formData.examType}
                              onChange={handleInputChange}
                              style={{
                                   height: '50px',
                                   border: 'none',
                                   width: '99%',
                                   padding: '10px',
                                   fontSize: '16px',
                                   borderRadius: '5px',
                                   outline: 'none',
                                   cursor: 'pointer',
                                   marginBottom: '15px'
                              }}  >
                              {examType.map((option) => (
                                   <option key={option.value} value={option.value}>{option.text}</option>
                              ))}
                         </select> */}
                         <InputField type={`int`} name={`NumberOfQuestionsPerStudent`} value={formData.NumberOfQuestionsPerStudent} placeholder={`Number of questions per student`} className={`register-long-field`} handleChange={handleInputChange} />

                         <div className="form-grouping-buttom">
                              <input className="submit-button bg-color-mute text-center" type="reset" value="reset" onClick={handleReset} />
                              <Submit className={`submit-button text-center color-light`} loading={loading} isNotLoading={`submit`} isloading={`please wait...`} />
                         </div>
                    </form>
               </div>
          </div>
     )
}