import { useAcad } from "../../Zustand/acad_session";
import { InputField } from "../../Component/ReUsableComponents/input";
import { Submit } from "../../Component/ReUsableComponents/input";
import { useState } from "react";

export default function Edit_Acad_Session() {
     const { acad, editAcadSession } = useAcad();
     const { loading, message } = acad;
     const [formData, setFormData] = useState({
          newTerm: 0,
          newSession: "",
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
               await editAcadSession(formData.newTerm, formData.newSession);
          } catch (_error) {
               console.log(_error);
          }
     };
     return (
          <div>
               <div className="page-center-2">
              <div style={{width: '60%', padding: '50px'}} className="box-shadow">
              {message && <p className="bg-color-prim color-light">{message}</p>}
                    <form onSubmit={handleSubmit} className="">
                         <InputField type={`number`} name={`newTerm`} label={`Enter term in digits`} value={formData.newTerm} placeholder={`New Term`} className={`register-long-field`} handleChange={handleInputChange} />
                         <InputField type={`text`} name={`newSession`} value={formData.newSession} placeholder={`New Session`} className={`register-long-field`} handleChange={handleInputChange} />
                         <div className="">
                              <Submit className={`submit-button text-center color-light`} loading={loading} isNotLoading={`submit`} isloading={`please wait...`} />
                         </div>
                    </form>
              </div>
               </div>
          </div>
     )
}