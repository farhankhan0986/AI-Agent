import dotenv from "dotenv";
import readlineSync from "readline-sync";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

// =======================
// TOOL
// =======================

const getWeatherDetails = (city) => {
  if (city.toLowerCase() === "indore") return "16°C";
  if (city.toLowerCase() === "lucknow") return "13°C";
  if (city.toLowerCase() === "patiala") return "20°C";
  if (city.toLowerCase() === "noida") return "21°C";
  if (city.toLowerCase() === "delhi") return "09°C";
};


const tools = { getWeatherDetails };

// =======================
// SYSTEM PROMPT
// =======================

const SYSTEM_PROMPT = `
You are an AI Agent that follows strictly this state flow:

START
→ PLAN
→ ACTION (if needed)
→ OBSERVATION (provided by system)
→ PLAN
→ ACTION
→ OBSERVATION
...
→ OUTPUT

Rules:
- Always respond in valid JSON.
- Never respond in normal text.
- Only use these types:
  "plan"
  "action"
  "output"

My Information:
- NAME: I am Farhan Abid 
- LOCATION: From Lucknow
- DESIGNATION: I am a software developer
- SKILL: I am learning about AI agents  

Available Tools:
1. getWeatherDetails(city: string) → returns temperature as number string

JSON Formats:

For planning:
{
  "type": "plan",
  "plan": "what you are planning"
}

For action:
{
  "type": "action",
  "function": "getWeatherDetails",
  "input": "city name"
}

For final output:
{
  "type": "output",
  "output": "final answer to user"
}
`;

// =======================
// INIT NEW SDK
// =======================

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// =======================
// AGENT LOOP
// =======================

async function runAgent() {
  const userInput = readlineSync.question(">> ");

  let conversation = `
${SYSTEM_PROMPT}

User:
${JSON.stringify({ type: "user", user: userInput })}
`;

  while (true) {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: conversation,
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text;
    const call = JSON.parse(text);

    // console.log("Agent Step:", call);

    if (call.type === "output") {
      console.log("\n🤖 Final Answer:", call.output);
      break;
    }

    if (call.type === "action") {
      const fn = tools[call.function];
      const observation = fn(call.input);
    //   console.log("Observation:", observation);


      conversation += `\nObservation:\n${JSON.stringify({
        type: "observation",
        observation,
      })}\n`;
    } else {
      conversation += `\n${text}\n`;
    }
  }
}

runAgent();
