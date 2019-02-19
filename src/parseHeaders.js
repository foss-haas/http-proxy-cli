"use strict";

module.exports = function(headers) {
  if (!headers) return {};
  if (!Array.isArray(headers)) headers = [headers];
  const obj = {};
  headers.forEach(header => {
    const match = header.match(/^([^:]+):\s*(.+)$/);
    if (!match)
      throw new Error(`Not a well-formed header: ${JSON.stringify(header)}`);
    const [key, value] = match.slice(1);
    if (obj[key]) {
      if (Array.isArray(obj[key])) obj[key].push(value);
      else obj[key] = [obj[key], value];
    } else obj[key] = value;
  });
  return obj;
};
