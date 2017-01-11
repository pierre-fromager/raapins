# Raapins
![Rapid as rabbit](http://static.pier-infor.fr/img/raapins/logo.jpg)  
Raapins is a deadly simple restful api async server using memory as storage.  
No external dependencies required.

## Arch

* server
* controller
* service
* serviceManager

## Workflow

Server on data request collects datas.  
On end it registers (data, errors) events listener trough controller.  
Controller on data, validates verb to service method and register callback with params.  
Controller execute service callback then fires error or data event.  
Server on event returns response with code status and cors headers.  

##Perf
Its response is around 25ms.  

## Start

```bash
node server.js
```

## Pathname

http://host/{entity}/{id}

* {entity} is mandatory
* {id} is optional for get, mandatory for other verbs.


## Verbs

* **Get** return either an item or a collection entity.
* **Post** add an item entity.
* **Delete** remove an item.
* **Put** replace item content.
* **Patch** update an item.

## Todo

#### Create

* App
* Router
* Entity

#### Extension

* Model
* Storage adapter (Sql, Redis)

## Tests

#### Purpose

In src/tests you can play with client.js.  
Some required dependencies should be satisfied, mainly async and newman; use npm i.  
This simulates by default 100// requests.

#### Features

Newman let you replay Postman's collection in runner mode.  
Async let you play runner in async mode (//).  

#### Settings

Ensure that postman collection and environnement match your config server @ip and port settings.

#### Client test

```bash
node client.js
```