
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; 
import authRoutes from './routes/auth.js';
import './db/config.js';

dotenv.config();

app.use(cors());  // Enable CORS
app.use(express.json());

const app = express();
const port = process.env.PORT || 5000;



app.use(express.json());


app.use('/api', authRoutes);

app.get('/', (req, res) => {
  res.send("We are hereeeee");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
