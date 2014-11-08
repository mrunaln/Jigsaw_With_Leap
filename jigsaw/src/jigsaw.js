
//canvas is used for drawing cursors.
var canvas = document.getElementById("canvas");
// canvasTest used for drawing static circle currently
var canvasTest = document.getElementById("canvasTest");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
width = window.innerWidth;
height = window.innerHeight;
// create a rendering context
var ctx = canvas.getContext("2d");
ctx.translate(canvas.width/2,canvas.height);
ctx.fillStyle = "rgba(0,0,0,0.7)";

/*
Using 2 canvas approach now.
One canvas for drawing cursors as it needs to be cleared every time the cursor moves.
CanvasTest for drawing the picture(currently staticCircle) only when keytaps occur.
*/
canvasTest.width = window.innerWidth;
canvasTest.height = window.innerHeight;
var ctxTest = canvasTest.getContext("2d");
ctxTest.translate(canvasTest.width/2,canvasTest.height);
var currentCursorPosX;
var currentCursorPosY;
var keyTap = 0;
var isJumbleClickedThenStartJigsaw = 0;

var leftTop = new Image();
leftTop.src = "/samplePuzzles/Uncle_Scrooge_pieces/1.jpg";
leftTop.style.display = "inline-block";

var rightTop = new Image();
rightTop.src = "/samplePuzzles/Uncle_Scrooge_pieces/2.jpg";
rightTop.style.display = "inline-block";

var leftBottom = new Image();
leftBottom.src = "/samplePuzzles/Uncle_Scrooge_pieces/3.jpg";
leftBottom.style.display = "inline-block";

var rightBottom = new Image();
rightBottom.src = "/samplePuzzles/Uncle_Scrooge_pieces/4.jpg";
rightBottom.style.display = "inline-block";


// render each frame
function drawCursor(obj)
{
   ctx.clearRect(-canvas.width/2,-canvas.height,canvas.width,canvas.height);
   var X , Y;
   // render circles based on pointable positions
   var pointablesMap = obj.pointablesMap;
   var masterFinger=-1, slaveFinger=-2;
   counter = 0;
   for (var i in pointablesMap)
   {
        /*
        Currently Working : Draw only 2 pointers
        FIXME  - Find a cleaner solution
        */
        if(counter > 1 ){
          counter = 0 ;
          //console.log("Draw only 2 pointers");
          break;
        }
        counter += 1;

        var pointable = pointablesMap[i];
        var pos = pointable.tipPosition;
        // create a circle for each pointable
        var radius = 20;
        X = (pos[0]-radius/2)*3;
        Y = (-pos[1]-radius/2)*3
        ctx.beginPath();
        ctx.arc(X,Y,radius,0,2*Math.PI);
        ctx.fill();
        currentCursorPosX = X;
        currentCursorPosY = Y;
        if(keyTap == 1){
            //ctxTest.clearRect(-canvasTest.width/2,-canvasTest.height,canvasTest.width,canvasTest.height);
            //drawMyStaticCircle(currentCursorPosX, currentCursorPosY, 'green');
        }
  }
};

function initPuzzle()
{
   leftTop.onload = function() {
      ctxTest.drawImage(leftTop, -662, -595,190,120); // left top piece
      drawBordersToPieces(-662,-595);

   }
   rightTop.onload = function() {
      ctxTest.drawImage(rightTop, -471, -596,190,120); // right top piece
      drawBordersToPieces(-471,-596);
   }
   leftBottom.onload = function() {
      ctxTest.drawImage(leftBottom, -662, -475,190,120); // right bottom piece
      drawBordersToPieces(-662,-475);
   }
   rightBottom.onload = function() {
      ctxTest.drawImage(rightBottom, -471, -475,190,120); // right bottom piece
      drawBordersToPieces(-471,-475);
   }
}


function drawBordersToPieces(X, Y){
      ctxTest.rect(X, Y,192,122);
      ctxTest.lineWidth = 2;
      ctxTest.strokeStyle = 'blue';
      ctxTest.stroke();
}
$(document).ready(function(){

   initPuzzle();
   drawJumbleButton();
  $("#jumble").click(function(){
       /*
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
         */
  });
  /*
  drawImage("1", "canvas_1");
  drawImage("2", "canvas_2");
  drawImage("3", "canvas_3");
  drawImage("4", "canvas_4");
  */
});

function jumblePieces(){

  ctxTest.clearRect(-canvasTest.width/2,-canvasTest.height,canvasTest.width,canvasTest.height);
  ctxTest.drawImage(rightBottom, -662, -595, 190, 120); // left top piece
  drawBordersToPieces(-662,-595);
  ctxTest.drawImage(leftBottom,  -471, -596, 190, 120); // right top piece
  drawBordersToPieces(-471,-596);
  ctxTest.drawImage(rightTop,    -662, -475, 190, 120); // right bottom piece
  drawBordersToPieces(-662,-475);
  ctxTest.drawImage(leftTop,     -471, -475, 190, 120); // right bottom piece
  drawBordersToPieces(-471,-475);
}
function drawMyStaticCircle(X, Y, color){
  ctxTest.beginPath();
  var staticRadius = 140;
  ctxTest.arc(X, Y, staticRadius, 0, 2 * Math.PI, false);
  ctxTest.fillStyle = color;
  ctxTest.fill();
  ctxTest.lineWidth = 5;
  ctxTest.strokeStyle = '#003300';
  ctxTest.stroke();
}

/*
Jumble button story:
Drawing jumble button on the canvasTest
Once the button is pressed. It will disappear
Draw button till it is pressed.
Until the jumble button is not pressed the game cannot start.
So pieces cannot move.
Show msg press jumble to start your game.
*/

function drawJumbleButton() {
  ctxTest.beginPath();
  ctxTest.lineWidth="10";
  ctxTest.strokeStyle="blue";
  ctxTest.rect(-650,-300,575,80); // x= 0 y = 400 width = 175 h = 80
    //Bcuz of ctx translate  x= -650 y = -300 width = 175 h = 80
  ctxTest.stroke();
  ctxTest.font = "30px Arial";
  ctxTest.fillText("Press to Jumble",-450,-250);
}


function jumbleButtonClick(x, y){
  var left = -650 //x
  var right = -650 + 575
  var top = -300 //y
  var bottom = -300 + 80

  if (right >= x
            && left <= x
            && bottom >= y
            && top <= y) 
  {
            isJumbleClickedThenStartJigsaw = 1;
            console.log("JUMBLE CLICKED ! ");
            jumblePieces();
  }
}

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

// Creates our Leap Controller
    var controller = new Leap.Controller({enableGestures:true});
    // Tells the controller what to do every time it sees a frame
    controller.on( 'frame' , function( frame ){
      /*
      Snippet below works with hands object.
      Tried to execute and read regarding rotate hand.
      Unable find a clear rotation angle yet.
      Not sure if will use hands approach.
      Reference : 
      https://developer.leapmotion.com/documentation/javascript/api/Leap.Hand.html#fingers[]
      */
      /*
      if(frame.hands.length > 0)
      {
        var hand = frame.hands[0];
        console.log(" hand - " + frame.hands[0]);
        var previousFrame = controller.frame(1);
        var totalRotation = hand.rotationAngle(previousFrame);
        var rotationAroundZAxis = hand.rotationAngle(previousFrame, [0,0,1]);
        console.log("Rot: " + totalRotation + ", Z Rot:" + rotationAroundZAxis);
      }
      */
      drawCursor(frame);
      for( var i = 0; i < frame.gestures.length; i++ ){
        var gesture = frame.gestures[i];
        switch(gesture.type)
        {
          case "screenTap":
          case "keyTap":
          //console.log("X = " + currentCursorPosX + "Y = " + currentCursorPosY)
            drawJumbleButton()
            jumbleButtonClick(currentCursorPosX, currentCursorPosY)
            if (isJumbleClickedThenStartJigsaw)
            {
                if(keyTap == 1) // leave the circle at this loc
                {
                  keyTap = 0
                  //ctxTest.clearRect(-canvasTest.width/2,-canvasTest.height,canvasTest.width,canvasTest.height);
                  drawMyStaticCircle(currentCursorPosX, currentCursorPosY, 'red');
                }
                else // pickup the circle
                {
                  keyTap = 1;
                  //ctxTest.clearRect(-canvasTest.width/2,-canvasTest.height,canvasTest.width,canvasTest.height);
                  drawMyStaticCircle(currentCursorPosX, currentCursorPosY, 'green');
                }
            }
            console.log ("KEY TAP keyTap = " + keyTap);
            break;
        }     
      }
    });

/*
Handling if the device gets disconnected in between.
Also can withdraw fingers and start again seamlessly. 
No need to reload the page as before.
*/    
controller.on('connect', function() {
  console.log("Successfully connected.");
});

controller.on('deviceConnected', function() {
  console.log("A Leap device has been connected.");
});

controller.on('deviceDisconnected', function() {
  console.log("A Leap device has been disconnected.");
});

controller.connect();

