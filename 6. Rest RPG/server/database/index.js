const fse = require("fs-extra");

function readDatabase() {
  return fse.readJsonSync("./database/database.json");
}

function saveDatabase(data) {
  fse.writeJsonSync("./database/database.json", data);
}

function getMonster(id) {
  return readDatabase()[id]
}

function getAllMonsters() {
  return readDatabase()
}

function saveMonster(monster) {
  const data = readDatabase();
  data[monster.id] = monster;
  saveDatabase(data);
}

function deleteMonster(monster) {
  const data = readDatabase();
  delete data[monster.id];
  saveDatabase(data);
}

module.exports = {
  getMonster,
  getAllMonsters,
  saveMonster,
  deleteMonster,
};
