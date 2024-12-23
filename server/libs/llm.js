import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

const gamesAnalysisSchema= z.object({
  weaknessesAndImprovements: z.array(
    z.object({
      weakness: z.string(),
      improvement: z.string(),
      gamesInWhichTheWeaknessAppeared: z.array(z.number()),
    }),
  ),
});

const SysPrompt = `
You are a helpful chess assistant. I will give you some fen strings from some of my past games.
Your task is to analyze the weaknesses and suggest improvements. Also for each weakness, you should mention the games in which the weakness appeared.
The games array should be one-based indexed.
`;

export const gameAnalyser = async (fenStrings) => {
  const openai = new OpenAI();
  const completion = await openai.beta.chat.completions.parse({
    model: "gpt-4o",
    messages: [
      { role: "system", content: SysPrompt },
      {
        role: "user",
        content: fenStrings.join("\n"),
      },
    ],
    response_format: zodResponseFormat(gamesAnalysisSchema, "game_analysis"),
  });

  const response = completion.choices[0].message;

  if (response.refusal) {
    throw new Error(`Refusal: ${response.refusal}`);
  } else if (!response.parsed) {
    throw new Error("Failed to run model GPT-4o");
  }

  return response.parsed;
};
