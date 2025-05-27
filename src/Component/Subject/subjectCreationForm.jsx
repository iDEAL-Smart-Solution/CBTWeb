import { InputField, Submit } from "../ReUsableComponents/input";
import { Dropdown } from "../ReUsableComponents/dropDown";

export default function SubjectCreationForm({ handleReset, handleSubmit, staffsUsernames, allschClass, handleInputChange, formData, loading }) {
    return (
        <div className="bg-white shadow-lg rounded-lg p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                    <InputField
                        type="text"
                        name="name"
                        value={formData.name}
                        placeholder="Name of Subject"
                        handleChange={handleInputChange}
                        width="100%"
                    />
                </div>
                <div className="grid grid-cols-1 gap-4">
                    <InputField
                        type="text"
                        name="code"
                        value={formData.code}
                        placeholder="Subject Code"
                        handleChange={handleInputChange}
                        width="100%"
                    />
                </div>
                <div className="grid grid-cols-1 gap-4">
                    <InputField
                        type="text"
                        name="description"
                        value={formData.description}
                        placeholder="Subject Description"
                        handleChange={handleInputChange}
                        width="100%"
                    />
                </div>
                <div className="grid grid-cols-1 gap-4">
                    <Dropdown
                        name="className"
                        value={formData.className}
                        handleChange={handleInputChange}
                        width="100%"
                        firstOption="Select Class"
                        options={allschClass}
                        optionKey="classId"
                        optionValue="className"
                        optionLabel="className"
                        className="mb-5"
                    />
                </div>
                <div className="grid grid-cols-1 gap-4">
                    <Dropdown
                        name="userName"
                        value={formData.userName}
                        handleChange={handleInputChange}
                        width="100%"
                        firstOption="Select Staff"
                        options={staffsUsernames}
                        optionKey="id"
                        optionValue="userName"
                        optionLabel="userName"
                        optionImage="profilePicture"
                        className="mb-5"
                    />
                </div>
                <div className="grid grid-cols-1 gap-4">
                    <InputField
                        type="number"
                        name="totalTestScore"
                        value={formData.totalTestScore}
                        handleChange={handleInputChange}
                        label="Test allocated score"
                        width="100%"
                    />
                </div>
                <div className="grid grid-cols-1 gap-4">
                    <InputField
                        type="number"
                        name="totalExamScore"
                        value={formData.totalExamScore}
                        handleChange={handleInputChange}
                        label="Exam allocated score"
                        width="100%"
                    />
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