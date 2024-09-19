

export function Dropdown({ name, value, handleChange, options, width, firstOption, optionKey, optionValue, optionLabel, mb }) {
     return (
          <select
               name={name}
               value={value}
               onChange={handleChange}
               style={{
                    height: '50px',
                    border: 'none',
                    width: width,
                    padding: '10px',
                    fontSize: '16px',
                    borderRadius: '5px',
                    outline: 'none',
                    cursor: 'pointer',
                    marginBottom: mb,
               }}  >
               <option value="">{firstOption}</option>
               {options.map((option) => (
                    <option key={option[optionKey]} value={option[optionValue]}>{option[optionLabel]}</option>
               ))}
          </select>
     )
}

// export function ServerDropdown({ name, value, handleChange, options, width, firstOption, optionKey, optionValue, optionLabel }) {
//      return (
//           <select
//                name={name}
//                value={value}
//                onChange={handleChange}
//                style={{
//                     height: '50px',
//                     border: 'none',
//                     width: width,
//                     padding: '10px',
//                     fontSize: '16px',
//                     borderRadius: '5px',
//                     outline: 'none',
//                     cursor: 'pointer'
//                }}  >
//                <option value="">{firstOption}</option>
//                {options.map((option) => (
//                     <option key={option[optionKey]} value={option[optionValue]}>{option[optionLabel]}</option>
//                ))}
//           </select>
//      )
// }