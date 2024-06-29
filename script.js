const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let left,right, up , down
const ballz = []
class Ball {
constructor(x, y, r) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.player = false
    ballz.push(this)
  }
  balls() {
      ctx.beginPath();
    ctx.arc(this.x,this.y,this.r,0,2*Math.PI);
    ctx.stroke();
    ctx.fillStyle = "#d53600";
    ctx.fill();
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

  if (left){b.x--}
  if (right){b.x++}
  if (up){b.y--}
  if (down){b.y++}

}

 function repeat(){
   ctx.clearRect(0, 0, canvas.width, canvas.height);
 ballz.forEach((b)=>{b.balls()
 control(b)
 })
requestAnimationFrame(repeat) 

}
 let b = new Ball(200,200,50)
b.player = true







requestAnimationFrame(repeat)
