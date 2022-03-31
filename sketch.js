var TP1,TP1Img;
var bg = "sprite_0.png";
var zombie, zombieGroup,zombieImg;
var score = 0 ; 
var BulletImg;
var Bullet = 100;
var BulletGroup;
var heart1, heart2, heart3;
var heart1Img, heart2img, heart3Img;
var GameState = "Fight" ;
var life = 3;



function preload() {
  bg = loadImage("sprite_0.jpeg");
  TP1Img = loadImage("sprite_1.png");
  zombieImg = loadImage("zombie.png");
  BulletImg = loadImage("Bullet.png");
  heart1Img = loadImage("heart_1.png");
  heart2Img = loadImage("heart_2.png");
  heart3Img = loadImage("heart_3.png");
 
}





function  setup(){
  createCanvas(1536,760);

  TP1 = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 TP1.addImage(TP1Img)
   TP1.scale = 0.3;
   TP1.debug = true

zombieGroup = createGroup();  
BulletGroup = createGroup();

heart1 = createSprite(displayWidth-150,40,20,20)
heart1.visible = false;
 heart1.addImage("heart1",heart1Img);
 heart1.scale = 0.4;

 heart2 = createSprite(displayWidth-100,40,20,20);
 heart2.visible = false ;
 heart2.addImage("heart2",heart2Img);
 heart2.scale = 0.4;

 heart3 = createSprite(displayWidth-150,40,20,20)
 heart3.addImage("heart3",heart3Img)
 heart3.scale = 0.4

}

function draw(){
  background(bg);

if(GameState === "Fight"){

  if(keyDown("UP_ARROW")||touches.length>0){
    TP1.y = TP1.y-30
  }
  if(keyDown("DOWN_ARROW")||touches.length>0){
   TP1.y = TP1.y+30
  }

  if (keyDown("SPACE")){

    Bullet = createSprite(TP1.x,TP1.y,25,25);
    Bullet.addImage(BulletImg);
    Bullet.scale = 0.2;
    TP1.y = Bullet.y ; 
    TP1.x = Bullet.x ; 

    BulletGroup.add(Bullet);
  Bullet.velocityX = 4;
  Bullet = Bullet-1;
  }

  
  if(BulletGroup.isTouching(zombieGroup)){
  
    zombie.destroy();
    score = score+1

    BulletGroup.destroyEach();

  }

   if(Bullet === 0){

  GameState = "Bullet" ; 

   }

   if(zombieGroup.isTouching(BulletGroup)){
    for(var i=0;i<zombieGroup.length;i++){ 
    if(zombieGroup[i].isTouching(BulletGroup)){
     zombieGroup[i].destroy() 
     BulletGroup.destroyEach() } }
  }
  
  if(zombieGroup.isTouching(TP1)){ 
   
    for(var i=0;i<zombieGroup.length;i++){ 
      if(zombieGroup[i].isTouching(TP1)){
       zombieGroup[i].destroy() 
 

   life = life-1 
  
  }}
}




drawzombie();


}

drawSprites(); 

if(GameState === "Won"){

textSize(100);
fill("yellow");
text("You Won", 400, 400);
zombieGroup.destroyEach();
TP1.destroy();


}


else if(GameState === "Lost"){

  textSize(100);
  fill("yellow");
  text("You Lost", 400, 400);
  zombieGroup.destroyEach();
  TP1.destroy();
  gameOver();

  }

else if(GameState === Bullet){

  textSize(50);
  fill("yellow");
  text("You Ran Out Of Bullets ", 400, 400);
  zombieGroup.destroyEach();
  TP1.destroy();

  BulletGroup.destroyEach();

}


  textSize(20);
  fill("Yellow");
  text(" SCORE : "+score,1380,90)

}


function drawzombie(){  

if(frameCount%60===0){
  zombie = createSprite(1200,random(20,780),40,40);
  zombie.addImage(zombieImg);
  zombie.scale = 0.2;     
  zombie.velocityX = -8;
  zombie.lifetime = 150;
  zombieGroup.add(zombie);
}
}

function gameOver() {
  swal({
    title: `Game Over`,
    text: "Oops you lost the race....!!!",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
    imageSize: "100x100",
    confirmButtonText: "Thanks For Playing"
  });
}
