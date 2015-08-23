'use strict';
import {parse, format} from 'url';
const numeric = /^[0-9]*$/;
const fqurl = /^https?:\/\//;

export default function (args) {
  let routes = args.map(arg => {
    if (arg.indexOf('=') === -1) arg = `/=${arg}`;
    let [path, ...target] = arg.split('=');
    target = target.join('='); // in case anyone uses silly paths
    if (numeric.test(target)) target = `localhost:${target}`;
    if (!fqurl.test(target)) target = `http://${target}`;
    let urlObj = parse(target);
    let prefix = urlObj.pathname || '/';
    delete urlObj.pathname;
    delete urlObj.path;
    target = format(urlObj);
    return {path, target, prefix};
  });
  routes.sort((a, b) => a.path < b.path ? 1 : a.path == b.path ? 0 : -1);
  return routes;
};
