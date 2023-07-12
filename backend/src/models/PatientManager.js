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

  getPatientIntervention() {
    const sql = `
    SELECT 
    P.id AS patient_id,
    P.firstname,
    P.lastname,
    P.mail,
    P.phone,
    I.name AS intervention_name,
    IP.intervention_date
FROM 
    patient P
LEFT JOIN
    intervention_patient IP ON P.id = IP.patient_id
LEFT JOIN 
    intervention I ON I.id = IP.intervention_id
LEFT JOIN
practician ON practician.id = I.practician_id`;

    return this.database.query(sql);
  }
}

module.exports = PatientManager;
