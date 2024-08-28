
import { InputField, SingleFileUploader, Submit } from "../UI/input"
import '../Staff/staff.css';
import genderOptions from "../../lib/genderOptions";
import { useStudent } from "../../Zustand/studentSlice";
import { useClass } from "../../Zustand/classSlice";
import { useEffect, useState } from "react";

export default function StudentRegistrationForm() {
     const { student, createStudent } = useStudent();
     const { schClass, fetchClassList } = useClass();
     const { loading, message, errorMessage, setMessage, setErrorMessage } = student;

     const [formData, setFormData] = useState({
          registrationNumber: "",
          className: "",
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
          phoneNumber: "",
          profilePicture: null,
          gender: 0,
     });

     const [passwordError, setPasswordError] = useState("");

     const handleInputChange = (event) => {
          const { name, value, files } = event.target;
          let parsedValue = value;
          if (name === "gender") {
               parsedValue = parseInt(value);
          }

          if (name === "profilePicture") {
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
     };

     useEffect(() => {
          fetchClassList();
     }, [])

     const { allschClass } = schClass;
     

     const handleSubmit = async (e) => {
          e.preventDefault();

          if (formData.password !== formData.confirmPassword) {
               setPasswordError("Password and confirm password do not match");
               return;
          }

          setPasswordError("");
          console.log(formData);

          try {
               await createStudent(formData);
          } catch (_error) {
               console.log(_error);
          }
     };

     const handleReset = async () => {
          setFormData({
               registrationNumber: "",
               className: "",
               firstName: "",
               lastName: "",
               email: "",
               password: "",
               confirmPassword: "",
               phoneNumber: "",
               profilePicture: null,
               gender: 0,
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
                              {errorMessage && <p style={{ backgroundColor: "var(--danger-color)" }} className="color-light text-center bold">{message}</p>}


                         </div>
                         <div className="form-grouping">
                              <InputField type={`text`} name={`registrationNumber`} value={formData.registrationNumber} placeholder={` registration Number`} className={`register-field`} handleChange={handleInputChange} />
                              <select
                                   name="className"
                                   value={formData.className}
                                   onChange={handleInputChange}
                                   style={{
                                        height: '50px',
                                        border: 'none',
                                        width: '105%',
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
                         </div>
                         <div className="form-grouping">
                              <InputField type={`text`} name={`firstName`} value={formData.firstName} placeholder={`first name`} className={`register-field`} handleChange={handleInputChange} />
                              <InputField type={`text`} name={`lastName`} value={formData.lastName} placeholder={`last name`} className={`register-field`} handleChange={handleInputChange} />
                         </div>
                         <div className="form-grouping">
                              <InputField type={`email`} name={`email`} value={formData.email} placeholder={`email address`} className={`register-field`} handleChange={handleInputChange} />
                              <InputField type={`text`} name={`phoneNumber`} value={formData.phoneNumber} placeholder={`phone number`} className={`register-field`} handleChange={handleInputChange} />
                         </div>
                         <div className="form-grouping">
                              <InputField type={`password`} name={`password`} value={formData.password} placeholder={`password`} className={`register-field`} handleChange={handleInputChange} />
                              <InputField type={`password`} name={`confirmPassword`} value={formData.confirmPassword} placeholder={`confirm password`} className={`register-field`} handleChange={handleInputChange} />
                         </div>
                         {passwordError ? (<p style={{ color: "red" }}>{passwordError}</p>) : ("")}

                         <div className="form-grouping">
                              <SingleFileUploader
                                   name={`profilePicture`}
                                   handleChange={handleInputChange}
                                   style={{
                                        height: '30px',
                                        width: '50%',
                                        padding: '10px',
                                        fontSize: '16px',
                                        borderRadius: '5px',
                                        outline: 'none',
                                        cursor: 'pointer',
                                        backgroundColor: 'rgba(200, 200, 200, 0.300)'
                                   }} />
                              <select
                                   name="gender"
                                   value={formData.gender}
                                   onChange={handleInputChange}
                                   style={{
                                        height: '50px',
                                        border: 'none',
                                        width: '54%',
                                        padding: '10px',
                                        fontSize: '16px',
                                        borderRadius: '5px',
                                        outline: 'none',
                                        cursor: 'pointer'
                                   }}  >
                                   {genderOptions.map((option) => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                   ))}
                              </select>
                              
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