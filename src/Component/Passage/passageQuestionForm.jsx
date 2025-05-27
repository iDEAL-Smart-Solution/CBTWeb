import { Dropdown } from "../ReUsableComponents/dropDown";
import { Submit } from "../ReUsableComponents/input";
import { FileUploader } from "../ReUsableComponents/file";

export default function PassageQuestionForm({ handleSubmit, formData, handleInputChange, loading, exams, handleReset, passageTitlesAndIds }) {
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
                        <Dropdown
                            name="passageId"
                            value={formData.passageId}
                            handleChange={handleInputChange}
                            width="100%"
                            options={passageTitlesAndIds}
                            optionKey="id"
                            optionValue="id"
                            firstOption="Select Passage"
                            optionLabel="title"
                            className="mb-4"
                        />
                    </div>
                <div className="grid grid-cols-1 gap-4">
                        <FileUploader
                            name="question"
                            handleChange={handleInputChange}
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