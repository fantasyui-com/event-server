const net = require('net');
const repl = require('repl');



let connections = 0;

module.exports = function({events, realm, address, port}){




const server = net.createServer((socket) => {
  let context = {};
  let replServer = {};

    function myEval(cmd, contextxxx, filename, callback) {
      callback(null,''); // Immediate return.

      events( {cmd: cmd.trim(),
        log: function(a){
          replServer.displayPrompt();
          socket.write(a+`\n`);
          replServer.displayPrompt();
        },
       } );
    }

    connections += 1;

    replServer = repl.start({
       prompt: realm+'> ',
      input: socket,
      output: socket,
      terminal: true,
      eval: myEval,
      writer: function(a){return a},

    });

    if(repl.on) repl.on('exit', () => {
      socket.end();
    });

    if(!repl.context) repl.context = context;
    repl.context.socket = socket


  });

  server.on('error', (err) => {
    throw err;
  });

  server.listen(parseInt(port), address, () => {
    console.log(`${realm} server bound ${address}:${port}`);
  });

};
