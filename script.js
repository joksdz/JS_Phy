const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");



let left,right, up , down

const ballz = []

let f = 0.1
 class Vec {
   constructor(x,y)
{

    this.x = x 
    this.y = y
  }
  add(v)
{
    return new Vec(this.x + v.x , this.y + v.y)
  }
  sub(v)
{
    return new Vec(this.x - v.x , this.y - v.y)
  }
  multi(n)
{
    return new Vec(this.x * n , this.y * n)
  }
  len()
{ 
    return Math.sqrt(this.x ** 2 , this.y ** 2)
  }
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
    this.v = new Vec(0,0)
    this.ac = new Vec (0,0)
    this.acc = 1
  this.player = false
  this.subplayer = false
  this.gravity = 5
  }
  balls() {
      ctx.beginPath();
    ctx.arc(this.x,this.y,this.r,0,2*Math.PI);
    ctx.stroke();
    ctx.fillStyle = this.color;
    ctx.fill();
  }
display()
    {
this.v.VecLine(this.x, this.y, 10, "white")
this.ac.VecLine(this.x, this.y, 100, "red")
  }
 }

function control(b){

canvas.addEventListener("keydown", function (e) {
if (e.keyCode == 37){left = true}
if (e.keyCode == 38){up = true}
if (e.keyCode == 39){right = true}
if (e.keyCode == 40){down = true}
})

canvas.addEventListener("keyup", function (e) {
if (e.keyCode == 37){left = false}
if (e.keyCode == 38){up = false}
if (e.keyCode == 39){right = false}
if (e.keyCode == 40){down = false}
})

  if (left){b.ac.x = -b.acc}
  if (right){b.ac.x =  b.acc}
  if (up){b.ac.y = -b.acc}
  if (down && !b.player){b.ac.y =  b.acc}
  if (!left && !right){b.ac.x = 0}
  if (!up && !down){b.ac.y = 0}
  b.v = b.v.add(b.ac)
  b.v = b.v.multi(1- f)
  b.x += b.v.x
  b.y += b.v.y
 }
function collision()
{
if (b.y + b.r> canvas.height)
{
    
    b.y = canvas.height - b.r
    b.ac.y= 0
  }
}


 function repeat(){
   ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  if (true){b.y += b.gravity}
 ballz.forEach((b)=>{b.balls()
    box()
    collision()
 if (b.player || b.subplayer){control(b)}
    b.display()
 })
requestAnimationFrame(repeat) 

}
 let b = new Ball(200,200,20 , "#d53600")
b.player = false
b.subplayer = true
function box(){
  
ctx.beginPath();
ctx.rect(0, 477, 700, 100) 
ctx.fillStyle = "red"
ctx.fill();
ctx.stroke();

}





requestAnimationFrame(repeat)
