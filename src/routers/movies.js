import express from "express";
import { getAll } from "../controllers/movies";

const router = express.Router()
router.get('/movies',getAll)
export default router