import { getDB, USERS_OPTIONS } from "../../db.js";
import validator from "validator";
import path from "path";
import bcrypt from "bcryptjs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class CreateAccount {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async createAccount() {
    try {
      const db = await getDB("contact-list");

      await db.createCollection("users", USERS_OPTIONS).catch((error) => {
        if (error.code !== 48) throw error;
      });

      let users = db.collection("users");
      await users.createIndex({ email: 1 }, { unique: true });

      console.log("users", users);

      this.checkEntry();
      if (this.errors.length > 0) {
        throw this.errors;
      }

      const salt = bcrypt.genSaltSync();
      this.body.password = bcrypt.hashSync(this.body.password, salt);

      const user = { email: this.body.email, password: this.body.password };

      await users.insertOne(user);
    } catch (error) {
      if (error.code === 11000)
        this.errors.push("There's already an account using this email!");
      console.log(error);
      console.log(this.errors);
    }
  }

  checkEntry() {
    this.cleanUp();

    if (!validator.isEmail(this.body.email)) {
      this.errors.push("Invalid email!");
    }

    const options = {
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      returnScore: false,
    };

    if (!validator.isStrongPassword(this.body.password, options)) {
      this.errors.push("Weak password!");
    }

    if (!validator.isLength(this.body.password, { min: 9, max: 30 })) {
      this.errors.push("Invalid password length!");
    }

    if (this.body.password !== this.body.passwordConfirm) {
      this.errors.push("Password mismatch!");
    }
  }

  cleanUp() {
    for (const key in this.body) {
      if (typeof this.body[key] !== "string") {
        this.body[key] = "";
      }
    }

    this.body = {
      email: this.body.email,
      password: this.body.password,
      passwordConfirm: this.body.passwordConfirm,
    };
  }
}

export default CreateAccount;
