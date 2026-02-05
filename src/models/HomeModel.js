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

  getContacts() {
    const db = new Database(path.resolve(__dirname, '../../data.db'), { verbose: console.log, fileMustExist: false });
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
      this.errors.push(error);
      console.log(error);
      console.log(this.errors);
    } finally {
      db.close();
    }

    return contacts;
  };

  deleteContact(contactID) {
    const db = new Database(path.resolve(__dirname, '../../data/data.db'), { verbose: console.log, fileMustExist: false });
    db.pragma('journal_mode = WAL');

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

      db.exec(`DELETE FROM ${tableName} WHERE id = ${contactID};`);
    } catch (error) {
      this.errors.push(error);
      console.log(error);
      console.log(this.errors);
    } finally {
      db.close();
    }
  }
}

export default Home;
