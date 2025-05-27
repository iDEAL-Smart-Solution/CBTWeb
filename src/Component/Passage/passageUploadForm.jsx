import { InputField, Submit } from "../ReUsableComponents/input";
import { Dropdown } from "../ReUsableComponents/dropDown";
import { TextArea } from "../ReUsableComponents/textArea";

export default function PassageUploadForm({ handleInputChange, formData, handleSubmit, handleReset, exams, loading }) {
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 relative z-0">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                        <Dropdown
                            name="examId"
                            value={formData.examId}
                            handleChange={handleInputChange}
                            width="100%"
                            firstOption="Select exam"
                            options={exams}
                            optionKey="id"
                            optionValue="id"
                            optionLabel="examName"
                            className="mb-4"
                        />
                    </div>
                <div className="grid grid-cols-1 gap-4">
                        <InputField
                            type="text"
                            name="title"
                            value={formData.title}
                            placeholder="Passage title"
                            handleChange={handleInputChange}
                            width="100%"
                        />
                    </div>
                <div className="grid grid-cols-1 gap-4">
                        <TextArea
                            name="content"
                            value={formData.content}
                            handleChange={handleInputChange}
                            rows={5}
                            placeholder="Enter the passage content below"
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