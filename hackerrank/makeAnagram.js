'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the makeAnagram function below.
function makeAnagram(a, b) {
    let a1=getMap(a);
    let b1=getMap(b);
    let d1=getDiff(a,b1);
    let d2=getDiff(b,a1);
    console.log(a1+" "+b1);
    console.log(d1+" "+d2);
    return d1+d2;
}
function getDiff(str,map){
    let res=0;
    for(let i=0;i<str.length;i++){
        if (map[str[i]]) map[str[i]]-=1;
        else res+=1;
    }
    return res;
}
function getMap(a){
    const res={};
    for(let i=0;i<a.length;i++){
        if (res[i]) res[i]+=1;
        else res[i]=1;
    }
    return res
}
function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const a = readLine();

    const b = readLine();

    const res = makeAnagram(a, b);

    ws.write(res + '\n');

    ws.end();
}

main();