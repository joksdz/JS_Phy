const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");



// boolean values to check if the keys are pressed
let left,right, up , down

const ballz = []
//this controls the friction 
let f = 0.1
 class Vec {
   constructor(x,y)
{

    this.x = x 
    this.y = y
  }
  //this adds two vectors
  add(v)
{
    return new Vec(this.x + v.x , this.y + v.y)
  }
  //this subtracts two vectors
  sub(v)
{
    return new Vec(this.x - v.x , this.y - v.y)
  }
  // this multiplies the vector by a number just for show 
  multi(n)
{
    return new Vec(this.x * n , this.y * n)
  }
  // this calculates the length of the vector 
  len()
{ 
    return Math.sqrt(this.x ** 2 , this.y ** 2)
  }
  //this draws the vector on the canvas
VecLine( start_x  , start_y, n , color )
{
  ctx.beginPath();
  ctx.moveTo(start_x, start_y);
  ctx.lineTo(start_x + this.x*n, start_y+ this.y*n);
  ctx.strokeStyle = color;
  ctx.stroke();

}


 }
     class Ball {
   constructor(x, y, r , color) {
  this.x = x;
  this.color = color
  this.y = y;
  this.r = r;
  this.player = false
  ballz.push(this)
    //sets velocity and acceleration to a new vector (0,0)
    this.v = new Vec(0,0)
    this.ac = new Vec (0,0)
    this.acc = 1
  this.player = false
  this.subplayer = false
     // controls the gravity 
  this.gravity = 5
  }
  //draws the ball on canvas 
  balls() {
      ctx.beginPath();
    ctx.arc(this.x,this.y,this.r,0,2*Math.PI);
    ctx.stroke();
    ctx.fillStyle = this.color;
    ctx.fill();
  }
  //this displays the ball's velocity and acceleration vectors 
display()
    {
this.v.VecLine(this.x, this.y, 10, "white")
this.ac.VecLine(this.x, this.y, 100, "red")
  }
 }

function control(b){
//checks when key is pressed 
canvas.addEventListener("keydown", function (e) {
if (e.keyCode == 37){left = true}
if (e.keyCode == 38){up = true}
if (e.keyCode == 39){right = true}
if (e.keyCode == 40){down = true}
})

  //sets the movement vars to false when keys are not pressed 
canvas.addEventListener("keyup", function (e) {
if (e.keyCode == 37){left = false}
if (e.keyCode == 38){up = false}
if (e.keyCode == 39){right = false}
if (e.keyCode == 40){down = false}
})

   // this is the acceleration of the balls depending on the keys pressed
  if (left){b.ac.x = -b.acc}
  if (right){b.ac.x =  b.acc}
  if (up){b.ac.y = -b.acc}
  if (down && !b.player){b.ac.y =  b.acc}
  // thsi is to stop the balls from moving when keys are not pressed
  if (!left && !right){b.ac.x = 0}
  if (!up && !down){b.ac.y = 0}
  //adds acceleration to the velocity
  b.v = b.v.add(b.ac)
  // this adds friction to the velocity 
  b.v = b.v.multi(1- f)
  b.x += b.v.x
  b.y += b.v.y
 }

//this collision method only works the lower platform to stop the balls from falling 
function collision()
{
if (b.y + b.r> canvas.height)
{
    
    b.y = canvas.height - b.r
    b.ac.y= 0
  }
}


 function repeat(){
  //clears the canvas every frame
   ctx.clearRect(0, 0, canvas.width, canvas.height);
  //adds gravity 
  if (true){b.y += b.gravity}
  
 ballz.forEach((b)=>{b.balls()
    box()

  collision()
    // checking if player or subplayer is true to give it control
 if (b.player || b.subplayer){control(b)}
    b.display()
 })
requestAnimationFrame(repeat) 

}
// initializing the ball

 let b = new Ball(200,200,20 , "#d53600")
// setting the player and subplayer(its the same but the subplayer can move down while on gravity )
b.player = false
b.subplayer = true

// making a platform so that the balls dont go offbound 
function box(){
  
ctx.beginPath();
ctx.rect(0, 477, 700, 100) 
ctx.fillStyle = "red"
ctx.fill();
ctx.stroke();

}





requestAnimationFrame(repeat)
