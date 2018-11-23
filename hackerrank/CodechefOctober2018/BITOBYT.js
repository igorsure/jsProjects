// Try edit msg
let lines=[ [ 2 ], [ 2 ], [ 3 ] ];
let times=[];
let curs=[];
for(let i=0;i<1620;i++){
   times.push([0,0,0]);
}          
function doit(arr){
    return arr.join(" ");
}
function init(){
    times[0]=[1,0,0];
    let bit,nib,byte,bitN,nibN,byteN,cur,cur2,cur3;
    for(let i=0;i<=1601;i++){
        [bit,nib,byte]=times[i];
        if (i>0) {
            [cur1,cur2,cur3]=curs[i-1];
            [cur1,cur2,cur3]=[cur1+bit,cur2+nib,cur3+byte];
            if (i>1) cur1-=Math.max(times[i-2][0],0);
            if (i>7) cur2-=Math.max(times[i-8][1],0);
            if (i>15) cur3-=Math.max(times[i-16][2],0);
        } else {
            [cur1,cur2,cur3]=[1,0,0];
        }
        
        curs.push([cur1,cur2,cur3]);
        nibN=bit;
        byteN=nib;
        bitN=2*byte;
        modify(i+2,1,nibN);
        modify(i+8,2,byteN);
        modify(i+16,0,bitN);
    }
}
function modify(ind,bitInd,bitAdd){
  let bit,nid,byte;
  let arr=times[ind];
  arr[bitInd]+=bitAdd;
  times[ind]=arr;
}
init();
//console.log(times);
for(let i=0;i<1601;i++){
    console.log(i+":"+curs[i]);
}
let tests=[2,3].forEach(val=>console.log(curs[val-1]));
      
