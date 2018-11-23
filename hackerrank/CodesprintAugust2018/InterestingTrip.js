'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the solve function below.
function solve(n, roads, names, s, f) {


}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nm = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(nm[0], 10);

    const m = parseInt(nm[1], 10);

    const names = readLine();

    let roads = Array(m);

    for (let i = 0; i < m; i++) {
        roads[i] = readLine().replace(/\s+$/g, '').split(' ').map(roadsTemp => parseInt(roadsTemp, 10));
    }

    const sf = readLine().replace(/\s+$/g, '').split(' ');

    const s = parseInt(sf[0], 10);

    const f = parseInt(sf[1], 10);

    const result = solve(n, roads, names, s, f);

    ws.write(result + '\n');

    ws.end();
}
