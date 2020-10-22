//game states
var PLAY=1;
var END=0;
var gameState=PLAY;
var gameOver,gameOverImage;
var fruit1,fruit1Image,fruit2,fruit2Image;
var fruit3,fruit3Image,fruit4,fruit4Image;
var sword,swordImage,sword_running,sword_collided;
var monster,monster_moving,monsterImage;
var score;
var knifeSwooshSound,gameOverSound;

function preload(){
  monster_moving = loadAnimation("alien1.png","alien2.png")  
  
  
  fruit1Image = loadImage("fruit1.png");
  fruit2Image = loadImage("fruit2.png");
  fruit3Image = loadImage("fruit3.png");
  fruit4Image = loadImage("fruit4.png");
  swordImage  = loadImage("sword.png");

  gameOverImg = loadImage("gameover.png")
  knifeSwooshSound = loadSound("knifeSwooshSound.mp3")
  gameOverSound = loadSound("gameover.mp3")
}
function setup(){
  createCanvas(600,600)
  
  sword = createSprite(300,300,30,30)
  sword.addImage(swordImage);
  sword.scale=0.8;
  
  
  //score
  score=0;
  
  //creating groups
  fruitGroup = new Group();
  enemyGroup = new Group();
}

function draw(){
  background("blue");
  fill("yellow");
  textSize(20);
  text("Score :"+ score,30,25);
  
    if(gameState === PLAY){
      sword.y=mouseY;
   sword.x=mouseX;
   
    
    fruits();
    enemys();
  
    fruitGroup.velocityX = -(4 +3* score/4)
    enemyGroup.velocityX = -(8+ 3* score/100)
      
} 
      
    if(fruitGroup.isTouching(sword)){
    fruitGroup.destroyEach();
    knifeSwooshSound.play();
    score = score+2;
}
   else  if(sword.isTouching(enemyGroup)){

     gameState = END;
     knifeSwooshSound.play();
     gameOverSound.play();
     
     sword.addImage(gameOverImg)
     sword.x = 300;
     sword.y = 300;
 
    fruitGroup.velocityX=0;
    enemyGroup.velocityX = 0;
    enemyGroup.destroyEach();
    fruitGroup.destroyEach();
}
   
  
   drawSprites();
}


function fruits(){
   if(frameCount%50===0){
    
   fruit= createSprite(600,600,40,40)
   fruit.velocityX=-10;
   fruit.scale=0.2;
   fruit.y=Math.round(random(20,300))
   rand = Math.round(random(1,4))
   if(rand===1){
   fruit.addImage(fruit1Image)
}
  if(rand===2){
  fruit.addImage(fruit2Image)
}
 if(rand===3){
  fruit.addImage(fruit3Image)
}
  if(rand===4){
  fruit.addImage(fruit4Image)
     }
  //lifetime
 fruit.lifetime=300;
 fruitGroup.add(fruit)
   }
}
  function enemys(){
  if(frameCount%150===0){
    monster = createSprite(600,600,40,40)
    monster.addAnimation("moving",monster_moving)
    monster.velocityX=-12;
    monster.scale=1;
    monster.y=Math.round(random(2,250))
    //lifetime
   monster.setLifetime = 50;
   enemyGroup.add(monster);
  }  
}





