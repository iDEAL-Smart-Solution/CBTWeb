import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../Zustand/auth";
import { useNotification } from "../../Context/notificationContext";
import { BASE_URL } from "../../Constant";

export default function LoginForm() {
  const { login, auth } = useAuth();
  const { loading, isAuthenticated } = auth;
  const { showSuccess, showError } = useNotification();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [localLoading, setLocalLoading] = useState(false);
  const [brandingLoading, setBrandingLoading] = useState(false);
  const [logoLoadFailed, setLogoLoadFailed] = useState(false);
  const [schoolBranding, setSchoolBranding] = useState({
    schoolName: "iDEAL CBT",
    logoUrl: "",
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

  useEffect(() => {
    const fetchBranding = async () => {
      setBrandingLoading(true);
      try {
        const res = await axios.get(`${BASE_URL}/api/v1/User/login/logo`);
        const data = res.data?.data;
        setSchoolBranding({
          schoolName: data?.schoolName || "iDEAL CBT",
          logoUrl: data?.logoUrl || "",
        });
        setLogoLoadFailed(false);
      } catch (error) {
        setSchoolBranding({ schoolName: "iDEAL CBT", logoUrl: "" });
        setLogoLoadFailed(false);
      } finally {
        setBrandingLoading(false);
      }
    };

    fetchBranding();
  }, []);

  const getLogoSrc = (logoPath) => {
    if (!logoPath) return "";
    if (logoPath.startsWith("http://") || logoPath.startsWith("https://")) return logoPath;
    return `${BASE_URL}/ProfilePicture/${logoPath}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-6">
      <div className="flex flex-col lg:flex-row w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden bg-white border border-gray-200">
        <div className="lg:w-1/2 bg-blue-600 p-10 text-white flex flex-col justify-center items-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-center">{schoolBranding.schoolName}</h1>
          <p className="text-base text-blue-100 text-center mb-8">Your gateway to seamless learning and assessment</p>

          {schoolBranding.logoUrl && !logoLoadFailed ? (
            <img
              src={getLogoSrc(schoolBranding.logoUrl)}
              alt="School logo"
              className="h-32 w-32 sm:h-40 sm:w-40 object-contain"
              onError={() => setLogoLoadFailed(true)}
            />
          ) : (
            <div className="h-32 w-32 sm:h-40 sm:w-40 bg-white/10 rounded-md flex items-center justify-center text-xs text-blue-100">
              {brandingLoading ? "Loading logo..." : "School Logo"}
            </div>
          )}

          <p className="mt-5 text-xs uppercase tracking-[0.18em] text-blue-100">Powered by iDEAL</p>
        </div>

        <div className="lg:w-1/2 p-8 sm:p-12 bg-white">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">Welcome Back</h2>
          <p className="text-sm text-gray-500 text-center mb-8">Sign in to continue</p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <input
                type="text"
                name="email"
                placeholder="UIN Number"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-4 pl-12 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none text-gray-800 text-base transition"
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
                className="w-full p-4 pl-12 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none text-gray-800 text-base transition"
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0-1.1.9-2 2-2s2 .9 2 2-2 4-2 4m0 0H7a4 4 0 01-4-4V7a4 4 0 014-4h10a4 4 0 014 4v4a4 4 0 01-4 4h-5m-3 0v4" />
                </svg>
              </span>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg text-base font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
              disabled={loading || localLoading}
            >
              {!(loading || localLoading) ? "Login" : "Please wait..."}
            </button>
          </form>
          <div className="mt-6 text-center">
            <a href="#" className="text-blue-600 text-sm hover:underline">Forgot Password?</a>
          </div>
        </div>
      </div>
    </div>
  );
}