import React, { useState, useEffect, useContext } from 'react';
import { Menu, MenuItem, IconButton, Avatar } from '@mui/material';
import { ThemeContext } from '../MainApp';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'; // Import useNavigate


const UserMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { darkMode } = useContext(ThemeContext);
  const [user, loading] = useAuthState(auth);
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate(); // Use useNavigate directly here

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    handleClose();
    navigate('/profile'); // Navigate to profile page
  };

  const handleLogoutClick = async () => {
    handleClose();
    await auth.signOut(); // Sign out user
    navigate('/login'); // Navigate to login page
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!user?.uid) return; // If user not found, exit
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q); // Fetch user details
      if (!doc.empty) {
        const data = doc.docs[0].data(); // Get the user data
        setUserDetails(data); // Set the user details state
      }
    };

    if (!loading && user) {
      fetchUserDetails(); // Fetch user details if user is loaded
    }
  }, [loading, user]);

  return (
    <div>
      <IconButton onClick={handleClick}>



{userDetails?.img ? (
  <Avatar
    src={userDetails.img}
    sx={{ bgcolor: darkMode ? '#fff' : '#000', color: darkMode ? '#000' : '#fff' }}
  />
) : (
  <Avatar sx={{ bgcolor: darkMode ? '#fff' : '#000', color: darkMode ? '#000' : '#fff' }} />
)}
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
        <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default UserMenu;
