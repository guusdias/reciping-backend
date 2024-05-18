import "dotenv/config";
import app from "./src/app.js";

const PORT = 4000;

app.listen(3000, () => {
  console.log(
    "Server is running!\nAPI documentation: http://localhost:3000/doc"
  );
});

app.listen(PORT, () => {
  console.log("servidor escutando!");
});
