# Raapins - rapid as rabbit

Raapins is a deadly simple restful api async server using memory as storage.  

## Dependencies

* Async
* Newman

## Arch

* server
* router
* controller
* service <- (serviceStat)
* serviceStat <- (serviceManager)
* serviceManager

## Workflow

Server on data request queries router.  
On router route matches controller action related match.  
On server request end it registers (data, errors) events listener trough controller.  
Controller on data, validates verb to service method and register callback with params.  
Controller execute service callback then fires error or data event.  
Server on event returns response with code status and cors headers.  

## Perf
response time average is around 30ms.  

## Start

```bash
npm run server
```

## Pathname

http://{host}/api/v1/{entity}/{id}

http://{host}/stat/{entity}

* {entity} is mandatory
* {id} is optional for get, mandatory for other verbs.

## Verbs

* **Get** return either an item or a collection entity in no hook case.
* **Post** add an item entity.
* **Delete** remove an item.
* **Put** replace item content.
* **Patch** update an item.

## Todo

#### Implementation

* App
* Model
* Mocha test suite

#### Extension

* Storage adapter (Sql, Redis)

## Tests

#### Purpose

In src/tests you can play with client.js.  
Some required dependencies should be satisfied, mainly async and newman; use npm i.  
This simulates by default 90// requests.

#### Features

Newman let you replay Postman's collection in runner mode.  
Async let you play runner in async mode (//).  

#### Settings

Ensure that postman collection and environnement match your config server @ip and port settings.

#### Client load test

```bash
npm run client
```

#### Doc

```bash
npm run doc
```
