var waterfallImg, waterfall;
var frog, frogImg;
var pad, padImg, padsGroup;
var gameState = "play"

function preload(){
  waterfallImg = loadImage("waterfall.jpg");
  padImg = loadImage("pad.jpg");
  frogImg = loadImage("frog.webp");
}

function setup(){
  createCanvas(600,600);
  waterfall = createSprite(300,300);
  waterfall.addImage("waterfall",waterfallImg);
  waterfall.velocityY = 5;
  waterfall.scale = 5.5;
  
  padsGroup = new Group();
  
  frog = createSprite(200,200,50,50);
  frog.scale = 0.15;
  frog.addImage("frog", frogImg);
}

function spawnpad() {
  //write code here to spawn the pads in the waterfall
  if (frameCount % 200 === 0) {
    var pad = createSprite(200, -50);
    pad.scale = 0.3;
    pad.addImage("pad", padImg);
    
    pad.x = Math.round(random(120,400));
    
    pad.velocityY = 5;
    
    frog.depth = pad.depth;
    frog.depth +=1;
    
    pad.setCollider("rectangle", 0, 0, pad.width, pad.height);
   
   


    //pad.depth = waterfall.depth;
    //pad.depth +=1;
   
    //assign lifetime to the variable
    pad.lifetime = 800;

    
    
    //add each pad to the group
    padsGroup.add(pad);
  }
}

function draw(){
  background(0);
  if (gameState === "play") {
    if(keyDown("left_arrow")){
      frog.x = frog.x - 3;
    }
    
    if(keyDown("right_arrow")){
      frog.x = frog.x + 3;
    }
    
    if(keyDown("space")){
      frog.velocityY = -10;
    }
    
    frog.velocityY = frog.velocityY + 0.8
    
    if(waterfall.y > 400){
      waterfall.y = 200
    }
 
    for (var i = 0; i < padsGroup.length; i++) {
      var pad = padsGroup[i];
    

    if(frog.collide(pad))
      frog.velocityY = 0;
    }

    if(frog.y > 600){
      frog.destroy();
      gameState = "end"
    }
    
    spawnpad();

    drawSprites();
  }
  
  if (gameState === "end"){
    stroke("yellowgreen");
    fill("yellowgreen");
    textSize(30);
    text("Game Over", 230,250)
  }

}

