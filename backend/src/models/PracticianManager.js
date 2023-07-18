/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class PracticianManager extends AbstractManager {
  constructor() {
    super({ table: "practician" });
  }

  getPracticianByAdeliNumber(adeli) {
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE adeli_number = ?`,
      [adeli]
    );
  }

  delete(id) {
    return this.database.query(`delete from ${this.table} where id = ?`, [id]);
  }

  insert(practician) {
    const {
      adeli_number,
      hashed_password,
      firstname,
      lastname,
      mail,
      administrator_id,
    } = practician;
    return this.database.query(
      `insert into ${this.table} (adeli_number,hashed_password, firstname, lastname, mail, administrator_id ) values (?, ?, ?, ?, ?, ?)`,
      [
        adeli_number,
        hashed_password,
        firstname,
        lastname,
        mail,
        administrator_id,
      ]
    );
  }

  getRessource(id) {
    return this.database.query(
      `SELECT R.id, R.title, R.type, R.url, R.description, TR.theme FROM ressource R JOIN theme_ressource TR ON TR.id = R.theme_ressource_id WHERE practician_id = ?`,
      [id]
    );
  }

  update(values, valueQuery, id) {
    return this.database.query(
      `update ${this.table} set ${valueQuery} where id = ?`,
      [...values, id]
    );
  }
}

module.exports = PracticianManager;
