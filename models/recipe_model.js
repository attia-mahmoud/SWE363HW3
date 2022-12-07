const db = require("../db");

// Get all recipes from the database
function getAllRecipes(callback) {
  db.all("SELECT * FROM recipes", (err, rows) => {
    if (err) {
      callback(err);
    } else {
      callback(null, rows);
    }
  });
}

// Get details for a specific recipe from the database
function getRecipeDetail(recipe_id, callback) {
  db.get("SELECT * FROM recipes WHERE id = ?", [recipe_id], (err, recipe) => {
    if (err) {
      callback(err);
    } else if (!recipe) {
      callback(null, null);
    } else {
      // Get ingredients for the recipe
      db.all(
        "SELECT item FROM ingredients WHERE recipe_id = ?",
        [recipe_id],
        (err, ingredients) => {
          if (err) {
            callback(err);
          } else {
            recipe.ingredients = ingredients;

            // Get method steps for the recipe
            db.all(
              "SELECT step FROM method WHERE recipe_id = ?",
              [recipe_id],
              (err, method) => {
                if (err) {
                  callback(err);
                } else {
                  recipe.method = method;
                  callback(null, recipe);
                }
              }
            );
          }
        }
      );
    }
  });
}

// Get comments for a specific recipe from the database
function getComments(recipe_id, callback) {
  console.log("GETTING COMMENTS");
  db.all(
    "SELECT * FROM comments WHERE recipe_id = ?",
    [recipe_id],
    (err, comments) => {
      if (err) {
        callback(err);
      } else {
        callback(null, comments);
      }
    }
  );
}

// Add a comment for a specific recipe to the database
function addComment(recipe_id, comment, callback) {
  db.run(
    "INSERT INTO comments (recipe_id, author, comment) VALUES (?, ?, ?)",
    [recipe_id, comment.author, comment.text],
    (err, metadata) => {
      if (err) {
        callback(err);
      } else {
        callback(null, metadata);
      }
    }
  );
}

module.exports = {
  getAllRecipes,
  getRecipeDetail,
  getComments,
  addComment,
};
