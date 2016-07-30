var mysql = require('mysql');
var Fiber = require('fibers');
var connection = require('./connection');
var data = ["test"];

var db = function (req) {

  Fiber(function () {
      var fiber = Fiber.current;
    try {
      connection.query(req, function (err, rows, fields) {
        console.log("req: ", req);
        if (err) {
          console.log("err: ", err);
          data = JSON.parse('{"error": "' + err.message + '"}');
          fiber.run();
        }
        else {
          data = rows;
          fiber.run();
        }
      });
      return Fiber.yield(data);
    }
    catch (e) {
      // If some of async functions returned an error to a callback
      // it will be thrown as exception
      console.error(e);
    }
    }
  ).run();
};


var connection = mysql.createConnection(connection);

connection.connect();
db('select name as municipality from student_municipality');
console.log(data);
db('select S.id,S.name as school,M.name as municipality from student_school S INNER JOIN student_municipality M ON M.id = S.municipality_id');
console.log(data);
//connection.end();

