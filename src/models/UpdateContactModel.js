import Database from "better-sqlite3";
import validator from 'validator';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class UpdateContact {
    constructor(body, user) {
        this.body = body;
        this.errors = [];
        this.user = user;
    }

    getContact(contactID) {
      const db = new Database(path.resolve(__dirname, '../../data/data.db'), { verbose: console.log });
      db.pragma('journal_mode = WAL');

      let contact;
    
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
    
        contact = db.prepare(`SELECT * FROM ${tableName} WHERE id = ${contactID};`).get();
      } catch (error) {
        console.log(error);
        console.log(this.errors);
      } finally {
        db.close();
      }
    
      return contact;
    }

    updateContact(contactID) {
        const db = new Database(path.resolve(__dirname, '../../data/data.db'), { verbose: console.log });
        db.pragma('journal_mode = WAL');

        try {
            console.log(this.body);

            const tableName = `contacts_${this.user.id}`;

            db.exec(`
        CREATE TABLE IF NOT EXISTS ${tableName} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name TEXT NOT NULL,
        last_name TEXT,
        email TEXT,
        phone_number TEXT
        )`);

            this.checkEntry();
            if (this.errors.length > 0) {
                throw this.errors;
            }

            const updateStmt = db.prepare(`UPDATE ${tableName}
                SET first_name = @firstName, last_name = @lastName, email = @email, phone_number = @phoneNumber
                WHERE id = ${contactID}`);

            updateStmt.run(this.body);
        } catch (error) {
            console.log(error);
            console.log(this.errors);
        } finally {
            db.close();
        }
    }

    checkEntry() {
        this.cleanUp();

        if (this.body.email) {
            if (!validator.isEmail(this.body.email)) {
                this.errors.push('Invalid email!');
            }
        }

        if (!this.body.firstName) {
            this.errors.push('First name required!');
        }
    }

    cleanUp() {
        for (const key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }

        this.body = {
            firstName: this.body.firstName,
            lastName: this.body.lastName,
            email: this.body.email,
            phoneNumber: this.body.phoneNumber
        };
    }
}

export default UpdateContact;