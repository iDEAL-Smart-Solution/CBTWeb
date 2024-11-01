import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import { InputField } from "../ReUsableComponents/input";


function ModalEdit({ isOpen, onClose, onSubmit, formData, handleInputChange }) {
     if (!isOpen) return null;

     return (
          <div className="modal-overlay">
               <div className="modal-content box-shadow-2 p-20">
                    <h3>Edit Question</h3>
                    <form onSubmit={onSubmit}>
                         <div className="form-group">
                              <InputField type={`text`} label={`New Session`} name={`newSession`} placeholder={`New Session in the format 2023/2024`} value={formData.newSession} handleChange={handleInputChange} className={`form-input`} />
                         </div>
                         <div className="form-group">
                              <InputField type={`number`} label={`New Term`} name={`newTerm`} placeholder={`New Term`} value={formData.newTerm} handleChange={handleInputChange} className={`form-input`} />
                         </div>
                         <div className="form-group">
                              <InputField type={`text`} label={`New Duration`} name={`newDuration`} placeholder={`New Duration`} value={formData.newDuration} handleChange={handleInputChange} className={`form-input`} />
                         </div>
                         <div className="form-group">
                              <InputField type={`text`} label={`name`} name={`name`} placeholder={`Exam Name`} value={formData.name} handleChange={handleInputChange} className={`form-input`} />
                         </div>
                         <div className="form-group">
                              <InputField type={`number`} label={`Exam Type`} name={`examType`} placeholder={`Exam Type`} value={formData.examType} handleChange={handleInputChange} className={`form-input`} />
                         </div>
                         <div className="form-group">
                              <InputField type={`number`} label={`Number of Questions per Student`} name={`numberOfQuestionsPerStudent`} placeholder={`Number of Questions per student`} value={formData.numberOfQuestionsPerStudent} handleChange={handleInputChange} className={`form-input`} />
                         </div>
                         <div className="form-group">
                              <InputField type={`number`} label={`Obtainable Score`} name={`obtainableScore`} placeholder={`Obtainable Score`} value={formData.obtainableScore} handleChange={handleInputChange} className={`form-input`} />
                         </div>
                         <div className="form-group">
                              <button type="submit" className="btn">Save Changes</button>
                              <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
                         </div>
                    </form>
               </div>
          </div>
     );
}


export default function SingleExamTemplate({ loading, data, errorMessage, handleEdit, handleDelele }) {

     const [isModalOpen, setIsModalOpen] = useState(false);
     const [formData, setFormData] = useState({
          key: '',
          newSession: '',
          newTerm: 0,
          newDuration: '',
          name: '',
          examType: 0,
          numberOfQuestionsPerStudent: 0,
          obtainableScore: 0,
     });


     const handleEditClick = (id) => {
          setFormData({
               key: id,
               newSession: data.session || '',
               newTerm: data.term || 0,
               newDuration: data.duration || '',
               name: data.examName || '',
               examType: data.examType || 0,
               numberOfQuestionsPerStudent: data.numberOfQuestionsPerStudent || 0,
               obtainableScore: data.obtainableScore || 0,
          });
          setIsModalOpen(true);
     };

     const handleInputChange = (e) => {
          setFormData({
               ...formData,
               [e.target.name]: e.target.value
          });
     };

     const handleFormSubmit = (e) => {
          e.preventDefault();
          handleEdit(formData);
          setIsModalOpen(false);

     };

     const termMap = {
          1: "1st_term",
          2: "2nd_term",
          3: "3rd_term",
     };

     const typeMap = {
          1: "1st_CA",
          2: "2nd_CA",
          3: "3rd_CA",
          4: "Exam"
     };

     return (
          <div>
               {
                    loading ? (
                         <div className="loader-cell">
                              <div className="loader"></div>
                         </div>
                    ) : !data ? (
                         <div className="text-center text-big-2">{errorMessage}</div>
                    ) : (
                         <div className="profile-group" style={{ position: 'relative' }}>
                              <div className="box-shadow-3 p-30 bold">
                                   <p>Subject Code : {data.subjectCode}</p>
                                   <p>Exam Name : {data.examName}</p>
                                   <p>Exam Term : {termMap[data.term]}</p>
                                   <p>Exam Session : {data.session}</p>
                                   <p>Available : {data.isAvailable ? "Yes" : "No"}</p>
                                   <p>Exam Type : {typeMap[data.examType]}</p>
                              </div>
                              <div className="box-shadow-2 p-30 bold">
                                   <p>Duration of Exam : {data.duration}</p>
                                   <p>Number of question for each Studnet : {data.numberOfQuestionsPerStudent}</p>
                                   <p>Objective Score: {data.objScore}</p>
                                   <p>Theory Score: {data.theoryScore}</p>
                                   <p>Max Obtainable Score: {data.obtainableScore}</p>
                                   <div style={{ position: "absolute", right: "-40%", bottom: "40px" }}>
                                        <FaEdit className="edit-icon" onClick={() => handleEditClick(data.id)} />
                                        <MdDelete className="delete-icon" onClick={() => handleDelele(data.id)} />
                                   </div>
                              </div>
                         </div>
                    )
               }
               <ModalEdit
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleFormSubmit}
                formData={formData}
                handleInputChange={handleInputChange}
            />
          </div>
     )
}