const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./recipes_store.db3');

const getAllRecipes = function () {
    let sql = `SELECT * FROM recipes`;

    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        rows.forEach((row) => {
            console.log(row);
        });
    });
        
    db.close();
}

const getRecipeDetail = function (recipe_id) {
    let result = {}
    let sql = `SELECT * FROM recipes WHERE id = ${recipe_id}`;
    let sql1 = `SELECT * FROM ingredients WHERE id = ${recipe_id}`;
    let sql2 = `SELECT * FROM method WHERE id = ${recipe_id}`;

    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        rows.forEach((row) => {
            result = {...result, ...row}
        });
    });

    db.all(sql1, [], (err, rows) => {
        if (err) {
            throw err;
        }
        rows.forEach((row) => {
            result = {...result, ...row}
        });
    });

    db.all(sql2, [], (err, rows) => {
        if (err) {
            throw err;
        }
        rows.forEach((row) => {
            result = {...result, ...row}
        });
        console.log(result);
    });
    

    db.close();
}

const getComments = function(recipe_id) {
    let sql = `SELECT * FROM comments WHERE id = ${recipe_id}`;

    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        rows.forEach((row) => {
            console.log(row);
        });
    });
        
    db.close();
}

const addComment = function(recipe_id, comment) {
    let sql = `INSERT INTO comments (author, comment, recipe_id) VALUES ('${comment.author}', '${comment.text}', '${recipe_id}')`;
    console.log(comment.author)
    db.run(sql, [], function(err) {
        if (err) {
          return console.log(err.message);
        }
        // get the last insert id
        console.log(`A row has been inserted with rowid ${this.lastID}`);
      });
}

addComment(1, {author: 'Someone', text: 'Crazy'})

exports.getAllRecipes = getAllRecipes
exports.getRecipeDetail = getRecipeDetail
exports.getComments = getComments
exports.addComment = addComment