/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class PraticianManager extends AbstractManager {
  constructor() {
    super({ table: "practician" });
  }

  insert(practician) {
    const {
      adeli_number,
      password,
      firstname,
      lastname,
      mail,
      administrator_id,
    } = practician;
    return this.database.query(
      `insert into ${this.table} (adeli_number,password, firstname, lastname, mail, administrator_id ) values (?, ?, ?, ?, ?, ?)`,
      [adeli_number, password, firstname, lastname, mail, administrator_id]
    );
  }

  update(practician) {
    const {
      adeli_number,
      password,
      firstname,
      lastname,
      mail,
      administrator_id,
      id,
    } = practician;
    return this.database.query(
      `update ${this.table} set  
         adeli_number = ?,
        password =?,
        firstname=?,
        lastname=?,
        mail =?,
        administrator_id=?
       where id = ?`,
      [adeli_number, password, firstname, lastname, mail, administrator_id, id]
    );
  }
}

module.exports = PraticianManager;
