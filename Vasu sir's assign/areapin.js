let dbparams = {
  host: "localhost",
  user: "root",
  password: "3981",
  database: "cdac",
  port: 3306,
};
const mysql = require("mysql2");
const connection = mysql.createConnection(dbparams);

const express = require("express");
const app = express();

app.use(express.static("sf"));

app.listen(900, function () {
  console.log("server listening at port 900...");
});

app.get("/getareaname", (req, resp) => {
  let pincode = req.query.pincode;
  console.log("Input " + pincode);
  let output = {
    status: false,
    areaname: "",
  };
  connection.query(
    "select areaname from area where pincode=?",
    [pincode],
    (error, rows) => {
      console.log(rows);
      if (error) {
        console.log(error);
      } else if (rows.length > 0) {
        output.status = true;
        output.areaname = rows[0].areaname;
      }
      console.log(output);
      resp.send(output);
    }
  );
});