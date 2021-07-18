
const fs = require('fs');

let minified = fs.readFileSync("./main.min.js", {encoding: 'utf-8'}).replace(/"/g, "'");

let readmeTxt = fs.readFileSync("./README.md", {encoding: 'utf-8'});
readmeTxt = readmeTxt.replace(/(```\r?\njavascript:)([\s\S]+)(\r?\n```)/, `$1${minified}$3`);

let indexTxt = fs.readFileSync("./index.html", {encoding: 'utf-8'});
indexTxt = indexTxt.replace(/(<a href="javascript:)([^"]+)(">)/, `$1${minified}$3`);

fs.writeFileSync("./index.html", indexTxt, {encoding: 'utf-8'});
fs.writeFileSync("./README.md", readmeTxt, {encoding: 'utf-8'});
