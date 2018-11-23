let lines = [[2, 1, 2]];
let lns1 = [];
let lns2 = [];
let res = [];
function init() {
  lns2[0] = 1;
  lns1[0] = 1;
  for (let i = 1; i <= 28; i++) {
    lns2[i] = lns2[i - 1] * 2;
    lns1[i] = 1;
    if (i > 2) {
      if (i % 2 === 1) {
        lns1[i] = 1 + 2 * lns1[i - 1];
      } else {
        lns1[i] = 2 * lns1[i - 1] - 1;
      }
    }
    res.push(lns1[i]);
    res.push(lns2[i]);
  }
}
init();
function doit(num) {
  return [lns1[num], lns2[num]];
}
console.log(res);
console.log(doit(1));
console.log(doit(2));
