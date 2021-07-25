const database = require("../database");

module.exports = class Monster {
  constructor(id, name, lvl, gold, xp, drops, killed=0) {
    this.id = id;
    this.name = name;
    this.lvl = lvl;
    this.gold = gold;
    this.xp = xp;
    this.drops = drops;
    this.killed = killed;
  }

  static get(id) {
    const data = database.getMonster(id)
    if (!data) return null
    return new Monster(data.id, data.name, data.lvl, data.gold, data.xp, data.drops, data.killed)
  }

  static getInfo(id) {
    const data = database.getMonster(id)
    if (!data) return null
    const monster = new Monster(data.id, data.name, data.lvl, data.gold, data.xp, data.drops, data.killed)
    return monster.info()
  }

  static all() {
    const allData = database.getAllMonsters()
    return Object.values(allData)
      .map(data => new Monster(data.id, data.name, data.lvl, data.gold, data.xp, data.drops, data.killed))
  }

  static allInfo() {
    return Monster.all().map(monster => monster.info())
  }

  info() {
    return {
      id: this.id,
      name: this.name,
      lvl: this.lvl,
      killed: this.killed,
      links: this.hateoasLinks()
    }
  }

  asJson() {
    return {
      id: this.id,
      name: this.name,
      lvl: this.lvl,
      gold: this.gold,
      xp: this.xp,
      drops: this.drops,
      killed: this.killed,
      links: this.hateoasLinks()
    }
  }

  battle() {
    this.killed += 1
    database.saveMonster(this)
    return this.asJson()
  }

  murder(amount) {
    this.killed = amount
    database.saveMonster(this)
    return this.asJson()
  }

  destroy() {
    this.killed += 1000000
    database.deleteMonster(this)
    return this.asJson()
  }
  
  hateoasLinks() {
    return {
      self: {
        rel: "self",
        method: "GET",
        href: `/monsters/${this.id}`
      },
      battle: {
        rel: "battle",
        method: "POST",
        href: `/monsters/${this.id}/battle`
      },
      murder: {
        rel: "murder",
        method: "PUT",
        href: `/monsters/${this.id}/murder/:amount`
      },
      destroy: {
        rel: "destroy",
        method: "DELETE",
        href: `/monsters/${this.id}/destroy`
      }
    }
  }
}