import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { Paper, IconButton, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { ThemeContext } from '../MainApp'; // Assuming you have a ThemeContext for dark mode

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext); // Get current theme mode

  const onhandleSubmit = (e) => {
    e.preventDefault();

    if (searchTerm) {
      navigate(`/search/${searchTerm}`);
      setSearchTerm('');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center', // Centers the search bar horizontally
        mt: 2, // Adds margin to the top
        width: '100%', // Takes full width of the page
      }}
    >
      <Paper
        component='form'
        onSubmit={onhandleSubmit}
        sx={{
          borderRadius: 20,
          border: '1px solid #e3e3e3',
          pl: 2,
          boxShadow: 'none',
          display: 'flex',
          alignItems: 'center',
          maxWidth: '600px', // Sets a max width for the search bar
          width: '100%', // Ensures the search bar takes full width within the max-width constraint
          backgroundColor: darkMode ? '#333' : '#fff', // Black background for dark mode
          color: darkMode ? '#fff' : '#000', // White text in dark mode
        }}
      >
        <input
          className='search-bar'
          placeholder='Search...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            border: 'none',
            outline: 'none',
            padding: '10px',
            flex: 1, // Allows input to grow and fill available space
            backgroundColor: 'inherit', // Inherits background color from the Paper component
            color: darkMode ? '#fff' : '#000', // White text in dark mode
          }}
        />
        <IconButton type='submit' sx={{ p: '10px', color: darkMode ? '#fff' : 'red' }} aria-label='search'>
          <SearchIcon />
        </IconButton>
      </Paper>
    </Box>
  );
};

export default SearchBar;
