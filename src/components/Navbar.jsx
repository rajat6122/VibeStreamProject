import React, { useState, useContext, useEffect } from 'react';
import { Box, Stack, IconButton, Drawer, Typography, Divider } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { logo } from '../utils/constants';
import SearchBar from './SearchBar';
import UserMenu from './UserMenu';
import { ThemeContext } from '../MainApp';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import InfoIcon from '@mui/icons-material/Info';
import Modal from './Modal';
import About from './About';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { auth, db } from '../firebase'; // Adjust import based on your file structure
import { collection, query, where, getDocs } from 'firebase/firestore';

import ContactMailIcon from '@mui/icons-material/ContactMail';



const Navbar = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [userDetails, setUserDetails] = useState({ firstName: 'User' });
  const navigate = useNavigate();

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleAboutClick = () => {
    setModalOpen(true);
  };

  const handleKidsContentClick = () => {
    window.open('https://www.youtubekids.com/', '_blank');
  };

  const handleVideoDownloaderClick = () => {
    window.open('https://shortsnoob.com/en', '_blank');
  };

  const handleLogoutClick = async () => {
    try {
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Effect to fetch user details from Firestore
  useEffect(() => {
    const fetchUserDetails = async () => {
      const user = auth.currentUser; // Get the current user
      if (!user?.uid) return; // If user not found, exit

      const q = query(collection(db, 'users'), where('uid', '==', user.uid));
      const doc = await getDocs(q); // Fetch user details
      if (!doc.empty) {
        const data = doc.docs[0].data(); // Get the user data
        console.log(data); // Debug: Log fetched data
        setUserDetails(data); // Set the user details state
      }
    };

    fetchUserDetails(); // Call the function to fetch user details
  }, []);

  return (
    <>
      <Stack 
        direction="row" 
        alignItems="center" 
        p={1} 
        sx={{ 
          position: 'sticky', 
          top: 1, 
          justifyContent: 'space-between', 
          backgroundColor: darkMode ? '#000' : '#f4f4f4',
          zIndex: 10,
        }}
      >
        <IconButton onClick={toggleDrawer(true)} sx={{ marginRight: 2 }}>
          <MenuIcon sx={{ color: darkMode ? '#fff' : '#000' }} />
        </IconButton>

        <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={logo}
            alt="Logo"
            style={{
              width: '47px',
              height: 'auto',
              display: 'block',
              '@media (max-width: 768px)': {
                width: '40px',
              },
              '@media (max-width: 480px)': {
                width: '30px',
              },
              objectFit: 'contain',
            }}
          />
      <Typography 
  variant="h5" 
  sx={{ 
    fontFamily: 'Roboto, sans-serif', 
    fontWeight: 900, // YouTube uses a medium weight (500) for its branding
    fontSize: '24px', // YouTube uses a font size around 24px for branding text on desktop
    color: darkMode ? '#fff' : '#000', 
    marginLeft: '8px' 
  }}
>
  VibeStream
</Typography>

        </Link>

        <SearchBar />

        <IconButton onClick={() => console.log('Profile clicked')} sx={{ '&:hover': { backgroundColor: 'transparent' } }}>
          <UserMenu />
        </IconButton>
      </Stack>

      <Divider sx={{
        backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        height: '1px',
        borderBottom: 'none'
      }} />

      {/* Drawer for mobile */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        transitionDuration={0}
      >
 <Box sx={{ width: 250, p: 2 }}>
        {/* User profile area */}
        <Box 
          onClick={() => console.log('Profile clicked')} 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            cursor: 'pointer', 
            textAlign: 'top',
            flexDirection: 'column', // Stack elements vertically
            textAlign: 'center' // Center the text
          }}
        >


          {/* User icon on the left and larger name on the right */}
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'flex-start', // Align items to the start
              width: '100%', // Ensure it takes the full width
              padding: '8px 0',
            
            }}
          >


            <UserMenu sx={{ fontSize: '200px' }} /> {/* Increase profile icon size */}
            <Typography 
              variant="h6" // Use a larger variant for the user name
              sx={{ 
                fontWeight: 'bold', 
                color: 'purple', 
                marginLeft: '8px' // Space between icon and name
              }}
            >
              {userDetails.firstName}
            </Typography>
          </Box>
        </Box>


          <Box onClick={handleAboutClick} sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              cursor: 'pointer', 
              padding: '8px', 
              '&:hover': { backgroundColor: darkMode ? '#333' : '#e0e0e0' } 
            }}
          >
            <InfoIcon sx={{ color: darkMode ? '#fff' : '#000' }} />
            <Typography variant="body1" sx={{ marginLeft: '8px' }}>About</Typography>
          </Box>

          <Box onClick={() => setDarkMode(!darkMode)} sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              cursor: 'pointer', 
              padding: '8px', 
              '&:hover': { backgroundColor: darkMode ? '#333' : '#e0e0e0' } 
            }}
          >
            {darkMode ? <LightModeIcon sx={{ color: '#fff' }} /> : <DarkModeIcon sx={{ color: '#000' }} />}
            <Typography variant="body1" sx={{ marginLeft: '8px' }}>Toggle Mode</Typography>
          </Box>

          <Box onClick={handleKidsContentClick} sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              cursor: 'pointer', 
              padding: '8px', 
              '&:hover': { backgroundColor: darkMode ? '#333' : '#e0e0e0' } 
            }}
          >
            <ChildCareIcon sx={{ color: darkMode ? '#fff' : '#000' }} titleAccess="Kids Content" />
            <Typography variant="body1" sx={{ marginLeft: '8px' }}>Kids Content</Typography>
          </Box>

          <Box onClick={handleVideoDownloaderClick} sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              cursor: 'pointer', 
              padding: '8px', 
              '&:hover': { backgroundColor: darkMode ? '#333' : '#e0e0e0' } 
            }}
          >
            <FileDownloadIcon sx={{ color: darkMode ? '#fff' : '#000' }} titleAccess="Video Downloader" />
            <Typography variant="body1" sx={{ marginLeft: '8px' }}>Video Downloader</Typography>
          </Box>

          <Box onClick={() => navigate('/ContactForm')} sx={{ 
  display: 'flex', 
  alignItems: 'center', 
  cursor: 'pointer', 
  padding: '8px', 
  '&:hover': { backgroundColor: darkMode ? '#333' : '#e0e0e0' } 
}}>
  <ContactMailIcon sx={{ color: darkMode ? '#fff' : '#000' }} />
  <Typography variant="body1" sx={{ marginLeft: '8px' }}>Contact Us</Typography>
</Box>


          <Box sx={{ position: 'absolute', bottom: 0, left: 0, width: '100%', p: 2 }}>
            <Box onClick={handleLogoutClick} sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                cursor: 'pointer', 
                padding: '8px', 
                '&:hover': { backgroundColor: darkMode ? '#333' : '#e0e0e0' } 
              }}
            >


              
              <LogoutIcon sx={{ color: darkMode ? '#fff' : '#000' }} />
              <Typography variant="body1" sx={{ marginLeft: '8px' }}>Logout</Typography>
            </Box>
          </Box>
        </Box>
      </Drawer>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} content={<About onClose={() => setModalOpen(false)} />} />
    </>
  );
};

export default Navbar;