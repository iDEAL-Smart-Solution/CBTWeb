import { InputField, Submit } from "../ReUsableComponents/input";
import { Dropdown } from "../ReUsableComponents/dropdown";

export default function SchoolCreateForm({ loading, formData, handleInputChange, handleSubmit, handleReset, planType }) {
    return (
        <div className="min-h-[calc(100vh-200px)] flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-lg bg-white p-6 sm:p-8 rounded-lg shadow-md">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
                    Create School
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                        <Dropdown
                            name="planType"
                            value={formData.planType}
                            handleChange={handleInputChange}
                            className="w-full px-4 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            options={planType}
                            optionKey="value"
                            optionValue="value"
                            optionLabel="label"
                            firstOption="Select plan type"
                            mb="0"
                        />
                    </div>
                    <div>
                        <InputField
                            type="text"
                            name="schoolName"
                            value={formData.schoolName}
                            placeholder="School Name"
                            className="w-full px-4 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            handleChange={handleInputChange}
                            width="100%"
                        />
                    </div>
                    <div>
                        <InputField
                            type="text"
                            name="address"
                            value={formData.address}
                            placeholder="Address"
                            className="w-full px-4 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            handleChange={handleInputChange}
                            width="100%"
                        />
                    </div>
                    <div>
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
                    <div>
                        <InputField
                            type="email"
                            name="email"
                            value={formData.email}
                            placeholder="Email Address"
                            className="w-full px-4 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            handleChange={handleInputChange}
                            width="100%"
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
        </div>
    );
}
