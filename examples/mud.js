

  // evaluate cmd, when finished call: callback(null, cmd.trim());


  const EventEmitter = require('events');
  const XRegExp = require('xregexp');

  const types = {};

  class World extends EventEmitter {}
  const world = new World();


    class Self extends EventEmitter {}
    const self = new Self();


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


  // GOTO
  lobby.on('goto-location', ({log, location}) => {
    player.emit('goto', location);
  });

  const fork = {name: 'Cheap Fork'}
  const universe = {

      location: lobby,
      self,
      inventory: {fork},

      home: {lobby},
      lobby: {home},

  };

  self.on('examine-inventory', ({log}) => {
    log(Object.keys(universe.player.inventory));
  });

  self.on('goto-location', ({log, location}) => {
    if(universe.locations[location]) {
      log(`Entering ${location}.`);
      universe.player.location = universe.locations[location];
    }
  });




module.exports = function(o){

   const registered = [];

   registered.push({ category:'self',      event:'examine-self', pattern:`^(self|s)$` });
   registered.push({ category:'inventory', event:'examine-inventory', pattern:`^(inventory|i)$` });
   registered.push({ category:'location',  event:'goto-location', pattern:`^(goto|g) (?<location>[a-zA-Z0-9 ]+)$` });
   registered.push({ category:'location',  event:'examine', pattern:`^(examine|x)$` });

   registered.forEach(matcher=>{

     const match = XRegExp.exec(o.cmd, XRegExp(matcher.pattern) );

     if(match) {
       console.log(`${o.cmd} was matched by ${matcher.event}`);
       universe[matcher.category].emit(matcher.event, Object.assign({}, o, match) );
     }
   });

   //

}
