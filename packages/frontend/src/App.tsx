import React from 'react';
import './App.css';
import Routing from './Routing';
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider/LocalizationProvider';

function App() {
  return (
      <LocalizationProvider dateAdapter={DateAdapter}>
        <Routing/>
      </LocalizationProvider>
  );
}

export default App;
