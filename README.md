# Raapins

Raapins is a deadly simple restful api async server using memory as storage.

No external dependencies required.

## Archi

* server
* controller
* service

## Workflow

Server on data request collects datas.

On end it registers (data, erros) events listener trough controller.

Controller on data, validates verb to service method and register callback with params.

Controller execute service callback then fires error or data event.

Server on event returns response with code status and cors headers.


## Start

node server.js

## Pathname

http://host/{entity}/{id}

* {entity} is mandatory
* {id} is optional for get, mandatory for other verbs.


## Verbs

### Get

returns either an item or a collection entity.

### Post

Adds an item entity.

### Delete

Remove an item.

### Put

Update an item.

## Todo

### Create

* App
* Config
* Entity

### Modify

* Service methods

### Extension

* Model
* Sql storage
* Redis storage

## Tests

### Purpose

For testing purpose in src/tests you can play with client.js.

Some required dependencies should be satisfied, mainly async and newman.

This simulate // request load connections.

### Features

Newman let you replay Postman's usecase collection as runner.
Async let you play runner in async mode (//). 

### Settings

Ensure that postman collection and environnement match your config server @ip and port settings.

### Client test
node client.js