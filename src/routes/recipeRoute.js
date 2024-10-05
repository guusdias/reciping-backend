import express from "express";
import DebtController from "../controllers/recipeController.js";

const routes = express.Router();

routes.get("/debts", DebtController.getAllDebts);
routes.get("/filter/debts", DebtController.getDebtsByMonthAndYear);
routes.post("/debts", DebtController.addDebt);
routes.put("/debts/:id", DebtController.updateDebt);
routes.delete("/debts/:id", DebtController.deleteDebt);

export default routes;
