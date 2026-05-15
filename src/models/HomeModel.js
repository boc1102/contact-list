import { ObjectId } from "mongodb";
import { getDB, CONTACTS_OPTIONS } from "../../db.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class Home {
  constructor(body, user) {
    this.body = body;
    this.user = user;
    this.errors = [];
  }

  async getContacts() {
    let contacts;

    try {
      const db = getDB("contact-list");

      const collectionName = `contacts_${this.user._id.toString()}`;

      await db
        .createCollection(collectionName, CONTACTS_OPTIONS)
        .catch((err) => {
          if (err.code !== 48) throw err;
        });

      const contactsCollection = db.collection(collectionName);

      contacts = await contactsCollection.find({}).toArray();
    } catch (error) {
      this.errors.push(error);
      console.log(error);
      console.log(this.errors);
    }
    
    return contacts;
  }

  async deleteContact(contactID) {
    try {
      const db = getDB("contact-list");

      const collectionName = `contacts_${this.user._id.toString()}`;

      await db
        .createCollection(collectionName, CONTACTS_OPTIONS)
        .catch((err) => {
          if (err.code !== 48) throw err;
        });

      const contactsCollection = db.collection(collectionName);

      const contactObjId = new ObjectId(contactID);
      await contactsCollection.deleteOne({
        _id: {
          $eq: contactObjId,
        },
      });
    } catch (error) {
      this.errors.push(error);
      console.log(error);
      console.log(this.errors);
    }
  }
}

export default Home;
