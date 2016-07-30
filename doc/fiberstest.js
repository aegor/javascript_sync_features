var Fiber = require('fibers');

var log_sequence_counter = 1;

function sleep(task, milliseconds) {
    var fiber = Fiber.current;
    setTimeout(function() {
      console.log(log_sequence_counter++ + task + ' callback');
        fiber.run();
    }, milliseconds);
    console.log(log_sequence_counter++ + task + ' thread/fiber suspended');
    Fiber.yield();
    console.log(log_sequence_counter++ + task + ' thread/fiber resumed');
}

var task1 = function() {
    console.log(log_sequence_counter++ + ' task 1 waiting for sleep to end ');
    sleep(" task 1",1000);
    console.log(log_sequence_counter++ + ' task 1 got back from sleep');
}

var task2 = function() {
    console.log(log_sequence_counter++ + ' task 2 waiting for sleep to end ');
    sleep(" task 2", 1000);
    console.log(log_sequence_counter++ + ' task 2 got back from sleep');
}

Fiber(task1).run();
Fiber(task2).run();
console.log( log_sequence_counter++ + ' main execution flow');
