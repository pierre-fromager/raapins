# Raapins - rapid as rabbit

Raapins is a deadly simple restful api async server using memory as storage.  

## Dependencies

* Newman (replay Postman's collection in runner mode)
* Async (play runner in async concurent mode)

## Arch

* server
* router
* controller
* service <- (serviceStat)
* serviceStat <- (serviceManager)
* serviceManager

## Workflow

* Server on data request queries router.  
* On router route matches controller action related match.  
* On server request end it registers (data, errors) events listener trough controller.  
* Controller on data, validates verb to service method and register callback with params.  
* Controller execute service callback then fires error or data event.  
* Server on event returns response with code status and cors headers.  

## Perf
response time average is around 30ms.  

## Start

```bash
npm run server
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

```bash
npm run client
```

## Doc

```bash
npm run doc
```
