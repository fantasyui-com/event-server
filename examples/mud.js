

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

      locations:{
      home: {lobby},
      lobby: {home},

  };

  self.on('examine-inventory', ({log}) => {
    log(Object.keys(universe.player.inventory));
  });

  self.on('goto-location', ({log, location}) => {
    if(universe[location]) {
      log(`Entering ${location}.`);
      universe.player.location = universe[location];
    }
  });




module.exports = function(o){

   const rules = [];

   rules.push({ thing:'self',      event:'examine-self',      pattern:`^(self|s)$` });
   rules.push({ thing:'inventory', event:'examine-inventory', pattern:`^(inventory|i)$` });
   rules.push({ thing:'location',  event:'goto-location',     pattern:`^(goto|g) (?<location>[a-zA-Z0-9 ]+)$` });
   rules.push({ thing:'location',  event:'examine',           pattern:`^(examine|x)$` });

   rules.forEach(rule=>{
     const xRegExpMatch = XRegExp.exec(o.cmd, XRegExp(rule.pattern) );
     if(xRegExpMatch) {
       console.log(`${o.cmd} was matched by ${rule.event}`);
       universe[rule.thing].emit(rule.event, Object.assign({}, o, xRegExpMatch) );
     }
   }); // for each rule

}
