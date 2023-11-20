#!/usr/bin/env node
'use strict';

import { exit } from 'process';
import { relativePath } from './index'

const args = process.argv.slice(2);
const paths: string[] = [];

let reverse = false, copy = false;

function displayHelp(exitCode = 1) {
    console.log(`
    Usage: relpath [options] <from_file> <to_file>\n
    
    Options:
    -h, --help       Display this help message
    -r, --reverse    Reverse the order of the paths

Examples:
  relative-path-tool /path/to/first/file /path/to/second/file
  relative-path-tool -r /path/to/first/file /path/to/second/file
    `);
    exit(exitCode);
}


for (let arg of args) {
    switch (true) {
        case arg === '-r' || arg === '--reverse':
            reverse = true;
            break;
        case arg === '-h' || arg === '--help':
            displayHelp(1);
            break;
        default:
            paths.push(arg)
            break;
    }
}

if (paths.length !== 2) {
    console.error('You must provide exactly two paths.');
    displayHelp(1);
}

if (reverse) paths.reverse();

const [fromPath, toPath] = paths;
const result = relativePath(fromPath, toPath);

console.log(result);
