const express = require("express");
const nunjucks = require("nunjucks");
const db = require("./db");
const recipeModel = require("./models/recipe_model");

const app = express();
// Serve static files from the public folder
app.use("/", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

// Set up the server to parse JSON encoded forms
app.use(express.json());
// Set up nunjucks to use the views folder for templates
nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

// Handle GET request on the index page
app.get("/", (req, res) => {
  recipeModel.getAllRecipes((err, recipes) => {
    if (err) {
      console.log(err);
      res
        .status(500)
        .send("Error occurred while getting recipes from the database.");
    } else {
      res.render("index.njk", { recipes });
    }
  });
});

// Handle GET request for a specific recipe
app.get("/recipes/:recipe_id", (req, res) => {
  recipeModel.getRecipeDetail(req.params.recipe_id, (err, recipe) => {
    if (err) {
      res
        .status(500)
        .send("Error occurred while getting recipe details from the database.");
    } else if (!recipe) {
      res.status(404).send("Recipe not found.");
    } else {
      console.log("HOLAAA" + recipe.title);
      res.render("recipe.njk", { recipe });
    }
  });
});

// Handle GET request for comments on a specific recipe
app.get("/recipes/:recipe_id/comments", (req, res) => {
  recipeModel.getComments(req.params.recipe_id, (err, comments) => {
    if (err) {
      res
        .status(500)
        .send("Error occurred while getting comments from the database.");
    } else {
      console.log("COMMENTS HERE" + comments);
      res.json(comments);
    }
  });
});

// Handle POST request to add a comment to a specific recipe
app.post("/recipes/:recipe_id/comments", (req, res) => {
  recipeModel.addComment(req.params.recipe_id, req.body, (err, metadata) => {
    if (err) {
      res
        .status(500)
        .send("Error occurred while adding comment to the database.");
    } else {
      res.json(metadata);
    }
  });
});

// Start the server on port 3000
app.listen(5000, () => {
  console.log("Server started on port 5000.");
});
