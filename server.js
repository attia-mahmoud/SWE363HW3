const express = require("express");
const nunjucks = require("nunjucks");
const session = require("express-session");
const app = express();
const port = 5000;

// Populates req.session
app.use(
  session({
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: "a very strong secret",
    cookie: { httpOnly: false },
  })
);
const recipeModel = require("./models/recipe_model.js"); //use relative path for local modules
app.use(express.static("public")); // prebuilt middleware
nunjucks.configure("views", { express: app }); //setup nunjucks template engine to find the templates in 'views' folder

app.get("/", async (req, res) =>
  res.render("index.njk", {
    recipes: await recipeModel.getAllRecipes(),
  })
); //pass the data to the template

app.get("/recipes/:recipe_id", async (req, res) => {
  res.render("recipe.njk", {
    recipe: await recipeModel.getRecipeDetail(req.params.recipe_id),
  });
});

//custom middleware
app.use(function (req, res, next) {
  res.status(404).send("We cant find your page");
});

app.listen(port, () =>
  console.log(`Example app listening on port http://127.0.0.1:${port}`)
);
