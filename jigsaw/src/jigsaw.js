var canvas, canvasTest, ctx, ctxTest;
var puzzleName, leftTop, leftBottom,rightBottom,rightTop, keyTap;
var currentCursorPosX;
var currentCursorPosY;
var message;
var quadrant_clicked;
var quandrant_loc_to_piece_map = { Q1:"rightTop" ,  Q2 : "leftTop" , Q3:"leftBottom" , Q4:"rightBottom"};
;
/*
Used to remember the position of the piece on the canvas
*/
var piece_topLeft_X ;
var piece_topLeft_Y;

var piece_topRight_X;
var piece_topRight_Y;

var piece_bottomRight_X;
var piece_bottomRight_Y;

var piece_bottomLeft_X;
var piece_bottomLeft_Y;
var puzzle_tile_counter;

function initGame(puzzleName){
      //canvas is used for drawing cursors.
      canvas = document.getElementById("canvas");
      // canvasTest used for drawing static circle currently
      canvasTest = document.getElementById("canvasTest");
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      width = window.innerWidth;
      height = window.innerHeight;
      // create a rendering context
      ctx = canvas.getContext("2d");
      ctx.translate(canvas.width/2,canvas.height);
      ctx.fillStyle = "rgba(0,0,0,0.7)";

      /*
      Using 2 canvas approach now.
      One canvas for drawing cursors as it needs to be cleared every time the cursor moves.
      CanvasTest for drawing the picture(currently staticCircle) only when keytaps occur.
      */
      canvasTest.width = window.innerWidth;
      canvasTest.height = window.innerHeight;
      ctxTest = canvasTest.getContext("2d");
      ctxTest.translate(canvasTest.width/2,canvasTest.height);


      ctx.clearRect(-canvas.width/2,-canvas.height,canvas.width,canvas.height);
      ctx.clearRect(-canvasTest.width/2,-canvasTest.height,canvasTest.width,canvasTest.height);
      
      leftTop = new Image();
      leftTop.src = "/samplePuzzles/" + puzzleName + "/1.jpg";
      leftTop.style.display = "inline-block";

      rightTop = new Image();
      rightTop.src = "/samplePuzzles/"+ puzzleName +"/2.jpg";
      rightTop.style.display = "inline-block";

      leftBottom = new Image();
      leftBottom.src = "/samplePuzzles/"+ puzzleName +"/3.jpg";
      leftBottom.style.display = "inline-block";

      rightBottom = new Image();
      rightBottom.src = "/samplePuzzles/"+ puzzleName +"/4.jpg";
      rightBottom.style.display = "inline-block";

      keyTap = 0;
      quandrant_loc_to_piece_map = { Q1:"rightTop" ,  Q2 : "leftTop" , Q3:"leftBottom" , Q4:"rightBottom"};
      piece_topLeft_X = 0;
      piece_topLeft_Y = 0;

      piece_topRight_X = 0;
      piece_topRight_Y = 0;

      piece_bottomRight_X = 0;
      piece_bottomRight_Y = 0;

      piece_bottomLeft_X = 0;
      piece_bottomLeft_Y = 0;

      puzzle_tile_counter = 0;
      jumblePieces();
      drawButtons();
}



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
            drawMyStaticCircle(currentCursorPosX, currentCursorPosY, quandrant_loc_to_piece_map[quadrant_clicked] );
        }
  }
};

function isResetClicked(){
  var resetLeft = -300;
  var resetRight = -300 + 200;
  var resetTop = -250;
  var resetBottom = -250 + 75;

   if (resetRight >= currentCursorPosX
            && resetLeft <= currentCursorPosX
            && resetBottom >= currentCursorPosY
            && resetTop <= currentCursorPosY)
  {
            console.log("RESET CLICKED ! ");
             var message = document.getElementById("message");
             $('#message').html("<span> " + " Resetting the game </span>");
            return true;
  }
  return false;

}

/*FIXME*/
function isGameChanger(){
  var unclePuzzleLeft = -600;
  var unclePuzzleRight = -600 + 200;
  var unclePuzzleTop = -250;
  var unclePuzzleBottom = -250 + 100;

  var fruitsPuzzleLeft = -25;
  var fruitsPuzzleRight = -25 + 200;
  var fruitsPuzzleTop = -250;
  var fruitsPuzzleBottom = -250 + 100;


   if (unclePuzzleRight >= currentCursorPosX
      && unclePuzzleLeft <= currentCursorPosX
      && unclePuzzleBottom >= currentCursorPosY
      && unclePuzzleTop <= currentCursorPosY)
  {
      puzzleName = "Uncle_Scrooge_pieces";
      initGame(puzzleName);
      
  }else if(fruitsPuzzleRight >= currentCursorPosX
      && fruitsPuzzleLeft <= currentCursorPosX
      && fruitsPuzzleBottom >= currentCursorPosY
      && fruitsPuzzleTop <= currentCursorPosY)
  {
      puzzleName = "fruits_pieces";
      initGame(puzzleName);
  }
}

function drawButtons(){

      ctxTest.rect(-600, -250,200, 70);
      ctxTest.lineWidth = 3;
      ctxTest.strokeStyle = "blue";
      ctxTest.stroke();
      ctxTest.font = "20px Arial";
      ctxTest.fillText("Uncle Scrooge Game",-595,-190);

      ctxTest.rect(-300, -250,200,75);
      ctxTest.lineWidth = 3;
      ctxTest.strokeStyle = "blue";
      ctxTest.stroke();
      ctxTest.font = "20px Arial";
      ctxTest.fillText("Reset Game",-275,-190);

      ctxTest.rect(-25, -250,200,75);
      ctxTest.lineWidth = 3;
      ctxTest.strokeStyle = "blue";
      ctxTest.stroke();
      ctxTest.font = "20px Arial";
      ctxTest.fillText("Fruits Puzzle",20,-190);
}


function drawBordersToPieces(X, Y,color){
      ctxTest.rect(X, Y,192,122);
      ctxTest.lineWidth = 3;
      ctxTest.strokeStyle = color;
      ctxTest.stroke();
}

$(document).ready(function(){
  puzzleName = "Uncle_Scrooge_pieces";
  initGame(puzzleName);
});

function jumblePieces(){

  rightBottom.onload = function() {
    // left top position(Q2) holds rightBottom piece
    ctxTest.drawImage(rightBottom, -662, -595, 190, 120);
    drawBordersToPieces(-662,-595,"blue");
  }
  piece_topLeft_X = -662;
  piece_topLeft_Y = -595;
  quandrant_loc_to_piece_map["Q2"] = "rightBottom";

  leftBottom.onload = function() {
    // right top position (Q1) holds leftBottom
    ctxTest.drawImage(leftBottom,  -471, -596, 190, 120);
   drawBordersToPieces(-471,-596,"blue");
  }
  piece_topRight_X = -471;
  piece_topRight_Y = -596;
  quandrant_loc_to_piece_map["Q1"] = "leftBottom";

  rightTop.onload = function() {
    // left bottom position(Q3) holds rightTop piece
    ctxTest.drawImage(rightTop,    -662, -475, 190, 120);
    drawBordersToPieces(-662,-475,"blue");
  }
  piece_bottomLeft_X = -662;
  piece_bottomLeft_Y = -475;
  quandrant_loc_to_piece_map["Q3"] = "rightTop";

  leftTop.onload = function() {
    // right bottom position(Q4) holds leftTop piece
    ctxTest.drawImage(leftTop,-471, -475, 190, 120);
    drawBordersToPieces(-471,-475,"blue");
  }
  piece_bottomRight_X = -471;
  piece_bottomRight_Y = -475;
  quandrant_loc_to_piece_map["Q4"] = "leftTop";

}

function isSolutionBoardClicked(){
  if (currentCursorPosX > -350 && currentCursorPosY > -595
       && currentCursorPosX < 350 && currentCursorPosY < -355)
  {
    return true;
  }
  return false;
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


function drawCurrentSolutionBoard(imageSrc){
    var solutionBoard_x, solutionBoard_y;
    if(imageSrc == "rightTop"){ // Q1
        solutionBoard_x = -60;
        solutionBoard_y = -595; // verified doing good
    }else if(imageSrc == "rightBottom"){ // Q4
        solutionBoard_x = -60;
        solutionBoard_y = -475; // verified doing good
    }else if(imageSrc == "leftTop"){ //Q2
        solutionBoard_x = -252;
        solutionBoard_y = -595; // verified
    }else if(imageSrc == "leftBottom"){ // Q3
        solutionBoard_x = -252;
        solutionBoard_y = -475; // verified
    }
    puzzle_tile_counter++;
    drawMyStaticCircle(solutionBoard_x,solutionBoard_y,imageSrc);
}
function drawMyStaticCircle(X, Y , imageSrc){

  ctxTest.clearRect(-canvasTest.width/2,-canvasTest.height,canvasTest.width,canvasTest.height);
  if(imageSrc == "rightTop")
  {
    ctxTest.drawImage(rightTop, X, Y, 190, 120);
    piece_bottomLeft_X = X;
    piece_bottomLeft_Y = Y;
    ctxTest.drawImage(leftTop, piece_bottomRight_X, piece_bottomRight_Y, 190, 120)
    ctxTest.drawImage(leftBottom, piece_topRight_X, piece_topRight_Y, 190, 120);
     // right bottom position(Q4) holds leftTop piece
    ctxTest.drawImage(rightBottom,  piece_topLeft_X, piece_topLeft_Y, 190, 120);
  }
  else if(imageSrc == "leftTop")
  {
    ctxTest.drawImage(leftTop, X, Y, 190, 120);
    piece_bottomRight_X = X;
    piece_bottomRight_Y = Y;
    ctxTest.drawImage(leftBottom, piece_topRight_X, piece_topRight_Y, 190, 120);
    // right top position (Q1) holds leftBottom
    ctxTest.drawImage(rightTop,  piece_bottomLeft_X, piece_bottomLeft_Y, 190, 120);
    // right bottom position(Q4) holds leftTop piece
    ctxTest.drawImage(rightBottom,  piece_topLeft_X, piece_topLeft_Y, 190, 120);
  }
  else if(imageSrc == "leftBottom")
  {
    ctxTest.drawImage(leftBottom, X, Y, 190, 120);
    piece_topRight_X = X;
    piece_topRight_Y = Y;
    ctxTest.drawImage(leftTop, piece_bottomRight_X, piece_bottomRight_Y, 190, 120);
    // right top position (Q1) holds leftBottom
    ctxTest.drawImage(rightTop,  piece_bottomLeft_X, piece_bottomLeft_Y, 190, 120);
    // right bottom position(Q4) holds leftTop piece
    ctxTest.drawImage(rightBottom,  piece_topLeft_X, piece_topLeft_Y, 190, 120);
  }
  else if(imageSrc == "rightBottom")
  {
    ctxTest.drawImage(rightBottom, X, Y, 190, 120);
    piece_topLeft_X = X;
    piece_topLeft_Y = Y;
    ctxTest.drawImage(leftBottom, piece_topRight_X, piece_topRight_Y, 190, 120);
    ctxTest.drawImage(leftTop, piece_bottomRight_X, piece_bottomRight_Y, 190, 120);
    // right top position (Q1) holds leftBottom
    ctxTest.drawImage(rightTop,  piece_bottomLeft_X, piece_bottomLeft_Y, 190, 120);
  }
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
      if (isResetClicked()){
        initGame(puzzleName);
      }
      isGameChanger();
      drawCursor(frame);
      for( var i = 0; i < frame.gestures.length; i++ ){
        var gesture = frame.gestures[i];
        switch(gesture.type)
        {
          case "screenTap":
          case "keyTap":
               console.log ("KEY TAP = " + keyTap);
               if(keyTap == 1)
               {
                  // Resetting keyTap to keep the puzzle piece at the curr pos
                  keyTap = 0;
                  var yesOrNo = isSolutionBoardClicked();
                  if(yesOrNo)
                  {
                      drawCurrentSolutionBoard(quandrant_loc_to_piece_map[quadrant_clicked]);
                      if(puzzle_tile_counter == 4){
                        message = document.getElementById("message");
                        $('#message').html("<span> " + "YAYYYY.. Puzzle Complete !" + "</span>");
                        drawButtons();
                      }else if(puzzle_tile_counter < 0){
                        message = document.getElementById("message");
                        $('#message').html("<span> " + "You are going great! " + (4 - puzzle_tile_counter) + " tiles to go !" + "</span>");
                      }
                  }
               }
               else if(isPuzzleBoardClicked())
               {
                  //in the below func call the value of keyTap toggles on correct piece identification
                  quadrant_clicked = identifyPieceSelectionOnKeytap();
                  if(quadrant_clicked != null &&
                    quandrant_loc_to_piece_map[quadrant_clicked] != null)
                  {
                      drawMyStaticCircle(currentCursorPosX, currentCursorPosY, quandrant_loc_to_piece_map[quadrant_clicked] );
                  }
              }//if puzzleBoardClicked ends
            }//else of isJumbleButtonClicked ends here
            break;
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

