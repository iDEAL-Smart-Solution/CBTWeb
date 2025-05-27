import { InputField } from "../ReUsableComponents/input";
import { ImageUploader } from "../ReUsableComponents/file";
import { TextArea } from "../ReUsableComponents/textArea";
import { Submit } from "../ReUsableComponents/input";

export default function Feedbacktemplate({ handleInputChange, handleSubmit, formData, handleReset, loading }) {
    return (
        <form onSubmit={handleSubmit} className="space-y-6 relative z-0">
            <div className="grid grid-cols-1 gap-4">
                <InputField
                    type="email"
                    name="email"
                    value={formData.email}
                    placeholder="Complainant email address"
                    handleChange={handleInputChange}
                    label="Email Address"
                    width="100%"
                />
                <InputField
                    type="text"
                    name="header"
                    value={formData.header}
                    placeholder="Subject of the complaint"
                    handleChange={handleInputChange}
                    label="Subject"
                    width="100%"
                />
            </div>
            <div className="grid grid-cols-1 gap-4">
                <TextArea
                    name="message"
                    value={formData.message}
                    handleChange={handleInputChange}
                    rows={5}
                    placeholder="Enter the complaint or message. Add the file below if one exists..."
                    label="Message"
                    width="100%"
                />
            </div>
            <div className="grid grid-cols-1 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Attach File (Optional)
                    </label>
                    <ImageUploader
                        name="file"
                        handleChange={handleInputChange}
                        width="100%"
                    />
                </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
                <button
                    type="button"
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
    );
}