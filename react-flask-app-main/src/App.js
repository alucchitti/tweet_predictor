import React from 'react';
import './App.css';

function App() {

    const text = "water sun kim khloe beach waves swim suit tan makeup lash eye fit friends hgtv"
    fetch(`/resp?text=${text}`).then(res => res.json()).then(data => {
      console.log(data);
    });


  return (
    <div className="App">
      <p>Hello There!</p>
    </div>
  );
}

export default App;