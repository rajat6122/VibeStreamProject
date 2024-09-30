// src/components/VideoDisplay.js

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import VideoCard from './VideoCard'; // Import your VideoCard component
import { Box, Typography, Grid } from '@mui/material';
import './styles.css'; // Import your styles

const VideoDisplay = () => {
  const location = useLocation();
  const { filter } = location.state || { filter: 'kids' }; // Default to 'kids' if no state is passed
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      const searchQuery = 'cartoons OR children videos'; // Only search for kids content
      try {
        const videoData = await fetchFromAPI(`search?q=${searchQuery}&part=snippet&type=video`);
        setVideos(videoData.items || []);
      } catch (error) {
        console.error('Error fetching videos:', error);
        setError('Failed to fetch videos.');
      }
    };

    fetchVideos();
  }, []); // No dependency needed since we're hardcoding the search query

  return (
    <Box className="video-display-container">
      <Typography className="video-display-title" variant="h4" gutterBottom>
        Kids Shows
      </Typography>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Grid container spacing={3}>
        {videos.length > 0 ? (
          videos.map((video) => (
            <Grid item xs={12} sm={6} md={4} key={video.id.videoId}>
              <VideoCard video={video} />
            </Grid>
          ))
        ) : (
          <Typography>No videos found for this category.</Typography>
        )}
      </Grid>
    </Box>
  );
};

export default VideoDisplay;
