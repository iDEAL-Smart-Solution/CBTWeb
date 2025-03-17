import React from "react";
import { useAcad } from "../../Zustand/acad_session";
import { InputField } from "../../Component/ReUsableComponents/input";
import { Submit } from "../../Component/ReUsableComponents/input";
import { useState } from "react";
import { ImageUploader } from "../../Component/ReUsableComponents/file";
import { useNotification } from "../../Context/notificationContext";

export default function AddNameAndLogo() {
     const { acad, addNameAndLogo } = useAcad();
     const { loading, message } = acad;
     const [formData, setFormData] = useState({
          name: "",
          logo: null,
     });

     const { showSuccess, showError } = useNotification();
     const handleInputChange = (event) => {
          const { name, value, files } = event.target;
          let parsedValue = value;
          if (name === "logo") {
               setFormData({
                    ...formData,
                    [name]: files[0]
               });
          } else {
               setFormData({
                    ...formData,
                    [name]: parsedValue
               });
          }
     };
     const handleSubmit = async (e) => {
          e.preventDefault();
          try {
               var res = await addNameAndLogo(formData);
               if(res.success){
                    showSuccess(res.message);
               } else {
                    showError(res.message);
               }
          } catch (_error) {
               console.error(_error);
          }
     };
     return (
          <div>
               <div className="page-center-2">
              <div style={{width: '60%', padding: '50px'}} className="box-shadow">
              {message && <p className="bg-color-prim color-light">{message}</p>}
                    <form onSubmit={handleSubmit} className="">
                         <InputField type={`text`} name={`name`} label={`Enter the name of the school and the logo below`} value={formData.name} placeholder={`name`} className={`register-long-field`} handleChange={handleInputChange} width={`97.5%`} />
                         <ImageUploader
                                   name={`logo`}
                                   handleChange={handleInputChange}
                                   width={`97.5%`}
                                  />
                         <div className="">
                              <Submit className={`submit-button text-center color-light`} loading={loading} isNotLoading={`submit`} isloading={`please wait...`} />
                         </div>
                    </form>
              </div>
               </div>
          </div>
     )
}