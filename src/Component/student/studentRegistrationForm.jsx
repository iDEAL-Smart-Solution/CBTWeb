
import { InputField, Submit } from "../ReUsableComponents/input"
import { ImageUploader } from "../ReUsableComponents/file";
import genderOptions from "../../lib/genderOptions";
import { Dropdown } from "../ReUsableComponents/dropDown";

export default function StudentRegistrationForm({ formData, handleInputChange, handleSubmit, handleReset, loading, allschClass }) {
     
     return (
          <div className="page-center-2 ">
               <div className="register-box-3 box-shadow">
                    <form onSubmit={handleSubmit} className="form" >
                         <div className="form-grouping">
                              <InputField type={`text`} name={`registrationNumber`} value={formData.registrationNumber} placeholder={` registration Number`} className={`register-field`} handleChange={handleInputChange} width={`97.5%`} />
                              <Dropdown 
                                   name={`className`}
                                   value={formData.className}
                                   handleChange={handleInputChange}
                                   width={`102.5%`}
                                   options={allschClass}
                                   optionKey='classId'
                                   optionValue='className'
                                   firstOption={`Select Class`}
                                   optionLabel='className'
                                   />

                         </div>
                         <div className="form-grouping">
                              <InputField type={`text`} name={`firstName`} value={formData.firstName} placeholder={`first name`} className={`register-field`} handleChange={handleInputChange} width={`97.5%`}/>
                              <InputField type={`text`} name={`lastName`} value={formData.lastName} placeholder={`last name`} className={`register-field`} handleChange={handleInputChange} width={`97.5%`} />
                         </div>
                         <div className="form-grouping">
                              <InputField type={`email`} name={`email`} value={formData.email} placeholder={`email address`} className={`register-field`} handleChange={handleInputChange} width={`97.5%`} />
                              <InputField type={`text`} name={`phoneNumber`} value={formData.phoneNumber} placeholder={`phone number`} className={`register-field`} handleChange={handleInputChange} width={`97.5%`} />
                         </div>
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
                                        options={genderOptions}
                                        width={`50%`}
                                        optionValue={`value`}
                                        optionLabel={`label`}
                                        firstOption={`Select Gender`}
                                        />
                             

                         </div>
                         <div className="form-grouping-buttom">
                              <input className="submit-button bg-color-mute text-center" type="reset" value="reset" onClick={handleReset} />
                              <Submit className={`submit-button text-center color-light`} loading={loading} isNotLoading={`submit`} isloading={`please wait...`} />
                         </div>
                         <div style={{height: '3em'}}>

                         </div>
                    </form>
               </div>
          </div>
     )
}