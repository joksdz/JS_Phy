const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");



// boolean values to check if the keys are pressed
let left,right, up , down ,ball

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
    return Math.sqrt(this.x ** 2 + this.y ** 2)
  }
  normal()
{
    return new Vec(-this.y, this.x).unit()
  }
  static dot(v1, v2)
     {
    return v1.x * v2.x + v1.y * v2.y

  }
  // this calculates the unit vector
  unit(){
        if(this.len() === 0){
            return new Vec(0,0);
        } else {
            return new Vec(this.x/this.len(), this.y/this.len())
        }
  }
  //this draws the vector on the canvas
VecLine( start_x  , start_y, n , color )
{
  ctx.beginPath();
  ctx.moveTo(start_x, start_y);
  ctx.lineTo(start_x + this.x*n, start_y+ this.y*n);
  ctx.strokeStyle = color;
  ctx.stroke();
  ctx.closePath();

}


 }
     class Ball {
   constructor(x, y, r , color, mass, g) {
    
    this.pos = new Vec(x, y)
    this.color = color
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
    this.g = g 
	
  }
//this collision method only works the lower platform to stop the balls from falling 
 collision()
{
if (this.pos.y + this.r >= canvas.height)
{
    
    this.pos.y = canvas.height - this.r
    this.ac.y = 0
  }
if (this.pos.x + this.r >= canvas.width)
{
    
    this.pos.x = canvas.width - this.r
    this.ac.x = 0
  }
    
if (this.pos.y -this.r <= 0)
{
    
    this.pos.y = 0 + this.r
    this.ac.y = 0
  }
if (this.pos.x - this.r <= 0)
{
    
    this.pos.x = 0 + this.r
    this.ac.x = 0
  }

}
  //draws the ball on canvas also gives gravity 
  balls() {
      ctx.beginPath();
    ctx.arc(this.pos.x,this.pos.y,this.r,0,2*Math.PI);
    ctx.stroke();
    ctx.fillStyle = this.color;
    ctx.fill();
    if (this.mass == undefined ){this.mass = 1}
    else
    {
if (this.mass > 0 ) {

if (this.g){this.pos.y += this.gravity * this.mass}
      }
      else {this.mass =1}
    }
    
  }
  //this displays the ball's velocity and acceleration vectors 
display()
    {
this.v.VecLine(this.pos.x, this.pos.y, 10, "white")
this.ac.VecLine(this.pos.x, this.pos.y, 100, "red")
  }
repos()
{

 this.ac = this.ac.unit().multi(this.acc)
  //adds acceleration to the velocity
  this.v = this.v.add(this.ac)
  // this adds friction to the velocity 
  this.v = this.v.multi(1- f)
  this.pos = this.pos.add(this.v)
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
  // this is to stop the balls from moving when keys are not pressed
  if (!left && !right){b.ac.x = 0}
  if (!up && !down){b.ac.y = 0}
  

 }

function round(n , precision)
{
  let factor = 10**precision
  return Math.round(n*factor)/factor
}
function coll_det(b1 , b2)
 {
if ( b1.r + b2.r >= b2.pos.sub(b1.pos).len())
{
    return true
  }
  else {return false}

}
function pen_res(b1,b2)
{

  let dist = b1.pos.sub(b2.pos)
  let depth = b1.r + b2.r - dist.len()
  let res = dist.unit().multi(depth / 2)
  b1.pos = b1.pos.add(res)
  b2.pos = b2.pos.add(res.multi(-1))

}
function coll_res(b1 , b2)
{
let normal = b1.pos.sub(b2.pos).unit()
let relV = b1.v.sub(b2.v)
let sepV = Vec.dot(relV, normal)
let new_sepV = -sepV *2 
let sepVV = normal.multi(new_sepV)

b1.v = b1.v.add(sepVV)
b2.v = b2.v.add(sepVV.multi(-1)) 
}




 function repeat(){
  //clears the canvas every frame
   ctx.clearRect(0, 0, canvas.width, canvas.height);
  //adds gravity 
 ballz.forEach((b, index)=>{b.balls()
    // checking if player or subplayer is true to give it control
    b.collision()
 if (b.player || b.subplayer){control(b)}
    b.display()
    b.repos()
    for (let i = index + 1 ; i < ballz.length ; i++)
  {

 if (coll_det(ballz[index],ballz[i]))
{
    pen_res(ballz[index], ballz[i])
    coll_res(ballz[index], ballz[i])			
  
      }
    }

 })

 
requestAnimationFrame(repeat) 

}

// initializing the ball
 let b = new Ball(200,200,20 , "#d53600" ,1, true)
 let b1 = new Ball(100,100,50 , "#A2300D",2, true)
 let b2 = new Ball(400,50,30 , "#A2300D",2, false)
// setting the player and subplayer(its the same but the subplayer can move down while on gravity )
b.player = false
b.subplayer = true








requestAnimationFrame(repeat)
