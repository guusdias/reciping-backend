import "dotenv/config";
import { app, setupPing } from "./src/app.js";

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor escutando na porta ${PORT}!`);
  console.log(`API documentation: http://localhost:${PORT}/doc`);

  const serverUrl = process.env.SERVER_URL || `http://localhost:${PORT}`;
  setupPing(serverUrl);
});