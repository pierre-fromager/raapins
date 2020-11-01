# Raapins - rapid as rabbit

Raapins is a restful api async server written for nodejs.  
Model uses memory as storage.

## Dependencies

* Newman (let replay Postman's collection in runner mode)
* Async (let play runner in async concurent mode)
* Chai (Unit test)  
* Mocha (Unit test)  

## Dependencies dev

* Babel
* Eslint
* Jsdoc
* Nodemon

## Arch

* http server
* router
* controller
* services

## Workflow

* Server on data request queries router. 
* On router route matches controller action related match. 
* On server request end it registers (data, errors) events listener trough controller. 
* Controller on data, validates verb to service method and register callback with params. 
* Controller execute service callback then fires error or data event. 
* Server on event returns response with code status and cors headers. 

## Start server

Prod (no live build)

``` bash
npm run server
```

Dev (nodemon live build with babel)

``` bash
npm run watch
```

## Endpoints

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

## Load simulation

This simulates 90 concurent requests.  

``` bash
npm run client
```

## Lint

``` bash
npm run lint
```

## Doc

``` bash
npm run doc
```

## Test

``` bash
npm run test
```
No real tests implemented yet but ready for.