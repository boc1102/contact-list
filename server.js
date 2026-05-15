import 'dotenv/config';
import app from "./app.js";
import { connectDB } from "./db.js";

async function start() {
  await connectDB();
  app.listen(process.env.PORT, () => {
    console.log("Server running at http://localhost:3000");
  });
}

start().catch(console.error);