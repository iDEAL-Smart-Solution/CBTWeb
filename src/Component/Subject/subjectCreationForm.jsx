import { useSubject } from "../../Zustand/subjectSlice";
import { useClass } from "../../Zustand/classSlice";
import { useState, useEffect } from "react";
import { InputField, Submit } from "../ReUsableComponents/input";
import { Dropdown } from "../ReUsableComponents/dropDown";
import { useNotification } from "../../Context/notificationContext";

export default function SubjectCreationForm() {
     const { subject, createSubject } = useSubject();
     const { schClass, fetchClassList } = useClass();
     const { loading } = subject;

     const { showSuccess, showError } = useNotification();

     const [formData, setFormData] = useState({
          name: "",
          code: "",
          description: "",
          className: "",
          userName: "",
          testTotalScore: 0,
          examTotalScore: 0,
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
               let res = await createSubject(formData);
               if(res.success)
                    {
                         showSuccess(res.message);
                    } else {
                         showError(res.message);
                    }
          } catch (_error) {
               showError(_error);
          }
     };

     const handleReset = async () => {
          setFormData({
               name: "",
               code: "",
               description: "",
               className: "",
               userName: "",
               totalTestScore: 0,
               totalExamScore: 0,
          })
     }
     return (
          <div className="page-center-2 ">
               <div className="register-box-2 my-mt box-shadow">
                    <form onSubmit={handleSubmit} className="form" >
                              <InputField type={`text`} name={`name`} value={formData.name} placeholder={`Name of Subject`} className={`register-long-field`} handleChange={handleInputChange} width={`97.5%`} />
                              <InputField type={`text`} name={`code`} value={formData.code} placeholder={`Subject Code`} className={`register-long-field`} handleChange={handleInputChange} width={`97.5%`} />
                              <InputField type={`text`} name={`description`} value={formData.description} placeholder={`Subject Description`} className={`register-long-field`} handleChange={handleInputChange} width={`97.5%`} />
                              <InputField type={`text`} name={`userName`} value={formData.userName} placeholder={`Assigned staff user name`} className={`register-long-field`} handleChange={handleInputChange} width={`97.5%`} />

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