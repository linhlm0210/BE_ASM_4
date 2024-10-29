import express from "express";
import { authenticateJWT } from "../middleware/authMiddleware.js"; 
import {
  create,
  fetch,
  update,
  deleteStudent,
  getByID
} from "../controller/studentController.js";

const route = express.Router();

route.use(authenticateJWT); 

route.get("/", fetch);
route.get("/:id", getByID);
route.post("/create", create);
route.post("/:id/update", update);
route.delete("/:id/delete", deleteStudent);

export default route;
