/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class FormManager extends AbstractManager {
  constructor() {
    super({ table: "form" });
  }

  insert(form) {
    const { user_type, request_type, request, create_time } = form;
    return this.database.query(
      `insert into ${this.table} (user_type,request_type, request, create_time) values (?, ?, ?, ?)`,
      [user_type, request_type, request, create_time]
    );
  }

  update(values, valueQuery, id) {
    return this.database.query(
      `update ${this.table} set ${valueQuery} where id = ?`,
      [...values, id]
    );
  }

  findFormCount() {
    return this.database.query(
      `select count(id) as formCount from  ${this.table} where is_read = 0`
    );
  }
}

module.exports = FormManager;
