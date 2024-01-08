var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var estado=0 //inicio = 0
var cloud, cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var trexVasco
var score;
var GG
var Recomecar
var Perdeu

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  trexVasco = loadImage("trex_collided.png")
  GG = loadImage("gameOver.png")
  Recomecar = loadImage("restart.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided" , trexVasco)
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  obstaclesGroup = createGroup()
  cloudsGroup = createGroup()
  trex.debug = false
 
  trex.setCollider("circle", 0,0,  50)
 
  Perdeu = createSprite(300,50)
  Perdeu.addAnimation("Perdedor", GG)
  Perdeu.visible = false
  Perdeu.scale =  0.5
  Restart = createSprite(300,100)
  Restart.addAnimation("aaaa", Recomecar)
  Restart.visible = false
  Restart.scale = 0.6
  
  score = 0;
}

function draw() {
  background(180);
  text("Pontuação: "+ score, 500,50);
 
    if (estado ==0){
 
          
 
 
 
 
  score = score + Math.round(frameCount/60);
   if(touches.lenght > 0   || keyDown("space")&& trex.y >= 160) {
    trex.velocityY = -13;
    Touches = [] 
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  trex.collide(invisibleGround);
  
  //gere as nuvens
  spawnClouds();
  
  //gere obstáculos no solo
  spawnObstacles()
  
  if(trex.isTouching(obstaclesGroup)){
    ground.velocityX = 0
     estado = 1
  }
}     
  if(estado == 1){
   trex.velocityY = 0               
   trex.changeAnimation("collided") 
   trex.y = 160
   obstaclesGroup.setVelocityXEach(0)
   cloudsGroup.setVelocityXEach(0)
   obstaclesGroup.setLifetimeEach(-1)
   cloudsGroup.setLifetimeEach(-1)
   Perdeu.visible = true
   Restart.visible = true
   if(mousePressedOver(Restart)){

    estado = 0
    obstaclesGroup.destroyEach()
    Perdeu.visible = false
    Restart.visible = false
    cloudsGroup.destroyEach()
    score = 0
    trex.changeAnimation("running") 
    ground.velocityX = -4
  
  
  }
   
   
   
   
   
   //voltar ao comeco 
   
  
  
   




 

  }












  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,165,10,40);
   obstacle.velocityX = -6;

   
    // //gerar obstáculos aleatórios
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   
    //atribuir escala e vida útil ao obstáculo             
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
 

    obstaclesGroup.add(obstacle) 
 }


}




function spawnClouds() {
  //escreva o código aqui para gerar as nuvens
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.y = Math.round(random(10,60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //atribuir vida útil à variável
    cloud.lifetime = 200;
    
    //ajustar a profundidade
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
  
    cloudsGroup.add(cloud)
  }
  
}
   