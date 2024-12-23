import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const Analysis = ({ setHighLightedGames }: any) => {
  const [analysing, setAnalysing] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const [currentWeakness, setCurrentWeakness] = useState(-1);
  const dataFetcher = async () => {
    setAnalysing(true);
    const { data } = await axios.get("http://localhost:3000/api/gamesanalysis");
    console.log(data);
    setAnalysing(false);
    setAnalysis(data.analysis.weaknessesAndImprovements);
  };

  return (
    <div>
      {analysis && (
        <Dialog>
          <DialogTrigger asChild>
            <Button> Analysis</Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Analysis</DialogTitle>
              <DialogDescription>
                Here are the weaknesses and improvements in your games
              </DialogDescription>
            </DialogHeader>
            <div>
              <div>
                {analysis.map((analysisObj: any, idx: number) => {
                  return (
                    <div
                      className={`border border-gray-300 p-2 m-2 cursor-pointer hover:border-gray-500 ${currentWeakness === idx ? "border-red-500" : ""}`}
                      key={idx}
                      onClick={() => {
                        if (currentWeakness === idx) {
                          setCurrentWeakness(-1);
                          setHighLightedGames([]);
                        } else {
                          toast(
                            "Marked the games in which you made this misktake",
                          );
                          setCurrentWeakness(idx);
                          setHighLightedGames(
                            analysisObj.gamesInWhichTheWeaknessAppeared,
                          );
                        }
                      }}
                    >
                      <p>Improvement: {analysisObj.improvement}</p>
                      <p>
                        Games in which you made this move:
                        {analysisObj.gamesInWhichTheWeaknessAppeared.join(",")}
                      </p>
                      <p> Weakness: {analysisObj.weakness}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
      {!analysis ? (
        !analysing ? (
          <Button onClick={() => dataFetcher()}>Analyze</Button>
        ) : (
          <Button disabled>Analyzing...</Button>
        )
      ) : null}
    </div>
  );
};

export default Analysis;
