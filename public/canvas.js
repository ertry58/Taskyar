const canvas = document.querySelector(".canvas")
canvas.width = 230
canvas.height = 240

let ctx = canvas.getContext("2d")
ctx.beginPath();
ctx.arc(125, 125, 85, 0, 2 * Math.PI); 
ctx.lineWidth = 25; 
ctx.strokeStyle = '#cce0dd'; // رنگ خاکستری روشن
ctx.stroke();
