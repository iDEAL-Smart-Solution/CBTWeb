
import PassageUpload from "./passageUpload";
import PassageQuestion from "./passageQuestion";
import { useState } from "react";

export default function Passage() {
     const [uploadType, setUploadType] = useState('passage');


     const handleUploadTypeChange = (event) => {
          setUploadType(event.target.value);
     };
     return (
          <div className="">
               <h1 className="text-center color-primary">Upload Passage</h1>
                    <div className="toggle-form">
                         <label>
                              <input
                                   type="radio"
                                   value="passage"
                                   checked={uploadType === 'passage'}
                                   onChange={handleUploadTypeChange}
                              />
                              Upload Passage
                         </label>
                         <label>
                              <input
                                   type="radio"
                                   value="passage-question"
                                   checked={uploadType === 'passage-question'}
                                   onChange={handleUploadTypeChange}
                              />
                              Upload passage Questions
                         </label>
                    </div>
                    {uploadType === 'passage' && <PassageUpload />}
                    {uploadType === 'passage-question' && <PassageQuestion />}
          </div>
     )
}