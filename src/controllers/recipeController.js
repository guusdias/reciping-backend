import { Debt } from "../models/Recipe.js";

class DebtController {
  static async getAllDebts(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = 10;
      const skip = (page - 1) * limit;

      const debts = await Debt.find().skip(skip).limit(limit);

      const totalDebts = await Debt.countDocuments();

      res.status(200).json({
        debts,
        currentPage: page,
        totalPages: Math.ceil(totalDebts / limit),
        totalDebts,
      });
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

  static async getDebtsByMonthAndYear(req, res) {
    try {
      const { year, month, page = 1, limit = 10 } = req.query;
      const pageNumber = parseInt(page, 10);
      const pageSize = parseInt(limit, 10);

      const matchFilter = {
        $expr: {
          $and: [
            { $eq: [{ $month: "$createdAt" }, parseInt(month)] },
            { $eq: [{ $year: "$createdAt" }, parseInt(year)] },
          ],
        },
      };

      const totalDebts = await Debt.countDocuments(matchFilter);

      const debts = await Debt.find(matchFilter)
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize);

      res.status(200).json({
        debts,
        totalPages: Math.ceil(totalDebts / pageSize),
        currentPage: pageNumber,
        totalDebts,
      });
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar dívidas", error });
    }
  }
}

export default DebtController;
