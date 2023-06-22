const AbstractManager = require("./AbstractManager");

class PracticianManager extends AbstractManager {
  constructor() {
    super({ table: "practician" });
  }

  delete(id) {
    return this.database.query(`delete from ${this.table} where id = ?`, [id]);
  }
}

module.exports = PracticianManager;
