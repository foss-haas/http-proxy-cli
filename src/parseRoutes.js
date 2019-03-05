"use strict";
const { parse, format } = require("url");
const numeric = /^[0-9]*$/;
const fqUrl = /^https?:\/\//;

module.exports = function(args) {
  const routes = args.map(arg => {
    if (arg.indexOf("=") === -1) arg = `/=${arg}`;
    const [path, ...tail] = arg.split("=");
    let target = tail.join("="); // in case anyone uses silly paths
    if (numeric.test(target)) target = `localhost:${target}`;
    if (!fqUrl.test(target)) target = `http://${target}`;
    const urlObj = parse(target);
    const prefix = urlObj.pathname || "/";
    delete urlObj.pathname;
    delete urlObj.path;
    return { path, target: format(urlObj), prefix };
  });
  routes.sort((a, b) => (a.path < b.path ? 1 : a.path == b.path ? 0 : -1));
  return routes;
};
