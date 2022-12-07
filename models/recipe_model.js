const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");

const getDbConnection = async () => {
  return await sqlite.open({
    filename: "./recipes_store.db3",
    driver: sqlite3.Database,
  });
};

async function getAllRecipes() {
  const db = await getDbConnection();
  const rows = await db.all("SELECT * FROM recipes");
  await db.close();
  console.log(rows);
  return rows;
}

async function getRecipeDetail(recipe_id) {
  const db = await getDbConnection();

  let details = {};

  const rows1 = await db.all(`SELECT * FROM recipes WHERE id = ${recipe_id}`);
  rows1.forEach((row) => {
    details = { ...details, ...row };
  });

  const rows2 = await db.all(
    `SELECT * FROM ingredients WHERE id = ${recipe_id}`
  );
  rows2.forEach((row) => {
    details = { ...details, ...row };
  });
  const rows3 = await db.all(`SELECT * FROM method WHERE id = ${recipe_id}`);
  rows3.forEach((row) => {
    details = { ...details, ...row };
  });
  await db.close();
  console.log(details);
  return details;
}

async function getComments(recipe_id) {
  const db = await getDbConnection();
  const rows = await db.all(`SELECT * FROM comments WHERE id = ${recipe_id}`);
  await db.close();
  console.log(rows);
  return rows;
}

const addComment = async (recipe_id, comment) => {
  const db = await getDbConnection();
  const meta = await db.run(
    `INSERT INTO comments (author, comment, recipe_id) VALUES ('${comment.author}', '${comment.text}', '${recipe_id}')`
  );
  await db.close();
  return meta;
};

module.exports = {
  getAllRecipes,
  getRecipeDetail,
  getComments,
  addComment,
};
