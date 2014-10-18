var zindex = 0;

// fullscreen
var canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// create a rendering context
var ctx = canvas.getContext("2d");
ctx.translate(canvas.width/2,canvas.height);
ctx.fillStyle = "rgba(0,0,0,0.7)";

// render each frame
function draw(obj) {
  // clear last frame
  ctx.clearRect(-canvas.width/2,-canvas.height,canvas.width,canvas.height);

  // render circles based on pointable positions
  var pointablesMap = obj.pointablesMap;
  for (var i in pointablesMap) {
    // get the pointable's position
    var pointable = pointablesMap[i];
    var pos = pointable.tipPosition;

    // create a circle for each pointable
    var radius = Math.min(600/Math.abs(pos[2]),20);
    ctx.beginPath();
    ctx.arc((pos[0]-radius/2)*3,(-pos[1]-radius/2)*3,radius,0,2*Math.PI);
    ctx.fill();
  }
};

$(document).ready(function(){
  $("#jumble").click(function(){
         //alert("jumble button was clicked");
         document.getElementById('jumbled_jigsaw_image_1').src = "/samplePuzzles/Uncle_Scrooge_pieces/4.jpg";
         document.getElementById('jumbled_jigsaw_image_2').src = "/samplePuzzles/Uncle_Scrooge_pieces/3.jpg";
         document.getElementById('jumbled_jigsaw_image_3').src = "/samplePuzzles/Uncle_Scrooge_pieces/2.jpg";
         document.getElementById('jumbled_jigsaw_image_4').src = "/samplePuzzles/Uncle_Scrooge_pieces/1.jpg";
         document.getElementById('jumble').disabled = 'true'
    
         hideSolution('solution_image_1');
         hideSolution('solution_image_2');
         hideSolution('solution_image_3');
         hideSolution('solution_image_4');
  });
    
  drawImage("1", "canvas_1");
  drawImage("2", "canvas_2");
  drawImage("3", "canvas_3");
  drawImage("4", "canvas_4");
    
    
});

function hideSolution(id){
  $('#'+id).parent().removeClass("individualPieces");
  /*FIXME - i dont know why border class not seen after jumble button pressed.*/
   $('#'+id).parent().addClass("hiddenIndividualPieces");
   
}

function drawImage(imageSrc, canvasID){
    var img=document.createElement("img");
    img.id = "solution_image_" + imageSrc;
    img.src= "/samplePuzzles/Uncle_Scrooge_pieces/" + imageSrc + ".jpg";
    var canvas = document.getElementById(canvasID);
    var context = canvas.getContext('2d');
    canvas.appendChild(img);
    context.drawImage(img, 0, 0,canvas.width, canvas.height);
}

Leap.loop(draw);
