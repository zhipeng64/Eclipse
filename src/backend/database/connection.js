import { fileURLToPath } from "url";
import path from "path";
import { dirname } from "path";
import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

// __dirname is the absolute path to where this file resides
// It is good to import it this way, as simply specifying "../../../.env"
// is actually relative to the current working directory where you run the file,
// not where this file resides.
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

// MongoDB Connection URL
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@eclipse.yed7zy5.mongodb.net/?retryWrites=true&
  w=majority&appName=${process.env.DB_APPNAME}`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db = null;
async function connectToMongo() {
  // Check if database instance already exists, if so return it
  if (db) {
    return db;
  }

  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    db = client.db(process.env.DB_APPNAME);
    console.log("mongodb connection established");
    return db;
  } catch (error) {
    console.log(error);
  }
}

async function closeMongoConnection() {
  if (client) {
    await client.close();
    console.log("MongoDB connection closed.");
  }
}

await connectToMongo();
export { connectToMongo, closeMongoConnection };
