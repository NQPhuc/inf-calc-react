//import logo from './logo.svg';
import './App.css';
import * as Calc from './calc.js';
import React, { useState } from 'react';


function App() {
  const [value1, setValue1] = useState('0');
  const [value2, setValue2] = useState('0');
  const [valueOp, setValueOp] = useState('+');
  const [valueRes, setValueRes] = useState('');
  
  const updateResult = () => {
    let result = Calc.calculate(value1, value2, valueOp);
    setValueRes(result);
  };

  return (
    <div className="App">
      <p>integer 1: </p> <textarea id="a" rows="6" cols="100" value={value1} onChange={(event) => {if(Calc.isValidInteger(event.target.value)) setValue1(event.target.value);}}></textarea>
      <button type="button" onClick={() => setValue1('0')}>Reset</button>
      <br/>
      <p>integer 2: </p> <textarea id="b" rows="6" cols="100" value={value2} onChange={(event) => {if(Calc.isValidInteger(event.target.value)) setValue2(event.target.value);}}></textarea>
      <button type="button" onClick={() => setValue2('0')}>Reset</button>
      <br/>
      <p>operator: </p>
      <select id="op" onChange={(event) => setValueOp(event.target.value)}>
          <option value="+">+</option>
          <option value="-">-</option>
          <option value="*">*</option>
          <option value="%">%</option>
      </select><br/>
      <button type="button" onClick={() => updateResult()}>Calculate</button>
      <br/>

      <p>Result: </p> <textarea id="result" rows="10" cols="100" value={valueRes} disabled></textarea>

    </div>
  );
}

export default App;