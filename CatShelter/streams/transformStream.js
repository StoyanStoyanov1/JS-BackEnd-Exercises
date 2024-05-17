const fs = require('fs');
const { EOL } = require('os');
const zlib = require('zlib');

const readStream = fs.createReadStream('./data/input.txt', {encoding: 'utf-8', highWaterMark: 100});
const wirteSteam = fs.createWriteStream('./data/transformed.txt', {encoding: 'utf-8'});
const gzipTransformStream = zlib.createGzip();

readStream.pipe(gzipTransformStream).pipe(wirteSteam);

