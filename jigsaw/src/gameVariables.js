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