
import http from 'http';
import { profiler } from './lib/profiler.js';
import { config } from './lib/config.js';
import { color } from './lib/color.js';
import { dater } from './lib/dater.js';
import { router } from './lib/router.js';
import controller from './lib/controller.js';

const server = http.createServer()
  .listen(config.server.port, config.server.address)
  .setTimeout(config.server.timeout);

controller.setMaxListeners(config.process.maxlisteners);
profiler.add('starting');

router.config({ root: '/' });

const homeRegex = /^home$/;
const statGlob = /^(stat)$/;
const statEnt = /^(stat)\/([a-zA-Z0-9_]{1,10})/;
const apiRegexp = /^api\/v1\/([a-zA-Z0-9_]{1,10})/;
const apiRegexpId = /^api\/v1\/([a-zA-Z0-9_]{1,10})\/(\d*)/;

const noopCb = () => { };

router.add('GET', statEnt, (...args) => {
  controller.setHook(
    {
      service: 'service',
      action: 'svcCount',
      params: {
        entityName: args[1],
        id: '',
      },
    },
  );
})
  .add('GET', statGlob, () => {
    controller.setHook(
      {
        service: 'service',
        action: 'svcCount',
        params: {
          entityName: '*',
          id: '',
        },
      },
    );
  })
  .add('GET', apiRegexpId, noopCb)
  .add('GET', apiRegexp, noopCb)
  .add('POST', apiRegexp, noopCb)
  .add('PUT', apiRegexpId, noopCb)
  .add('PATCH', apiRegexpId, noopCb)
  .add('DELETE', apiRegexpId, noopCb)
  .add('GET', homeRegex, () => {
    console.log('home sweet home');
  });

server.on('request', (req, res) => {
  profiler.add('request');
  if (req.url === '/') {
    req.url = '/home';
  }

  if (config.server.debug) {
    server.getConnections((error, count) => {
      const counter = color.get(` >${count}< `, color.codes.yellow, color.codes.blue);
      process.stdout.write(
        `${dater.getDateTime() + counter}requests \r`,
      );
    });
  }

  let reqRawData = '';

  req.on('data', (rawData) => {
    profiler.add('requestdata');
    reqRawData += rawData;
  });

  req.on('end', () => {
    controller.listen(controller, router.check(req), res, reqRawData);
  });
});
const startMessage = color.get(
  config.getServerStartMessage(),
  color.codes.white,
  color.codes.black,
);
console.log(startMessage);
