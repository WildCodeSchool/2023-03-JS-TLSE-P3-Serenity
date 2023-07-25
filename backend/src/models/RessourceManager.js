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

  getAllRessource() {
    return this.database.query(
      `select r.title,r.type,r.url,r.description,t.theme,p.firstname, p.lastname from  ${this.table} as r inner join practician as p on r.practician_id=p.id left outer join theme_ressource as t on r.theme_ressource_id=t.id where practician_id=1`
    );
  }

  updatePatientInterventionRessource(id, is_done) {
    return this.database.query(
      `UPDATE patient_intervention_ressource SET is_done = ? WHERE id = ?`,
      [is_done, id]
    );
  }

  getRessourceByPracticianId(practicianId) {
    return this.database.query(
      `SELECT R.id, R.title, R.type, R.url, R.description, TR.theme FROM ${this.table} R JOIN theme_ressource TR ON TR.id = R.theme_ressource_id WHERE practician_id = ?`,
      [practicianId]
    );
  }

  add(title, type, url, description, practicianId, themeRessourceId) {
    return this.database.query(
      `INSERT INTO ${this.table} (title, type, url, description, practician_id, theme_ressource_id) VALUES(?,?,?,?,?,?)`,
      [title, type, url, description, practicianId, themeRessourceId]
    );
  }
}

module.exports = RessourceManager;
