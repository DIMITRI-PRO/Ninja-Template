import AbstractManager from "../AbstractManager.js";
import format from "../../utils/formatQuery.js";

const { formatQuery } = format;

class Users extends AbstractManager {
  constructor() {
    super({ table: "users" });
  }

  insert(users) {
    return this.connection.query(
      `insert into ${this.table}(lastname, firstname, email, password, pseudo, picture) values (?, ?, ?, ?, ?, ?);`,
      [
        users.lastname,
        users.firstname,
        users.email,
        users.hashedPassword,
        users.pseudo,
        users.picture,
      ]
    );
  }

  findUser(id) {
    return this.connection.query(
      `select lastname, firstname, email, pseudo, picture from ${this.table} where id = ?;`,
      [id]
    );
  }

  readForLogin({ email }) {
    return this.connection.query(
      `select * from ${this.table} where email = ?;`,
      [email]
    );
  }

  update(users) {
    const { query, values } = formatQuery(users);
    return this.connection.query(
      `update ${this.table} set ${query} where id = ?`,
      [...values, users.id]
    );
  }
}

export default new Users();
