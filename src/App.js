import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';
import Result from './Result';
const secretNumber = Math.floor(Math.random() *10)+1;

function App() {
  const [term, setTerm] = useState('');

  const handleChange= (event) => {setTerm(event.target.value)};

  return (
    <div className="game">
     <div class name="game-board">
      <lable htmlFor='term'> Identify the number 0 to 10  </lable>
      </div> 
      <input 
      id='term'
      type="text"
      name="term"
      onChange={handleChange}/>
      <Result secretNumber={secretNumber} term={term}/>
    </div>
  );
}

export default App;
