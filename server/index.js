import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors());

import { gamesGetter } from "./libs/chess.js";
import { gameAnalyser } from "./libs/llm.js";

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/games", async (req, res) => {
  const cplayer = process.env.PLAYER_ID;
  const games = await gamesGetter(cplayer);

  const gamesRemapped = games.map((game) => {
    return {
      pgn: game.pgn,
      fen: game.fen,
      id: game.url.split("/").pop(),
    };
  });

  res.json({
    games: gamesRemapped,
  });
});

app.get("/api/gamesanalysis", async (req, res) => {
  const cplayer = process.env.PLAYER_ID;
  const games = await gamesGetter(cplayer);

  const gamesRemapped = games.map((game) => {
    return {
      pgn: game.pgn,
      fen: game.fen,
      id: game.url.split("/").pop(),
    };
  });

  const gameAnalysis = await gameAnalyser(
    gamesRemapped.map((game) => game.fen),
  );

  res.json({
    analysis: gameAnalysis,
  });
});

app.listen(3000, () => {
  console.log("Listening to 3000 port");
});
