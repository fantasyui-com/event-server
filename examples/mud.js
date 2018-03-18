

  // evaluate cmd, when finished call: callback(null, cmd.trim());


  const EventEmitter = require('events');

  class World extends EventEmitter {}
  const world = new World();

  class Location extends EventEmitter {}

  const home = new Location();
  home.on('examine', ({cmd, log}) => {
    log(`You are home, there is a lobby here.`);

  });
  const lobby = new Location();
  lobby.on('examine', ({cmd, log}) => {
    console.log('aaa;');

    setTimeout(function(){
      log(`You are in the lobby, you can go home fro here.`);
     }, 1000 );
  });

  world.locations = {home, lobby};

  class Player extends EventEmitter {}
  const player = new Player();

  player.on('goto', (locationId) => {
    console.log(`entering ${locationId}`);
    if(world.locations[locationId]) {
      player.location = world.locations[locationId];
      console.log(`location changed to ${locationId}\n`)
    }
  });

  player.on('action', (o) => {
    console.log(`Emitting ${o.cmd} to player.location`)
    player.location.emit(o.cmd, o)
  });

  player.emit('goto', 'lobby');

module.exports = function(o){

   player.emit('action', o);

}
