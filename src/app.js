import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import routerAuth from "./routers/auth";
const app = express();

app.use(express.json());
app.use(cors());
app.use('/api',routerAuth)
mongoose.connect(`mongodb://localhost:27017/duan-movies`);

export const viteNodeApp = app;
