import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import routerMovies from "./routers/movies";
import routerAuth from "./routers/auth";
import routerMovies from "./routers/movies";
const app = express();

app.use(express.json());
app.use(cors());
app.use('/api',routerAuth)
app.use('/api',routerMovies)

mongoose.connect(`mongodb://127.0.0.1:27017/duan-movies`);

export const viteNodeApp = app;
