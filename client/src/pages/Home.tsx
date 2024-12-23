import { useContext, useEffect } from "react";
import { MinChessboard } from "../components/Chessboard";
import axios from "axios";
import { useState } from "react";
import Analysis from "../components/GamesAnalysis";
import { GamesInfoContext } from "../context/GamesProvider";

function Home() {
  const gamesContext = useContext(GamesInfoContext);
  const [highLightedGames, setHighLightedGames] = useState([]);
  const {games: previousGames} = gamesContext;

  return (
    <div className="gap-y-4 flex flex-col items-center py-12">
      <h1 className="font-bold text-center text-3xl">
        Your Previous Games ({previousGames.length})
      </h1>
      <Analysis setHighLightedGames={setHighLightedGames} />
      <div className="flex flex-wrap justify-center align-center">
        {previousGames?.length
          ? previousGames?.map((game: any, idx: number) => {
              return (
                <div key={game.id}>
                  <MinChessboard
                    size={200}
                    fen={game.fen}
                    id={game.id}
                    isHighLighted={highLightedGames.some(
                      (game) => game === idx + 1,
                    )}
                  />
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}

export default Home;
