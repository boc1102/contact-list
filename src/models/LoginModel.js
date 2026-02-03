import Database from "better-sqlite3";
import path from 'path';
import bcrypt from "bcryptjs";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class Login {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    login() {
        const db = new Database(path.resolve(__dirname, '../../data/data.db'), { verbose: console.log });
        db.pragma('journal_mode = WAL');

        try {
            db.exec(`
        CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
        )`);

            this.checkUser(db);

            if (this.errors.length > 0) {
                throw this.errors;
            }

        } catch (error) {
            if (error['code'] === 'SQLITE_CONSTRAINT_UNIQUE') this.errors.push('There\'s already an account using this email!');

            console.log(this.errors);
        } finally {
            db.close();
        }
    }

    checkUser(db) {
        this.cleanUp();

        const selectStmt = db.prepare(`SELECT * FROM users
                WHERE email=?`);
        this.user = selectStmt.get(this.body.email);

        if (!this.user) {
            this.errors.push('This email is not registered!');
            return;
        }

        if (!bcrypt.compareSync(this.body.password, this.user.password)) {
            this.errors.push('Wrong password!');
            return;
        }
    }

    cleanUp() {
        for (const key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }

        this.body = {
            email: this.body.email,
            password: this.body.password
        };
    }
}

export default Login;