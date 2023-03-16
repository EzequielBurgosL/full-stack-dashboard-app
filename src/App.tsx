import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DetailPage, MainPage } from './pages';
import { TimeRangeProvider } from './context/timeRange';

const mdTheme = createTheme();

function App() {
  return (
    <ThemeProvider theme={mdTheme}>
      <TimeRangeProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<MainPage />}></Route>
            <Route path='/detail/:id/:timeRange' element={<DetailPage />}></Route>
          </Routes>
        </BrowserRouter>
      </TimeRangeProvider>
    </ThemeProvider>
  );
}

export default App;
