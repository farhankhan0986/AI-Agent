# 👉 My First AI Agent

## 🧠 Gemini ReAct AI Agent

A simple ReAct-style AI Agent built using Google Gemini API and Node.js.

This project demonstrates how to:

- Implement a ReAct (Reason + Act) loop  
- Connect Gemini to real backend tools  
- Build a structured JSON state machine agent  
- Execute tool calls dynamically  
- Handle observations and multi-step reasoning  

---

## 🚀 Features
- 🔁 ReAct Architecture (PLAN → ACTION → OBSERVATION → OUTPUT)
- 🛠 Tool calling (Weather lookup example)
- 🧠 Structured JSON responses
- 🔐 Environment-based API key handling
- 📊 Rate-limit friendly design
- 💻 CLI-based interaction

---

## 🏗 Architecture Overview

User Input  
↓  
Gemini (Planner)  
↓  
Action?  
↓ yes  
Execute JS Tool  
↓  
Observation  
↓  
Gemini (Next Step)  
↓  
Final Output  

---

## 📦 Components

| Component | Role |
| --- | --- |
| Gemini | Decision maker (brain) |
| Tools (JS functions) | Execute real logic |
| Orchestrator Loop | Controls flow |
| Observation Feedback | Sends tool result back to model |

---

## 📂 Project Structure

```
.
├── index.js
├── .env
├── package.json
└── README.md
```

---

## ⚙ Installation

### 1️⃣ Clone the repo
```bash
git clone <your-repo-url>
cd <project-folder>
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Add environment variable

Create a `.env` file:

```
GEMINI_API_KEY=your_api_key_here
```

---

## ▶️ Run the Agent
```bash
node index.js
```

---

## 🧪 Example

```
>> What is the sum of temperature of patiala and lucknow
Observation: 20
Observation: 13
🤖 Final Answer: The sum of the temperature of Patiala and Lucknow is 33.
```

---

## 🧠 How It Works

### 1. User Query
User enters a question.

### 2. Gemini Plans
Gemini responds in structured JSON:

```json
{
  "type": "action",
  "function": "getWeatherDetails",
  "input": "patiala"
}
```

### 3. Tool Execution
Backend executes:

```
getWeatherDetails("patiala")
```

### 4. Observation Sent Back
```json
{
  "type": "observation",
  "observation": "20"
}
```

### 5. Loop Continues Until Output

Final response:

```json
{
  "type": "output",
  "output": "The sum is 33"
}
```

---

## 🛠 Available Tool

`getWeatherDetails(city)`

Returns mock temperature for:

- Indore
- Lucknow
- Patiala
- Noida
- Delhi

---

## 📊 Rate Limits (Free Tier)

If using Gemini Free Tier:

| Limit Type | Value |
| --- | --- |
| RPM | 10 |
| TPM | 250K |
| RPD | 20 |

⚠ RPD (Requests Per Day) resets at midnight Pacific Time.

---

## 🎯 Learning Objectives

This project teaches:

- AI Agent design patterns
- State machine modeling
- Tool execution separation
- LLM orchestration
- Rate limit awareness
- Prompt engineering fundamentals

---

## 🔥 Future Improvements

- Add multiple tools (flight search, booking)
- Add conversation memory
- Add max-step safety guard
- Add retry logic for rate limits
- Convert to structured message array instead of string
- Build multi-agent supervisor system

---

## 🧑‍💻 Tech Stack

- Node.js
- Google Gemini API (@google/genai)
- dotenv
- readline-sync

---

## 📌 Key Concept
LLM decides.  
Backend executes.  
Agent orchestrates.

---

## 🧠 Author
- Name: Farhan Abid
- Email: farhankhan080304@gmail.com
- Portfolio: https://dev-vault-alpha.vercel.app/

Built as part of AI Agent development learning.
