
import { InputField, Submit, RadioButtonGroup } from "../ReUsableComponents/input";
import examType from "../../lib/examTypeOption";
import { Dropdown } from "../ReUsableComponents/dropDown";

export default function ExamCreationForm({ handleInputChange, formData, handleSubmit, handleReset, subjects, loading }) {

     return (

          <div className="page-center-2 ">
               <div className="register-box box-shadow">
                    <form onSubmit={handleSubmit} className="form">
                         <InputField
                              type="text"
                              name="examName"
                              value={formData.examName}
                              placeholder="Exam name e.g. ENG_JSS_1stCA_2ndTerm_2022/23"
                              className="register-long-field"
                              handleChange={handleInputChange}
                              width={`97.5%`}
                         />

                         <Dropdown
                              name="subjectCode"
                              value={formData.subjectCode}
                              handleChange={handleInputChange}
                              width="100%"
                              firstOption="Select subject code"
                              options={subjects}
                              optionKey="id"
                              optionValue="code"
                              optionLabel="code"
                              mb="15px"
                         />

                         <Dropdown
                              name="examType"
                              value={formData.examType}
                              handleChange={handleInputChange}
                              width="100%"
                              firstOption="Select exam type"
                              options={examType}
                              optionKey="value"
                              optionValue="value"
                              optionLabel="text"
                              mb="15px"
                         />

                         <InputField
                              type="number"
                              name="NumberOfQuestionsPerStudent"
                              value={formData.NumberOfQuestionsPerStudent}
                              placeholder="Number of questions per student"
                              className="register-long-field"
                              handleChange={handleInputChange}
                              label={`Number of question per student`}
                              width={`97.5%`}
                         />
                         <InputField
                              type="number"
                              name="NumberOfPassageQuestionsPerStudent"
                              value={formData.NumberOfPassageQuestionsPerStudent}
                              placeholder="Number of passage questions per student"
                              className="register-long-field"
                              handleChange={handleInputChange}
                              label={`Number of passage question per student, leave has zero if exam has no passage`}
                              width={`97.5%`}
                         />

                         <div className="duration-inputs">
                              <InputField
                                   type="number"
                                   name="durationHours"
                                   value={formData.durationHours}
                                   placeholder="Hours"
                                   className="register-long-field"
                                   handleChange={handleInputChange}
                                   min="0"
                                   label={`Time in hours e.g 01`}
                                   width={`97.5%`}

                              />
                              <InputField
                                   type="number"
                                   name="durationMinutes"
                                   value={formData.durationMinutes}
                                   placeholder="Minutes"
                                   className="register-long-field"
                                   handleChange={handleInputChange}
                                   min="0"
                                   max="59"
                                   label={`time in minutes e,g 30`}
                                   width={`97.5%`}

                              />
                         </div>
                         <InputField
                              type="number"
                              name="oBJScore"
                              value={formData.oBJScore}
                              placeholder="OBJ Score"
                              className="register-long-field"
                              handleChange={handleInputChange}
                              min="0"
                              max="100"
                              label={`Total OBJ Score`}
                              width={`97.5%`}

                         />
                         <InputField
                              type="number"
                              name="theoryScore"
                              value={formData.theoryScore}
                              placeholder="Theory score"
                              className="register-long-field"
                              handleChange={handleInputChange}
                              min="0"
                              max="100"
                              label={`Theory score, put 0 if this exam doesn't have theory`}
                              width={`97.5%`}

                         />
                         <InputField
                              type="number"
                              name="obtainableScore"
                              value={formData.obtainableScore}
                              placeholder="Obtainable Score"
                              className="register-long-field"
                              handleChange={handleInputChange}
                              min="0"
                              max="100"
                              label={`Max obtainable Score for the exam`}
                              width={`97.5%`}

                         />
                         <RadioButtonGroup
                              label="Has Passage"
                              name="HasPassage"
                              options={[
                                   { value: true, label: 'Yes' },
                                   { value: false, label: 'No' },
                              ]}
                              selectedValue={formData.HasPassage}
                              handleChange={handleInputChange}
                         />

                         <div className="form-grouping-buttom">
                              <input className="submit-button bg-color-mute text-center" type="reset" value="reset" onClick={handleReset} />
                              <Submit className={`submit-button text-center color-light`} loading={loading} isNotLoading={`submit`} isloading={`please wait...`} />
                         </div>
                    </form>
               </div>
          </div>
     );
}
