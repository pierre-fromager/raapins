
import http from 'http';
import { profiler } from './lib/profile/profiler.js';
import { config } from './lib/conf/config.js';
import { color } from './lib/term/color.js';
import { dater } from './lib/date/dater.js';
import { router } from './lib/net/router.js';
import { verbs } from './lib/net/verbs.js';
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

router.add(verbs.get, statEnt, (...args) => {
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
  .add(verbs.get, statGlob, () => {
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
  .add(verbs.get, apiRegexpId, noopCb)
  .add(verbs.get, apiRegexp, noopCb)
  .add(verbs.post, apiRegexp, noopCb)
  .add(verbs.put, apiRegexpId, noopCb)
  .add(verbs.patch, apiRegexpId, noopCb)
  .add(verbs.delete, apiRegexpId, noopCb)
  .add(verbs.get, homeRegex, () => {
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
        `${dater.getDateTime() + counter} requests \r`,
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
