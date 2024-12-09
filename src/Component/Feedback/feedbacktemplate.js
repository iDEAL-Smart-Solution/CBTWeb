import { InputField } from "../ReUsableComponents/input"
import { ImageUploader } from "../ReUsableComponents/file"


export default function  Feedbacktemplate(handleInputChange, handleSubmit, formData, handleReset, loading) {
    return (
        <form onSubmit={handleSubmit} className="form">
            <div className="form-grouping">

                <InputField type={`email`} name={`email`} value={formData.email} placeholder={`complainant email address`} className={`register-long-field`} handleChange={handleInputChange} width={`97.5%`} />
                <InputField type={`text`} name={`header`} value={formData.header} placeholder={`subject of the message`} className={`register-long-field`} handleChange={handleInputChange} width={`97.5%`} />
            </div>
            <div className="form-grouping">
                <TextArea name={`message`} value={formData.message} handleChange={handleInputChange} rows={3} className={`text-area`} placeholder={`Enter the question ...`} mb={`20px`} width={`100%`} ml={`10px`}
                />
            </div>

            <div className="form-grouping-buttom">
                {/* <input className="submit-button bg-color-mute text-center" type="reset" value="reset" onClick={handleReset} /> */}
                <Submit className={`submit-button text-center color-light`} loading={loading} isNotLoading={`submit`} isloading={`please wait...`} />
            </div>
        </form>
    )
}