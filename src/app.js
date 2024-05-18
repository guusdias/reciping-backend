import connectDatabase from "./config/dbConnect.js";
import express from "express";
import routes from "./routes/index.js";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "../swagger-output.json" assert { type: "json" };

const connection = await connectDatabase();

connection.on("error", (error) => {
  console.error("erro na conexão", error);
});

connection.once("open", () => {
  console.log("conexão com DB feita com sucesso");
});

const app = express();
app.use(cors());
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));
routes(app);

export default app;
