import axios from 'axios';

export const BASE_URL = 'https://youtube-v31.p.rapidapi.com';

const options = {
  params: {
    maxResults: 50,
  },
  headers: {
  //  'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY, // This line is commented out
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
  },
};

// Mocked fetchFromAPI function for testing
export const fetchFromAPI = async (url) => {
 // You can also comment out the API call
 //const { data } = await axios.get(`${BASE_URL}/${url}`, options);
  // return data;

  // Return mock data for testing
  return {
    items: [
      { id: '1', title: 'Mock Video 1' },
      { id: '2', title: 'Mock Video 2' },
      { id: '3', title: 'Mock Video 3' },
    ],
  };
};
