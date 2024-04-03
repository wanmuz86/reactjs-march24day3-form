import { useState,useRef } from 'react'
import './App.css'

function App() {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(null);

  // We create reference to each element of the form using useRef hook
  const selectRef = useRef(null);
  const checkbox = useRef(null);
  const inputRef = useRef(null);

  const handleChange = (e) => {
    if (e.target.value.length > 0){
      setName(e.target.value);
      setNameError(null);
    }
    else {
      setNameError("Name is required");
      setName(e.target.value);
    }
    
  };

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

   const handleUCFormSubmit = (e) => {
    e.preventDefault();
    // equivalent to DOM Manipualtion getElementId(xx) . value
    console.log(inputRef.current.value);
    console.log(checkbox.current.value);
    console.log(selectRef.current.value);
   }

  return (
    <>
      <div>
        <h2>Controlled Form</h2>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" value={name}
          onChange={handleChange} />
          { nameError && <p style={{color:'red'}}>{nameError}</p>  }
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
        <div>
          <h2>Uncontrolled Form</h2>
          <form onSubmit={handleUCFormSubmit}>
            <p>
            <label htmlFor="">Name</label>
            <input type="text" ref={inputRef}/>
            </p>
            <p>
            <label htmlFor="Color">Color</label>
            <select name="color" id="color" ref={selectRef}>
              <option value="red">Red</option>
              <option value="green">Green</option>
              <option value="blue">Blue</option>
            </select>
            </p>
            <p>
              <label htmlFor="checkbox">Do you like React?</label>
              <input type="checkbox" ref={checkbox}/>
            </p>
            <button type="sumbit">Submit</button>
          </form>

        </div>
      </div>
    </>
  )
}

export default App
