const AbstractManager = require("./AbstractManager");

class RessourceManager extends AbstractManager {
  constructor() {
    super({ table: "ressource" });
  }
}

module.exports = RessourceManager;