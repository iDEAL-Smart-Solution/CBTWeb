

export function TextArea({ rows, cols, width, placeholder, mb, className, handleChange, value, name }) {
     return (
          <textarea name={name} rows={rows} cols={cols} className={className} value={value} placeholder={placeholder} onChange={handleChange}
          style={{
               width: width,
               marginBottom: mb,
               padding: '10px'
               }}
          >

          </textarea>
     )
}