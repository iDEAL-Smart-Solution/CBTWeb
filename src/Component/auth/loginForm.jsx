import React, { useState, useEffect } from "react";
import { useAuth } from "../../Zustand/auth";
import { useNotification } from "../../Context/notificationContext";
import logo from '../../assets/iDEAL-logo.jpg';

export default function LoginForm() {
  const { login, auth } = useAuth();
  const { loading, isAuthenticated } = auth;
  const { showSuccess, showError } = useNotification();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
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
    <div className="relative min-h-screen flex flex-col items-center justify-center">
      <form className="w-full sm:w-96 md:w-1/3 bg-white shadow-lg rounded-lg p-6" onSubmit={handleSubmit}>
        <div className="w-full">
          <h1 className="font-inter text-blue-600  text-2xl sm:text-3xl text-center mb-6">Welcome Back</h1>
          <div>
            <input
              type="text"
              className="w-full p-3 border-b-4 border-blue-600 focus:outline-none text-lg mb-6 font-inter placeholder-muted"
              name="email"
              placeholder="UIN Number"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <input
              type="password"
              className="w-full p-3 border-b-4 border-blue-600 focus:outline-none text-lg mb-6 font-inter placeholder-muted"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg text-lg font-inter font-bold hover:bg-blue-700 transition-colors"
            disabled={loading}
          >
            {!loading ? "Login" : "Please wait..."}
          </button>
        </div>
      </form>
      <div className="flex flex-col items-center mt-6 pb-6">
        <small className="font-inter font-bold text-muted mb-2">Powered by</small>
        <img
          src={logo}
          alt="iDEAL logo"
          className="h-16 w-32 sm:h-20 sm:w-40"
        />
      </div>
    </div>
  );
}
