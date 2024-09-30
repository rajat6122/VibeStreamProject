import React from 'react';
import { Box, Typography } from '@mui/material';
import { red } from '@mui/material/colors';

const About = () => (
  <Box sx={{ padding: '20px', backgroundColor: 'inherit', color: 'inherit' }}>
    <Typography variant="h4" gutterBottom>
      About VibeStream
    </Typography>
    <Typography variant="body1">

    <Typography  sx={{color:"e6e6e6",
    fontStyle:"italic",
    marginBottom: 2
    }}>
    VibeStream – Stream Your Vibe!
    </Typography>

Welcome to VibeStream, your go-to platform for discovering, sharing, and streaming content that matches your vibe. From trending videos to personalized playlists, VibeStream offers a seamless and immersive experience. Whether you're a creator or a viewer, there's something here for everyone.
    
     </Typography>
  </Box>
);

export default About;
