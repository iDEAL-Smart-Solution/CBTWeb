import Feedbacktemplate from "../../Component/feedback/feedbacktemplate";
import { SCHOOL_NAME } from "../../Constant";
import { useNotification } from "../../Context/notificationContext";
import Feedback from "../../Zustand/feedbackSlice";
import { useState } from "react";

export default function FeedbackForm() {
     const { sendfeedback, feedback } = Feedback();
     const { loading } = feedback;
     const [formData, setFormData] = useState({
          SCHOOL_NAME,
          email: "",
          header: "",
          message: "",
          file: 0,
          productName: "CBTSofware",
     });
     const { showSuccess, showError } = useNotification();
     const handleInputChange = (event) => {
          const { name, value } = event.target;
          let parsedValue = value;
          setFormData({
               ...formData,
               [name]: parsedValue
          });
     }
     const handleSubmit = async (e) => {
          e.preventDefault();
          try {
               let res = await sendfeedback(formData);
               if (res.success) {
                    showSuccess(res.message);
                    handleReset();
               } else {
                    showError(res.message);
                    handleReset();
               }
          } catch (_error) {
               showError(_error);
          }
          console.log(formData);
          // handleReset();

     };
     const handleReset = async () => {
          setFormData({
               SCHOOL_NAME,
               email: "",
               header: "",
               message: "",
               file: 0,
               productName: "CBTSofware",
          })
     }
     return (
          <div className="page-center-2">
               <div style={{ width: '60%', padding: '50px' }} className="box-shadow">
                    <p className="bold color-primary">Kindly fill in the form below to enter any type of complain you have</p>
                    <Feedbacktemplate handleInputChange={handleInputChange} formData={formData} handleReset={handleReset} handleSubmit={handleSubmit} loading={loading} />
               </div>
          </div>
     )
}