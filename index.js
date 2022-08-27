const express = require("express");
const app = express();
require("dotenv/config")
const bookRoute = require("./src/routes/bookRoute");
const bodyParser = require("body-parser")
require("./src/database/db");
const cors = require("cors");

app.use(cors({
  origin:"http://localhost:3000"
}))

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
app.use("/book", bookRoute);


app.listen(process.env.PORTNO||8000, () => {
  console.log(`Server has started running on port ${process.env.PORTNO}`);
});
