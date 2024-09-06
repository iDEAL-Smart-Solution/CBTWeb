
export function ImageUploader({ className, name, value, handleChange, width }) {
     return (
          <input type="file" className={className} name={name} value={value} onChange={handleChange}  style={{
               height: '30px',
               width: width,
               padding: '10px',
               fontSize: '16px',
               borderRadius: '5px',
               outline: 'none',
               cursor: 'pointer',
               backgroundColor: 'rgba(200, 200, 200, 0.300)'
          }}  />
     )
}

export function FileUploader ({className, name, value, handleChange, width}) {
     return(
          <input type="file" className={className} name={name} value={value} onChange={handleChange}  
          style={{
               height: '30px',
               width: width,
               padding: '10px',
               fontSize: '16px',
               borderRadius: '5px',
               outline: 'none',
               cursor: 'pointer',
               backgroundColor: 'rgba(200, 200, 200, 0.300)'
          }}  />
     )
}