import { FaEdit } from "react-icons/fa";
import { MdDelete, MdFileUpload } from "react-icons/md";
import { InputField } from "../ReUsableComponents/input";
import { useState } from "react";


function ModalEdit({ isOpen, onClose, onSubmit, formData, handleInputChange }) {
     if (!isOpen) return null;

     return (
          <div className="modal-overlay">
               <div className="modal-content box-shadow-2 p-20">
                    <h3>Edit Question</h3>
                    <form onSubmit={onSubmit}>
                         <div className="form-group">
                              <InputField type={`text`} label={`Question`} name={`question`} placeholder={`Question`} value={formData.question} handleChange={handleInputChange} className={`form-input`} />
                         </div>
                         <div className="form-group">
                              <InputField type={`text`} label={`Question instruction`} name={`questionInstruction`} placeholder={`questionInstruction`} value={formData.questionInstruction} handleChange={handleInputChange} className={`form-input`} />
                         </div>
                         <div className="form-group">
                              <InputField type={`text`} label={`Option A`} name={`optionA`} placeholder={`optionA`} value={formData.optionA} handleChange={handleInputChange} className={`form-input`} />
                         </div>
                         <div className="form-group">
                              <InputField type={`text`} label={`Option B`} name={`optionB`} placeholder={`optionB`} value={formData.optionB} handleChange={handleInputChange} className={`form-input`} />
                         </div>
                         <div className="form-group">
                              <InputField type={`text`} label={`Option C`} name={`optionC`} placeholder={`optionC`} value={formData.optionC} handleChange={handleInputChange} className={`form-input`} />
                         </div>
                         <div className="form-group">
                              <InputField type={`text`} label={`Option D`} name={`optionD`} placeholder={`optionD`} value={formData.optionD} handleChange={handleInputChange} className={`form-input`} />
                         </div>
                         <div className="form-group">
                              <InputField type={`text`} label={`Answer`} name={`answer`} placeholder={`answer`} value={formData.answer} handleChange={handleInputChange} className={`form-input`} />
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

export default function QuestionCard({ data, index, loading, handleDelele, handleEdit, handleUpload }) {
     const [isModalOpen, setIsModalOpen] = useState(false);
     const [formData, setFormData] = useState({
          question: '',
          questionInstruction: '',
          optionA: '',
          optionB: '',
          optionC: '',
          optionD: '',
          answer: '',
          id: '',
     });


     const handleEditClick = (id) => {
          setFormData({
               question: data.question || '',
               questionInstruction: data.questionInstruction || '',
               optionA: data.optionA || '',
               optionB: data.optionB || '',
               optionC: data.optionC || '',
               optionD: data.optionD || '',
               answer: data.answer || '',
               id: data.questionId || '',
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

     return (
          <div className="card box-shadow-2">
               {loading ? (
                    <div className="loader-cell">
                         <div className="loader"></div>
                    </div>
               ) :
                    <div>
                         {data.questionInstruction?.trim() && <p className='bolder'>{data.questionInstruction}</p>}
                         <p>{index + 1}. {data.question}</p>
                         <div className="p-l-20">
                              <p>A. {data.optionA}</p>
                              <p>B. {data.optionB}</p>
                              <p>C. {data.optionC}</p>
                              <p>D. {data.optionD}</p>
                         </div>
                         <p>Question Point: {data.pointPerQuestion}</p>
                         <p>Correct Answer: {data.answer}</p>
                         <div className="icon-container">
                              <FaEdit className="edit-icon" size={20} onClick={() => handleEditClick(data.questionId)} />
                              <MdDelete className="delete-icon" onClick={() => handleDelele(data.questionId)} />
                              <MdFileUpload className="color-primary" size={25} onClick={() => handleUpload()} />
                         </div>
                    </div >
               }
               <ModalEdit
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleFormSubmit}
                formData={formData}
                handleInputChange={handleInputChange}
            />
          </div >
     )
}