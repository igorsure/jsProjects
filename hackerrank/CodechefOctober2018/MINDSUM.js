//[ [ 3 ], [ 2, 1 ], [ 9, 3 ], [ 11, 13 ] ]
let dict=[]
function createDict(){
    dict.push([]);
    for(let val=1;val<10;val++) {
        dict.push([]);
        let res=[val];
        //console.log(val);
        for(i=1;i<=100;i++){
            res.push(test(val,i));
        }
        dict[val]=res;

    }
    //dict.forEach(val=>console.log(""+val));
}
function doit(n,m){
    let [start,count]=checkN(n);
    let finish=dict[start][m];
    if (start===finish) return start+" "+count;
    //console.log(start+" "+finish);    
    let cur=0;
    let digs=-1;
    while(digitalSum(digs)!=finish){
        cur+=1;
        n=n+m;
        digs=digitalSum(n);
        //console.log(digs,finish);
    }
    let [digit,counter]=checkN(n);
    cur+=counter
    return finish+" "+cur;

 }
 
function checkN(n){
    if (n<10) return [n,0];
    n=digitalSum(n);
    if (n<10) return [n,1];
    n=digitalSum(n);
    if (n<10) return [n,2];
    return [digitalSum(n),3];
}
function digitalSum(val){
    return (""+val).split("").map(Number).reduce((total,val)=>total+val);
}
function test(start,m){
    //console.log(start,m);
    let res=[start];
    let next=start;
    for(let i=0;i<100;i++){
        next=next+m;
        res.push(checkN(next)[0]);

        //res.push(digitalSum(next));
    }
    let res1=res.reduce((total,val)=>Math.min(total,val));
    return res1;
}
function init(){
    createDict();
    //console.log(dict);
}

function tester(){
    for(let val=1;val<10;val++) {
        let res=[val];
        //console.log(val);
        for(i=1;i<100;i++){
            res.push(test(val,i));
        }
        console.log(""+res);
        console.log("");
    }
}
//tester();
init();
doit(11,13);