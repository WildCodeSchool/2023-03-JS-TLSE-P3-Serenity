const AbstractManager = require("./AbstractManager");

class InterventionManager extends AbstractManager {
  constructor() {
    super({ table: "intervention" });
  }
  findInterventionCount(id) {
    return this.database.query(`select count(id) from  ${this.table} where practician_id = ?`, [
      id,
    ]);
  }
}

module.exports = InterventionManager;