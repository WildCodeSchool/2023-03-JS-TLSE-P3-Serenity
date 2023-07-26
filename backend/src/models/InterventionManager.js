const AbstractManager = require("./AbstractManager");

class InterventionManager extends AbstractManager {
  constructor() {
    super({ table: "intervention" });
  }

  findInterventionCount(id) {
    return this.database.query(
      `select count(id) as interventionCount from  ${this.table} where practician_id = ?`,
      [id]
    );
  }

  getAllPracticianIntervention(practicianId) {
    return this.database.query(
      `SELECT I.id, I.name, I.duration, I.anesthesia from ${this.table} I JOIN practician P ON P.id = I.practician_id WHERE I.practician_id = ?`,
      [practicianId]
    );
  }

  insert(name, duration, anesthesia, practicianId) {
    return this.database.query(
      `INSERT INTO ${this.table} (name,duration, anesthesia, practician_id ) VALUES(?, ?, ?, ?)`,
      [name, duration, anesthesia, practicianId]
    );
  }
}

module.exports = InterventionManager;
