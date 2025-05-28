
import StudentRegistrationForm from "../../Component/student/studentRegistrationForm";
import { useStudent } from "../../Zustand/studentSlice";
import { useClass } from "../../Zustand/classSlice";
import { useNotification } from "../../Context/notificationContext";
import { useState, useEffect } from 'react';


export default function StudentRegistration() {
     const { student, createStudent } = useStudent();
     const { schClass, fetchClassList } = useClass();
     const { loading } = student;
     const { showSuccess, showError } = useNotification();

     const [formData, setFormData] = useState({
          registrationNumber: "",
          className: "",
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          profilePicture: null,
          gender: 0,
     });

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

     useEffect(() => {
          fetchClassList();
     }, [])

     const { allschClass } = schClass;


     const handleSubmit = async (e) => {
          e.preventDefault();
          try {
               let res = await createStudent(formData);
               if(res.success)
                    {

                         showSuccess(res.message);
                         setFormData({
                                        registrationNumber: "",
                                        className: "",
                                        firstName: "",
                                        lastName: "",
                                        email: "",
                                        phoneNumber: "",
                                        profilePicture: null,
                                        gender: 0,
                                   })
                    } else {
                         showError(res.message);
                    }
          } catch (_error) {
               showError(_error);
          }
     };

    
     return (
          <div className="min-h-screen bg-gray-100 py-6 px-4 md:px-6">
          <div className="max-w-2xl mx-auto">
              <h1 className="text-2xl font-bold text-gray-800 mb-6">Register Student</h1>
               <StudentRegistrationForm 
               formData={formData} 
               handleInputChange={handleInputChange} 
               handleSubmit={handleSubmit} 
               loading={loading} 
               allschClass={allschClass} />
          </div>
          </div>
     )
}