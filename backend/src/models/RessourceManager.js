/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class RessourceManager extends AbstractManager {
  constructor() {
    super({ table: "ressource" });
  }

  findRessourceCount(id) {
    return this.database.query(
      `select count(id) as ressourceCount from ${this.table} where practician_id = ?`,
      [id]
    );
  }

  getPatientInterventionRessource(id) {
    return this.database.query(
      `SELECT PIR.id, PIR.is_done, R.title, R.description, IP.patient_id FROM patient_intervention_ressource PIR JOIN ${this.table} R ON PIR.intervention_ressource_ressource_id = R.id join intervention_patient IP on IP.intervention_id = PIR.intervention_patient_id where IP.patient_id = ?`,
      [id]
    );
  }

  updatePatientInterventionRessource(id, is_done) {
    return this.database.query(
      `UPDATE patient_intervention_ressource SET is_done = ? WHERE id = ?`,
      [is_done, id]
    );
  }
}

module.exports = RessourceManager;
