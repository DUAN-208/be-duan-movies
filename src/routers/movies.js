import express from "express";
import { create, get, remove, update } from "../controllers/movies";
import { getAll } from "../controllers/movies";
import { checkPermission } from "../middlewares/checkPermission";

const router = express.Router(); 
router.post("/movies",checkPermission ,create)
router.get('/movies',getAll)
router.patch("/movies/:id",checkPermission, update);
router.delete("/movies/:id",checkPermission, remove);
router.get("/movies/:id", get);


export default router

