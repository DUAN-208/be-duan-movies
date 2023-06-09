import express from "express";
import { create } from "../controllers/movies";
import { getAll } from "../controllers/movies";

const router = express.Router(); 
router.post("/moviesAdd", create)
router.get('/movies',getAll)
export default router
