const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_PATH = "https://api.themoviedb.org/3"; 

export const getPopularTVShows = async () => {
  try {
    const response = await fetch(
      `${BASE_PATH}/trending/tv/day?language=en-EN&api_key=${API_KEY}`
    );
    const data = await response.json();
    return data.results; 
  } catch (err) {
    console.error("Error fetching popular TV shows:", err);
    throw err; 
  }
};


export const getNowPlaying = async () => {
    try {
      const response = await fetch(
        `${BASE_PATH}/tv/on_the_air?language=en-EN&api_key=${API_KEY}`
      );
      const data = await response.json();
      return data.results; 
    } catch (err) {
      console.error("Error fetching airing shows:", err);
      throw err; 
    }
  };


  export const getTopRatedTVShows = async () => {
    try {
      const response = await fetch(
        `${BASE_PATH}/tv/top_rated?language=en-EN&api_key=${API_KEY}`
      );
      const data = await response.json();
      return data.results; 
    } catch (err) {
      console.error("Error fetching top-rated TV shows:", err);
      throw err;
    }
  };