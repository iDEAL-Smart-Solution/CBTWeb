import StaffRegistrationForm from "../../Component/Staff/staffRegistrationForm"
import { useStaff } from "../../Zustand/staffSlice";
import { useNotification } from "../../Context/notificationContext";
import { useState } from 'react';

export default function StaffRegistration() {
     const { staff, createSaff } = useStaff();
     const { loading } = staff;

     const { showSuccess, showError } = useNotification();

     const [formData, setFormData] = useState({
          firstName: "",
          lastName: "",
          userName: "",
          email: "",
          password: "",
          confirmPassword: "",
          phoneNumber: "",
          profilePicture: null,
          gender: 0,
     });

     const [passwordError, setPasswordError] = useState("");

     const handleInputChange = (event) => {
          const { name, value, files } = event.target;
          let parsedValue = value;
          if (name === "gender") {
               parsedValue = parseInt(value);
          }

          if (name === "profilePicture") {
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

          if (formData.password !== formData.confirmPassword) {
               setPasswordError("Password and confirm password do not match");
               return;
          }

          setPasswordError("");
          try {
               let res = await createSaff(formData);
               if(res.success)
                    {
                         showSuccess(res.message);
                    } else {
                         showError(res.message);
                    }
          } catch (_error) {
               showError('Request failed');
          }
     };

     const handleReset = async () => {
          setFormData({
               firstName: "",
               lastName: "",
               userName: "",
               email: "",
               password: "",
               confirmPassword: "",
               phoneNumber: "",
               profilePicture: null,
               gender: 0,
          })
     }
     return(
          <div>
               <StaffRegistrationForm loading={loading} formData={formData} handleInputChange={handleInputChange} handleSubmit={handleSubmit} handleReset={handleReset} passwordError={passwordError} />
          </div>
     )
}