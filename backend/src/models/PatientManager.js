/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class PatientManager extends AbstractManager {
  constructor() {
    super({ table: "patient" });
  }

  getPatientByMail(mail) {
    return this.database.query(`SELECT * FROM ${this.table} WHERE mail = ?`, [
      mail,
    ]);
  }

  delete(id) {
    return this.database.query(`delete from ${this.table} where id = ?`, [id]);
  }
}

module.exports = PatientManager;
