const AbstractManager = require("./AbstractManager");

class RessourceManager extends AbstractManager {
  constructor() {
    super({ table: "ressource" });
  }

  findRessourceCount(id) {
    return this.database.query(
      `select count(id) as ressourceCount from  ${this.table} where practician_id = ?`,
      [id]
    );
  }

  getAllRessource() {
    return this.database.query(
      `select r.title,r.type,r.url,r.description,t.theme,p.firstname, p.lastname from  ${this.table} as r inner join practician as p on r.practician_id=p.id left outer join theme_ressource as t on r.theme_ressource_id=t.id where practician_id=1`
    );
  }
}

module.exports = RessourceManager;
