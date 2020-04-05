import React from 'react';
import List from './list';
import './App.css';

function App() {
  let data = ['one', 'two', ['two a', 'two b'], 'three'];
  return (
    <div className="App">
      <List data={data}/>
    </div>
  );
}

export default App;
