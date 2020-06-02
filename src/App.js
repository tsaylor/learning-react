import React from 'react';
import List from './list';
import './App.css';
import BulletList from './lib/bulletlist';


function App() {
    let bl = new BulletList()
    bl.data = [
        {'id': 1, 'value': 'one', 'parent': null, 'prev_sibling': null},
        {'id': 2, 'value': 'two', 'parent': null, 'prev_sibling': 1},
        {'id': 3, 'value': 'two a', 'parent': 2, 'prev_sibling': null},
        {'id': 4, 'value': 'two b', 'parent': 2, 'prev_sibling': 3},
        {'id': 5, 'value': 'three', 'parent': null, 'prev_sibling': 2},
    ]

  return (
    <div className="App">
      <List data={bl} parent_id={null}/>
    </div>
  );
}

export default App;
