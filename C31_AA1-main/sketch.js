const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,rope2,rope3,fruit,ground;
var fruit_con;
var fruit_con2;
var fruit_con3;

var bg_img;
var food;
var rabbit;

var button;
var bunny;
var blink,eat,sad;
var cutmp3,eatmp3,sadmp3,airmp3,bgmp3;
var w;
var h;
function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');;
  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  cutmp3 = loadSound("rope_cut.mp3");
  eatmp3 = loadSound("eating_sound.mp3");
  airmp3 = loadSound("air.wav");
  bgmp3 = loadSound("sound1.mp3");
  sadmp3 = loadSound("sad.wav");
  
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() {
  var isMobile=/iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if(isMobile){
w=displayWidth;
h=displayHeight;
createCanvas(displayWidth+80,displayHeight);
  }
  else{
    w=windowWidth;
    h=windowHeight;
    createCanvas(windowWidth,windowHeight);
  }
  frameRate(80);

  engine = Engine.create();
  world = engine.world;
  
  button1 = createImg('cut_button.png');
  button1.position(20,30);
  button1.size(50,50);
  button1.mouseClicked(drop);
  
  button2 = createImg('cut_button.png');
  button2.position(330,55);
  button2.size(50,50);
  button2.mouseClicked(drop2);
/*
  button3 = createImg('cut_button.png');
  button3.position(360,250);
  button3.size(50,50);
  button3.mouseClicked(drop3);
*/
  blink.frameDelay = 1000;
  eat.frameDelay = 20;
  bunny = createSprite(170,h-80,100,100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');
  
  rope = new Rope(7,{x:40,y:30});
  rope2 = new Rope(8,{x:345,y:55});
 // rope3 = new Rope(4,{x:400,y:225});
  ground = new Ground(200,h,600,20);
  
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con2 = new Link(rope2,fruit);
  //fruit_con3 = new Link(rope3,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  ballon = createImg ("balloon.png");
  ballon.position (10,250)
  ballon.size(150,100)
  ballon.mouseClicked(airblow)
  
  bgmp3.play();
  bgmp3.setVolume(.05)
  mute = createImg ("mute.png");
  mute.position (450,20)
  mute.size(50,50)
  mute.mouseClicked(Mute)
}
  

function draw() 
{
  background(51);
  image(bg_img,0,0,displayWidth+80,displayHeight);

 

  rope.show();
  rope2.show();
 //rope3.show();
  Engine.update(engine);
  ground.show();
  if(collide(fruit,bunny)===true){
 bunny.changeAnimation("eating")
eatmp3.play();
  }
  if(collide(fruit,ground.body)===true){
    bunny.changeAnimation("crying")
    sadmp3.play();
     }
  if (fruit!=null){
  image(food,fruit.position.x,fruit.position.y,70,70);
  }
   drawSprites();
}
function collide(body,sprite){
if(body!=null)
{
var d=dist (body.position.x,body.position.y,sprite.position.x,sprite.position.y);
if(d<=80){
World.remove(engine.world,fruit);
fruit=null;
return true
}    
else{
  return false
}
}

}

function drop()
{
  rope.break();
  fruit_con.detach();
  fruit_con = null; 
  cutmp3.play();
}
function drop2()
{
  rope2.break();
  fruit_con2.detach();
  fruit_con2 = null; 
  cutmp3.play();
}
/*function drop3()
{
  rope3.break();
  fruit_con3.detach();
  fruit_con3 = null; 
  cutmp3.play();
}*/

function airblow(){ 
Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.01,y:0})
airmp3.play()
airmp3.setVolume(.05)




}
function Mute (){
if(bgmp3.isPlaying()){
bgmp3.stop();
}
else{
bgmp3.play();
}
}
