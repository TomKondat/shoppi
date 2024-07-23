const dotenv = require("dotenv");
const { connectDB } = require("./utils/connectDB");

dotenv.config();
const app = require("./app");

const connectionString = process.env.MONGO_DB_ATLAS.replace(
  `<password>`,
  process.env.MONGO_DB_ATLAS_PASSWORD
).replace(`<username>`, process.env.MONGO_DB_ATLAS_USERNAME);
console.log(connectionString);

connectDB(connectionString);

const port = 8000 || 8001;
app.listen(port, "127.0.0.1", () => {
  console.log(`Server is listening on port ${port}`);
});
