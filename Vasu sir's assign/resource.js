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

app.use(express.static("cp"));

app.listen(900, function () {
  console.log("server listening at port 900...");
});

app.get("/getAllResources", (req, resp) => {
  connection.query("select * from resource", [], (error, rows) => {
    console.log(rows);
    resp.send(rows);
    //resp.send(output);
  });
});

app.get("/getResource", (req, resp) => {
  let resourceid = req.query.resourceid;
  console.log("Input " + resourceid);
  let output = {
    status: false,
    resourceDetails: { resourceid: "", resourcemame: "", status: "" },
  };
  connection.query(
    "select * from item where resourceid=?",
    [resourceid],
    (error, rows) => {
      console.log(rows);
      if (error) {
        console.log(error);
      } else if (rows.length > 0) {
        output.status = true;
        output.resourceDetails = rows[0];
      }
      console.log(output);
      resp.send(output);
    }
  );
});

app.get("/addResource", (req, resp) => {
  let input = {
    resourceid: req.query.resourceid,
    resourcemame: req.query.resourcemame,
    status: req.query.status,
  };

  let output = false;
  connection.query(
    "Insert into item(resourceid,resourcemame,status) values(?,?,?)",
    [input.resourceid, input.resourcemame, input.status],
    (error, rows) => {
      console.log(rows);
      if (error) {
        console.log(error);
      } else if (rows.affectedRows > 0) {
        output = true;
      }
      console.log(output);
      resp.send(output);
    }
  );
});

app.get("/updateResource", (req, resp) => {
  let input = {
    resourceid: req.query.resourceid,
    resourcemame: req.query.resourcemame,
    status: req.query.status,
  };

  let output = false;
  connection.query(
    "Update item set resourcemame=?,status=? where resourceid = ?",
    [input.resourcemame, input.status, input.resourceid],
    (error, rows) => {
      console.log(rows);
      if (error) {
        console.log(error);
      } else if (rows.affectedRows > 0) {
        output = true;
      }
      console.log(output);
      resp.send(output);
    }
  );
});

app.get("/deleteResource", (req, resp) => {
  let resourceid = req.query.resourceid;
  console.log("Input " + resourceid);
  let output = false;
  connection.query(
    "delete from item where resourceid=?;",
    [resourceid],
    (error, rows) => {
      console.log(rows);
      if (error) {
        console.log(error);
      } else if (rows.affectedRows > 0) {
        output = true;
      }
      console.log(output);
      resp.send(output);
    }
  );
});
