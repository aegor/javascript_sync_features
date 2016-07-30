var mysql = require('mysql');
var Sync = require( 'sync' );
var connection = require('./connection');

function db(req, callback){
console.log("Callback arguments", callback.length)
console.log("req:", req);
   connection.query(req, function(err, rows, fields) {
    if (err) callback(null, JSON.parse('{"error": "' + err.message + '"}')); 
    callback(null, rows);
  });
}

var connection = mysql.createConnection(connection);

connection.connect();

Sync(function(){

try{ // Important !!! all console error IO must be wrapped to main thread with try/cath. Otherwise, you will not see errors on console

var mu = db.sync(null, 'select name as municipality from student_municipality');
var sc = db.sync(null, 'select S.id,S.name as school,M.name as municipality from student_school S INNER JOIN student_municipality M ON M.id = S.municipality_id');
connection.end();

var municipality = [];
console.log(mu[0], sc[0], mu.length, sc.length);
/*
for (var m in mu) {
   console.log(m);
   municipality[m] = {}; municipality[m].school = [];
   for (var s in sc) {
   console.log(m, s);
//    municipality[m] 
//    municipality[rows[i].municipality] = 
   }
}
*/

} // try

catch (e) {
        // If some of async functions returned an error to a callback
        // it will be thrown as exception
        console.error(e);
}
});
console.log("main");
