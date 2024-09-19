import { useState, useEffect } from "react";
import { useAuth } from "../../Zustand/auth";
import { useNavigate } from 'react-router-dom';



export default function LoginForm() {
     const navigate = useNavigate();
     const { login, auth } = useAuth();
     const { loading, isAuthenticated, error } = auth;
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
               await login(formData);
          } catch (_error) {
               console.log(_error);
          }
     };
     useEffect(() => {
          if (isAuthenticated) {
               // navigate("/dashboard", { replace: true });
               window.location.reload();
          }
     }, [isAuthenticated]);

     return (
          <div className="page-center">
               <form className="login-box" onSubmit={handleSubmit}>
                    <div className="login-box-inner">
                         {error && <p className="color-danger">
                              <b>{error}!!!</b>
                         </p>}
                         <h1 className="font-primary color-primary text-center">Welcome Back</h1>
                         <div>
                              <input type="text" className="login-field" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} />
                         </div>
                         <div>
                              <input type="password" className="login-field" name="password" placeholder="password" value={formData.password} onChange={handleInputChange} />
                         </div>
                         <button type="submit" loading={loading.toString()}>
                              {!loading ? "Login" : "please wait..."}
                         </button>

                         {/* <div className="mb">
                              <a href="#">forgot password</a>
                         </div> */}
                    </div>
               </form>
          </div>
     )
}