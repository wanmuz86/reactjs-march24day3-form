import { useState } from 'react'
import './App.css'

function App() {
  const [name, setName] = useState('');
  const handleChange = (e) => setName(e.target.value);

  const [selectedOption, setSelectedOption] = useState('male');

  const options = [{ name: "Male", value: "male" }, { name: "Female", value: "female" },
  { name: 'Prefer not to disclosed', value: 'nodisclose' }]

  const handleDropDownChange = (e) =>
    setSelectedOption(e.target.value);

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckChange = (e) => {
    setIsChecked(e.target.checked);
  }

  // const colors = ["Blue", "Red", "Green"];
  // const [selection,setSelection= useState([false,false,false]); 
  // I would access the index using map(val,i)

  const [colors, setColors] = useState([
    { name: "Blue", isChecked: false },
    { name: "Red", isChecked: false },
    { name: "Green", isChecked: false },
    { name: "Yellow", isChecked: false }
  ]);

  const handleColorChange = (color) => {
    // Changing the state from true to false or false to true
    color.isChecked = !color.isChecked
    // Updating the state to latest state (which has the selected color changed)
    setColors([...colors])
  }

  return (
    <>
      <div>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" value={name}
          onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="gender">Select your gender</label>
        <select name="gender" id="gender" value={selectedOption} onChange={handleDropDownChange}>
          {
            options.map(val => <option key={val.value} value={val.value}>{val.name}</option>)
          }
        </select>
        <p>Selected Option : {selectedOption}</p>
      </div>
      <div>
        <input type="checkbox" name="color" checked={isChecked}
          onChange={handleCheckChange} />
        {/* Exampel of one liner */}
        {/* <input type="checkbox" name="color" checked={isChecked}
          onChange={()=>setIsChecked(false)} /> */}
        <label>Blue</label>
        {isChecked && <p>Blue is selected!</p>}
      </div>
      <div>
        <p>Select colors</p>
        <ul>
          {
            colors.map(val =>
              <li key={val.name}>
                <input type="checkbox" name="colors"
                  checked={val.isChecked}
                  onChange={() => handleColorChange(val)} />
                <label>{val.name}</label>
              </li>
            )
          }
          <div>Selected colors :
            <ul>{

              colors.filter(val => val.isChecked == true).map(val => <li key={val.name}>{val.name}</li>)

            }</ul>
          </div>
        </ul>
      </div>
    </>
  )
}

export default App
