var Jigsaw = {}; 
Jigsaw.Api = Jigsaw.Api || (function() { 
	function _jumblePieces() { 
		  console.log("Jumbling"); 
		  piece_right_bottom["image"].onload = function() {
		    // left top position(Q2) holds rightBottom piece
		    ctxTest.drawImage(piece_right_bottom["image"], puzzleBoardCo_ordinated["topLeft_X"], puzzleBoardCo_ordinated["topLeft_Y"], piece_Dim["width"], piece_Dim["height"]);
		  };
		  piece_left_top["X"]= puzzleBoardCo_ordinated["topLeft_X"];
		  piece_left_top["Y"]= puzzleBoardCo_ordinated["topLeft_Y"];
		  piece_left_top["sourcePos"] = "rightBottom";

		  piece_left_bottom["image"].onload = function() {
		    // right top position (Q1) holds leftBottom
		    ctxTest.drawImage(piece_left_bottom["image"],  puzzleBoardCo_ordinated["topRight_X"], puzzleBoardCo_ordinated["topRight_Y"], piece_Dim["width"], piece_Dim["height"]);
		  };
		  piece_right_top["X"]= puzzleBoardCo_ordinated["topRight_X"];
		  piece_right_top["Y"]= puzzleBoardCo_ordinated["topRight_Y"];
		  piece_right_top["sourcePos"] = "leftBottom";

		  piece_right_top["image"].onload = function() {
		    // left bottom position(Q3) holds rightTop piece
		    ctxTest.drawImage(piece_right_top["image"], puzzleBoardCo_ordinated["bottomLeft_X"], puzzleBoardCo_ordinated["bottomLeft_Y"], piece_Dim["width"], piece_Dim["height"]);
		  };
		  piece_left_bottom["X"] = puzzleBoardCo_ordinated["bottomLeft_X"];
		  piece_left_bottom["Y"] = puzzleBoardCo_ordinated["bottomLeft_Y"];
		  piece_left_bottom["sourcePos"] = "rightTop";

		  piece_left_top["image"].onload = function() {
		    // right bottom position(Q4) holds leftTop piece
		    ctxTest.drawImage(piece_left_top["image"],puzzleBoardCo_ordinated["bottomRight_X"], puzzleBoardCo_ordinated["bottomRight_Y"], piece_Dim["width"], piece_Dim["height"]);
		  };
		  piece_right_bottom["X"] = puzzleBoardCo_ordinated["bottomRight_X"];
		  piece_right_bottom["Y"] = puzzleBoardCo_ordinated["bottomRight_Y"];
		  piece_right_bottom["sourcePos"] = "leftTop";
	}
	function _drawButtons() { 
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
	function _canvasSetup() {
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
	}
	function _imageInPiecesInit(puzzleName) {
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

	}
	function _drawGrids() {
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
	function _initGame(puzzleName) {
			_canvasSetup();
			_imageInPiecesInit(puzzleName);
			 keyTap = 0;
			 _drawGrids();
			_jumblePieces(); 
			_drawButtons();
			 gameChangeFlag = 0;

	}

	return { 
		initGame : function(puzzleName) 
		{ 
			console.log("init game"); 
			//puzzleName = "Uncle_Scrooge_pieces";
			return _initGame(puzzleName);
 
		}, 
		drawButtons : function() 
		{ 
			return _drawButtons(); 
		} 
	}; 
})();