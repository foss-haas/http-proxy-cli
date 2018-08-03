'use strict';
import http from 'http';
import {resolve, relative} from 'path';
import {parse as parseUrl} from 'url';
import httpProxy from 'http-proxy';
import yargs from 'yargs';
import parseRoutes from './parse-routes';
import dedent from './dedent';
import parseHeaders from './parse-headers';

export default function (args) {
  let argv = yargs
  .usage('Usage: $0 [options] [ROUTES]...')
  .example('$0 8080', dedent(`
    Forwards all requests to the server listening on localhost:8080.
  `))
  .example('$0 192.168.0.1:8080/app', dedent(`
    Forwards all requests to the server listening on 192.168.0.1:8080/app.

    Ex: GET /hello => http://192.168.0.1:8080/app/hello
  `))
  .example('$0 -H https://www.google.co.uk', dedent(`
    Forwards all requests to the server listening on www.google.co.uk via HTTPS.

    Ex: GET / => https://www.google.co.uk/
  `))
  .example('$0 /static=192.168.0.1:8080 3000', dedent(`
    Forwards all requests starting with /static to the server listening on 192.168.0.1:8080
    and all other requests to the server listening on localhost:3000.

    Ex: GET /static/script.js => http://192.168.0.1:8080/script.js
  `))
  .example('$0 -H "X-Remote-User: admin" 8080', dedent(`
    Forwards all requests to the server listening on localhost:8080
    and sets the X-Remote-User header to "admin".
  `))
  .demand(1, 'Must pass at least one route-URL mapping.')
  .string('_')
  .describe('port', 'Set the port to listen on.')
  .default('port', 8000)
  .alias('port', 'p')
  .describe('hostname', 'Set the hostname to listen on.')
  .default('hostname', 'localhost')
  .alias('hostname', 'h')
  .describe('header', 'Set a specific header.')
  .alias('header', 'H')
  .describe('proxyHost', 'Set Host HTTP header to proxy hostname.')
  .alias('proxyHost', 'P')
  .boolean('proxyHost')
  .describe('secure', 'Set if you want to verify the SSL Certs')
  .alias('secure', 's')
  .boolean('secure')
  .default('secure', true)
  .describe('verbose', 'More output. Can be specified up to four times for max output.')
  .alias('verbose', 'v')
  .count('verbose')
  .version(() => require('../package.json').version)
  .help('help')
  .alias('help', '?')
  .parse(args);

  const routes = parseRoutes(argv._);
  const headers = parseHeaders(argv.header);

  var proxy = httpProxy.createProxyServer({ secure: argv.secure });
  http.createServer(function (req, res) {
    if (argv.verbose >= 4) console.log(req);
    let url = req.url;
    for (let i = 0; i < routes.length; i++) {
      let route = routes[i];
      if (url.indexOf(route.path) === 0) {
        req.url = resolve(route.prefix, relative(route.path, url));
        if (argv.verbose) console.log(`${req.method} ${url} => ${route.target}${req.url}`);
        if (argv.proxyHost) req.headers.host = parseUrl(req.url).hostname;
        Object.keys(headers).forEach(key => {
          req.headers[key] = headers[key];
        });
        proxy.web(req, res, {target: route.target}, function (err, resp) {
          if (err) console.error(err.stack);
          else if (argv.verbose >= 3) console.log(resp);
        });
        break;
      }
      if (argv.verbose >= 2) console.log(`${url} does not match ${route.path}`);
    }
  })
  .listen(argv.port, argv.hostname, err => {
    if (!err && argv.verbose) console.log(`Proxy listening on ${argv.hostname}:${argv.port}`);
    if (!err) return;
    console.error(err.stack);
    process.exit(1);
  });
};
