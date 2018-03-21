

  // evaluate cmd, when finished call: callback(null, cmd.trim());


  const EventEmitter = require('events');

  const things = {};
  const locations = {};
  const inventoryItems = {
    fork: {name:'fork'}
  };

  class World extends EventEmitter {}
  const world = new World();

  class Self extends EventEmitter {}
  const self = new Self();

  class Inventory extends EventEmitter {}
  const inventory = new Inventory();

  inventory.on('examine', ({log, data}) => {
    if( (!data) || (data==='inventory')) {
      log(`Your inventory items: ${Object.keys(inventoryItems)}.`);
    }
  });

  class Location extends EventEmitter {}

  locations.home = new Location();
  locations.home.on('examine', ({cmd, log, data}) => {
    if( (!data) || (data==='room')) {
      log(`You are home, there is a lobby here.`);
    }
  });

  locations.lobby = new Location();
  locations.lobby.on('examine', ({log, data}) => {
    if( (!data) || (data==='room')) {
      setTimeout(function(){
        log(`You are in the lobby, you can go home from here.`);
      }, 1000 );
    }
  });


  // GOTO
  Object.keys(locations).forEach(locationName => {
    locations[locationName].on('go', ({log, data}) => {
      console.log( data)
      if(locations[data]){
        things.location = locations[data];
      }else{
        log(`Unknown location: "${data}"`)
      }
    });
  });


  self.on('examine', ({log, data}) => {
    if( (!data) || (data==='self')) {
      log('You look very handsome.');
    }
  });



things.self = self;
things.inventory = inventory;
things.location = locations.lobby;





module.exports = function(o){

   const rules = [];

   rules.push({ event:'examine', thing:'self',      });
   rules.push({ event:'examine', thing:'inventory', });

   rules.push({ event:'examine', thing:'location',  });
   rules.push({ event:'go'   , thing:'location',  });


   rules.forEach(rule=>{

     if(o.cmd.startsWith(rule.event)) {
       // Emit rule's event into the "thing".
       console.log(rule)
       if( things[rule.thing] && things[rule.thing].emit){
         things[rule.thing].emit(rule.event, Object.assign({}, o, {data: o.cmd.substring((rule.event.length+1))}) );
       }else{
         o.log(`Unknown thing: "${rule.thing}"`)
       }
     }

   }); // for each rule

}
