const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function balls(x,y,r,a1,a2) {
      ctx.beginPath();
    ctx.arc(x,y,r, a1, a2);
    ctx.fillStyle = "#d53600";
    ctx.fill();
    ctx.stroke();
  }
canvas.addEventListener("keydown", function (e) {
  if (e.keyCode === 69) {
    balls(200,100,45,0,2*Math.PI);
  }
})



balls(200,200,45,0,2*Math.PI);

