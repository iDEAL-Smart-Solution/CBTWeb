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
          planType: "",
          subscriptionType: "",
     });

     const PlanType = [
          { value: 1, label: 'Local' },
          { value: 2, label: 'Remote' },
     ];

     const SubscriptionType = [
          { value: 1, label: 'OneTime' },
          { value: 2, label: 'PerTerm' },
     ];

     const handleInputChange = (event) => {
          const { name, value } = event.target;
          let parsedValue = value;
          if (name === "planType" || name === "subscriptionType") {
              parsedValue = parseInt(value);
          }
      
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
               if (res.success) {
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
               planType: 0,
               subscriptionType: 0,
          })
     }
     return (
          <div>
               <SchoolCreateForm
                    loading={loading}
                    formData={formData}
                    handleInputChange={handleInputChange}
                    handleSubmit={handleSubmit}
                    handleReset={handleReset}
                    planType={PlanType}
                    subscriptionType={SubscriptionType}
               />
          </div>
     )
}