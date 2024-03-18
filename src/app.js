import connectDatabase from "./config/dbConnect.js";
import express from "express";
import routes from "./routes/index.js";

const connection = await connectDatabase();

connection.on("error", (error) => {
  console.error("erro na conexão", error);
});

connection.once("open", ()=>{
  console.log("conexão com DB feita com sucesso")
})

const app = express();
routes(app)


export default app