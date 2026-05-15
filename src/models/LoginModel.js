import { getDB, USERS_OPTIONS } from "../../db.js";
import path from "path";
import bcrypt from "bcryptjs";
import { fileURLToPath } from "url";
import { log } from "console";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class Login {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async login() {
    try {
      const db = getDB("contact-list");

      await db.createCollection('users', USERS_OPTIONS).catch((error) => {
        if (error.code !== 48) throw error;
      });

      const users = db.collection('users');
      await users.createIndex({ email: 1 }, { unique: true });

      await this.checkUser(users);

      if (this.errors.length > 0) {
        throw this.errors;
      }
    } catch (error) {
      if (error.code === 11000)
        this.errors.push("There's already an account using this email!");
      console.log(error);
      console.log(this.errors);
    }
  }

  async checkUser(users) {
    this.cleanUp();

    this.user = await users.findOne({ email: this.body.email });
    
    if (!this.user) {
      this.errors.push("This email is not registered!");
      return;
    }

    if (!bcrypt.compareSync(this.body.password, this.user.password)) {
      this.errors.push("Wrong password!");
      return;
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
    };
  }
}

export default Login;
