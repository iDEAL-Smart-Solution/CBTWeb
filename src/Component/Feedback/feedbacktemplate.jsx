import { InputField } from "../ReUsableComponents/input";
import { ImageUploader } from "../ReUsableComponents/file";
import { TextArea } from "../ReUsableComponents/textArea";
import { Submit } from "../ReUsableComponents/input";
export default function Feedbacktemplate({ handleInputChange, handleSubmit, formData, loading }) {
    return (
        <form onSubmit={handleSubmit} className="form">
            <div className="form-grouping">
                <InputField
                    type="email"
                    name="email"
                    value={formData.email}
                    placeholder="Complainant email address"
                    className="register-long-field"
                    handleChange={handleInputChange}
                    width="97.5%"
                />
                <InputField
                    type="text"
                    name="header"
                    value={formData.header}
                    placeholder="Subject of the complain"
                    className="register-long-field"
                    handleChange={handleInputChange}
                    width="97.5%"
                />
            </div>
            <div className="form-grouping">
                <TextArea
                    name="message"
                    value={formData.message}
                    handleChange={handleInputChange}
                    rows={3}
                    className="text-area"
                    placeholder="Enter the complain or message add the file below if one exits ..."
                    mb="20px"
                    width="100%"
                    ml="10px"
                />
            </div>
            <ImageUploader
                name={`file`}
                handleChange={handleInputChange}
                width={`48%`}
            />
            <div className="form-grouping-buttom">
                <Submit
                    className="submit-button text-center color-light"
                    loading={loading}
                    isNotLoading="Submit"
                    isLoading="Please wait..."
                />
            </div>
        </form>
    );
}
