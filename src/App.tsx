import React, { useState } from 'react';
import Autocomplete from './components/Autocomplete';
import './App.css';

function App() {
  const [option, setOption] = useState('');
  return (
    <div className="App">
      <Autocomplete
        inputName="test"
        placeholder="Select year"
        onSelect={(optionValue) => setOption(optionValue.toString())}
        options={[2019, 2020, 2021]}
      />
    </div>
  );
}

export default App;
