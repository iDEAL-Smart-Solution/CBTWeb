
import { InputField, Submit } from "../ReUsableComponents/input"
import { ImageUploader } from "../ReUsableComponents/file";
import genderOptions from "../../lib/genderOptions";
import { useStaff } from "../../Zustand/staffSlice";
import { useState } from "react";
import { Dropdown } from "../ReUsableComponents/dropDown";
import { useNotification } from "../../Context/notificationContext";

export default function StaffRegistrationForm() {
     const { staff, createSaff } = useStaff();
     const { loading } = staff;

     const { showSuccess, showError } = useNotification();

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
          try {
               let res = await createSaff(formData);
               if(res.success)
                    {
                         showSuccess(res.message);
                    } else {
                         showError(res.message);
                    }
          } catch (_error) {
               showError('Request failed');
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
     }
     return (
          <div className="page-center-2 ">
               <div className="register-box-3 box-shadow">
                    <form onSubmit={handleSubmit} className="form" >
                         <div className="form-grouping">
                              <InputField type={`text`} name={`firstName`} value={formData.firstName} placeholder={`first name`} className={`register-field`} handleChange={handleInputChange} width={`100%`} />
                              <InputField type={`text`} name={`lastName`} value={formData.lastName} placeholder={`last name`} className={`register-field`} handleChange={handleInputChange} width={`100%`}/>
                         </div>
                         <div className="form-grouping">
                         <InputField type={`text`} name={`userName`} value={formData.userName} placeholder={`User Name`} className={`register-long-field`} handleChange={handleInputChange} width={`100%`}  />
                         </div>
                         <div className="form-grouping">
                              <InputField type={`email`} name={`email`} value={formData.email} placeholder={`email address`} className={`register-field`} handleChange={handleInputChange} width={`100%`} />
                              <InputField type={`text`} name={`phoneNumber`} value={formData.phoneNumber} placeholder={`phone number`} className={`register-field`} handleChange={handleInputChange} width={`100%`} />
                         </div>
                         <div className="form-grouping">
                              <InputField type={`password`} name={`password`} value={formData.password} placeholder={`password`} className={`register-field`} handleChange={handleInputChange} width={`100%`} />
                              <InputField type={`password`} name={`confirmPassword`} value={formData.confirmPassword} placeholder={`confirm password`} className={`register-field`} handleChange={handleInputChange} width={`100%`} />
                         </div>
                         {passwordError ? (<p style={{ color: "red" }}>{passwordError}</p>) : ("")}

                         <div className="form-grouping-3">
                              <ImageUploader
                                   name={`profilePicture`}
                                   handleChange={handleInputChange}
                                   width={`48%`}
                                    />
                                   <Dropdown
                                        name={`gender`}
                                        value={formData.gender}
                                        handleChange={handleInputChange}
                                        width={`50%`}
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