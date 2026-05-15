import 'dotenv/config';
import app from "./app.js";
import { connectDB } from "./db.js";

const PORT = 3000;

async function start() {
  await connectDB();
  app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
  });
}

start().catch(console.error);