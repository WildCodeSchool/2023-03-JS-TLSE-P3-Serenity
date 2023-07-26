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

  delete(patient_id) {
    return this.database.query(`delete from ${this.table} where id = ?`, [
      patient_id,
    ]);
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

  getPatientPractician(id) {
    const sql = `
    SELECT 
    practician.id,
    practician.firstname,
    practician.lastname,
    speciality,
    practician.phone,
    language,
    biography,
    diploma,
    other_formation,
    experience,
    association,
    publication,
    award
    FROM practician
    JOIN intervention I ON practician.id = I.practician_id
    JOIN intervention_patient IP ON I.id = IP.intervention_id
    JOIN patient P ON P.id = IP.patient_id
    WHERE P.id = ?`;

    return this.database.query(sql, [id]);
  }

  update(values, valueQuery, id) {
    return this.database.query(
      `update ${this.table} set ${valueQuery} where id = ?`,
      [...values, id]
    );
  }

  insert(patient) {
    const { hashed_password, firstname, lastname, mail } = patient;
    return this.database.query(
      `insert into ${this.table} (hashed_password, firstname, lastname, mail) values (?, ?, ?, ?)`,
      [hashed_password, firstname, lastname, mail]
    );
  }
}

module.exports = PatientManager;
