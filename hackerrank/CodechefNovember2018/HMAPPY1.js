process.stdin.resume();
process.stdin.setEncoding("utf8");

// your code goes here
var readline = require("readline");
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});
let lines = [];
//let a = [1, 1, 0, 1, 1, 0, 1, 1, 1];
let a=[1, 1, 0, 1, 1]
let s = "?!?!?";
let srt = [[0, 0]];
let results = [];
function init(a) {
  //console.log(a);
  let b = [...a, ...a];
  let curr = 0;
  let start = -1;
  for (let i = 0; i < b.length; i++) {
    if (i === 0 && b[i] === 1 && b[a.length - 1] === 1) continue;
    if (start == -1 && b[i] === 0) continue;
    if (start >= a.length) break;
    if (b[i] === 0) {
      add(curr, start);
      start = -1;
      curr = 0;
    } else {
      if (start === -1) {
        curr = 1;
        start = i;
      } else {
        curr++;
      }
    }
    //console.log("  ", i, start, curr);
    results = a.map((val, ind) => getSpl(ind, a.length));
  }
  if (start < a.length && start > -1) add(Math.min(curr, a.length), start);
  //console.log(srt);
  srt.sort((val1, val2) => {
    return val2[0] - val1[0];
  });
  ///console.log(srt);
  srt.splice(2);
  //console.log(srt);
}
function add(curr, currInd) {
  srt.push([curr, currInd]);
}
function doit(line) {
  return line;
}
function getSpl(split, n) {
  let splt = getSpliter(split, n);
  return getSplit(splt, n);
}
function getSpliter(split, n) {
  let [len, start] = srt[0];
  let from = start;
  let to = start + len - 1;
  if (split + n >= from && split + n <= to) return split + n;
  return split;
}
function getSplit(split, n) {
  let [len, start] = srt[0];
  let from = start;
  let to = start + len - 1;
  if (split < from || split > to) return len;
  let arr = [];
  arr.push(srt[1][1]);
  arr.push(to - split + 1);
  arr.push(split - from);
  arr.sort((val1, val2) => val2 - val1);
  //console.log(from, to, split, len, arr);
  return arr[0];
}
function processString(str, n) {
  let cur = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "!") cur = (cur + 1) % n;
    else console.log(results[cur]);
    //console.log(i + " " + cur);
  }
}
init(a);
results = a.map((val, ind) => getSpl(ind, a.length));
processString(s, a.length);
