# event-server
Serve node EventEmitter events over networks.

## Installation

npm -g i event-server

## Run Server

event-server serve

## Connect to Server

event-server connect

## Sample Example

./cli.js serve -r Universe ./examples/mud-two.js

Note mud two is a two token text evaluator where the first token is an event name
and what remains is event data (.data). This is meant for quick type devices where
input is a list of one or more words presented on screen (think Apple Finder or DoT UI).

Expected input ```goto lobby```, ```examine```, ```examine self```
