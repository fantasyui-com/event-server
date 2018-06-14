var net = require('net')

module.exports = function({user, address, port}){

 var socket = net.connect(parseInt(port), address);

process.stdin.pipe(socket);

process.stdin.on('data', function (buffer) {

  if (buffer.length === 1 && buffer[0] === 0x04) {  // EOT
    process.stdin.emit('end');  // process.stdin will be destroyed
    process.stdin.setRawMode(false);
    process.stdin.pause();  // stop emitting 'data' event
  }

});

/// this event won't be fired if REPL is exited by '.exit' command
process.stdin.on('end', function () {
  console.log('.exit');
  socket.destroy();
});

socket.pipe(process.stdout);

socket.on('connect', function () {
  console.log(`Connected as ${user} to ${address}:${port}`);
  process.stdin.setRawMode(true);
});

socket.on('close', function close() {
  console.log('Disconnected.');
  socket.removeListener('close', close);
  process.exit();
});

socket.on('error', (e) => {
  console.error(e);
});

}
