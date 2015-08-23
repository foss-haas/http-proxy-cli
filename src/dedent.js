'use strict';

export default function (str) {
  let lines = str.split('\n').slice(1, -1);
  let spaces = lines[0].match(/^\s+/)[0].length;
  return lines.map(line => line.slice(spaces) || '\n').join(' ').replace(/( \n )/g, '\n');
};
