const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_PATH = "https://api.themoviedb.org/3"; 

export const getPopularTVShows = async () => {
  try {
    const response = await fetch(
      `${BASE_PATH}/trending/tv/day?language=ko-KR&api_key=${API_KEY}`
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
        `${BASE_PATH}/trending/tv/day?language=ko-KR&api_key=${API_KEY}`
      );
      const data = await response.json();
      return data.results; 
    } catch (err) {
      console.error("Error fetching popular TV shows:", err);
      throw err; 
    }
  };