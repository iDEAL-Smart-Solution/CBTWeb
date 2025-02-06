import { InputField, Submit } from "../ReUsableComponents/input";
import { Dropdown } from "../ReUsableComponents/dropDown";

export default function SubjectCreationForm({handleReset, handleSubmit, staffsUsernames, allschClass, handleInputChange, formData, loading }) {
     
     return (
          <div className="page-center-2 ">
               <div className="register-box-2 my-mt box-shadow">
                    <form onSubmit={handleSubmit} className="form" >
                              <InputField type={`text`} name={`name`} value={formData.name} placeholder={`Name of Subject`} className={`register-long-field`} handleChange={handleInputChange} width={`97.5%`} />
                              <InputField type={`text`} name={`code`} value={formData.code} placeholder={`Subject Code`} className={`register-long-field`} handleChange={handleInputChange} width={`97.5%`} />
                              <InputField type={`text`} name={`description`} value={formData.description} placeholder={`Subject Description`} className={`register-long-field`} handleChange={handleInputChange} width={`97.5%`} />

                         <div className="form-grouping">
                              <Dropdown
                                   name={`className`}
                                   value={formData.className}
                                   handleChange={handleInputChange}
                                   width={`100%`}
                                   firstOption={`Select Class`}
                                   options={allschClass}
                                   optionKey={`classId`}
                                   optionValue={`className`}
                                   optionLabel={`className`}
                                   mb={`20px`}
                              />
                         </div>

                         <div className="form-grouping">
                              <Dropdown
                                   name={`userName`}
                                   value={formData.userName}
                                   handleChange={handleInputChange}
                                   width={`100%`}
                                   firstOption={`Select Staff`}
                                   options={staffsUsernames}
                                   optionKey={`id`}
                                   optionValue={`userName`}
                                   optionLabel={`userName`}
                                   optionImage={`profilePicture`}
                                   mb={`20px`}
                              />
                         </div>

                         <div className="">
                              <InputField type={`number`} name={`totalTestScore`} value={formData.totalTestScore} className={`register-long-field`} handleChange={handleInputChange} label={`Test allocated score`} width={`97.5%`} />
                         </div>
                         <InputField type={`number`} name={`totalExamScore`} value={formData.totalExamScore} className={`register-long-field`} handleChange={handleInputChange} label={`Exam allocated score`} width={`97.5%`} />

                         <div className="form-grouping-buttom">
                              <input className="submit-button bg-color-mute text-center" type="reset" value="reset" onClick={handleReset} />
                              <Submit className={`submit-button text-center color-light`} loading={loading} isNotLoading={`submit`} isloading={`please wait...`} />
                         </div>
                    </form>
               </div>
          </div>
     )
}