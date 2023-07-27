const AbstractManager = require("./AbstractManager");

class PatientInterventionRessourceManager extends AbstractManager {
  constructor() {
    super({ table: "patient_intervention_ressource" });
  }

  insert(idInter, idRessource) {
    return this.database.query(
      `INSERT INTO ${this.table} (intervention_patient_id, intervention_ressource_ressource_id, is_done) VALUES(?,?, 0)`,
      [idInter, idRessource]
    );
  }
}

module.exports = PatientInterventionRessourceManager;
