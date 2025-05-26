import { useNotification } from "../../Context/notificationContext";
import { useState } from 'react';
import SchoolCreateForm from "../../Component/School/createSchoolForm";
import useSchoolStore from '../../Zustand/schoolSlice';

export default function SchoolRegistration() {
     const { loading, createSchool } = useSchoolStore();

     const { showSuccess, showError } = useNotification();

     const [formData, setFormData] = useState({
          schoolName: "",
          address: "",
          phoneNumber: "",
          email: "",
     });


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
          console.log(formData);
          try {
               let res = await createSchool(formData);
               if(res.success)
                    {
                         showSuccess(res.message);
                    } else {
                         showError(res.message);
                    }
          } catch (_error) {
               showError(res.message);
          }
     };

     const handleReset = async () => {
          setFormData({
               schoolName: "",
               address: "",
               phoneNumber: "",
               email: "",
          })
     }
     return (
          <div>
               <h1 className="text-center color-primary">School</h1>
               <SchoolCreateForm loading={loading} formData={formData} handleInputChange={handleInputChange} handleSubmit={handleSubmit} handleReset={handleReset} />
          </div>
     )
}