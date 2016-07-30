var Fiber = require('fibers');

var inc = Fiber(function(start) {
    console.log("Start: ", start);
    var total = start;
    while (true) {
        total += Fiber.yield(total);
    }
});

for (var ii = inc.run(2); ii <= 10; ii = inc.run(2)) {
    console.log(ii);
}
