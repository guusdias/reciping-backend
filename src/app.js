import connectDatabase from "./config/dbConnect.js";
import express from "express";
import routes from "./routes/index.js";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import logger from './config/logger.js';
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const swaggerFilePath = join(__dirname, "../swagger-output.json");
const swaggerFile = JSON.parse(readFileSync(swaggerFilePath, "utf8"));

const connection = await connectDatabase();

connection.on("error", (error) => {
  console.error("erro na conexão", error);
});

connection.once("open", () => {
  console.log("conexão com DB feita com sucesso");
});


logger.trace('Esta é uma mensagem de rastreamento');
logger.debug('Este é um log de depuração');
logger.info('Aplicação iniciada com sucesso');
logger.notice('Isto é uma notificação');
logger.warn('Esta é uma mensagem de aviso');
logger.error('Este é um log de erro');
logger.fatal('Este é um log fatal');


const app = express();
app.use(cors());
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));
routes(app);

export default app;
