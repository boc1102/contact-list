import Database from "better-sqlite3";
import validator from 'validator';
import path from 'path';

const __dirname = import.meta.dirname;

class AddContact {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    addContact(userID) {
        const db = new Database(path.resolve(__dirname, '../../data/data.db'), { verbose: console.log });
        db.pragma('journal_mode = WAL');

        try {
            const tableName = `contacts_${userID}`;

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

            const insertStmt = db.prepare(`INSERT INTO ${tableName} (first_name, last_name, email, phone_number) VALUES (?, ?, ?, ?)`);
            insertStmt.run(this.body.firstName, this.body.lastName, this.body.email, this.body.phoneNumber);
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

export default AddContact;