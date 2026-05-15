import { getDB, CONTACTS_OPTIONS } from "../../db.js";
import validator from "validator";
import path from "path";
import { fileURLToPath } from "url";
import { BSONType } from "mongodb";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class AddContact {
  constructor(body, user) {
    this.body = body;
    this.errors = [];
    this.user = user;
  }

  async addContact() {
    try {
      const db = getDB("contact-list");

      const collectionName = `contacts_${this.user._id.toString()}`;

      await db
        .createCollection(collectionName, CONTACTS_OPTIONS)
        .catch((err) => {
          if (err.code !== 48) throw err;
        });

      const contacts = db.collection(collectionName);

      this.checkEntry();
      if (this.errors.length > 0) {
        throw this.errors;
      }

      const contact = {
        first_name: this.body.firstName,
        last_name: this.body.lastName,
        email: this.body.email,
        phone_number: this.body.phoneNumber,
      };
      contacts.insertOne(contact);
    } catch (error) {
      console.log(error);
      console.log(this.errors);
    }
  }

  checkEntry() {
    this.cleanUp();

    if (this.body.email) {
      if (!validator.isEmail(this.body.email)) {
        this.errors.push("Invalid email!");
      }
    }

    if (!this.body.firstName) {
      this.errors.push("First name required!");
    }
  }

  cleanUp() {
    for (const key in this.body) {
      if (typeof this.body[key] !== "string") {
        this.body[key] = "";
      }
    }

    this.body = {
      firstName: this.body.firstName,
      lastName: this.body.lastName,
      email: this.body.email,
      phoneNumber: this.body.phoneNumber,
    };
  }
}

export default AddContact;
