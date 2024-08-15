import { useState, useEffect } from "react";
import { useAuth } from "../../Zustand/auth";
import { useNavigate } from 'react-router-dom';



export default function LoginForm()
{
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
               console.log(isAuthenticated)
               navigate("/dashboard", { replace: true });
            window.location.reload(); 
          }
        }, [isAuthenticated]); 
        
     return(
          <div className="page-center">
               <form className="login-box" onSubmit={handleSubmit}>
                    {error && <p className="color-danger">
                         <b>{error}!!!</b>
                    </p>}
                    <h1 className="font-primary color-primary">Welcome Back</h1>
                    <div>
                         <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} />
                    </div>
                    <div>
                         <input type="password" name="password" placeholder="password" value={formData.password} onChange={handleInputChange} />
                    </div>
                    <button type="submit" loading={loading.toString()}>
                         {!loading ? "Login" : "please wait..."}
                    </button>

                    <div>
                         <a href="#">forgot password</a>
                    </div>
               </form>
          </div>
     )
}