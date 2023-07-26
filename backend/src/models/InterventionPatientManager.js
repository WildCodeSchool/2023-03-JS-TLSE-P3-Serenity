const AbstractManager = require("./AbstractManager");

class InterventionPatientManager extends AbstractManager {
  constructor() {
    super({ table: "intervention_patient" });
  }

  insert(idInter, idPatient, interventionDate) {
    return this.database.query(
      `INSERT INTO ${this.table} (intervention_id, patient_id, intervention_date) VALUES(?,?,?)`,
      [idInter, idPatient, interventionDate]
    );
  }
}

module.exports = InterventionPatientManager;
