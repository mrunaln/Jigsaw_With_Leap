var puzzleBoardCo_ordinated = {topLeft_X: -662, topLeft_Y : -595,
                              topRight_X : -471, topRight_Y : -596,
                              bottomRight_X : -471, bottomRight_Y: -475,
                              bottomLeft_X: -662 , bottomLeft_Y: -475};

var piece_Dim = {width : 190 , height : 120};

var solutionBoardCo_ordinates = {topLeft_X : -100, topLeft_Y :-595,
                                 topRight_X : 90, topRight_Y :-595,
                                 bottomRight_X : 90, bottomRight_Y : -475,
                                 bottomLeft_X: -100, bottomLeft_Y: -475 };
var PuzzlePieces = {
  newInstance : function(srcPos, destPos)
  {
    return { x : 0, y : 0,
            sourcePos: srcPos, destinationPos: destPos,
            reachedDest : 0,
            image: new Image() };
  }
}

var piece_right_top, piece_left_top, piece_left_bottom, piece_right_bottom;

var resetButton = {left: -300 , right: -100,
                   top : -250, bottom: -175,
                   width : 200 , height : 75};

var randomPuzzleButton = {left: -25 , right: 175,
                          top : -250, bottom: -150,
                          width : 200, height : 75};

var games = [ "Uncle_Scrooge_pieces",
              "fruits_pieces",
              "lego_pieces",
              "nemo_pieces"];

var canvas, canvasTest, canvasGrid, ctx, ctxTest, ctxGrid;
var puzzleName,keyTap;
var currentCursorPosX;
var currentCursorPosY;
var quadrant_clicked;    
var gameChangeFlag = 0;

$(document).ready(function(){
  puzzleName = "Uncle_Scrooge_pieces";
  initGame(puzzleName);
});

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
      ctxTest.clearRect(-canvasTest.width/2,-canvasTest.height,canvasTest.width,canvasTest.height);
      //ctxGrid.clearRect(-canvas.width/2,-canvas.height,canvas.width,canvas.height);

      piece_right_top = PuzzlePieces.newInstance("rightTop" , "rightTop");
      piece_left_top = PuzzlePieces.newInstance("leftTop", "leftTop");
      piece_left_bottom = PuzzlePieces.newInstance("leftBottom", "leftBottom");
      piece_right_bottom = PuzzlePieces.newInstance("rightBottom","rightBottom");

      var leftTop, leftBottom,rightBottom,rightTop;
      leftTop = new Image();
      leftTop.src = "/samplePuzzles/" + puzzleName + "/1.jpg";
      leftTop.style.display = "inline-block";
      piece_left_top["image"] = leftTop;

      rightTop = new Image();
      rightTop.src = "/samplePuzzles/"+ puzzleName +"/2.jpg";
      rightTop.style.display = "inline-block";
      piece_right_top["image"] = rightTop;

      leftBottom = new Image();
      leftBottom.src = "/samplePuzzles/"+ puzzleName +"/3.jpg";
      leftBottom.style.display = "inline-block";
      piece_left_bottom["image"] = leftBottom;

      rightBottom = new Image();
      rightBottom.src = "/samplePuzzles/"+ puzzleName +"/4.jpg";
      rightBottom.style.display = "inline-block";
      piece_right_bottom["image"] = rightBottom;

      keyTap = 0;
      drawGrids();
      jumblePieces();
      drawButtons();
      gameChangeFlag = 0;
}


function jumblePieces(){

  piece_right_bottom["image"].onload = function() {
    // left top position(Q2) holds rightBottom piece
    ctxTest.drawImage(piece_right_bottom["image"], puzzleBoardCo_ordinated["topLeft_X"], puzzleBoardCo_ordinated["topLeft_Y"], piece_Dim["width"], piece_Dim["height"]);
  }
  piece_left_top["X"]= puzzleBoardCo_ordinated["topLeft_X"];
  piece_left_top["Y"]= puzzleBoardCo_ordinated["topLeft_Y"];
  piece_left_top["sourcePos"] = "rightBottom";

  piece_left_bottom["image"].onload = function() {
    // right top position (Q1) holds leftBottom
    ctxTest.drawImage(piece_left_bottom["image"],  puzzleBoardCo_ordinated["topRight_X"], puzzleBoardCo_ordinated["topRight_Y"], piece_Dim["width"], piece_Dim["height"]);
  }
  piece_right_top["X"]= puzzleBoardCo_ordinated["topRight_X"];
  piece_right_top["Y"]= puzzleBoardCo_ordinated["topRight_Y"];
  piece_right_top["sourcePos"] = "leftBottom";

  piece_right_top["image"].onload = function() {
    // left bottom position(Q3) holds rightTop piece
    ctxTest.drawImage(piece_right_top["image"], puzzleBoardCo_ordinated["bottomLeft_X"], puzzleBoardCo_ordinated["bottomLeft_Y"], piece_Dim["width"], piece_Dim["height"]);
  }
  piece_left_bottom["X"] = puzzleBoardCo_ordinated["bottomLeft_X"];
  piece_left_bottom["Y"] = puzzleBoardCo_ordinated["bottomLeft_Y"];
  piece_left_bottom["sourcePos"] = "rightTop";

  piece_left_top["image"].onload = function() {
    // right bottom position(Q4) holds leftTop piece
    ctxTest.drawImage(piece_left_top["image"],puzzleBoardCo_ordinated["bottomRight_X"], puzzleBoardCo_ordinated["bottomRight_Y"], piece_Dim["width"], piece_Dim["height"]);
  }
  piece_right_bottom["X"] = puzzleBoardCo_ordinated["bottomRight_X"];
  piece_right_bottom["Y"] = puzzleBoardCo_ordinated["bottomRight_Y"];
  piece_right_bottom["sourcePos"] = "leftTop";
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
        if(keyTap === 1)
        {
            ctxTest.clearRect(-canvasTest.width/2,-canvasTest.height,canvasTest.width,canvasTest.height);
            drawPuzzleTiles(currentCursorPosX, currentCursorPosY,quadrant_clicked);
        }
  }
};

function isResetClicked(){
   if (resetButton["right"] >= currentCursorPosX
            && resetButton["left"] <= currentCursorPosX
            && resetButton["bottom"] >= currentCursorPosY
            && resetButton["top"] <= currentCursorPosY)
  {
            console.log("RESET CLICKED ! ");
            return true;
  }
  return false;
}

function randomGameChooser(){
    var random;
    while(1){
      random = Math.floor(Math.random() * 10);
      if(random > 0 && random <5){
        console.log("RANDOM = " + random);
        return random;
      }
    }
}

function isGameChanger(){
  if(randomPuzzleButton["right"] >= currentCursorPosX
      && randomPuzzleButton["left"] <= currentCursorPosX
      && randomPuzzleButton["bottom"] >= currentCursorPosY
      && randomPuzzleButton["top"] <= currentCursorPosY)
  {
      if(gameChangeFlag === 0 ){
          update_puzzle_status("Play new random game!");
          gameChangeFlag = 1;
          var random = randomGameChooser();
          puzzleName = games[random-1];
          initGame(puzzleName);
      }
  }
}

function drawButtons(){

      ctxTest.rect(resetButton["left"], resetButton["top"],resetButton["width"],resetButton["height"]);
      ctxTest.lineWidth = 3;
      ctxTest.strokeStyle = "blue";
      ctxTest.stroke();
      ctxTest.font = "20px Arial";
      ctxTest.fillText("Reset Game",-275,-190);

      ctxTest.rect(randomPuzzleButton["left"], randomPuzzleButton["top"],randomPuzzleButton["width"],randomPuzzleButton["height"]);
      ctxTest.lineWidth = 3;
      ctxTest.strokeStyle = "blue";
      ctxTest.stroke();
      ctxTest.font = "20px Arial";
      ctxTest.fillText("Random Puzzle",20,-190);

}
/*
function drawBorder(X,Y){
  ctxGrid.clearRect(-canvasGrid.width/2,-canvasGrid.height,canvasGrid.width,canvasGrid.height);
  ctxGrid.lineWidth = 3;
  ctxGrid.strokeStyle = "red";
  ctxGrid.rect( X, Y,
               piece_Dim["width"] + 2 ,piece_Dim["height"]+2 );
  ctxGrid.stroke();
  drawGrids();
}
*/
function drawGrids(){

      canvasGrid = document.getElementById("canvasGrid");
      canvasGrid.width = window.innerWidth;
      canvasGrid.height = window.innerHeight;
      ctxGrid = canvasGrid.getContext("2d");
      ctxGrid.translate(canvasGrid.width/2,canvasGrid.height);

      ctxGrid.lineWidth = 3;
      ctxGrid.strokeStyle = "blue";

      //Draws puzzle board
      ctxGrid.rect(puzzleBoardCo_ordinated["topLeft_X"] + 15, puzzleBoardCo_ordinated["topLeft_Y"],
                    piece_Dim["width"] -15,piece_Dim["height"]);
      ctxGrid.stroke();
      ctxGrid.rect(puzzleBoardCo_ordinated["bottomLeft_X"] + 15, puzzleBoardCo_ordinated["bottomLeft_Y"],
                    piece_Dim["width"] - 15,piece_Dim["height"]);
      ctxGrid.stroke();
      ctxGrid.rect(puzzleBoardCo_ordinated["topRight_X"], puzzleBoardCo_ordinated["topRight_Y"],
                    piece_Dim["width"] + 2 ,piece_Dim["height"] + 2);
      ctxGrid.stroke();
      ctxGrid.rect(puzzleBoardCo_ordinated["bottomRight_X"], puzzleBoardCo_ordinated["bottomRight_Y"],
                    piece_Dim["width"] + 2 ,piece_Dim["height"] + 2);
      ctxGrid.stroke();
      //Draws solution board

      ctxGrid.rect(solutionBoardCo_ordinates["topLeft_X"], solutionBoardCo_ordinates["topLeft_Y"],
                    piece_Dim["width"] + 2 ,piece_Dim["height"] + 2);
      ctxGrid.stroke();
      ctxGrid.rect(solutionBoardCo_ordinates["bottomLeft_X"], solutionBoardCo_ordinates["bottomLeft_Y"],
                    piece_Dim["width"] + 2 ,piece_Dim["height"] + 2);
      ctxGrid.stroke();
      ctxGrid.rect(solutionBoardCo_ordinates["topRight_X"], solutionBoardCo_ordinates["topRight_Y"],
                    piece_Dim["width"] + 2 ,piece_Dim["height"] + 2);
      ctxGrid.stroke();
      ctxGrid.rect(solutionBoardCo_ordinates["bottomRight_X"], solutionBoardCo_ordinates["bottomRight_Y"],
                    piece_Dim["width"] + 2 ,piece_Dim["height"] + 2);
      ctxGrid.stroke();
}

function isSolutionBoardClicked(){
  /*
  if (currentCursorPosX > -350 && currentCursorPosY > -595
       && currentCursorPosX < 350 && currentCursorPosY < -355)
  */

  if (currentCursorPosX > -145 && currentCursorPosY > -620
       && currentCursorPosX < 325 && currentCursorPosY < -330)
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

      if(value < 0 && piece_left_bottom["reachedDest"] === 0){
          //console.log ( "R I G H T - A B O V E "); // Quadrant 1
          keyTap = 1;
          return piece_right_top["sourcePos"];
      }else if(value > 0 && piece_left_top["reachedDest"] === 0 ){
          //console.log (" R I G H T - B E L O W");  // Quadrant 4
          keyTap = 1;
          return piece_right_bottom["sourcePos"];
      }
  }else{
      //console.log ("L E F T  side of verticle axis");
      horizLine_X_left = -471;
      horizLine_Y_left = -475;
      horizLine_X_right = -321;
      horizLine_Y_right = -475;
      value = computeValueForWhichSideOfLine(horizLine_X_right , horizLine_Y_right, horizLine_X_left, horizLine_Y_left, currentCursorPosX, currentCursorPosY);
      if(value < 0 && piece_right_top["reachedDest"] === 0){
          //console.log ("L E F T - B E L O W"); // Quadrant 3
          keyTap = 1;
          return piece_left_bottom["sourcePos"];
      }else if (value > 0 && piece_right_bottom["reachedDest"] === 0){
          //console.log ( "L E F T - A B O V E "); // Quadrant 2
          keyTap = 1;
          return piece_left_top["sourcePos"];
      }
  }
  keyTap = 0;
  return null;
}

function computeValueForWhichSideOfLine(Ax, Ay, Bx, By, Cx, Cy){

  return((Bx - Ax) * (Cy - Ay) - (By - Ay) * (Cx - Ax));
}


function drawCurrentSolutionBoard(imageSrc){
    var solutionBoard_x, solutionBoard_y;
    if(imageSrc === "rightTop"){ // Q1
        piece_right_top["reachedDest"] = 1;
        solutionBoard_x = solutionBoardCo_ordinates["topRight_X"];
        solutionBoard_y = solutionBoardCo_ordinates["topRight_Y"]; // verified doing good
    }else if(imageSrc === "rightBottom"){ // Q4
        piece_right_bottom["reachedDest"] = 1;
        solutionBoard_x = solutionBoardCo_ordinates["bottomRight_X"];
        solutionBoard_y = solutionBoardCo_ordinates["bottomRight_Y"]; // verified doing good
    }else if(imageSrc === "leftTop"){ //Q2
        piece_left_top["reachedDest"] = 1;
        solutionBoard_x = solutionBoardCo_ordinates["topLeft_X"];
        solutionBoard_y = solutionBoardCo_ordinates["topLeft_Y"]; // verified
    }else if(imageSrc === "leftBottom"){ // Q3
        piece_left_bottom["reachedDest"] = 1;
        solutionBoard_x = solutionBoardCo_ordinates["bottomLeft_X"];
        solutionBoard_y = solutionBoardCo_ordinates["bottomLeft_Y"]; // verified
    }
    drawPuzzleTiles(solutionBoard_x,solutionBoard_y,imageSrc);
}
function drawPuzzleTiles(X, Y, imageSrc){

  ctxTest.clearRect(-canvasTest.width/2,-canvasTest.height,canvasTest.width,canvasTest.height);
  
  if(imageSrc === "rightTop")
  {
    ctxTest.drawImage(piece_right_top["image"],
                      X, Y,
                      piece_Dim["width"], piece_Dim["height"]);
    piece_left_bottom["X"] = X;
    piece_left_bottom["Y"] = Y;

    ctxTest.drawImage(piece_left_top["image"],
                    piece_right_bottom["X"], piece_right_bottom["Y"],
                    piece_Dim["width"], piece_Dim["height"]);

     ctxTest.drawImage(piece_left_bottom["image"],
                    piece_right_top["X"], piece_right_top["Y"],
                    piece_Dim["width"], piece_Dim["height"]);
     // right bottom position(Q4) holds leftTop piece
    ctxTest.drawImage(piece_right_bottom["image"],
                    piece_left_top["X"], piece_left_top["Y"],
                    piece_Dim["width"], piece_Dim["height"]);
  }
  else if(imageSrc === "leftTop")
  {
    ctxTest.drawImage(piece_left_top["image"],
                      X, Y,
                      piece_Dim["width"],piece_Dim["height"]);
    piece_right_bottom["X"] = X;
    piece_right_bottom["Y"] = Y;

    ctxTest.drawImage(piece_left_bottom["image"],
                      piece_right_top["X"], piece_right_top["Y"],
                      piece_Dim["width"], piece_Dim["height"]);
    // right top position (Q1) holds leftBottom
    ctxTest.drawImage(piece_right_top["image"],
                      piece_left_bottom["X"], piece_left_bottom["Y"],
                      piece_Dim["width"], piece_Dim["height"]);
    // right bottom position(Q4) holds leftTop piece
    ctxTest.drawImage(piece_right_bottom["image"],
                      piece_left_top["X"], piece_left_top["Y"],
                      piece_Dim["width"], piece_Dim["height"]);
  }
  else if(imageSrc === "leftBottom")
  {
    ctxTest.drawImage(piece_left_bottom["image"],
                      X, Y,
                      piece_Dim["width"], piece_Dim["height"]);
    piece_right_top["X"] = X;
    piece_right_top["Y"] = Y;

    ctxTest.drawImage(piece_left_top["image"],
                      piece_right_bottom["X"], piece_right_bottom["Y"],
                      piece_Dim["width"], piece_Dim["height"]);
    // right top position (Q1) holds leftBottom
    ctxTest.drawImage(piece_right_top["image"],
                      piece_left_bottom["X"], piece_left_bottom["Y"],
                      piece_Dim["width"], piece_Dim["height"]);
    // right bottom position(Q4) holds leftTop piece
    ctxTest.drawImage(piece_right_bottom["image"],
                      piece_left_top["X"], piece_left_top["Y"],
                      piece_Dim["width"], piece_Dim["height"]);
  }
  else if(imageSrc === "rightBottom")
  {
    ctxTest.drawImage(piece_right_bottom["image"],
                      X, Y,
                      piece_Dim["width"], piece_Dim["height"]);
    piece_left_top["X"] = X;
    piece_left_top["Y"] = Y;

    ctxTest.drawImage(piece_left_bottom["image"],
                      piece_right_top["X"], piece_right_top["Y"],
                      piece_Dim["width"], piece_Dim["height"]);

    ctxTest.drawImage(piece_left_top["image"],
                      piece_right_bottom["X"], piece_right_bottom["Y"],
                      piece_Dim["width"], piece_Dim["height"]);
    // right top position (Q1) holds leftBottom
    ctxTest.drawImage(piece_right_top["image"],
                      piece_left_bottom["X"], piece_left_bottom["Y"],
                      piece_Dim["width"], piece_Dim["height"]);
  }
}


function keepTileOnPuzzleBoard(img){

  if(img === "rightTop"){
      piece_left_bottom["X"] = puzzleBoardCo_ordinated["bottomLeft_X"];
      piece_left_bottom["Y"] = puzzleBoardCo_ordinated["bottomLeft_Y"];
      drawPuzzleTiles(piece_left_bottom["X"], piece_left_bottom["Y"],piece_left_bottom["sourcePos"] );
  }
  else if(img === "rightBottom"){
      piece_left_top["X"] = puzzleBoardCo_ordinated["topLeft_X"];
      piece_left_top["Y"] = puzzleBoardCo_ordinated["topLeft_Y"];
      drawPuzzleTiles(piece_left_top["X"],piece_left_top["Y"],piece_left_top["sourcePos"]);
  }
  else if(img === "leftTop"){
      piece_right_bottom["X"]= puzzleBoardCo_ordinated["bottomRight_X"];
      piece_right_bottom["Y"]= puzzleBoardCo_ordinated["bottomRight_Y"];
      drawPuzzleTiles(piece_right_bottom["X"],piece_right_bottom["Y"], piece_right_bottom["sourcePos"]);
  }
  else if(img === "leftBottom"){
      piece_right_top["X"] = puzzleBoardCo_ordinated["topRight_X"];
      piece_right_top["Y"] = puzzleBoardCo_ordinated["topRight_Y"];
      drawPuzzleTiles(piece_right_top["X"],piece_right_top["Y"],piece_right_top["sourcePos"]);
  }
}


function isGameOver(){
  if(piece_right_bottom["reachedDest"] && piece_right_top["reachedDest"] && piece_left_bottom["reachedDest"] && piece_left_top["reachedDest"]){
    ctxGrid.strokeStyle = "#FFFFFF";
    ctxGrid.setLineDash([5,2]);
    ctxGrid.rect(solutionBoardCo_ordinates["topLeft_X"] - 45,
                   solutionBoardCo_ordinates["topLeft_Y"] - 25,
                    470 ,290);
    ctxGrid.stroke();
    drawButtons();
    return true;
  }
return false;
}

function update_puzzle_status(msg){
    $('#message').html("<span> " + msg + "</span>");
}

// Creates our Leap Controller
var controller = new Leap.Controller({enableGestures:true});
// Tells the controller what to do every time it sees a frame
controller.on( 'frame' , function( frame ){

  drawCursor(frame);
  for( var i = 0; i < frame.gestures.length; i++ ){
      var gesture = frame.gestures[i];
      switch(gesture.type)
      {
        case "screenTap":
        case "keyTap":
            if (isResetClicked()){
              update_puzzle_status("Reset Pressed, Play again !");
              initGame(puzzleName);
            }
            isGameChanger();
            break;
      }
  }
  if(frame.hands.length > 0)
      {
        var hand = frame.hands[0];
        console.log(" keyTap- " + keyTap);
        if(hand.indexFinger.valid && hand.thumb.valid)
        {
          //console.log("index and thumb");
        }
        if(hand.grabStrength > 0.25 && isPuzzleBoardClicked() && keyTap === 0)
        {
          quadrant_clicked = identifyPieceSelectionOnKeytap();
          console.log("Grabbed - quadrant = " + quadrant_clicked);
              if(quadrant_clicked !== null)
              {
                  update_puzzle_status("Cool .. Got a tile at hand!");
                  drawPuzzleTiles(currentCursorPosX, currentCursorPosY, quadrant_clicked);
              }else{
                console.log("quadrant clicked null ");
              }
        }//grabstr > 0.25 && puzzleboard clicked ends here
        else if(keyTap && hand.grabStrength < 0.25)
        {
              keyTap = 0;
              var yesOrNo = isSolutionBoardClicked();
              if(yesOrNo)
              {
                  drawCurrentSolutionBoard(quadrant_clicked);
                  if(isGameOver()){
                      update_puzzle_status("Yayy ! Game over !");
                  }else{
                      update_puzzle_status("You are doing great !");
                  }
              }else{ 
                  update_puzzle_status("Opps wrong tile placement! ");
                  keepTileOnPuzzleBoard(quadrant_clicked);
              }   
        } 
      }//hands.length > 0 ends
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

