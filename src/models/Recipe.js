import mongoose from "mongoose";

const debtSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    person: { type: String, required: true },
    value: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

const Debt = mongoose.model("Debts", debtSchema);

export { Debt, debtSchema };
