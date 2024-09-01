

export function InputField({ type, placeholder, className, handleChange, value, name }) {
     return (
          <input type={type} placeholder={placeholder} className={className} onChange={handleChange} value={value} name={name} />
     )
}

export function SingleFileUploader({ className, name, value, style, handleChange }) {
     return (
          <input type="file" className={className} name={name} value={value} style={style} onChange={handleChange} />
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