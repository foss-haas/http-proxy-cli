**http-proxy-cli** is a CLI wrapper for the [http-proxy](https://www.npmjs.com/package/http-proxy) module.

[![license - MIT](https://img.shields.io/npm/l/http-proxy-cli.svg)](http://foss-haas.mit-license.org) [![Dependencies](https://img.shields.io/david/foss-haas/http-proxy-cli.svg)](https://david-dm.org/foss-haas/http-proxy-cli)

[![NPM status](https://nodei.co/npm/http-proxy-cli.png?compact=true)](https://www.npmjs.com/package/http-proxy-cli)

# Install

## With NPM

```sh
npm install -g http-proxy-cli

http-proxy --help
```

## From source

```sh
git clone https://github.com/foss-haas/http-proxy-cli.git
cd http-proxy-cli
npm install
npm run dist
```

# CLI

```
$ http-proxy --help

Usage: http-proxy [options] [ROUTES]...

Options:
  --port, -p       Set the port to listen on.                    [default: 8000]
  --hostname, -h   Set the hostname to listen on.         [default: "localhost"]
  --header, -H     Set a specific header.
  --corsDisable    Disable CORS by automaticcally handle OPTION request. 
                   Use --no-corsDisable to disable this feature    
                                                        [boolean][default: true]
  --proxyHost, -P  Set Host HTTP header to proxy hostname.             [boolean]
  --verify         Verify SSL certificates. Use --no-verify to disable.
                                                       [boolean] [default: true]
  --verbose, -v    More output. Can be specified up to four times for maximum
                   output.                                               [count]
  --version        Show version number                                 [boolean]
  --help, -?       Show help                                           [boolean]

Examples:
  http-proxy 8080                           Forwards all requests to the server
                                            listening on localhost:8080.
  http-proxy 192.168.0.1:8080/app           Forwards all requests to the server
                                            listening on 192.168.0.1:8080/app.
                                            Ex: GET /hello =>
                                            http://192.168.0.1:8080/app/hello
  http-proxy -P https://www.google.co.uk    Forwards all requests to the server
                                            listening on www.google.co.uk via
                                            HTTPS.
                                            Ex: GET / =>
                                            https://www.google.co.uk/
  http-proxy /static=192.168.0.1:8080 3000  Forwards all requests starting with
                                            /static to the server listening on
                                            192.168.0.1:8080 and all other
                                            requests to the server listening on
                                            localhost:3000.
                                            Ex: GET /static/script.js =>
                                            http://192.168.0.1:8080/script.js
  http-proxy -H "X-Remote-User: admin" 8000 Forwards all requests to the server
                                            listening on localhost:8080 and sets
                                            the X-Remote-User header to "admin".
```

# License

The MIT/Expat license. For more information, see http://foss-haas.mit-license.org/ or the accompanying [LICENSE](https://github.com/foss-haas/http-proxy-cli/blob/master/LICENSE) file.
