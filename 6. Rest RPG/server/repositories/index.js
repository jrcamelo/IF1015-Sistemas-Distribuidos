const fse = require("fs-extra");

function readDatabase() {
  return fse.readJsonSync("./repositories/database.json");
}

function saveDatabase(data) {
  fse.writeJsonSync("./repositories/database.json", data);
}

function getMonster(id) {
  return readDatabase()[id]
}

function getMonsterInfo(id) {
  const monster = getMonster(id);
  if (monster) {
    const { id, name, lvl, killed } = monster;
    return { id, name, lvl, killed };
  } else {
    return null
  }
}

function getAllMonsterInfo() {
  return Object.values(readDatabase()).map(monster => {
    const { id, name, lvl, killed } = monster;
    return { id, name, lvl, killed };
  });
}

function killAndLootMonster(id) {
  const data = readDatabase();
  const monster = data[id]
  if (monster) {
    monster.killed += 1
    saveDatabase(data)
    return monster
  } else {
    return null
  }
}

function justKillMonster(id) {
  const data = readDatabase();
  const monster = data[id]
  if (monster) {
    monster.killed += 1
    saveDatabase(data)
    const { id, name, lvl, killed } = monster;
    return { id, name, lvl, killed };
  } else {
    return null
  }
}

function killMonsterSoKilledThatItsDeletedFromTheDatabase(id) {
  const data = readDatabase();
  const monster = data[id]
  if (monster) {
    delete data[id]
    saveDatabase(data)
    monster.status = "ABSOLUTELY DESTROYED"
    monster.killed *= 99999
    return monster
  } else {
    return null
  }
}

module.exports = {
  readDatabase,
  saveDatabase,
  getMonster,
  getMonsterInfo,
  getAllMonsterInfo,
  getMonsterInfo,
  killAndLootMonster,
  justKillMonster,
  killMonsterSoKilledThatItsDeletedFromTheDatabase
};
