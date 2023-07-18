const AbstractManager = require("./AbstractManager");

class RessourceManager extends AbstractManager {
  constructor() {
    super({ table: "ressource" });
  }

  findRessourceCount(id) {
    return this.database.query(
      `select count(id) as ressourceCount from  ${this.table} where practician_id = ?`,
      [id]
    );
  }

  getRessourceByPracticianId(practicianId) {
    return this.database.query(
      `SELECT R.id, R.title, R.type, R.url, R.description, TR.theme FROM ${this.table} R JOIN theme_ressource TR ON TR.id = R.theme_ressource_id WHERE practician_id = ?`,
      [practicianId]
    );
  }
}

module.exports = RessourceManager;
