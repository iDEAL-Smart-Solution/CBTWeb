import Feedbacktemplate from "../../Component/Feedback/feedbacktemplate"
import { SCHOOL_NAME } from "../../Constant";
import { useNotification } from "../../Context/notificationContext";
import { Feedback } from "../../Zustand/feedbackSlice";

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
    return(
        <Feedbacktemplate handleInputChange={handleInputChange} formData={formData} handleReset={handleReset} handleSubmit={handleSubmit}  loading={loading} />
    )
}