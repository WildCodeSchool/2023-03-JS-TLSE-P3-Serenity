const AbstractManager = require("./AbstractManager");

class AdminManager extends AbstractManager {
  constructor() {
    super({ table: "administrator" });
  }

  getAdminByMatricule(matricule) {
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE registration_number = ?`,
      [matricule]
    );
  }

  insert(admin) {
    // eslint-disable-next-line camelcase
    const { registration_number, hashedPassword, mail, firstname, lastname } =
      admin;
    return this.database.query(
      `insert into ${this.table} (registration_number, hashed_password, mail, firstname, lastname) values (?, ?, ?, ?, ?)`,
      // eslint-disable-next-line camelcase
      [registration_number, hashedPassword, mail, firstname, lastname]
    );
  }

  update(values, valueQuery, id) {
    return this.database.query(
      `update ${this.table} set ${valueQuery} where id = ?`,
      [...values, id]
    );
  }
}

module.exports = AdminManager;
