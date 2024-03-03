const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json())
const port = 3000;
mongoose.connect(
  "mongodb+srv://gustavohd34:gaBsbLsR55Z1qkoP@reciping.ismlfrx.mongodb.net/?retryWrites=true&w=majority&appName=reciping"
);

const Recipe = mongoose.model("Recipe", {
  title: String,
  description: String,
  ingredients: String,
  instructions: String,
  img_url : String,
  use_id : String
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/", async (res,req)=>{
  const recipe = new Recipe({
    title: req.body.title,
    description: req.body.description,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    img_url:req.body.img_url,
    use_id: req.body.user_id,
  });

  await recipe.save()
  res.send(recipe)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
