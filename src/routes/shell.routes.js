import { Router } from "express";
import shellController from "../controller/shell.controller.js";

const router = Router();
const myRoute = "/shells";

router
  .route(`${myRoute}`)
  .get(shellController.getAll)
  .post(shellController.create);

router
  .route(`${myRoute}/:id/`)
  .get(shellController.getById)
  .put(shellController.updateById)
  .delete(shellController.deleteById);

export default router;
