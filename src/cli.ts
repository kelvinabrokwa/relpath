#!/usr/bin/env node
'use strict';

import { exit } from 'process';
import { relativePath } from './index'
import { copy as copyClipboard } from 'copy-paste';

const args = process.argv.slice(2);
const paths: string[] = [];

let copy = false;

function displayHelp(exitCode = 1) {
    console.log(`
Usage: relpath [options] <from_file> <to_file>\n

Options:
  -h, --help       Display this help message
  -c, --copy       Copy the result to the clipboard

Examples:
  relative-path-tool /path/to/first/file /path/to/second/file
  relative-path-tool -c /path/to/first/file /path/to/second/file
    `);
    exit(exitCode);
}


for (let arg of args) {
    switch (true) {
        case arg === '-c' || arg === '--copy':
            copy = true;
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

const [fromPath, toPath] = paths;
const result = relativePath(fromPath, toPath);

console.log(result);

if (copy) {
    copyClipboard(result);
    console.log(`have written to clipboard for you`);
}