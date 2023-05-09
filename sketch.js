var trex, trexCorrendo;
var solo, soloImg;
var soloInvisivel;
var nuvem, nuvemImg;
var cacto, cactoImg1, cactoImg2, cactoImg3, cactoImg4, cactoImg5, cactoImg6;
var score = 0;
var play = 1;
var end = 0;
var gameState = play;
var cactoGp,nuvemGp;
var recorde = 0;
var trexColidir;
var gameOver,gameOverImg;
var restart,restartImg;
var jumpSound;
var pointSound;
var deathSound;

//preload carrega as midías do jogo 
function preload() {
  trexCorrendo = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  soloImg = loadImage("ground2.png");
  nuvemImg = loadImage("cloud.png");
  cactoImg1 = loadImage("obstacle1.png");
  cactoImg2 = loadImage("obstacle2.png");
  cactoImg3 = loadImage("obstacle3.png");
  cactoImg4 = loadImage("obstacle4.png");
  cactoImg5 = loadImage("obstacle5.png");
  cactoImg6 = loadImage("obstacle6.png");
  trexColidir = loadAnimation("trex_collided.png");
 restartImg = loadImage("restart.png");
 gameOverImg = loadImage("gameOver.png");
 jumpSound = loadSound("jump.mp3");
 pointSound = loadSound("checkPoint.mp3");
 deathSound = loadSound("die.mp3");
}
//setup faz a aconfiguração
function setup() {
  createCanvas(windowWidth,windowHeight);
  // criando as bordas
  trex = createSprite(50,height-40, 20, 50);
  trex.addAnimation("run", trexCorrendo);
 trex.addAnimation("collided",trexColidir); 
  trex.scale = 0.5;
trex.debug = false;
//trex.setCollider("rectangle",0,0,80,200,90);
trex.setCollider("circle",0,0,30)
  solo = createSprite(width/2,height-10,width, 2);
  solo.addImage("solo", soloImg);

  soloInvisivel = createSprite(width/2,height-5,width, 2);
  soloInvisivel.visible = false;

  gameOver = createSprite(width/2,height-100);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;

restart = createSprite(width/2,height-60);
restart.addImage(restartImg);
restart.scale = 0.5;

gameOver.visible = false
restart. visible = false

  cactoGp= new Group();
  nuvemGp= new Group();

}
//draw faz o movimento, a ação do jogo
function draw() {
  background("#f0f9f7");

  text("Score: "+score,width-50,height-150)
text("Recorde: "+recorde,width-50,height-130)

  if (gameState===play) {
    score+=Math.round(getFrameRate()/60)
    if (score>0&&score%100===0){
     pointSound.play();
    }
    solo.velocityX = -(9+score/100)
    if (touches.length>0||keyDown("space") && trex.y > height-30) {
      trex.velocityY = -12;
      jumpSound.play();
    touches = []
    }
    if (solo.x < 800) {
      solo.x = solo.width / 2
    }
    gerarNuvems()
    createCactus()
  } 

    if (trex.isTouching(cactoGp)){
      gameState=end
   // deathSound.play();
    }

  if (gameState===end) {
    trex.changeAnimation("collided",trexColidir); 
 cactoGp.setLifetimeEach(-1);
 cactoGp.setVelocityXEach(0);
nuvemGp.setLifetimeEach(-1);
nuvemGp.setVelocityXEach(0)
solo.velocityX = 0;
gameOver.visible = true
restart. visible = true
  
if (recorde<score){
  recorde = score;
}

if (mousePressedOver(restart)){
gameState = play;
trex.changeAnimation("run", trexCorrendo);
gameOver.visible = false;
restart.visible = false;
cactoGp.destroyEach();
nuvemGp.destroyEach();
score = 0
}
  }


  
  trex.velocityY += 0.5

  trex.collide(soloInvisivel);


  //coordenadas do mouse na tela
  text("X: " + mouseX + "/ Y: " + mouseY, mouseX, mouseY);
  drawSprites();
}

function gerarNuvems() {
  if (frameCount % 70 === 0) {
    nuvem = createSprite(width, random(height-190,height-100), 40, 10);
    nuvem.velocityX = -(4+score/100);
    nuvem.addImage(nuvemImg);
    nuvem.scale = random(0.4, 1.5);
    nuvem.depth = trex.depth - 1;
    nuvem.lifetime = width/nuvem.velocityX;
    nuvemGp.add(nuvem);
  }

}

function createCactus() {
  if (frameCount % 80 === 0) {
    cacto = createSprite(width,height-30, 40, 10);
    cacto.velocityX = -(5+score/100);
    cacto.scale =0.5
    cacto.lifetime = width/cacto.velocityX;
    cacto.depth = trex.depth;
cactoGp.add(cacto);
    var sorte = Math.round(random(1, 6))
    switch (sorte) {
      case 1: cacto.addImage(cactoImg1)
        break;
      case 2: cacto.addImage(cactoImg2)
        break;
      case 3: cacto.addImage(cactoImg3)
        break;
      case 4: cacto.addImage(cactoImg4)
        break;
      case 5: cacto.addImage(cactoImg5)
        break;
      case 6: cacto.addImage(cactoImg6)
        break;

    }
  }
} 

