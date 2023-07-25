import React, { useState } from 'react';
import Autocomplete from './components/Autocomplete';
import './App.css';
import useNasaData from './hooks/useNasaData';

function App() {
  const [option, setOption] = useState('');
  const { rawData } = useNasaData();
  return (
    <div className="App">

    </div>
  );
}

export default App;
