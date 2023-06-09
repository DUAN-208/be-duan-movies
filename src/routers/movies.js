import express from "express";
import { create, get, getAll } from "../controllers/movies";

const router = express.Router();
router.get("/movies", getAll);
router.post("/moviesAdd", create);
router.get("/movies/:id", get); 

export default router;
