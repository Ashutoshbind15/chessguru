import { useContext, useEffect, useState, type ReactElement } from "react";
import axios from "axios";
import { createContext } from "react";

export const GamesInfoContext = createContext({
  games: [],
  setGames: () => { },
  activeGame: null,
  setActiveGame: () => { },
});

export default function GamesProvider({
  children,
}: {
  children: React.ReactNode;
}): ReactElement {
  const [games, setGames] = useState([]);
  const [activeGame, setActiveGame] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      const { data } = await axios.get("http://localhost:3000/api/games");
      setGames(data.games);
    };

    fetchGames();
  }, []);

  return (
    <GamesInfoContext.Provider
      value={{ games, setGames, activeGame, setActiveGame }}
    >
      {children}
    </GamesInfoContext.Provider>
  );
}
