import Database from "better-sqlite3";
import path from 'path';
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class Home {
  constructor(body, user) {
    this.body = body;
    this.user = user;
    this.errors = [];
  }

  getContacts(req, res, next) {
    const db = new Database(path.resolve(__dirname, '../../data/data.db'), { verbose: console.log });
    db.pragma('journal_mode = WAL');

    let contacts;

    try {
      const tableName = `contacts_${this.user.id}`;

      db.exec(`
              CREATE TABLE IF NOT EXISTS ${tableName} (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              first_name TEXT NOT NULL,
              last_name TEXT,
              email TEXT,
              phone_number TEXT
              )`);

      contacts = db.prepare(`SELECT * FROM ${tableName};`).all();
    } catch (error) {
      console.log(error);
      console.log(this.errors);
    } finally {
      db.close();
    }

    return contacts;
  };
}

export default Home;
