const AbstractManager = require("./AbstractManager");

class RessourceManager extends AbstractManager {
  constructor() {
    super({ table: "ressource" });
  }

  findRessourceCount(id) {
    return this.database.query(
      `select count(id) from  ${this.table} where practician_id = ?`,
      [id]
    );
  }
}

module.exports = RessourceManager;
