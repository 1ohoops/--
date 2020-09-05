//画出棋盘2500个格子
function draw(){
    var t = document.getElementById('platform');
    var i;
    var j;
    for(i=0;i<50;i++){
        var tr=document.createElement("tr");
        tr.className="y";
        t.appendChild(tr);
        for(j=0;j<50;j++){
            var td=document.createElement("td"); 
            td.className="x";
            tr.appendChild(td);
        }
    }
}

//选择贪吃蛇的初始位置，并选择初始移动方向
function print(){
    var snake=document.getElementsByTagName("td");
    var loc=Math.floor(Math.random()*2500);
    var i;
    var site;
    var cou;
    var wayy=[1,2,3,4];
    snakenum[snakenum.length]=loc;
    snake[snakenum[snakenum.length-1]].className="x snake";
    for(i=0;i<3;i++){
        while(1){
            ran();
            site=snakenum[snakenum.length-1]+way;
            if(site<0||site>2499)continue;
            if(cou=wayout(site))continue;
            if(snake[site].className=="x snake")continue;
            if((snakenum[snakenum.length-1]%50==0&&(site+1)%50==0)||((snakenum[snakenum.length-1]+1)%50==0&&site%50==0))continue;
            if(site<0||site>2450){
                continue;
            }
            break;
        }
        snakenum[snakenum.length]=site;
        snake[snakenum[snakenum.length-1]].className=snake[snakenum[snakenum.length-1]].className+" snake";
    }
    if(snake[snakenum[0]-1].className=="x snake"||snakenum[0]%50==0)wayy.splice(wayy.indexOf(1),1);
    if(snake[snakenum[0]+1].className=="x snake"||(snakenum[0]+1)%50==0)wayy.splice(wayy.indexOf(2),1);
    if(snakenum[0]-50<0||snake[snakenum[0]-50].className=="x snake"||snakenum[0]<=49)wayy.splice(wayy.indexOf(3),1);
    if(snakenum[0]+50>2499||snake[snakenum[0]+50].className=="x snake"||snakenum[0]>=2450)wayy.splice(wayy.indexOf(4),1);
    i=wayy[Math.floor(Math.random()*wayy.length)];
    way1=(i==1||i==3)?-1:1;
    way2=(i==3||i==4)?50:1;
    way=way1*way2;
}

//判断初始节点能否移动
function wayout(site){
    var snake=document.getElementsByTagName("td");
    if(snakenum[0]==0||snakenum[0]==49||snakenum[0]==2499||snakenum[0]==2450){
        if(snakenum[0]+1==site||snakenum[0]-1==site||snakenum[0]+50==site||snakenum[0]-50==site){
            if(snake[snakenum[0]+1].className=="x snake"||snake[snakenum[0]-1].className=="x snake"||
            snake[snakenum[0]+50].className=="x snake"||snake[snakenum[0]-50].className=="x snake"){
                return true;
            }
        }
    }
    return false;
}

//设置移动速度，并记录键盘按键方向
function game(){
    var keydo;
    time=setInterval("move()", speed);
    document.onkeydown=function (){
        keydo=window.event?event.keyCode:event.keyWhich;
        if((keydo==65&&way!=1)||(keydo==68&&way!=-1)||(keydo==83&&way!=-50)||(keydo==87&&way!=50)){
            if(keydo==65||keydo==87)way1=-1;
            else way1=1;
            if(keydo==83||keydo==87)way2=50;
            else way2=1;
            way=way1*way2;
        }
    }
}

//画出果实节点
function target(){
    var i;
    var snake=document.getElementsByTagName("td");
    while(1){
        //随机选择一个空白的空格
        i=Math.floor(Math.random()*2500);
        if(snake[i].className=="x snake"){
            continue;
        }
        else {
            break;
        }
    }
    snake[i].className="x target";
}

//贪吃蛇移动方法，两种情况，贪吃蛇吃到果实或者是没吃到果实
function move(){
    var snake=document.getElementsByTagName("td");
    snakenum.unshift(snakenum[0]+way);
    if(judge()){
        if(snake[snakenum[0]].className!="x target"){
            snake[snakenum[snakenum.length-1]].className="x";
            snakenum.pop();
        }
        else if(snake[snakenum[0]].className=="x target") {
            snake[snakenum[0]].className="x snake";
            score++;
            score_no.innerText=score;
            target();
            if(speed>=70&&score%7==0&&score!=0){
                speed-=20;
                window.clearInterval(time);
                time=setInterval("move()",speed);
            }
        }
        snake[snakenum[0]].className="x snake";
    }
}

//判断游戏是否结束，贪吃蛇占满棋盘，或者撞墙以及碰到自己
function judge(){
    var snake=document.getElementsByTagName("td");
    var result=document.getElementById("result");
    var i=0;
    //判断贪吃蛇是否占满棋盘
    if(snakenum.length==2500){
        result.style.display="block";
        result.innerHTML=" you win !";
        window.clearInterval(time);
        return false;
    }
    else{
        //判断是否撞墙
        if((way==-1&&(snakenum[0]+1)%50==0)||(way==1&&snakenum[0]%50==0)||snakenum[0]<0||snakenum[0]>2499){
            result.style.display="block";
            result.innerText=" sorry ! ";
            window.clearInterval(time);
            result.onclick=function(){};
            window.onkeydown=function(){};
            return false;
        }
        else if(snake[snakenum[0]].className=="x snake"){   //判断是否碰到自己
            result.style.display="block";
            result.innerText=" sorry ! ";
            window.clearInterval(time);
            result.onclick=function(){};
            window.onkeydown=function(){};
            return false;
        }
    }
    return true;
}

//随机选择方向
function ran(){
    way1=Math.random()<0.5?-1:1;
    way2=Math.random()<0.5?1:50;
    way=way1*way2;
}

//画出目标位置，让贪吃蛇动起来
function start(){
    target();
    game();
}

var score=0;
var snakenum=[];
var way,way1,way2;
var score_no=document.getElementById('score');
var time;
var speed=150;

//页面加载完成后开始游戏
window.onload=function(){
    var begin=document.getElementById('btm-be');
    var reset=document.getElementById('btm-re');
    //画出棋盘
    draw();    
    //随机选择初始方向
    ran();
    //随机选择初始位置
    print();
    //点击开始按键开始游戏
    begin.onclick=function(){
        window.onkeydown=function(){};
        //开始游戏
        start();
    }
    //点击空格按键开始游戏
    window.onkeydown=function(event){
        if(event.keyCode==32){
            begin.onclick=function(){};
            //开始游戏
            start();
        }
    }
    //设置重置按键
    reset.onclick=function(){
        location.reload();
    }
}