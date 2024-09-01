import { useSubject } from "../../Zustand/subjectSlice";
import { useClass } from "../../Zustand/classSlice";
import { useState, useEffect } from "react";
import { InputField, Submit } from "../ReUsableComponents/input";

export default function SubjectCreationForm() {
     const { subject, createSubject } = useSubject();
     const { schClass, fetchClassList } = useClass();
     const { loading, message, errorMessage, setMessage, setErrorMessage } = subject;

     const [formData, setFormData] = useState({
          name: "",
          code: "",
          description: "",
          className: "",
          userName: "",
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
     }, [])

     const { allschClass } = schClass;
     

     const handleSubmit = async (e) => {
          e.preventDefault();

          try {
               await createSubject(formData);
          } catch (_error) {
               console.log(_error);
          }
     };

     const handleReset = async () => {
          setFormData({
               name: "",
               code: "",
               description: "",
               className: "",
               userName: "",
          })
          setMessage("");
          setErrorMessage("");
     }
     return (
          <div className="page-center-2 ">
               <div className="register-box box-shadow">
                    <form onSubmit={handleSubmit} >
                         <div style={{ height: "5vh" }}>
                              {message && <p style={{ backgroundColor: "var(--primary-color)" }} className="color-light text-center bold">{message}</p>}
                              {errorMessage && <p style={{ backgroundColor: "var(--danger-color)" }} className="color-light text-center bold">{errorMessage}</p>}
                         </div>
                              <InputField type={`text`} name={`name`} value={formData.name} placeholder={`Name of Subject`} className={`register-long-field`} handleChange={handleInputChange} />
                              <InputField type={`text`} name={`code`} value={formData.code} placeholder={`Subject Code`} className={`register-long-field`} handleChange={handleInputChange} />
                              <InputField type={`text`} name={`description`} value={formData.description} placeholder={`Subject Description`} className={`register-long-field`} handleChange={handleInputChange} />
                              <InputField type={`text`} name={`userName`} value={formData.userName} placeholder={`Assigned staff user name`} className={`register-long-field`} handleChange={handleInputChange} />
                              <select
                                   name="className"
                                   value={formData.className}
                                   onChange={handleInputChange}
                                   style={{
                                        height: '50px',
                                        border: 'none',
                                        width: '100%',
                                        padding: '10px',
                                        fontSize: '16px',
                                        borderRadius: '5px',
                                        outline: 'none',
                                        cursor: 'pointer'
                                   }}  >
                                   {allschClass.map((option) => (
                                        <option key={option.classId} value={option.className}>{option.className}</option>
                                   ))}
                              </select>
                        
                         <div className="form-grouping-buttom">
                              <input className="submit-button bg-color-mute text-center" type="reset" value="reset" onClick={handleReset} />
                              <Submit className={`submit-button text-center color-light`} loading={loading} isNotLoading={`submit`} isloading={`please wait...`} />
                         </div>
                    </form>
               </div>
          </div>
     )
}