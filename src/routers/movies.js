import express from "express";
import { create, get, remove, update } from "../controllers/movies";
import { getAll } from "../controllers/movies";

const router = express.Router(); 
router.post("/movies", create)
router.get('/movies',getAll)
router.patch("/movies/:id", update);
router.delete("/movies/:id", remove);
router.get("/movies/:id", get);
export default router
