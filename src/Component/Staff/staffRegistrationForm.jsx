
import { InputField, Submit } from "../ReUsableComponents/input"
import { ImageUploader } from "../ReUsableComponents/file";
import genderOptions from "../../lib/genderOptions";
import { useStaff } from "../../Zustand/staffSlice";
import { useState } from "react";
import { Dropdown } from "../ReUsableComponents/dropDown";

export default function StaffRegistrationForm() {
     const { staff, createSaff } = useStaff();
     const { loading, message, errorMessage, setMessage, setErrorMessage } = staff;

     const [formData, setFormData] = useState({
          firstName: "",
          lastName: "",
          userName: "",
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

     const handleSubmit = async (e) => {
          e.preventDefault();

          if (formData.password !== formData.confirmPassword) {
               setPasswordError("Password and confirm password do not match");
               return;
          }

          setPasswordError("");
          console.log(formData);

          try {
               await createSaff(formData);
          } catch (_error) {
               alert(_error);
               console.log(_error);
          }
     };

     const handleReset = async () => {
          setFormData({
               firstName: "",
               lastName: "",
               userName: "",
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
               <div className="register-box-3 box-shadow">
                    <form onSubmit={handleSubmit} className="form" >
                         <div style={{ height: "5vh" }}>
                              {message && <p style={{ backgroundColor: "var(--primary-color)" }} className="color-light text-center bold">{message}</p>}
                              {errorMessage && <p style={{ backgroundColor: "var(--danger-color)" }} className="color-light text-center bold">{message}</p>}

                         </div>
                         <div className="form-grouping">
                              <InputField type={`text`} name={`firstName`} value={formData.firstName} placeholder={`first name`} className={`register-field`} handleChange={handleInputChange} />
                              <InputField type={`text`} name={`lastName`} value={formData.lastName} placeholder={`last name`} className={`register-field`} handleChange={handleInputChange} />
                         </div>
                         <div className="form-grouping">
                         <InputField type={`text`} name={`userName`} value={formData.userName} placeholder={`User Name`} className={`register-long-field`} handleChange={handleInputChange}  />
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
                              <ImageUploader
                                   name={`profilePicture`}
                                   handleChange={handleInputChange}
                                   width={`49%`}
                                    />
                                   <Dropdown
                                        name={`gender`}
                                        value={formData.gender}
                                        handleChange={handleInputChange}
                                        width={`49%`}
                                        options={genderOptions}
                                        optionKey='value'
                                        optionValue='value'
                                        optionLabel='label'
                                        firstOption={`Select Gender`}
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