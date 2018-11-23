let lines=[ [ '8', '8' ],
[ '00101010' ],
[ '00010101' ],
[ '10101010' ],
[ '01010101' ],
[ '10101010' ],
[ '01010101' ],
[ '10101010' ],
[ '01010101' ],
[ '4' ],
[ '1', '2', '0', '1001' ] ];
 let n,m,board,invs,brdMap,brdMapH,brdMapV,invList;
 init();
 console.log(doit(1));
 console.log(doit(2));
 console.log(doit(0));
 console.log(doit(1001));
 function init(){
    [n,m]=lines[0].map(Number);
    invs=lines[lines.length-1].map(Number);
    board=lines.splice(1,n).map(val=>val[0].split(''));
    board=board.map(row=>row.map(Number));
    initBrdMapLight();
    initInvList();
    //logs();

  }
  function initInvList(){
    invList=new Array(n*m+1).fill(0);
    let sizeMap={};
    
    for(let i=0;i<board.length;i++){
      for(let j=0;j<board[0].length;j++) {
        let szs=brdMap[i+" "+j];
        for(let size=1;size<szs.length;size++){
            //let res=makeChessBoard(j,i,size);
            let [odd,even,oddAmount,evenAmount]=szs[size];
            let res=calcInversions(odd,even,oddAmount,evenAmount);
            if (!sizeMap[res]) sizeMap[res]=size;
            sizeMap[res]=Math.max(sizeMap[res],size);
        }
      }
    }
    Object.keys(sizeMap).forEach((key)=>{
      invList[key]=sizeMap[key];
    })
    //console.log(invList);
    let curval=invList[0];
    for(let i=1;i<invList.length;i++){
        if (invList[i]===0) invList[i]=invList[i-1];
    }
  }
  function initBrdMap(){
    brdMap={};
    for(let row=0;row<board.length;row++){
      for(let col=0;col<board[0].length;col++){
        const maxSize=Math.min(board.length-row,board[0].length-col);
        for(let size=1;size<=maxSize;size++){
            let res=makeChessBoard(row,col,size);
            brdMap[row+" "+col+" "+size]=res;
        }
      }
    }

  }
  function initBrdMapLight(){
    //console.log("initBrdLight");
    brdMap={};
    brdMapH={};
    brdMapV={};
    initBrdMapV();
    initBrdMapH();
    //console.log(brdMapV);
    for(let row=0;row<board.length;row++){
      let [odd,even,oddAmount,evenAmount]=[0,0,0,0];
      (row%2===0)?even=board[row][0]:odd=board[row][0];
      (row%2===0)?evenAmount=1:oddAmount=1;
      //console.log("row setup",row,oddAmount,evenAmount);
      brdMap[row+" 0"]=[[0,0,0,0],[odd,even,oddAmount,evenAmount]];
       //console.log("row setup",brdMap[row+" 0"]);
      }
    for(let col=0;col<board[0].length;col++){
      let [odd,even,oddAmount,evenAmount]=[0,0,0,0];
      (col%2===0)?even=board[0][col]:odd=board[col][0];
      (col%2===0)?evenAmount=1:oddAmount=1;
      brdMap["0 "+col]=[[0,0,0,0],[odd,even,oddAmount,evenAmount]];
    }
    for(let row=0;row<board.length;row++){
      for(let col=0;col<board[0].length;col++){
        const maxSize=Math.min(board.length-row,board[0].length-col);
        let [odd,even,oddAmount,evenAmount]=[0,0,0,0];
        //console.log("odd:"+odd);
        ((row+col)%2===0)?even=board[row][col]:odd=board[row][col];
        ((row+col)%2===0)?evenAmount=1:oddAmount=1;
        brdMap[row+" "+col]=[[0,0,0,0],[odd,even,oddAmount,evenAmount]];
        //console.log("row,col:",row,col,odd,even);
        for(let size=2;size<=maxSize;size++){
            let [odd1,even1,oddAmount1,evenAmount1]=brdMap[row+" "+col][size-1];
            let right=col+size-1;
            let bottom=row+size-1;
            let [odd2,even2,oddAmount2,evenAmount2]=getSegmentV(right,row,bottom);
            let [odd3,even3,oddAmount3,evenAmount3]=getSegmentH(bottom,col,right-1);
           //console.log([row,col,size],[odd2,even2,oddAmount2,evenAmount2]);
             //[odd2,even2,oddAmount2,evenAmount2]=brdMapV[row+" "+right][size];
            //let [odd3,even3,oddAmount3,evenAmount3]=brdMapH[bottom+" "+col][size-1];
            //console.log([row,col,size],[odd2,even2,oddAmount2,evenAmount2]);
            //let [odd2,even2,oddAmount2,evenAmount2]=getSegmentV(col,row,bottom);
            //let [odd3,even3,oddAmount3,evenAmount3]=getSegmentH(row,col,right);
            //console.log(row,col,[odd1,even1],[odd2,even2],[odd3,even3]);
            brdMap[row+" "+col].push([odd1+odd2+odd3,even1+even2+even3,oddAmount1+oddAmount2+oddAmount3,evenAmount1+evenAmount2+evenAmount3]);
        }
      }
    }
    //console.log(brdMap);
  }
  function getSegmentV(col,top,bottom){
    let [o1,e1,oa1,ea1]=brdMapV[0+" "+col][bottom+1];
    let [o2,e2,oa2,ea2]=brdMapV[0+" "+col][top];
    //console.log("getSegmentV1: bottom+1",[bottom+1],[o1,e1,oa1,ea1]);
    //console.log("getSegmentV2: top     ",[top],[o2,e2,oa2,ea2]);
  //  console
    return [o1-o2,e1-e2,oa1-oa2,ea1-ea2];
  }
  function getSegmentH(row,left,right){
    let [o1,e1,oa1,ea1]=brdMapH[row+" "+0][right+1];
    let [o2,e2,oa2,ea2]=brdMapH[row+" "+0][left];
    return [o1-o2,e1-e2,oa1-oa2,ea1-ea2];
  }
  function initBrdMapH(){
    //console.log("initBrdMapH");
    let col=0;
    for(let row=0;row<board.length;row++){
        initBrdMapHItem(row,col);
    }
    //console.log(brdMapH);
  }

  function initBrdMapHItem(row,col){
    let odd=0;
    let even=0;
    let oddAmount=0;
    let evenAmount=0;
    let curcol=col;
    let res=[[0,0,0,0]];
    while(curcol<m){
        let val=board[row,curcol];
        if ((row+curcol)%2===0) {
          even+=board[row][curcol];
          evenAmount++;
        } else {
          odd+=board[row][curcol];
          oddAmount++;
        }
        res.push([odd,even,oddAmount,evenAmount]);
        curcol++;
    }
    brdMapH[row+" "+col]=res;
  }

  function initBrdMapV(){
    brdMapV={};
    let row=0;
    for(let col=0;col<board[0].length;col++){
      initBrdMapVItem(row,col);
    }
  }
  function initBrdMapVItem(row,col){
    let odd=0;
    let even=0;
    let oddAmount=0;
    let evenAmount=0;
    let currow=row;
    let res=[[0,0,0,0]];
    while(currow<n){
        let val=board[currow,col];
        if ((currow+col)%2===0) {
          even+=board[currow][col];
          evenAmount++;
        } else {
          odd+=board[currow][col];
          oddAmount++;
        }
        res.push([odd,even,oddAmount,evenAmount]);
        currow++;
    }
    brdMapV[row+" "+col]=res;
  }

  
  function doit(size_limit){
    if (size_limit>=invList.length)
      return invList[invList.length-1];
    return invList[size_limit];
 
  }
  function logs(){
    console.log(board);
    //console.log(invs);
    //console.log(brdMap);
    console.log(calcInversions(...blacks));

  }
  
  function calcInversions(odd,even,oddAmount,evenAmount){
    //console.log("calcInversions;",odd,even,oddAmount,evenAmount);
    let val1=odd+evenAmount-even;
    let val2=even+oddAmount-odd;
    return Math.min(val1,val2);
  }
  //console.log(lines);