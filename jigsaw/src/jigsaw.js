
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

var quandrant_loc_to_piece_map = {Q1:"rightTop" ,  Q2 : "leftTop" , Q3:"leftBottom" , Q4:"rightBottom"};
var yesJumbleButtonClicked = 0;
var quadrant_clicked;
/*
Later : Will be used to remember the position of the piece on the canvas
*/
var piece_topLeft_X = 0;
var piece_topLeft_Y = 0;

var piece_topRight_X = 0;
var piece_topRight_Y = 0;

var piece_bottomRight_X = 0;
var piece_bottomRight_Y = 0;

var piece_bottomLeft_X = 0;
var piece_bottomLeft_Y = 0;

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
        if(keyTap == 1)
        {
            ctxTest.clearRect(-canvasTest.width/2,-canvasTest.height,canvasTest.width,canvasTest.height);
            drawMyStaticCircle(currentCursorPosX, currentCursorPosY, 'red', quandrant_loc_to_piece_map[quadrant_clicked] );
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
   drawJumbleButton("Click Jumble here");
});

function jumblePieces(){

  ctxTest.clearRect(-canvasTest.width/2,-canvasTest.height,canvasTest.width,canvasTest.height);

  // left top position(Q2) holds rightBottom piece
  ctxTest.drawImage(rightBottom, -662, -595, 190, 120);
  drawBordersToPieces(-662,-595);
  piece_topLeft_X = -662;
  piece_topLeft_Y = -595;
  quandrant_loc_to_piece_map["Q2"] = "rightBottom";

  // right top position (Q1) holds leftBottom
  ctxTest.drawImage(leftBottom,  -471, -596, 190, 120);
  drawBordersToPieces(-471,-596);
  piece_topRight_X = -471;
  piece_topRight_Y = -596;
  quandrant_loc_to_piece_map["Q1"] = "leftBottom";

  // left bottom position(Q3) holds rightTop piece
  ctxTest.drawImage(rightTop,    -662, -475, 190, 120);
  drawBordersToPieces(-662,-475);
  piece_bottomLeft_X = -662;
  piece_bottomLeft_Y = -475;
  quandrant_loc_to_piece_map["Q3"] = "rightTop";

  // right bottom position(Q4) holds leftTop piece
  ctxTest.drawImage(leftTop,     -471, -475, 190, 120);
  drawBordersToPieces(-471,-475);
  piece_bottomRight_X = -471;
  piece_bottomRight_Y = -475;
  quandrant_loc_to_piece_map["Q4"] = "leftTop";
}


function isPuzzleBoardClicked(){
  if (currentCursorPosX > -662 && currentCursorPosY > -595
    && currentCursorPosX < -321 && currentCursorPosY < -355)
  {
    return true;
  }
  return false;
}
/*
This function know the currentX currentY co-ords where tap occured.
It will return which piece is under the tap co-ords.
Also update the piece_<which_ever>_X and piece_<which_ever>_Y for future use
*/
function identifyPieceSelectionOnKeytap(){
  var verticleLine_X_top = -470;
  var verticleLine_Y_top = -596
  var verticleLine_X_bottom = -470;
  var verticleLine_Y_bottom = (-475 + 120);

  var horizLine_X_left;
  var horizLine_Y_left;
  var horizLine_X_right;
  var horizLine_Y_right;

  var value = computeValueForWhichSideOfLine(verticleLine_X_top, verticleLine_Y_top,verticleLine_X_bottom, verticleLine_Y_bottom,currentCursorPosX, currentCursorPosY);
  if(value < 0)
  {
      //console.log ("R I G H T side of verticle axis");
      horizLine_X_left = -662;
      horizLine_Y_left = -475;
      horizLine_X_right = -471;
      horizLine_Y_right = -475;
      value = computeValueForWhichSideOfLine(horizLine_X_left ,horizLine_Y_left, horizLine_X_right, horizLine_Y_right ,currentCursorPosX, currentCursorPosY);

      if(value < 0){
          //console.log ( "R I G H T - A B O V E "); // Quadrant 1
          keyTap = 1;
          return "Q1";
      }else{
          //console.log (" R I G H T - B E L O W");  // Quadrant 4
          keyTap = 1;
          return "Q4";
      }
  }else{
      //console.log ("L E F T  side of verticle axis");
      horizLine_X_left = -471;
      horizLine_Y_left = -475;
      horizLine_X_right = -321;
      horizLine_Y_right = -475;
      value = computeValueForWhichSideOfLine(horizLine_X_right , horizLine_Y_right, horizLine_X_left, horizLine_Y_left, currentCursorPosX, currentCursorPosY);
      if(value < 0){
          //console.log ("L E F T - B E L O W"); // Quadrant 3
          keyTap = 1;
          return "Q3";
      }else{
          //console.log ( "L E F T - A B O V E "); // Quadrant 2
          keyTap = 1;
          return "Q2";
      }
  }
  return null;
}

function computeValueForWhichSideOfLine(Ax, Ay, Bx, By, Cx, Cy){

  return((Bx - Ax) * (Cy - Ay) - (By - Ay) * (Cx - Ax));
}


function drawMyStaticCircle(X, Y, color, imageSrc){


  drawBordersToPieces(piece_bottomRight_X, piece_bottomRight_Y);
  drawBordersToPieces(piece_topRight_X,piece_topRight_Y);
  drawBordersToPieces(piece_topLeft_X, piece_topLeft_Y);
  drawBordersToPieces(piece_bottomLeft_X, piece_bottomLeft_Y);
  if(imageSrc == "rightTop")
  {
    ctxTest.drawImage(rightTop, X, Y, 190, 120);
    ctxTest.drawImage(leftTop, piece_bottomRight_X, piece_bottomRight_Y, 190, 120)
    ctxTest.drawImage(leftBottom, piece_topRight_X, piece_topRight_Y, 190, 120);
     // right bottom position(Q4) holds leftTop piece
    ctxTest.drawImage(rightBottom,  piece_topLeft_X, piece_topLeft_Y, 190, 120);
  }
  else if(imageSrc == "leftTop")
  {
    ctxTest.drawImage(leftTop, X, Y, 190, 120);
    ctxTest.drawImage(leftBottom, piece_topRight_X, piece_topRight_Y, 190, 120);
    // right top position (Q1) holds leftBottom
    ctxTest.drawImage(rightTop,  piece_bottomLeft_X, piece_bottomLeft_Y, 190, 120);
    // right bottom position(Q4) holds leftTop piece
    ctxTest.drawImage(rightBottom,  piece_topLeft_X, piece_topLeft_Y, 190, 120);
  }
  else if(imageSrc == "leftBottom")
  {
    ctxTest.drawImage(leftBottom, X, Y, 190, 120);
    ctxTest.drawImage(leftTop, piece_bottomRight_X, piece_bottomRight_Y, 190, 120);
    // right top position (Q1) holds leftBottom
    ctxTest.drawImage(rightTop,  piece_bottomLeft_X, piece_bottomLeft_Y, 190, 120);
    // right bottom position(Q4) holds leftTop piece
    ctxTest.drawImage(rightBottom,  piece_topLeft_X, piece_topLeft_Y, 190, 120);
  }
  else if(imageSrc == "rightBottom")
  {
    ctxTest.drawImage(rightBottom, X, Y, 190, 120);
    ctxTest.drawImage(leftBottom, piece_topRight_X, piece_topRight_Y, 190, 120);
    ctxTest.drawImage(leftTop, piece_bottomRight_X, piece_bottomRight_Y, 190, 120);
    // right top position (Q1) holds leftBottom
    ctxTest.drawImage(rightTop,  piece_bottomLeft_X, piece_bottomLeft_Y, 190, 120);
  }
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

function drawJumbleButton(msg) {
  ctxTest.beginPath();
  ctxTest.lineWidth="10";
  ctxTest.strokeStyle="blue";
  ctxTest.rect(-650,-300,575,80); // x= 0 y = 400 width = 175 h = 80
    //Bcuz of ctx translate  x= -650 y = -300 width = 175 h = 80
  ctxTest.stroke();
  ctxTest.font = "30px Arial";
  ctxTest.fillText(msg,-450,-250);
}


function isJumbleButtonClicked(x, y){
  var left = -650 //x
  var right = -650 + 575
  var top = -300 //y
  var bottom = -300 + 80

  if (right >= x
            && left <= x
            && bottom >= y
            && top <= y) 
  {
            console.log("J U M B L E C L I C K E D ! ");
            //keyTap = 0;
             jumblePieces();
             yesJumbleButtonClicked = 1;
  }else{
      yesJumbleButtonClicked = 0;
  }
  return yesJumbleButtonClicked;
}



function hideSolution(id){
  $('#'+id).parent().removeClass("individualPieces");
  /*FIXME - i dont know why border class not seen after jumble button pressed.*/
   $('#'+id).parent().addClass("hiddenIndividualPieces");
   
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
              console.log ("KEY TAP = " + keyTap);
            /*
              Only when the keyTapped then the piece is selected.
              Otherwise do not move the piece
            */
            if(yesJumbleButtonClicked == 0)
            {
                isJumbleButtonClicked(currentCursorPosX, currentCursorPosY);
            }
            else{
                /* If the button is clicked then dont draw the button */
               drawJumbleButton("Start your play! ")
               if(isPuzzleBoardClicked())
               {
                  //in the below func call the value of keyTap toggles on correct piece identification
                  quadrant_clicked = identifyPieceSelectionOnKeytap();
                  if(quadrant_clicked != null)
                  {
                    if(quandrant_loc_to_piece_map[quadrant_clicked] != null){
                        console.log("Currently in : " + quadrant_clicked);
                        console.log("Destination location" + quandrant_loc_to_piece_map[quadrant_clicked]);
                        ctxTest.clearRect(-canvasTest.width/2,-canvasTest.height,canvasTest.width,canvasTest.height);
                        drawMyStaticCircle(currentCursorPosX, currentCursorPosY, 'red', quandrant_loc_to_piece_map[quadrant_clicked] );
                    }
                  }
                }//if puzzleBoardClicked ends
            }//else of isJumbleButtonClicked ends here
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

