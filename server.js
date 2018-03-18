const net = require('net');
const repl = require('repl');



let connections = 0;

module.exports = function({events, realm, address, port}){

  function myEval(cmd, context, filename, callback) {
    events(cmd.trim(), callback);
  }


const server = net.createServer((socket) => {

    connections += 1;

    repl.start({
      prompt: realm+'> ',
      input: socket,
      output: socket,
      terminal: true,

      eval: myEval
    });

    if(repl.on) repl.on('exit', () => {
      socket.end();
    });

    // repl.context.socket = socket


  });

  server.on('error', (err) => {
    throw err;
  });

  server.listen(parseInt(port), address, () => {
    console.log(`${realm} server bound ${address}:${port}`);
  });

};
