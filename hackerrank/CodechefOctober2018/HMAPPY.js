let lines=[ [ 5, 3, 0 ], [ 1, 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5 ] ];
let n,m,item,queue,a,b;

function doit(){
    item=[];
    [n,m]=lines[0];
    //console.log("empy size:"+queue.size());
    [a,b]=[lines[1],lines[2]];
    console.log("a:"+a);
    let top=0;
    a.forEach((val,ind)=>{
      top=Math.max(top,val*b[ind]);
    });
    return findCut(top);
}
function findCut(top){
  if (checkNum(0)) return 0;
  let bottom=0
  while(bottom<top-1){
    middle=Math.floor((bottom+top)/2);
    if (checkNum(middle)){
      top=middle;
    } else {
      bottom=middle;
    }
  }
  return top;
}
function checkNum(num){
  let cur=0;
  a.forEach((val,ind)=>{
    let amount=Math.floor(num/b[ind]);
    amount=Math.min(val,amount);
    let residual=val-amount
    cur+=val-amount;
    //console.log("a:"+val+" "+" amount:"+amount+" residual:"+residual+" curM:"+cur);
  })
  return cur<=m;
}
console.log(doit());
//testQueue();
//console.log(doit());
console.log(n,m);


