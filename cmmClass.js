//장애물
class Cactus{
    constructor(){
        this.x = 1278;
        this.y = 480;
        this.width = 80;
        this.height = 80;
        this.type = 1;
    }
    draw(){
        ctx.drawImage(cactus1,this.x,this.y,this.width, this.height);
    }
}

//장애물2
class Cactus2{
    constructor(flag){
        this.x = 1278;
        this.y = (flag? 150 : 400);
        this.width = 111;
        this.height = 82;
        this.type = 2;
    }
    draw(){
        ctx.drawImage(cactus2,this.x,this.y,this.width, this.height);
    }
}