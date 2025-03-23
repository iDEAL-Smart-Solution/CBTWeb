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
               if (res.success) {
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
               <div style={{ width: '100%', height: '80vh', display: 'flex', placeItems: 'center', placeContent: 'center', gap: '30px' }}>
                    <div style={{ width: '40%', padding: '50px' }} className="box-shadow">
                         <form onSubmit={handleSubmit} className="">
                              <InputField type={`number`} name={`newTerm`} label={`Enter term in digits`} value={formData.newTerm} placeholder={`New Term`} className={`register-long-field`} handleChange={handleInputChange} width={`97.5%`} />
                              <InputField type={`text`} name={`newSession`} value={formData.newSession} placeholder={`New Session`} className={`register-long-field`} handleChange={handleInputChange} width={`97.5%`} />
                              <div className="">
                                   <Submit className={`submit-button text-center color-light`} loading={loading} isNotLoading={`submit`} isloading={`please wait...`} />
                              </div>
                         </form>
                    </div>
                    <div style={{ width: '40%', padding: '50px' }} className="box-shadow">
                              <p>Migrate to new Term or session, click the button below to move to new term or session</p>
                              <small className="color-mute bold ">Note: new session will automatically promote all student to the next class</small> <br /> <br />
                         <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                              <button style={{ padding: '10px 20px', border: 'none', backgroundColor:' var(--primary-color)', color: 'white', borderRadius: '5px', cursor: 'pointer' }}>
                                   Next Term
                              </button>
                              <button style={{ padding: '10px 20px', border: 'none', backgroundColor: ' var(--primary-color)', color: 'white', borderRadius: '5px', cursor: 'pointer' }}>
                                   Next Session
                              </button>
                         </div>
                    </div>

               </div>
          </div>
     )
}