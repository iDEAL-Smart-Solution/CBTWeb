import { Dropdown } from "../ReUsableComponents/dropDown";
import { Submit } from "../ReUsableComponents/input";
import { FileUploader } from "../ReUsableComponents/file";

export default function PassageQuestionForm({handleSubmit, formData, handleInputChange, loading, exams, handleReset, passageTitlesAndIds}) {
     
     return (
          <div className="page-center-2">
               <div className="register-box-3 box-shadow">
                    <form onSubmit={handleSubmit} className="form" >

                         <div className="form-grouping">
                              <Dropdown
                                   name={`examId`}
                                   value={formData.examId}
                                   handleChange={handleInputChange}
                                   width={`100%`}
                                   firstOption={`Select exam`}
                                   options={exams}
                                   optionKey='id'
                                   optionValue='id'
                                   optionLabel='examName'
                                   mb={`15px`}
                              />
                         </div>
                         <div className="form-grouping">
                              <Dropdown
                                   name={`passageId`}
                                   value={formData.passageId}
                                   handleChange={handleInputChange}
                                   width={`100%`}
                                   options={passageTitlesAndIds}
                                   optionKey='id'
                                   optionValue='id'
                                   firstOption={`Select Passage`}
                                   optionLabel='title'
                                   mb={`15px`}

                              />
                         </div>
                         <div className="form-grouping">
                              <FileUploader
                                   className={``}
                                   name={`question`}
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