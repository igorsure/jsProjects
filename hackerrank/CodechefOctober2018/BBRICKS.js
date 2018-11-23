let lines=[ [ 1 ], [ 1000, 500] ];
let n,k;
let q=lines[0][0];
let path;
let mult=1000000007;
for(let i=1;i<=q;i++){
    [n,k]=lines[i];
    init(n,k);
    console.log(doit());
}
function init() {
    path=[];
    for(let i=0;i<=n;i++){
        let bricks=[];
        for (let j=0;j<=k;j++){
            bricks.push([0,0,0]);
        }
        path.push(bricks);
    }
    
}
function doit(){
    path[0][k]=[1,0,0];
    for(let i=1;i<=n;i++){
        for(let j=k;j>=0;j--){
            let [empty,first,second]=path[i-1][j];
            path[i][j][0]=(path[i][j][0]+empty+first+second)%mult;
            if (j>0) {
                path[i][j-1][1]=(path[i][j-1][1]+empty+second)%mult;
                path[i][j-1][2]=(path[i][j-1][2]+empty+first)%mult;
            }

        }
    }
    //console.log(path);

    let res=path[n][0].reduce((total,val)=>total=(total+val)%mult,0);
    return res;
}
function doit1(){
    path1=[];
    path2=[];
    for(let i=0;i<k;i++){
        path1.push([0,0,0]);
    }
    path1[k]=[1,0,0];
    for(let i=1;i<=n;i++){
        path2=[];
        for(let i=0;i<=k;i++){
            path2.push([0,0,0]);
        }
        for(let j=k;j>=0;j--){
            let [empty,first,second]=path1[j];
            path2[j][0]=(path1[j][0]+empty+first+second)%mult;
            if (j>0) {
                path2[j-1][1]=(path1[j-1][1]+empty+second)%mult;
                path2[j-1][2]=(path1[j-1][2]+empty+first)%mult;
            }

        }
        path1=path2;
    }
    //console.log(path);

    let res=path1[0].reduce((total,val)=>total=(total+val)%mult,0);
    return res;
}
//path.forEach(element => {
   // console.log(element[0].reduce((total,val)=>total=total+val,0));    
//});
//path[n][0].reduce((total,val)=>total=(total+val)%mult,0);
