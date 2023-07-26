import React from 'react';
import { motion } from 'framer-motion';
import useNasaData from './hooks/useNasaData';
import YearAutocomplete from './components/YearAutocomplete';
import MassInput from './components/MassInput';
import './App.css';

function App() {
  const {
    loading,
    setYear,
    year,
    setMass,
    yearsArray,
    filteredData,
    errorMessage,
    resetErrorMessage,
  } = useNasaData();

  return (
    <div className="App">
      <div className="App__card">
        {loading ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <img src="loader.gif" alt="Loading..." />
          </motion.div>
        ) : (
          <div className="App__card__content">
            <div className="App__card__title">
              NASA Meteor Search
            </div>
            <div className="App__year__input">
              <YearAutocomplete
                yearsArray={yearsArray}
                forceValue={year < 0 || year == null ? '' : year?.toString()}
                setOption={setYear}
              />
            </div>
            {filteredData.length < 1000 && (
              <motion.div
                layout
                className="App__data__wrapper"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div>
                  Total meteorites for this year
                </div>
                <div className="meteorites__number">
                  {filteredData.length}
                </div>
                <div className="App__mass__input">
                  <MassInput onMassChange={setMass} />
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>
      {errorMessage !== '' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="App__alert">
          <div
            role="button"
            className="App__alert__close"
            onClick={() => resetErrorMessage()}
          >
            X
          </div>
          {errorMessage}
        </motion.div>
      )}
    </div>
  );
}

export default App;
