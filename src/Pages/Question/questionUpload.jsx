import BulkQuestionUploadingForm from "../../Component/Question/bulkQuestionUploadingForm";
import SingleQuestionUploadingForm from "../../Component/Question/singleQuestionUploadingForm";
import { useState } from "react";

export default function QuestionUpload() {
     const [uploadType, setUploadType] = useState('single');


     const handleUploadTypeChange = (event) => {
          console.log(event.target.value);
          setUploadType(event.target.value);
     };
     return (
          <div className="">
               <h1 className="text-center color-primary">Upload Questions</h1>
                    <div className="toggle-form">
                         <label>
                              <input
                                   type="radio"
                                   value="single"
                                   checked={uploadType === 'single'}
                                   onChange={handleUploadTypeChange}
                              />
                              Single Question Upload
                         </label>
                         <label>
                              <input
                                   type="radio"
                                   value="bulk"
                                   checked={uploadType === 'bulk'}
                                   onChange={handleUploadTypeChange}
                              />
                              Multiple Questions Upload (file)
                         </label>
                    </div>
                    {uploadType === 'single' && <SingleQuestionUploadingForm />}
                    {uploadType === 'bulk' && <BulkQuestionUploadingForm />}
          </div>
     )
}