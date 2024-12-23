import { MinChessboard } from "@/components/Chessboard";
import { GamesInfoContext } from "@/context/GamesProvider";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Chess } from "chess.js";

export default function Game() {
  const [stockFish, setstockFish] = useState(null);
  const [bestMove, setbestMove] = useState("");
  const [evaluation, setevaluation] = useState("");
  const [currentfen, setcurrentfen] = useState(null);
  const [ctr, setctr] = useState(0);
  const [chessGame, setchessGame] = useState(new Chess());
  const { id } = useParams();
  const gamesContext = useContext(GamesInfoContext);
  const { games } = gamesContext;
  const game = games.find((game) => game.id === id);

  useEffect(() => {
    const stockfishWorker = new Worker("/stockfish-16.1-lite-single.js");
    setstockFish(stockfishWorker);

    stockfishWorker.onmessage = (event) => {
      const message = event.data;
      console.log(message);

      if (message.startsWith("bestmove")) {
        const move = message.split(" ")[1];
        setbestMove(move); // Save the best move to display on the screen
      }

      if (message.startsWith("info depth")) {
        const evalIndex = message.indexOf("score cp");
        if (evalIndex !== -1) {
          const evalStr = message.slice(evalIndex + 9, evalIndex + 13);
          setevaluation(evalStr);
        }
        console.log(evaluation);
      }
    };

    return () => {
      stockfishWorker.terminate();
      setstockFish(null);
    };
  }, []);

  useEffect(() => {
    console.log("Game", game);
    if (game?.fen) {
      setcurrentfen(game.fen);
      setchessGame(new Chess(game.fen));
    }
  }, [game]);

  useEffect(() => {
    if (stockFish && currentfen) {
      stockFish.postMessage(`position fen ${currentfen}`);
      stockFish.postMessage("go depth 10");
    }
  }, [stockFish, currentfen]);

  const handleMove = (from, to) => {
    const move = chessGame.move({ from, to });
    if (move) {
      setcurrentfen(chessGame.fen());
    }
  };

  return (
    <div>
      <h1>Game {id}</h1>
      {currentfen && (
        <MinChessboard
          fen={currentfen}
          setFen={(x) => setcurrentfen(x)}
          viewOnly={false}
          isFull={true}
          onDrop={(from, to) => handleMove(from, to)}
        />
      )}
      <Button onClick={() => setctr(ctr + 1)}>Click me</Button>
      <p>Counter: {ctr}</p>
    </div>
  );
}
