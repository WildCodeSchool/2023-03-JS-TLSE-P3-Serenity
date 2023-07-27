const AbstractManager = require("./AbstractManager");

class InterventionRessourceManager extends AbstractManager {
  constructor() {
    super({ table: "intervention_ressource" });
  }

  insert(idInter, idRessource) {
    return this.database.query(
      `INSERT INTO ${this.table} (intervention_id, ressource_id) VALUES(?,?)`,
      [idInter, idRessource]
    );
  }

  delete(idInter) {
    return this.database.query(
      `delete from ${this.table} where intervention_id = ?`,
      [idInter]
    );
  }

  findRessourcesByInterId(interventionId) {
    return this.database.query(
      `select * from ${this.table} where intervention_id = ?`,
      [interventionId]
    );
  }
}

module.exports = InterventionRessourceManager;
