const dotenv = require("dotenv");
const app = require("./app");
const connectDB = require("./config/db");

dotenv.config();
connectDB();
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
