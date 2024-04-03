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

  const [radioSelection, setRadioSelection]  = useState('male')

  const handleRadioChange = (e) => {
    console.log(e.target.value);
    setRadioSelection(e.target.value);
   }


   const [formData, setFormData] = useState({name:'',email:'',message:''});

   // e.target is the input calling the method
   const handleFormChange = (e) => {
     const {name, value} = e.target;
     // e.target.value -> whatever user input in the form
     // e.target.name  ->name property from the form

     // update the stateformdata 
     // the value of formData before the update is defined in prevFormData

    // setFormData({...formData, [name]:value}))
    // name  - Muzaffar
    // email - wanmuz@gmail.com
    // message - Please help me with bug abc
    
     setFormData((prevFormData)=> ({...prevFormData, [name]:value}));
   }

   const handleSubmit = (e) => {
    // Override the default SSR form behaviour
    e.preventDefault();
    console.log(formData.name);
    console.log(formData.email);
    console.log(formData.message);
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
      <div>
        <p>Select a gender</p>
      <div onChange={handleRadioChange}>
        {
          options.map(val=>
            <p key={val.value}>
            <input type="radio" value={val.value} 
            name="gender"/>{val.name}
            </p>
            )
        }
        <p>Selection from Radio: {radioSelection}</p>
        </div>
      </div>

      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor='name'>Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleFormChange}/>

          <label htmlFor='email'>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleFormChange}/>

          <label htmlFor='message'>Message</label>
          <textarea name="message" value={formData.message} onChange={handleFormChange}/>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  )
}

export default App
