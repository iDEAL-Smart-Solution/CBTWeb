import { InputField, Submit } from "../ReUsableComponents/input";
import { ImageUploader } from "../ReUsableComponents/file";
import genderOptions from "../../lib/genderOptions";
import { Dropdown } from "../ReUsableComponents/dropDown";

export default function StudentRegistrationForm({ formData, handleInputChange, handleSubmit, handleReset, loading, allschClass }) {
     return (

          <div className="bg-white shadow-lg rounded-lg p-6">

               <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <div className="relative">
                              <InputField
                                   type="text"
                                   name="registrationNumber"
                                   value={formData.registrationNumber}
                                   placeholder="Registration Number"
                                   handleChange={handleInputChange}
                                   width="100%"
                              />
                         </div>
                         <div className="relative">
                              <Dropdown
                                   name="className"
                                   value={formData.className}
                                   handleChange={handleInputChange}
                                   width="100%"
                                   options={allschClass}
                                   optionKey="classId"
                                   optionValue="className"
                                   optionLabel="className"
                                   firstOption="Select Class"
                              />
                         </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <div className="relative">
                              <InputField
                                   type="text"
                                   name="firstName"
                                   value={formData.firstName}
                                   placeholder="First name"
                                   handleChange={handleInputChange}
                                   width="100%"
                              />
                         </div>
                         <div className="relative">
                              <InputField
                                   type="text"
                                   name="lastName"
                                   value={formData.lastName}
                                   placeholder="Last name"
                                   handleChange={handleInputChange}
                                   width="100%"
                              />
                         </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <div className="relative">
                              <InputField
                                   type="email"
                                   name="email"
                                   value={formData.email}
                                   placeholder="Email address"
                                   handleChange={handleInputChange}
                                   width="100%"
                              />
                         </div>
                         <div className="relative">
                              <InputField
                                   type="text"
                                   name="phoneNumber"
                                   value={formData.phoneNumber}
                                   placeholder="Phone number"
                                   handleChange={handleInputChange}
                                   width="100%"
                              />
                         </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <div className="relative">
                              <ImageUploader
                                   name="profilePicture"
                                   handleChange={handleInputChange}
                                   width="100%"
                              />
                         </div>
                         <div className="relative">
                              <Dropdown
                                   name="gender"
                                   value={formData.gender}
                                   handleChange={handleInputChange}
                                   width="100%"
                                   options={genderOptions}
                                   optionValue="value"
                                   optionLabel="label"
                                   firstOption="Select Gender"
                              />
                         </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4">
                         <button
                              type="reset"
                              onClick={handleReset}
                              className="w-full md:w-auto px-6 py-2 bg-gray-300 text-gray-800 font-semibold rounded-md hover:bg-gray-400 transition-colors duration-200 shadow-sm"
                         >
                              Reset
                         </button>
                         <Submit
                              className="w-full md:w-auto"
                              loading={loading}
                              isNotLoading="Submit"
                              isloading="Please wait..."
                         />
                    </div>
               </form>
          </div>

     );
}