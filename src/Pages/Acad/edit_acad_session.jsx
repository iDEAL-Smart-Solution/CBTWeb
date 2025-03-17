import React from "react";
import { useAcad } from "../../Zustand/acad_session";
import { InputField } from "../../Component/ReUsableComponents/input";
import { Submit } from "../../Component/ReUsableComponents/input";
import { useState } from "react";
import { useNotification } from "../../Context/notificationContext";


export default function Edit_Acad_Session() {
     const { acad, editAcadSession } = useAcad();
     const { loading, message } = acad;
     const [formData, setFormData] = useState({
          newTerm: 0,
          newSession: "",
     });

     const { showSuccess, showError } = useNotification();

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
               let res = await editAcadSession(formData.newTerm, formData.newSession);
               if(res.success) {
                    showSuccess(res.message);
               } else {
                    showError(res.message);
               }
          } catch (_error) {
               console.log(_error);
          }
     };
     return (
          <div>
               <div className="page-center-2">
              <div style={{width: '60%', padding: '50px'}} className="box-shadow">
                    <form onSubmit={handleSubmit} className="">
                         <InputField type={`number`} name={`newTerm`} label={`Enter term in digits`} value={formData.newTerm} placeholder={`New Term`} className={`register-long-field`} handleChange={handleInputChange} width={`97.5%`} />
                         <InputField type={`text`} name={`newSession`} value={formData.newSession} placeholder={`New Session`} className={`register-long-field`} handleChange={handleInputChange} width={`97.5%`} />
                         <div className="">
                              <Submit className={`submit-button text-center color-light`} loading={loading} isNotLoading={`submit`} isloading={`please wait...`} />
                         </div>
                    </form>
              </div>
               </div>
          </div>
     )
}