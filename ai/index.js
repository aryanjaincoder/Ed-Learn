const express = require("express");
const app = express();
const axios = require("axios");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:5173',
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));


dotenv.config();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL , console.log("connected to mongo db"))

app.post("/api/ai", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",  // ✅ Using GPT-4o Mini
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer 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`, // Replace with your API key
        },
      }
    );

    res.json({ reply: response.data.choices[0].message.content });
  } catch (error) {
    console.error("AI API Error:", error);
    res.status(500).json({ error: "Error processing AI response" });
  }
});


  app.use("/api/auth", authRoute);
  // app.use("/api/users", userRoute);

  app.listen("5000", () => {
    console.log("Backend is running.");
  });
