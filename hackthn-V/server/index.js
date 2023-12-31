const express = require('express')
const app = express()
const mongoose = require("mongoose");
const routes = require("./routes/routes");
const bodyParser = require("body-parser");
const cors = require("cors")
// Body parser middleware
app.use(bodyParser.json());

app.options('*',cors())

// to handler cors
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
app.get('/', (req, res) => {
  res.send('Hello World!');
})
app.use(routes);
// Start server
const PORT = 8000;
mongoose.connect("mongodb+srv://waseem:netixsol.93@netixsol.bvi8glx.mongodb.net/?retryWrites=true&w=majority").then((db) => {
	app.listen(PORT, () => console.log("app is running on port 8000 and db connected"));
});