import { InputField, Submit } from "../ReUsableComponents/input";
import { ImageUploader } from "../ReUsableComponents/file";
import genderOptions from "../../lib/genderOptions";
import { Dropdown } from "../ReUsableComponents/dropDown";

export default function AdminUserCreationForm({ loading, formData, handleInputChange, handleSubmit, handleReset, schools }) {
    return (
        <div className="w-full max-w-lg mx-auto bg-white p-6 sm:p-8 rounded-lg shadow-md">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
                Create Admin User
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField 
                        type="text" 
                        name="firstName" 
                        value={formData.firstName} 
                        placeholder="First Name" 
                        className="w-full px-4 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        handleChange={handleInputChange} 
                        width="100%" 
                    />
                    <InputField 
                        type="text" 
                        name="lastName" 
                        value={formData.lastName} 
                        placeholder="Last Name" 
                        className="w-full px-4 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        handleChange={handleInputChange} 
                        width="100%" 
                    />
                </div>
                <div>
                    <Dropdown
                        name="schoolId"
                        value={formData.schoolId}
                        handleChange={handleInputChange}
                        className="w-full px-4 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        options={schools}
                        optionKey="id"
                        optionValue="id"
                        optionLabel="schoolName"
                        firstOption="Select School"
                        mb="0"
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        placeholder="Email Address" 
                        className="w-full px-4 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        handleChange={handleInputChange} 
                        width="100%" 
                    />
                    <InputField 
                        type="text" 
                        name="phoneNumber" 
                        value={formData.phoneNumber} 
                        placeholder="Phone Number" 
                        className="w-full px-4 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        handleChange={handleInputChange} 
                        width="100%" 
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <ImageUploader
                        name="profilePicture"
                        handleChange={handleInputChange}
                        className="w-full"
                        width="100%"
                    />
                    <Dropdown
                        name="gender"
                        value={formData.gender}
                        handleChange={handleInputChange}
                        className="w-full px-4 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        options={genderOptions}
                        optionKey="value"
                        optionValue="value"
                        optionLabel="label"
                        firstOption="Select Gender"
                        mb="0"
                    />
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <input 
                        className="w-full sm:w-1/2 py-2 px-4 bg-gray-300 text-gray-800 font-semibold rounded-md hover:bg-gray-400 transition-colors" 
                        type="reset" 
                        value="Reset" 
                        onClick={handleReset} 
                    />
                    <Submit 
                        className="w-full sm:w-1/2 py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors" 
                        loading={loading} 
                        isNotLoading="Submit" 
                        isloading="Please wait..." 
                    />
                </div>
            </form>
        </div>
    );
}