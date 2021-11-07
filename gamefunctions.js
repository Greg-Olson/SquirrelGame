"use strict";


let canvas = document.getElementsByTagName('canvas')[0];
canvas.style = "border: 1px solid red; padding: 0px;";
let ctx = canvas.getContext("2d");
let winWidth = window.innerWidth;
let winHeight = window.innerHeight;

let GameOver = false;




canvas.width = winWidth;
canvas.height = winHeight;

let GameOverImage = new Image();
GameOverImage.src = "./resources/GameOver.png";
GameOverImage.xPos_ = 0;
GameOverImage.yPos_ = 0;


let SquirrelArray = [];

let firstSquirrel = new Image();
firstSquirrel.src = "./resources/Running1.png";
firstSquirrel.xPos_ = Math.random() * (winWidth - 0) + 0;//get a random x taht is in the range of the window width
firstSquirrel.yPos_ = Math.random() * (winHeight - 0) + 0; // get a random y that is in the range of the window height
firstSquirrel.speed_ = Math.random() * (2 - 1) + 1 ;
firstSquirrel.hasExisted_ = 0;
SquirrelArray.push(firstSquirrel);




function generateSquirrels (){
    let Squirrel = new Image();
    Squirrel.src = "./resources/Running1.png";
    Squirrel.xPos_ = Math.random() * (winWidth/3 - 0) + 0;//get a random x taht is in the range of the window width
    Squirrel.yPos_ = Math.random() * (winHeight/3 - 0) + 0; // get a random y that is in the range of the window height
    Squirrel.speed_ = Math.random() * (6 - 1) + 1 ;
    Squirrel.hasExisted_ = 0;
    SquirrelArray.push(Squirrel);
}


let Acorn = new Image();
Acorn.src = "./resources/Acorn.png";
Acorn.xPos_ = 10;
Acorn.yPos_ = 10;

function updateAvatar(event){
    Acorn.xPos_ = event.x;
    Acorn.yPos_ = event.y;
}

canvas.addEventListener("mousemove", updateAvatar)


function updateSquirrels (){


    for(let i = 0; i < SquirrelArray.length; i ++)
    {
        let Xdifference = SquirrelArray[i].xPos_ - Acorn.xPos_;
        let Ydifference = SquirrelArray[i].yPos_ - Acorn.yPos_;
        SquirrelArray[i].hasExisted_ = SquirrelArray[i].hasExisted_ + 1;

        if(Xdifference < 0){
            SquirrelArray[i].xPos_ = SquirrelArray[i].xPos_ + SquirrelArray[i].speed_;
        }
        else if (Xdifference > 0){
            SquirrelArray[i].xPos_ = SquirrelArray[i].xPos_ - SquirrelArray[i].speed_;
        }
        else {
            SquirrelArray[i].xPos_ = SquirrelArray[i].xPos_;
        }
        if(Ydifference < 0){
            SquirrelArray[i].yPos_ = SquirrelArray[i].yPos_ + SquirrelArray[i].speed_;
        }
        else if (Ydifference > 0){
            SquirrelArray[i].yPos_ = SquirrelArray[i].yPos_ - SquirrelArray[i].speed_;
        }
        else {
            SquirrelArray[i].yPos_ = SquirrelArray[i].yPos_;
        }


        if(SquirrelArray[i].xPos_ > canvas.width -30){
            SquirrelArray[i].xPos_ = canvas.width - 50;
            SquirrelArray[i].speed_ *= -1;
        }
        else if (SquirrelArray[i].xPos_ < 0){
            SquirrelArray[i].speed_ *= -1;
        }
        if(SquirrelArray[i].yPos_ > canvas.width -30){
            SquirrelArray[i].yPos_ = canvas.width - 50;
            SquirrelArray[i].speed_ *= -1;
        }
        else if (SquirrelArray[i].yPos_ < 0){
            SquirrelArray[i].speed_ *= -1;
        }



    }

}



function animate (){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(let i = 0; i < SquirrelArray.length; i ++){
        if(Math.abs(SquirrelArray[i].xPos_- Acorn.xPos_) < 5 && Math.abs(SquirrelArray[i].yPos_- Acorn.yPos_) < 5 && SquirrelArray[i].hasExisted_ > 50 ){

                GameOver = true;

        }
    }


    if(GameOver == true){
        ctx.drawImage(GameOverImage, GameOverImage.xPos_, GameOverImage.yPos_);
        setInterval(generateSquirrels, 0);
        setInterval(updateSquirrels, 0);
    }

    else{
        for(let i = 0; i <SquirrelArray.length; i++){
            ctx.drawImage(SquirrelArray[i], SquirrelArray[i].xPos_, SquirrelArray[i].yPos_, SquirrelArray[i].width/5, SquirrelArray[i].height/5);
        }
        ctx.drawImage( Acorn, Acorn.xPos_, Acorn.yPos_, Acorn.width/15, Acorn.height/15 );
    }


}


setInterval(generateSquirrels, 1000);
setInterval(updateSquirrels, 50);

setInterval(animate, 20);
setInterval(console.log(SquirrelArray), 50);





