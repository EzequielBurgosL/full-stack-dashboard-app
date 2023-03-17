import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { DetailPage, MainPage } from './pages';
import { TimeRangeProvider } from './context/timeRange';

const mdTheme = createTheme();

function App() {
  return (
    <ThemeProvider theme={mdTheme}>
      <TimeRangeProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/articles/:timeRange' element={<MainPage />}></Route>
            <Route path='/articles/:timeRange/:id' element={<DetailPage />}></Route>
            <Route path='*' element={<Navigate to='/articles/today' />} />
          </Routes>
        </BrowserRouter>
      </TimeRangeProvider>
    </ThemeProvider>
  );
}

export default App;
