let lines=[ [ 2 ],
  [ 5, 1 ],
  [ 3, 5, 2, 4, 5 ],
  [ 6, 4 ],
  [ 6, 5, 4, 3, 2, 1 ] ]

function init(){
    let q=lines[0][0];
    for(let i=0;i<q;i++){
        let [n,k]=lines[2*i+1];
        let scores=lines[2*i+2];
        console.log(doit(n,k,scores));
    }
}
function doit(n,k,scores){
    scores.sort((a,b)=>b-a);
    let cur=k-1;
    let curval=scores[cur];
    while(cur<n-1){
        //console.log(" compare:"+scores[cur+1]+" "+scores[cur]);
        if (scores[cur+1]==scores[cur]) cur++;
        else  return cur+1;
    }
    return n;
}
init();