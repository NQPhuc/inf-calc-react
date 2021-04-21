//import logo from './logo.svg';
import './App.css';
import * as Calc from './calc.js';
import React, { useState } from 'react';


function App() {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [valueOp, setValueOp] = useState('+');
  const [valueRes, setValueRes] = useState('');
  
  const updateResult = () => {
    let result = Calc.calculate(value1, value2, valueOp);
    setValueRes(result);
  };

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <p>integer 1: </p> <textarea id="a" rows="6" cols="100" value={value1} onChange={(event) => setValue1(event.target.value)}></textarea><br/>
      <p>integer 2: </p> <textarea id="b" rows="6" cols="100" value={value2} onChange={(event) => setValue2(event.target.value)}></textarea><br/>
      <p>operator: </p>
      <select id="op" onChange={(event) => setValueOp(event.target.value)}>
          <option value="+">+</option>
          <option value="-">-</option>
          <option value="*">*</option>
          <option value="%">modulus</option>
      </select><br/>
      <button type="button" onClick={() => updateResult()}>Calculate</button>
      <br/>

      <p>Result: </p> <textarea id="result" rows="10" cols="100" value={valueRes} disabled></textarea>

    </div>
  );
}

export default App;