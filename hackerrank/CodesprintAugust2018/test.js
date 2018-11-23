// Try edit msg
let lines=[ [ 2 ], [ 2 ], [ 3 ] ];
let times=[];
for(let i=0;i<1500;i++){
   times.push([0,0,0]);
}          
function doit(arr){
    return arr.join(" ");
}
function init(){
    times[0]=[1,0,0];
    let bit,nib,byte,bitN,nibN,byteN;
    for(let i=0;i<=100;i++){
        [bit,nib,byte]=times[i];
        //bit=times[i][0];  
        //nib=times[i][1];  
        //byte=times[i][2]; 
      
        nibN=bit;
        byteN=nib;
        bitN=2*byte;
        modify(i+2,1,nibN);
        modify(i+8,2,byteN);
        modify(i+16,0,byteN);
        //times[i+2][1]+=nibN;
        //times[i+8][2]+=byteN;
        //times[i+16][0]+=bitN;
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
for(let i=0;i<=20;i++){
  console.log(i+":"+times[i]);
}
      
