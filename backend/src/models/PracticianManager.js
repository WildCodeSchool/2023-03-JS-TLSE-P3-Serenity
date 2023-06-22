const AbstractManager = require("./AbstractManager");

class PracticianManager extends AbstractManager {
  constructor() {
    super({ table: "practician" });
  }
}

module.exports = PracticianManager;
