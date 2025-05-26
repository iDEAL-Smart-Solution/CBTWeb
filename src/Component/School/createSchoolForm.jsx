import { InputField, Submit } from "../ReUsableComponents/input"


export default function SchoolCreateForm({ loading, formData, handleInputChange, handleSubmit, handleReset }) {

     return (
          <div className="page-center-2 ">
               <div className="register-box-3 box-shadow">
                    <form onSubmit={handleSubmit} className="form" >
                         <div className="form-grouping">
                              <InputField type={`text`} name={`schoolName`} value={formData.schoolName} placeholder={`School Name`} className={`register-field`} handleChange={handleInputChange} width={`100%`} />
                         </div>
                         <div className="form-grouping">

                              <InputField type={`text`} name={`address`} value={formData.address} placeholder={`Address`} className={`register-field`} handleChange={handleInputChange} width={`100%`} />
                              </div>
                         <div className="form-grouping">
                              <InputField type={`text`} name={`phoneNumber`} value={formData.phoneNumber} placeholder={`PhoneNumber`} className={`register-long-field`} handleChange={handleInputChange} width={`100%`} />
                         </div>
                         <div className="form-grouping">
                              <InputField type={`email`} name={`email`} value={formData.email} placeholder={`email address`} className={`register-field`} handleChange={handleInputChange} width={`100%`} />
                         </div>
                         <div className="form-grouping-buttom">
                              <input className="submit-button bg-color-mute text-center" type="reset" value="reset" onClick={handleReset} />
                              <Submit className={`submit-button text-center color-light`} loading={loading} isNotLoading={`submit`} isloading={`please wait...`} />
                         </div>
                         <div style={{ height: '3em' }}>

                         </div>
                    </form>
               </div>
          </div>
     )
}