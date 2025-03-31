import React, { useState, useEffect } from "react";
import { useAuth } from "../../Zustand/auth";
import { useNotification } from "../../Context/notificationContext";
import logo from '../../assets/iDEAL-logo.jpg'

export default function LoginForm() {
     const { login, auth } = useAuth();
     const { loading, isAuthenticated } = auth;
     const { showSuccess, showError } = useNotification();

     const [formData, setFormData] = useState({
          email: "",
          password: ""
     });

     const handleInputChange = (e) => {
          const { name, value } = e.target;
          setFormData({
               ...formData,
               [name]: value
          });
     };
     const handleSubmit = async (e) => {
          e.preventDefault();
          try {
               let res = await login(formData);
               if (res.success) {
                    showSuccess(res.message);
               } else {
                    showError(res.message);
               }
          } catch (_error) {
               showError(_error);
          }
     };
     useEffect(() => {
          if (isAuthenticated) {
               window.location.reload();
          }
          
     }, [isAuthenticated]);

     return (
          <>

               <div className="page-center">
                    <form className="login-box" onSubmit={handleSubmit}>
                         <div className="login-box-inner">
                              <h1 className="font-primary color-primary text-center">Welcome Back</h1>
                              <div>
                                   <input type="text" className="login-field" name="email" placeholder="UIN Number" value={formData.email} onChange={handleInputChange} />
                              </div>
                              <div>
                                   <input type="password" className="login-field" name="password" placeholder="password" value={formData.password} onChange={handleInputChange} />
                              </div>
                              <button type="submit" loading={loading.toString()}>
                                   {!loading ? "Login" : "please wait..."}
                              </button>

                         </div>
                    </form>

                   
               </div>

                <div style={{marginTop: '-10%'}} className="text-center">
                    <div className="">
                         <small><b>Powered by</b></small> <br />
                         <img src={logo} alt="iDEAL logo" className="img-fluid" style={{ height: '80px', width:'160px' }} />
                    </div>
               </div>
          </>

     )
}