import express from "express";
import { create } from "../controllers/movies";

const router = express.Router(); 
router.post("/moviesAdd", create)

export default router;