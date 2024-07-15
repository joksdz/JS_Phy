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
   constructor(x, y, r , color, mass) {
  this.x = x;
  this.color = color
  this.y = y;
  this.r = r;
  this.player = false
  this.mass = mass
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
//this collision method only works the lower platform to stop the balls from falling 
 collision()
{
if (this.y + this.r >= canvas.height)
{
    
    this.y = canvas.height - this.r
    this.ac.y = 0
  }
}
  //draws the ball on canvas also gives gravity 
  balls() {
      ctx.beginPath();
    ctx.arc(this.x,this.y,this.r,0,2*Math.PI);
    ctx.stroke();
    ctx.fillStyle = this.color;
    ctx.fill();
    if (this.mass == undefined ){this.mass = 1}
    else
    {

if (true){this.y += this.gravity * this.mass}
    }
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




 function repeat(){
  //clears the canvas every frame
   ctx.clearRect(0, 0, canvas.width, canvas.height);
  //adds gravity 
  
 ballz.forEach((b)=>{b.balls()

  b.collision()
    b1.collision()
    // checking if player or subplayer is true to give it control
 if (b.player || b.subplayer){control(b)}
    b.display()
 })
requestAnimationFrame(repeat) 

}
// initializing the ball
 let b = new Ball(200,200,20 , "#d53600")
 let b1 = new Ball(100,100,20 , "#A2300D", 2)
 let b2 = new Ball(400,50,20 , "#A2300D")
// setting the player and subplayer(its the same but the subplayer can move down while on gravity )
b.player = false
b.subplayer = true








requestAnimationFrame(repeat)
