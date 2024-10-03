import React, { useState, createContext } from 'react';
import { Routes, Route } from "react-router-dom"; 
import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';

import { ChannelDetail, VideoDetail, SearchFeed, Navbar, Feed, About} from './components';

export const ThemeContext = createContext();

const MainApp = () => {
  const [darkMode, setDarkMode] = useState(true);

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      background: {
        default: '#000',
        paper: '#121212',
      },
      text: {
        primary: '#fff',
      },
    },
  });

  const lightTheme = createTheme({
    palette: {
      mode: 'light',
      background: {
        default: '#f4f4f4',
        paper: '#fff',
      },
      text: {
        primary: '#000',
      },
    },
  });

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <CssBaseline />
        <Box sx={{ minHeight: '100vh', backgroundColor: darkMode ? '#000' : '#f4f4f4' }}>
          <Navbar /> {/* Removed the state setter for Kids content visibility */}
          
          <Routes>
            <Route exact path='/' element={<Feed />} />
            <Route path='/video/:id' element={<VideoDetail />} />
            <Route path='/channel/:id' element={<ChannelDetail />} />
            <Route path='/search/:searchTerm' element={<SearchFeed />} />
            <Route path='/about' element={<About />} />
        
            
         
          </Routes>
        </Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default MainApp;
