const canvas = document.createElement('canvas');
canvas.setAttribute('height','480');
canvas.setAttribute('width','640');
canvas.style.backgroundColor = 'black';
document.body.prepend(canvas);
const ctx = canvas.getContext('2d');

const game = {
  req:'',
  score:0
};
const bubble = {
  bubbleCount:30,
  speed:2,
  bubbles:[]};

const cliker = [];

/*for(let x = 0; x<bubble.bubbleCount;x++){
  createBubble();
}*/

canvas.addEventListener('click', (e)=>{

  const rect =  canvas.getBoundingClientRect();
  const mouseClick = {
    x:e.clientX-rect.left,
    y:e.clientY-rect.top,
    size:30
  }
  cliker.push(mouseClick);
 // console.log(mouseClick);
 /*bubble.bubbles.forEach((bub, index)=>{
  if(colCheck(bub,mouseClick)){
    bubble.bubbles.splice(index,1);
  };

 });*/

 //colCheck(a,b)
})

function colCheck(a,b){
    //let horz = a.x < b.x+b.size && a.x+a.size > b.x;
    //let vert = a.y < b.y+b.size && a.y+a.size > b.y;
    let hit = a.x < b.x+b.size && a.x+a.size > b.x && a.y < b.y+b.size && a.y+a.size > b.y;
   if(hit){
    console.log(a);
    console.log(b);
   }
   return hit;
}

function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  if(bubble.bubbles.length < bubble.bubbleCount){
    //Create new bubble
    bubbleMaker();
  }

  cliker.forEach((dot,index)=>{
      //ctx.fllStyle = 'yellow';
      ctx.strokeStyle = 'yellow';
      ctx.beginPath();
      //ctx.fillRect(dot.x-(dot.size/2),dot.y-(dot.size/2),dot.size,dot.size);
      ctx.arc(dot.x,dot.y,dot.size,0,2*Math.PI);
      ctx.stroke();
      dot.size-=1;
      if(dot.size<1){
        cliker.splice(index,1);
      }

  });
  bubble.bubbles.forEach((bub, index)=>{
    bub.y-=bubble.speed;
    bub.x-= Math.random()*5 -3;
    if(bub.y < 0){
      let temp = bubble.bubbles.splice(index,1);
      //console.log(temp);
    }
    cliker.forEach((dot)=>{
       if(colCheck(bub,dot)){
         let popped = bubble.bubbles.splice(index,1);
         let val = Math.ceil(popped[0].size);
         game.score += val;
       }
    })
    drawBubble(bub.x,bub.y,bub.size,bub.color);
  });
  
  ctx.fillStyle = 'rgba(0,0,0,0.5)';
  ctx.fillRect(0,20,canvas.width,40);
  ctx.beginPath();
  ctx.fillStyle = 'white';
  ctx.font = '36px serif';
  ctx.textAlign = 'center';
  let tempOutput = `SCORE: ${game.score}`;
  ctx.fillText(tempOutput, canvas.width/2,50);

  game.req = requestAnimationFrame(draw);
}

function bubbleMaker(){
  let bubbleSize = Math.random()*10+15;
  let xPos = Math.random() * (canvas.width - bubbleSize);
  let yPos = Math.random() * (canvas.height - bubbleSize)+canvas.height;
  bubble.bubbles.push({
    x: xPos,
    y: yPos,
    size: bubbleSize,
    color: [Math.random()*255,Math.random()*255,Math.random()*255]

  
  });
}

function drawBubble(xPos,yPos,bubbleSize,cl){
     

    const gradient = ctx.createRadialGradient(xPos,yPos-10,bubbleSize-15,xPos, yPos,bubbleSize+10);

    gradient.addColorStop(0, 'rgba('+cl[0]+','+cl[1]+','+cl[2]+',0.9)');
    gradient.addColorStop(1, 'rgba(255,255,255,0.1)');

    
    ctx.beginPath();
    ctx.fillStyle= gradient;
    ctx.strokeStyle='rgba(255,255,255,0.7)';
    ctx.arc(xPos, yPos,bubbleSize,0, Math.PI*2);
    ctx.fill();
    ctx.stroke();

}

game.req = requestAnimationFrame(draw);

