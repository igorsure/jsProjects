let lines=[ [ 4, 3 ], [ 0, 0, 5 ], [ 8, 3, 2 ],[5,7,8],[1,2,3], [ 0 ], [ 10 ], [ 20 ] ];
let n,q;
let circles=[];
let dists=[];
let lefts=[];
let rights=[];
//console.log(doit(0));
//console.log(doit(10));
//console.log(doit(20));

class Circle{
    constructor(x,y,r){
        this.x=x;
        this.y=y;
        this.r=r;

    }
    getDist(circle){
        let xx=this.x-circle.x;
        let yy=this.y-circle.y;
        return Math.sqrt(xx*xx+yy*yy); 
    }
}

function init(){
    [n,q]=lines[0];
    for(let i=1;i<=n;i++){
        circles.push(new Circle(...lines[i]))
    }
    //console.log(circles);
    circles.forEach((circleX,indX)=>{
        //let dst=new Array(n).fill(0);
        circles.forEach((circleY,indY)=>{
            if (indY>indX) {
                let d1= circleX.getDist(circleY);
                let maxR=Math.max(circleX.r,circleY.r);
                let minR=Math.min(circleX.r,circleY.r);
                if (maxR>(d1+minR)){
                    //dst[indY]=[d1,maxR-minR,maxR+minR];
                    lefts.push(maxR-minR);
                    rights.push(maxR+minR) 
                }
                else {
                    //dst[indY]=[d1,Math.max(0,d1-circleX.r-circleY.r),d1+circleX.r+circleY.r];
                    lefts.push(Math.max(0,d1-circleX.r-circleY.r));
                    rights.push(d1+circleX.r+circleY.r);
                }
            }    
        });
        //dists.push(dst);
    })
    lefts.sort((a,b)=>a-b);
    rights.sort((a,b)=>a-b);
    //console.log(dists);
    //console.log(lefts)
    //console.log(rights);
    for(let i=n+1;i<=n+q;i++){
        console.log(doit1(lines[i][0]));
    }
}

function doit1(val){
    let kol1=getLeft(val);
    let kol2=getRight(val);
    return kol1-kol2;
}
function getLeft(val){
    if (lefts[lefts.length-1]<=val) return lefts.length;
    if (lefts[0]>val) return 0;
    let bottom=0;
    let top=lefts.length-1;
    while(bottom<top-1){
        let middle=Math.floor((top+bottom)/2);
        lefts[middle]<=val?bottom=middle:top=middle;
    }
    return bottom+1;
}
function getRight(val){
    if (rights[rights.length-1]<val) return rights.length;
    if (rights[0]>=val) return 0;
    let bottom=0;
    let top=rights.length-1;
    while(bottom<top-1){
        let middle=Math.floor((top+bottom)/2);
        rights[middle]<val?bottom=middle:top=middle;
    }
    return bottom+1;
}

function doit(val){
    let res=0;
    dists.forEach((row,indX)=>{
        row.forEach((dist,indY)=>{
            if (indY>indX){
                if (val>=dist[1] && val<=dist[2]){
                    res++;    
                }
            }
        })
    });
    return res;
}
init();
//console.log(dists);
//console.log(doit(0));
//console.log(doit(10));
//console.log(doit(14));
//console.log(doit(15));
//console.log(doit(20));
