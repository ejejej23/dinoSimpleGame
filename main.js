var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth -100;
canvas.height = window.innerHeight - 100;

var dinoImg = new Image();
dinoImg.src = 'coo1.png';

var cactus1 = new Image();
cactus1.src = 'mil1.png';

//공룡
var dino = {
    x : 10,
    y : 200,
    width : 50,
    height : 50,
    draw(){
        ctx.fillStyle = 'green';
        // ctx.fillRect(this.x,this.y,this.width,this.height);
        ctx.drawImage(dinoImg,this.x,this.y,this.width, this.height);
    }
}

dino.draw();


//장애물
class Cactus{
    constructor(){
        this.x = 500;
        this.y = 200;
        this.width = 50;
        this.height = 50;
    }
    draw(){
        ctx.fillStyle = 'red';
        //ctx.fillRect(this.x,this.y,this.width,this.height);
        ctx.drawImage(cactus1,this.x,this.y,this.width, this.height);
    }
}

var score = {
    draw(num){
        ctx.fillText(num,500,20);
    }
}

var cactus = new Cactus();
cactus.draw();

var timer = 0;
var cactusArray = [];
var jumpTimer = 0;
var framAnimation;
var myScore = 0;

//프레임마다 실행할 함수
function frameFunc(){
    //requestAnimationFrame : 기본제공함수
    framAnimation = requestAnimationFrame(frameFunc);
    timer++;
    myScore++;

    ctx.clearRect(0,0, canvas.width, canvas.height);//기존항목 지우기

    if(timer % 300 === 0){//장애물 생성
        var cactus = new Cactus();
        cactusArray.push(cactus);
    }

    cactusArray.forEach((m, i, arr)=>{
        if(m.x <0) {//필요없는 장애물 배열에서 제거
            arr.splice(i,1);
        }
        
        m.x--;
        collChk(dino,m);//장애물과 주인공 체크해야하기 때문에 for문 안에서 체크함
        m.draw();
    })
    

    if(isJumping){
        dino.y-=2;//y축 이동속도
        jumpTimer++;
    } else if(dino.y < 200){
        dino.y+=2;//y축 이동속도
    }
    if(jumpTimer > 60){
        isJumping = false;
        jumpTimer = 0;
    }
    dino.draw();
    score.draw(myScore);
}


frameFunc();

//충돌확인
function collChk(dino, cactus){
    var xChk = cactus.x - (dino.x + dino.width);
    var yChk = cactus.y - (dino.y + dino.height);

    if(xChk<0 && yChk<0){//충돌조건
        ctx.clearRect(0,0,canvas.width,canvas.height);
        cancelAnimationFrame(framAnimation);
    }
}



var isJumping = false;
document.addEventListener('keydown', function(e){
    if(e.code === 'Space'){//space키에 이벤트 바인딩
        isJumping = true;
    }
})