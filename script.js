const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let left,right, up , down
const ballz = []
let f = 0.1
     class Ball {
   constructor(x, y, r) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.player = false
    ballz.push(this)
this.v_x = 0
this.v_y = 0
this.ac_x = 0 
this.ac_y = 0
this.acc = 1
this.gravity = 0.6
  }
  balls() {
      ctx.beginPath();
    ctx.arc(this.x,this.y,this.r,0,2*Math.PI);
    ctx.stroke();
    ctx.fillStyle = "#d53600";
    ctx.fill();
  }
 display()
{
  ctx.beginPath();
  ctx.moveTo(this.x,this.y);
  ctx.lineTo(this.x + this.ac_x*100, this.y + this.ac_y*100);
  ctx.strokeStyle = "white";
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(this.x,this.y);
  ctx.lineTo(this.x + this.v_x*10, this.y + this.v_y*10);
  ctx.strokeStyle = "red";
  ctx.stroke();



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

  if (left){b.ac_x = -b.acc}
  if (right){b.ac_x =  b.acc}
  if (up){b.ac_y = -b.acc}
  if (down){b.ac_y =  b.acc}
  if (!left && !right){b.ac_x = 0}
  if (!up && !down){b.ac_y = 0}
  b.v_x += b.ac_x
  b.v_x *= 1- f
  b.v_y += b.ac_y
  b.v_y *=1 - f
  b.x += b.v_x
  b.y += b.v_y
  if (true){b.v_y += b.gravity}
 }
function collision()
{

}


 function repeat(){
   ctx.clearRect(0, 0, canvas.width, canvas.height);
 ballz.forEach((b)=>{b.balls()
    box()
 control(b)
    b.display()
 })
requestAnimationFrame(repeat) 

}
 let b = new Ball(200,200,20)
function box(){
  
ctx.beginPath();
ctx.rect(0, 450, 700, 100) 
ctx.fillStyle = "red"
ctx.fill();
ctx.stroke();

}





requestAnimationFrame(repeat)
