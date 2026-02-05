import Database from "better-sqlite3";
import validator from 'validator';
import path from 'path';
import bcrypt from "bcryptjs";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class CreateAccount {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    createAccount() {
        const db = new Database(path.resolve(__dirname, '../../data.db'), { verbose: console.log, fileMustExist: false });
        db.pragma('journal_mode = WAL');

        try {
            db.exec(`
        CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
        )`);

            this.checkEntry();
            if (this.errors.length > 0) {
                throw this.errors;
            }

            const insertStmt = db.prepare('INSERT INTO users (email, password) VALUES (?, ?)');

            const salt = bcrypt.genSaltSync();
            this.body.password = bcrypt.hashSync(this.body.password, salt);

            this.user = insertStmt.run(this.body.email, this.body.password);
        } catch (error) {
            if (error['code'] === 'SQLITE_CONSTRAINT_UNIQUE') this.errors.push('There\'s already an account using this email!');

            console.log(this.errors);
        } finally {
            db.close();
        }
    }

    checkEntry() {
        this.cleanUp();

        if (!validator.isEmail(this.body.email)) {
            this.errors.push('Invalid email!');
        }

        const options = {
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
            returnScore: false
        };

        if (!validator.isStrongPassword(this.body.password, options)) {
            this.errors.push('Weak password!');
        }

        if (!validator.isLength(this.body.password, { min: 9, max: 30 })) {
            this.errors.push('Invalid password length!');
        }

        if (this.body.password !== this.body.passwordConfirm) {
            this.errors.push('Password mismatch!');
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
            password: this.body.password,
            passwordConfirm: this.body.passwordConfirm
        };
    }
}

export default CreateAccount;