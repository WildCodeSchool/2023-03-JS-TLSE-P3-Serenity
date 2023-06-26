/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class FormManager extends AbstractManager {
  constructor() {
    super({ table: "form" });
  }

  insert(form) {
    const { user_type, request_type, request, is_read, is_done } = form;
    return this.database.query(
      `insert into ${this.table} (user_type,request_type, request, is_read, is_done) values (?, ?, ?, ?, ?)`,
      [user_type, request_type, request, is_read, is_done]
    );
  }

  update(form) {
    const { user_type, request_type, request, is_read, is_done, id } = form;
    return this.database.query(
      `update ${this.table} set
         user_type = ?,
        request_type =?,
        request=?,
        is_read=?,
        is_done =?,
       where id = ?`,
      [user_type, request_type, request, is_read, is_done, id]
    );
  }

  findFormCount() {
    return this.database.query(
      `select count(id) as formCount from  ${this.table} where is_read = 0`
    );
  }
}

module.exports = FormManager;
