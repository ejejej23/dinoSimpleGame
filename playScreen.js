var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = 1280;
canvas.height = 720;

var ballImg_norm = './img/ball_norm.png';
var ballImg_coll = './img/ball_coll.png';
var ballImg_jump = './img/ball_jump.png';

var dinoImg = new Image();
dinoImg.src = ballImg_norm;

var levelParm = parseInt(getParam('level'));
var level = (levelParm && levelParm !='') ? levelParm : 1;
var stageParm = parseInt(getParam('stage'));
var stage = (stageParm && stageParm !='') ? stageParm : 1;
var defaultH = 350;
var maxH = defaultH;

var speed = 5;
if(stage>2) speed =30;
else if(stage>1) speed=10;

switch(stage){
    case 1:
        speed = 5;
    break;
    case 2:
        speed = 10;
    break;
    case 3:
        speed = 20;
    break;
    case 4:
        speed = 30;
    break;
}

var playSetting ={
    level : level,
    stage : stage,
    speed : speed,
    state : 'ING'
}

//주인공
var dino = {
    x : 100,
    y : 500,
    width : 50,
    height : 50,
    draw(){
        ctx.drawImage(dinoImg,this.x,this.y,this.width, this.height);
    }
}

var score = {
    draw(num){
        $('#myScoreNum').text(num);
    }
}


var timer = 0;
var cactusArray = [];
var framAnimation;
var myScore = 0;
var rndm = Math.floor(Math.random()*11)+3;
var rndm2 = Math.floor(Math.random()*11)+5;


$('#btnArea')
.on('click','.reStartBtn',function(){
    window.location.href = './playScreen.html?level='+playSetting.level+'&stage='+playSetting.stage;
})
.on('click','.goHomeBtn',function(){
    window.location.href = './index.html?level='+playSetting.level;
});


//프레임마다 실행할 함수
function frameFunc(){
    //requestAnimationFrame : 기본제공함수
    framAnimation = requestAnimationFrame(frameFunc);
    timer++;
    myScore++;

    if(myScore > 1000 && playSetting.stage != 4) gameEnd();

    ctx.clearRect(0,0, canvas.width, canvas.height);//기존항목 지우기

    if(timer % 100 === 0){//장애물 생성
        var cactus = new Cactus();
        cactusArray.push(cactus);
    }

    
    if(playSetting.stage>2 && (timer % (rndm*10) === 0 || timer % (rndm2*10) === 0)){//장애물 생성
        var cactus2 = new Cactus2(Math.random()*11<6?true:false);
        cactusArray.push(cactus2);
    }

    cactusArray.forEach((m, i, arr)=>{
        if((m.x+m.width) <0) {//필요없는 장애물 배열에서 제거
            arr.splice(i,1);
        }
        
        m.x -= playSetting.speed;
        collChk(dino,m);//장애물과 주인공 체크해야하기 때문에 for문 안에서 체크함
        m.draw();
    })
    

    if(isJumping){
        dinoImg.src = ballImg_jump;
        dino.y-= playSetting.speed;//y축 이동속도
        if(dino.y <= maxH){
            isJumping = false;
            maxH = defaultH;
        }
    } else if(dino.y <= 500){
        dino.y+= playSetting.speed;//y축 이동속도
        dinoImg.src = ballImg_norm;
    }


    if(playSetting.state != 'OVER'){
        dino.draw();
        score.draw(myScore);
    }else{
        setTimeout(() => {
            dino.draw();
        }, 10);
    }
}


frameFunc();

var isJumping = false;
document.addEventListener('keydown', function(e){
    if(e.code === 'Space'){//space키에 이벤트 바인딩
        if(maxH>100) maxH -= 100;
        isJumping = true;
    }
})


//충돌확인
function collChk(dino, cactus){    
    var colStdr = cactus.type ==1? 15:20;

    if(cactus.x < (dino.x+dino.width-colStdr) 
        && (cactus.x +cactus.width-colStdr) > dino.x
        && cactus.y < (dino.y + dino.height-colStdr)
        && (cactus.height + cactus.y-colStdr) > dino.y){//충돌조건
        dinoImg.src = ballImg_coll;
        setEndScreen(false);
    }
}


function gameEnd(){
    playSetting.level++;
    setEndScreen(true);
}

function setEndScreen(flag){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    if(flag) $('#win').show();
    else $('#lose').show();

    cancelAnimationFrame(framAnimation);
    
    $('#finScoreDiv').text($('#topScoreDiv').text()).show();
    $('#btnArea').show();
    playSetting.state = 'OVER';
}