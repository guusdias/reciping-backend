import { Debt } from "../models/Recipe.js";

class DebtController {
  static async getAllDebts(req, res) {
    try {
      const debts = await Debt.find();
      res.status(200).json(debts);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar dívidas", error });
    }
  }

  static async addDebt(req, res) {
    const { person, value } = req.body;

    try {
      const newDebt = new Debt({
        person,
        value,
      });

      await newDebt.save();
      res.status(201).json(newDebt);
    } catch (error) {
      res.status(500).json({ message: "Erro ao criar nova dívida", error });
    }
  }

  static async updateDebt(req, res) {
    const { id } = req.params;
    const { value } = req.body;

    try {
      const updatedDebt = await Debt.findByIdAndUpdate(
        id,
        { value },
        { new: true }
      );

      if (!updatedDebt) {
        return res.status(404).json({ message: "Dívida não encontrada" });
      }

      res.status(200).json(updatedDebt);
    } catch (error) {
      res.status(500).json({ message: "Erro ao atualizar dívida", error });
    }
  }

  static async deleteDebt(req, res) {
    const { id } = req.params;

    try {
      const deletedDebt = await Debt.findByIdAndDelete(id);

      if (!deletedDebt) {
        return res.status(404).json({ message: "Dívida não encontrada" });
      }

      res.status(200).json({ message: "Dívida deletada com sucesso" });
    } catch (error) {
      res.status(500).json({ message: "Erro ao deletar dívida", error });
    }
  }
}

export default DebtController;
