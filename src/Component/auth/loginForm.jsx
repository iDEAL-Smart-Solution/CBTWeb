import React, { useState, useEffect } from "react";
import { useAuth } from "../../Zustand/auth";
import { useNotification } from "../../Context/notificationContext";
import logo from "../../assets/iDEAL-logo.jpg";

export default function LoginForm() {
  const { login, auth } = useAuth();
  const { loading, isAuthenticated } = auth;
  const { showSuccess, showError } = useNotification();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [localLoading, setLocalLoading] = useState(false); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalLoading(true); 
    try {
      let res = await login(formData);
      if (res.success) {
        showSuccess(res.message);
      } else {
        showError(res.message);
        setLocalLoading(false); // Stop loading on error
      }
    } catch (error) {
      showError(error.message || "An error occurred");
      setLocalLoading(false); // Stop loading on error
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      window.location.reload();
    }
  }, [isAuthenticated]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
      <div className="flex flex-col lg:flex-row w-full max-w-5xl mx-4 rounded-2xl shadow-2xl overflow-hidden bg-white transform transition-all duration-500 hover:scale-[1.01]">
        {/* Left Decorative Panel */}
        <div className="lg:w-1/2 bg-gradient-to-tr from-blue-600 to-blue-800 p-10 text-white flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold font-inter mb-4 animate-pulse">iDEAL CBT Platform</h1>
          <p className="text-lg font-inter text-center mb-6">Your gateway to seamless learning and assessment</p>
          <div className="relative">
            <div className="absolute inset-0 bg-blue-400 opacity-20 rounded-full blur-3xl"></div>
            <img src={logo} alt="iDEAL logo" className="h-20 w-40 relative z-10" />
          </div>
          <p className="mt-4 text-sm font-inter">Powered by iDEAL</p>
        </div>
        {/* Right Form Panel */}
        <div className="lg:w-1/2 p-8 sm:p-12">
          <h2 className="text-3xl font-bold text-gray-800 font-inter text-center mb-8">Welcome Back</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <input
                type="text"
                name="email"
                placeholder="UIN Number"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-4 pl-12 bg-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-800 font-inter text-lg transition-all duration-300"
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </span>
            </div>
            <div className="relative">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full p-4 pl-12 bg-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-800 font-inter text-lg transition-all duration-300"
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0-1.1.9-2 2-2s2 .9 2 2-2 4-2 4m0 0H7a4 4 0 01-4-4V7a4 4 0 014-4h10a4 4 0 014 4v4a4 4 0 01-4 4h-5m-3 0v4" />
                </svg>
              </span>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg text-lg font-inter font-bold hover:bg-blue-700 transition-colors duration-300 disabled:opacity-50"
              disabled={loading || localLoading}
            >
              {!(loading || localLoading) ? "Login" : "Please wait..."}
            </button>
          </form>
          <div className="mt-6 text-center">
            <a href="#" className="text-blue-600 font-inter hover:underline">Forgot Password?</a>
          </div>
        </div>
      </div>
    </div>
  );
}