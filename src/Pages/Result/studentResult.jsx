
import { useResult } from "../../Zustand/resultSlice";
import { Dropdown } from "../../Component/ReUsableComponents/dropDown";
import term from "../../lib/termOption";
import { InputField, Submit } from "../../Component/ReUsableComponents/input";
import StudentByResultTemplate from "../../Component/Result/fetchByStudentTenplate";
import { useState } from "react";

export default function StudentResult() {
     const { result, fetchStudentResults } = useResult();



     const [formData, setFormData] = useState({
          key: "",
          term: 0,
     });

     const handleInputChange = (event) => {
          const { name, value } = event.target;
          let parsedValue = value;
          setFormData({
               ...formData,
               [name]: parsedValue
          });
     };

     const handleSubmit = async (e) => {
          e.preventDefault();

          try {
               await fetchStudentResults(formData.key, formData.term);
          } catch (_error) {
               console.log(_error);
          }
     };

     const { studentResults, loading } = result;


     return (
          <div>
               <div className="box-shadow header-crumbs">
                    <form onSubmit={handleSubmit}>
                         <small className="color-mute bold mb-3">Note: To check all terms select a term and vice versa</small>
                         <div className="result-form-group">
                              <InputField
                                   type="text"
                                   name={`key`}
                                   value={formData.key}
                                   placeholder="Enter the student UIN"
                                   className="register-field"
                                   handleChange={handleInputChange}
                              />
                              <Dropdown
                                   name={`term`}
                                   value={formData.term}
                                   handleChange={handleInputChange}
                                   options={term}
                                   width={`54%`}
                                   optionValue={`value`}
                                   optionLabel={`text`}
                                   firstOption={`Select Term`}
                              />
                              <Submit className={`fetch-button text-center color-light bolder`} loading={loading} isNotLoading={`check`} isloading={`on it...`} />
                         </div>
                    </form>
               </div>
               <StudentByResultTemplate data={studentResults} loading={loading} />
          </div>




     )
}