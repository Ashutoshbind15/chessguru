import axios from 'axios';

const API_URL = 'https://api.chess.com';

export const gamesGetter = async(playerId) => {
  
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  
  const gamesDataFromApi = await axios.get(`${API_URL}/pub/player/${playerId}/games/${currentYear}/${currentMonth}`);
  const games = gamesDataFromApi.data.games;

  return games;
}


