

export function InputField({ type, placeholder, className, handleChange, value, name, label }) {
     return (
         <>
           {/* <label className="color-mute bold">{label}</label> */}
           <small className="color-mute bold">{label}</small>
          <input type={type} placeholder={placeholder} className={className} onChange={handleChange} value={value} name={name} />
         </>
     )
}

export function Submit({ name, loading, isloading, isNotLoading, className }) {
     return (
          <input type="submit" value={loading ? isloading : isNotLoading} name={name} loading={loading.toString()} className={className} />
     )
}

export function SearchField({ type, placeholder, className, handleChange, handleSubmit}) {
     return (
          <input
               type={type} placeholder={placeholder} className={className}  onChange={handleChange}
               onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                         handleSubmit();
                    }
               }}
          />
     )
}