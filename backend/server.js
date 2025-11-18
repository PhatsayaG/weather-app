import express from 'express'; // 或用 require('express')，看是否設置type:"module"
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// 允許前端跨域呼叫
app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use(express.json());

app.get('/api/weather', (req, res) => {
  res.json({ temp: 25, condition: "Sunny" }); // 範例回應
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend is running on http://localhost:${PORT}`);
});
