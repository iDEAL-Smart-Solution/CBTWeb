
import { InputField, Submit } from "../ReUsableComponents/input";
import { Dropdown } from "../ReUsableComponents/dropDown";
import { TextArea } from "../ReUsableComponents/textArea";

export default function PassageUploadForm({ handleInputChange, formData, handleSubmit, handleReset, exams, loading }) {
     return (
                    <form onSubmit={handleSubmit} className="form">

                         <Dropdown
                              name="examId"
                              value={formData.examId}
                              handleChange={handleInputChange}
                              width="100%"
                              firstOption="Select exam"
                              options={exams}
                              optionKey="id"
                              optionValue="id"
                              optionLabel="examName"
                              mb="15px"
                         />
                         <InputField
                              type="text"
                              name="title"
                              value={formData.title}
                              placeholder="Passage title"
                              className="register-long-field"
                              handleChange={handleInputChange}
                              width={`97%`}
                         />
                         <div className="form-grouping">
                              <TextArea name={`content`} value={formData.content} handleChange={handleInputChange} rows={5} className={`text-area`} placeholder={`Enter the passage content below`} mb={`20px`} width={`100%`} ml={``}
                              />
                         </div>
                         <div className="form-grouping-buttom">
                              <input className="submit-button bg-color-mute text-center" type="reset" value="reset" onClick={handleReset} />
                              <Submit className={`submit-button text-center color-light`} loading={loading} isNotLoading={`submit`} isloading={`please wait...`} />
                         </div>
                    </form>
     )
}