const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let left,right, up , down

var x = 100
var y = 100
var r = 45
function balls(x,y,r) {
      ctx.beginPath();
    ctx.arc(x,y,r,0,2*Math.PI);
    ctx.fillStyle = "#d53600";
    ctx.fill();
    ctx.stroke();
  }
canvas.addEventListener("keydown", function (e) {
if (e.keyCode == 37){left = true}
if (e.keyCode == 38){up = true}
if (e.keyCode == 39){right = true}
if (e.keyCode == 40){down = true}
})
function move() {
  if (left){x--}
  if (right){x++}
  if (up){y--}
  if (down){y++}
}
canvas.addEventListener("keyup", function (e) {
if (e.keyCode == 37){left = false}
if (e.keyCode == 38){up = false}
if (e.keyCode == 39){right = false}
if (e.keyCode == 40){down = false}
})

 function repeat(){
   ctx.clearRect(0, 0, canvas.width, canvas.height);
  move();
  balls(x , y, r);
requestAnimationFrame(repeat) 

}
requestAnimationFrame(repeat)



