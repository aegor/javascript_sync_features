var Future = require( 'fibers/future' ), wait = Future.wait;
var Fiber = require('fibers');
var mysql = require('mysql');
var connection = require('./connection');

var connection = mysql.createConnection(connection);

var f = Future.wrap(connection);

Future.task(function() {

f.connectFuture().wait();

var data = f.queryFuture('select S.id,S.name as school,M.name as municipality from student_school S INNER JOIN student_municipality M ON M.id = S.municipality_id').wait();

console.log(data[0]);

var dataset = [];
for (var i = 0; i < 10; ++i) {
 dataset[i] =  f.queryFuture('select S.id,S.name as school,M.name as municipality from student_school S INNER JOIN student_municipality M ON M.id = S.municipality_id')
}

dataset.map(function(f){ f.wait() });

for (var i in dataset) {
 console.log(dataset[i].get());
}


f.endFuture().wait();


}).detach();