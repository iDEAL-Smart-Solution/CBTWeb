
import { useResult } from "../../Zustand/resultSlice";
import { useEffect, useState } from "react";
import { Dropdown } from "../../Component/ReUsableComponents/dropDown";
import { useSubject } from "../../Zustand/subjectSlice";
import term from "../../lib/termOption";
import { Submit } from "../../Component/ReUsableComponents/input";
import SubjectResultTemplate from "../../Component/Result/fetchBySubjectTemplate";

export default function SubjectResult() {
     const { result, fetchSubjectResults } = useResult();
     const { subject, fetchSubjectCodes } = useSubject();

     useEffect(() => {
          fetchSubjectCodes();
     }, []);

     const { subjects } = subject;

     const [formData, setFormData] = useState({
          subjectCode: 0,
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
               await fetchSubjectResults(formData.subjectCode, formData.term);
          } catch (_error) {
               console.log(_error);
          }
     };

     const { subjectResults, loading } = result;


     return (
          <div>
               <form onSubmit={handleSubmit}>
               <small className="color-mute bold mb-3">Note: To check all terms select a term and vice versa</small>
                    <div className="result-form-group">
                         <Dropdown
                              name="subjectCode"
                              value={formData.subjectCode}
                              handleChange={handleInputChange}
                              width="54%"
                              firstOption="Select subject code"
                              options={subjects}
                              optionKey="id"
                              optionValue="code"
                              optionLabel="code"
                              mb="15px"
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
                         <Submit className={`submit-button text-center color-light bolder`} loading={loading} isNotLoading={`check`} isloading={`on it...`} />
                    </div>
               </form>

               <SubjectResultTemplate data={subjectResults} loading={loading} />
          </div>




     )
}