import React from "react";


export function InputField({ type, placeholder, className, handleChange, value, name, label, width }) {
     return (
         <>
           <small className="color-mute bold">{label}</small>
          <input type={type} placeholder={placeholder} className={className} onChange={handleChange} value={value} name={name} style={{width: width}} />
         </>
     )
}

export function RadioButtonGroup({ label, name, options, selectedValue, handleChange }) {
     return (
         <>
             <small className="color-mute bold">{label}</small>
             <div className="radio-group">
                 {options.map((option) => (
                     <label key={option.value} style={{ marginRight: '10px' }}>
                         <input
                             type="radio"
                             name={name}
                             value={option.value}
                             checked={selectedValue === option.value}
                             onChange={(e) => handleChange(e)}
                         />
                         {option.label}
                     </label>
                 ))}
             </div>
         </>
     );
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
               style={{width: '100%'}}
               onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                         handleSubmit();
                    }
               }}
          />
     )
}