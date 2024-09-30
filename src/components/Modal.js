import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Modal = ({ open, onClose, content }) => {
  if (!open) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        bgcolor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
      }}
    >
      <Box
        sx={{
          bgcolor: (theme) => theme.palette.background.paper,
          color: (theme) => theme.palette.text.primary,
          padding: 2,
          borderRadius: 1,
          position: 'relative',
          maxWidth: 600,
          width: '100%',
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', top: 8, right: 8, color: 'inherit' }} // Match the color to the theme
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h6">{content}</Typography>
      </Box>
    </Box>
  );
};

export default Modal;
