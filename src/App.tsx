import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DetailPage, MainPage } from './pages';

const mdTheme = createTheme();

function App() {
  return (
    <ThemeProvider theme={mdTheme}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainPage />}></Route>
          <Route path='/detail/:id/:timeRange' element={<DetailPage />}></Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
