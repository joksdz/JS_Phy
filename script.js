function balls(x,y,r,a1,a2) {
  const canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.arc(x,y,r, a1, a2);
    ctx.fillStyle = "#d53600";
    ctx.fill();
    ctx.stroke();
  }
}

balls(200,200,45,0,2*Math.PI);

