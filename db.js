import { MongoClient } from "mongodb";

const EMAIL_PATTERN = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$';

const USERS_OPTIONS = {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["email", "password"],
      properties: {
        email: {
          bsonType: "string",
          pattern: EMAIL_PATTERN,
          description: "Email is required and must be a string",
        },
        password: {
          bsonType: "string",
          description: "Password is required and must be a string",
        },
      },
    },
  },
  validationLevel: "strict",
  validationAction: "error",
};

const CONTACTS_OPTIONS = {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["first_name"],
      properties: {
        first_name: {
          bsonType: "string",
          description: "First name is required and must be a string",
        },
        last_name: {
          bsonType: "string",
          description: "Last name must be a string",
        },
        email: {
          bsonType: "string",
          description: "Email must be a string",
        },
        phone_number: {
          bsonType: "string",
          description: "Phone number must be a string",
        },
      },
    },
  },
  validationLevel: "strict",
  validationAction: "error",
};
let client;

async function connectDB() {
  if (client) return client;

  client = new MongoClient(process.env.MONGO_URI);
  await client.connect();

  console.log("MongoDB connected");
  return client;
}

function getDB(dbname) {
  if (!client) throw new Error("MongoDB not initialized");
  return client.db(dbname);
}

export { connectDB, getDB, USERS_OPTIONS, CONTACTS_OPTIONS };
