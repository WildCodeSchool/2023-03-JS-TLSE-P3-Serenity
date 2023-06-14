const AbstractManager = require("./AbstractManager");

class AdminManager extends AbstractManager {
  constructor() {
    super({ table: "administrator" });
  }

  insert(admin) {
    return this.database.query(
      `insert into ${this.table} (registration_number, password, mail, firstname, lastname) values (?, ?, ?, ?, ?)`,
      [
        admin.registration_number,
        admin.password,
        admin.mail,
        admin.firstname,
        admin.lastname,
      ]
    );
  }

  update(admin) {
    return this.database.query(
      `update ${this.table} set registration_number = ?, password = ?, mail = ?, firstname = ?, lastname = ? where id = ?`,
      [
        admin.registration_number,
        admin.password,
        admin.mail,
        admin.firstname,
        admin.lastname,
        admin.id,
      ]
    );
  }
}

module.exports = AdminManager;
