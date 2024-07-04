
import { config } from 'dotenv';
config();

import mongoose from 'mongoose';

const uri = process.env.MONGO_URI;

if (!uri) {
  throw new Error("MONGO_URI is not defined in the environment variables.");
}

mongoose.connect(uri)
  .then(() => {
    console.log("Successfully connected to MongoDB!");
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });