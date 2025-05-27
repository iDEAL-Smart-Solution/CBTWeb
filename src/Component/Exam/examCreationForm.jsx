import { InputField, Submit, RadioButtonGroup } from "../ReUsableComponents/input";
import examType from "../../lib/examTypeOption";
import { Dropdown } from "../ReUsableComponents/dropDown";

export default function ExamCreationForm({ handleInputChange, formData, handleSubmit, handleReset, subjects, loading }) {
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 relative z-0">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                    <InputField
                        type="text"
                        name="examName"
                        value={formData.examName}
                        placeholder="Exam name e.g. ENG_JSS_1stCA_2ndTerm_2022/23"
                        handleChange={handleInputChange}
                        width="100%"
                    />
                </div>
                <div className="grid grid-cols-1 gap-4">
                    <Dropdown
                        name="subjectCode"
                        value={formData.subjectCode}
                        handleChange={handleInputChange}
                        width="100%"
                        firstOption="Select subject code"
                        options={subjects}
                        optionKey="id"
                        optionValue="code"
                        optionLabel="code"
                        className="mb-4"
                    />
                </div>
                <div className="grid grid-cols-1 gap-4">
                    <Dropdown
                        name="examType"
                        value={formData.examType}
                        handleChange={handleInputChange}
                        width="100%"
                        firstOption="Select exam type"
                        options={examType}
                        optionKey="value"
                        optionValue="value"
                        optionLabel="text"
                        className="mb-4"
                    />
                </div>
                <div className="grid grid-cols-1 gap-4">
                    <InputField
                        type="number"
                        name="NumberOfQuestionsPerStudent"
                        value={formData.NumberOfQuestionsPerStudent}
                        placeholder="Number of questions per student"
                        handleChange={handleInputChange}
                        label="Number of questions per student"
                        width="100%"
                    />
                </div>
                <div className="grid grid-cols-1 gap-4">
                    <InputField
                        type="number"
                        name="NumberOfPassageQuestionsPerStudent"
                        value={formData.NumberOfPassageQuestionsPerStudent}
                        placeholder="Number of passage questions per student"
                        handleChange={handleInputChange}
                        label="Number of passage questions per student, leave as zero if exam has no passage"
                        width="100%"
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                        type="number"
                        name="durationHours"
                        value={formData.durationHours}
                        placeholder="Hours"
                        handleChange={handleInputChange}
                        min="0"
                        label="Time in hours e.g 01"
                        width="100%"
                    />
                    <InputField
                        type="number"
                        name="durationMinutes"
                        value={formData.durationMinutes}
                        placeholder="Minutes"
                        handleChange={handleInputChange}
                        min="0"
                        max="59"
                        label="Time in minutes e.g 30"
                        width="100%"
                    />
                </div>
                <div className="grid grid-cols-1 gap-4">
                    <InputField
                        type="number"
                        name="oBJScore"
                        value={formData.oBJScore}
                        placeholder="OBJ Score"
                        handleChange={handleInputChange}
                        min="0"
                        max="100"
                        label="Total OBJ Score"
                        width="100%"
                    />
                </div>
                <div className="grid grid-cols-1 gap-4">
                    <InputField
                        type="number"
                        name="theoryScore"
                        value={formData.theoryScore}
                        placeholder="Theory score"
                        handleChange={handleInputChange}
                        min="0"
                        max="100"
                        label="Theory score, put 0 if this exam doesn't have theory"
                        width="100%"
                    />
                </div>
                <div className="grid grid-cols-1 gap-4">
                    <InputField
                        type="number"
                        name="obtainableScore"
                        value={formData.obtainableScore}
                        placeholder="Obtainable Score"
                        handleChange={handleInputChange}
                        min="0"
                        max="100"
                        label="Max obtainable Score for the exam"
                        width="100%"
                    />
                </div>
                <div className="grid grid-cols-1 gap-4">
                    <RadioButtonGroup
                        label="Has Passage"
                        name="HasPassage"
                        options={[
                            { value: true, label: 'Yes' },
                            { value: false, label: 'No' },
                        ]}
                        selectedValue={formData.HasPassage}
                        handleChange={handleInputChange}
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