// import { InputField, Submit } from "../ReUsableComponents/input"


// export default function SchoolCreateForm({ loading, formData, handleInputChange, handleSubmit, handleReset }) {

//      return (
//           <div className="page-center-2 ">
//                <div className="register-box-3 box-shadow">
//                     <form onSubmit={handleSubmit} className="form" >
//                          <div className="form-grouping">
//                               <InputField type={`text`} name={`schoolName`} value={formData.schoolName} placeholder={`School Name`} className={`register-field`} handleChange={handleInputChange} width={`100%`} />
//                          </div>
//                          <div className="form-grouping">

//                               <InputField type={`text`} name={`address`} value={formData.address} placeholder={`Address`} className={`register-field`} handleChange={handleInputChange} width={`100%`} />
//                               </div>
//                          <div className="form-grouping">
//                               <InputField type={`text`} name={`phoneNumber`} value={formData.phoneNumber} placeholder={`PhoneNumber`} className={`register-long-field`} handleChange={handleInputChange} width={`100%`} />
//                          </div>
//                          <div className="form-grouping">
//                               <InputField type={`email`} name={`email`} value={formData.email} placeholder={`email address`} className={`register-field`} handleChange={handleInputChange} width={`100%`} />
//                          </div>
//                          <div className="form-grouping-buttom">
//                               <input className="submit-button bg-color-mute text-center" type="reset" value="reset" onClick={handleReset} />
//                               <Submit className={`submit-button text-center color-light`} loading={loading} isNotLoading={`submit`} isloading={`please wait...`} />
//                          </div>
//                          <div style={{ height: '3em' }}>

//                          </div>
//                     </form>
//                </div>
//           </div>
//      )
// }











import { InputField, Submit } from "../ReUsableComponents/input";

export default function SchoolCreateForm({ loading, formData, handleInputChange, handleSubmit, handleReset }) {
    return (
        <div className="min-h-[calc(100vh-200px)] flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-lg bg-white p-6 sm:p-8 rounded-lg shadow-md">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
                    Create School
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
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
