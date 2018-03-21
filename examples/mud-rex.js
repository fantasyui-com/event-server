

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

  const fork = {name: 'Cheap Fork'};

  const locations = {
    home: {lobby},
    lobby: {home},
  };

  const things = {
    location: lobby,
    self,
    inventory: {fork},
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


  function getMatches(string, regex, index) {
    index || (index = 1); // default to the first capturing group
    var matches = [];
    var match;
    while (match = regex.exec(string)) {
      matches.push(match[index]);
    }
    return matches;
  }

   const rules = [];

   rules.push({ thing:'self',      event:'examine-self',      pattern:`^(self|s)$` });
   rules.push({ thing:'inventory', event:'examine-inventory', pattern:`^(inventory|i)$` });
   rules.push({ thing:'location',  event:'goto-location',     pattern:`^(goto|g) (?<location>[a-zA-Z0-9 ]+)$` });
   rules.push({ thing:'location',  event:'examine',           pattern:`^(examine|x)$` });

   rules.forEach(rule=>{

     const xRegExpMatch = XRegExp.exec(o.cmd, XRegExp(rule.pattern) );
     const xRegExpVariables = getMatches(rule.pattern, \?\((\<[a-z]+\>)/g, 1);
     const oo = {};
     xRegExpVariables.forEach(function(name){
       oo[name] = xRegExpVariables[name];
     });

     if(xRegExpMatch) {
       // Emit rule's event into the "thing".
       universe[rule.thing].emit(rule.event, Object.assign({}, o, oo) );
     }

   }); // for each rule

}
