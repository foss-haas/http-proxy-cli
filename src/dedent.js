"use strict";

module.exports = function(str) {
  const lines = str.split("\n").slice(1, -1);
  const spaces = lines[0].match(/^\s+/)[0].length;
  return lines
    .map(line => line.slice(spaces) || "\n")
    .join(" ")
    .replace(/( \n )/g, "\n");
};
