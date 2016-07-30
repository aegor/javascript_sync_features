var Future = require('fibers/future');
var req = Future.wrap(require('request'));


var doFutureWork = function(url1, url2){

    var results1 = req(url1).wait();
    var results2 = req(url2).wait();

    console.log(results1.body, results2.body);

}.future();


doFutureWork('http://httpbin.org/status/418', 'http://httpbin.org/get').run();
console.log("done");
