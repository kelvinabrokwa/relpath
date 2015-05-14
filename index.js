#!/usr/bin/env node
'use strict';

var fs = require('fs'),
    path = require('path');

var f1 = process.argv[2],
    f2 = process.argv[3];

if (!(f1 && f2)) {
  console.log('\n  Usage: relpath <from_file> <to_file>\n');
  process.exit();
}

var p = path.relative(f1, f2);
console.log(p);
