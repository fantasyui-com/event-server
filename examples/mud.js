

  // evaluate cmd, when finished call: callback(null, cmd.trim());


  const EventEmitter = require('events');

  class World extends EventEmitter {}
  const world = new World();

  class Location extends EventEmitter {}

  const home = new Location();
  home.on('examine', (callback) => {
    callback(null, `You are home, there is a lobby here.`);

  });
  const lobby = new Location();
  lobby.on('examine', (callback) => {
    console.log('aaa;');
    callback(null, `You are in the lobby, you can go home fro here.`);
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

  player.on('action', (cmd, callback) => {
    console.log(`Emitting ${cmd} to player.location`)
    player.location.emit(cmd, callback)
  });

  player.emit('goto', 'lobby');

module.exports = function(cmd, callback){

   player.emit('action', cmd, callback);

}
