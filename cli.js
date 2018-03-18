#!/usr/bin/env node

/**
 * Module dependencies.
 */

const fs = require('fs');
const path = require('path');


const program = require('commander');

const defaultPort = '4201';
const defaultAddress = '127.0.0.1'//, '0.0.0.0'

program
  .version('0.1.0')
  .option('-a, --address <address>', 'Server address.')
  .option('-p, --port <port>', 'Server port.',);

program
  .command('serve [events]')
  .description('run in server mode')
  .option("-r, --realm [realm]", "Name of realm")
  .action(function(events, options){


    const setup = options||{};
    const {realm = 'Void', address = defaultAddress, port = defaultPort} = setup;

    if(events){
      events = require(events);
    }

    // console.log(`Serving ${realm} on ${address}:${port}`);
    const server = require('./server.js');
    server({events, realm, address, port});

  });

program
  .command('connect')
  .description('Connect to remote server')
  .option("-u, --user [name]", "Name of user")
  .action(function(options){

    const setup = options||{};
    const {user = 'Anon', address = defaultAddress, port = defaultPort} = setup;

    //console.log(`Connecting as ${user} to ${address}:${port}`);
    const client = require('./client.js');
    client({user, address, port});

  });

program.parse(process.argv);
