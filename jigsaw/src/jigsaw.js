
// fullscreen
var canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
width = window.innerWidth;
height = window.innerHeight;
// create a rendering context
var ctx = canvas.getContext("2d");
ctx.translate(canvas.width/2,canvas.height);
ctx.fillStyle = "rgba(0,0,0,0.7)";

// render each frame
function draw(obj) 
{
  // clear last frame
  ctx.clearRect(-canvas.width/2,-canvas.height,canvas.width,canvas.height);

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
      console.log("Draw only 2 pointers");
      break;
    } 
    counter += 1;
    var pointable = pointablesMap[i];
    var pos = pointable.tipPosition;
    // create a circle for each pointable
    var radius = 20;
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


// Creates our Leap Controller
    var controller = new Leap.Controller({enableGestures:true});

    // Tells the controller what to do every time it sees a frame
    controller.on( 'frame' , function( data ){

      // Assigning the data to the global frame object
      frame = data;
      // Clearing the drawing from the previous frame
      ctx.clearRect( 0 , 0 , width , height );

      /*
      Snippet below works with hands object.
      Tried to execute and read regarding rotate hand.
      Unable find a clear rotation angle yet.
      Not sure if will use hands approach.
      Reference : 
      https://developer.leapmotion.com/documentation/javascript/api/Leap.Hand.html#fingers[]
      */
      if(frame.hands.length > 0)
      {
        var hand = frame.hands[0];
        console.log(" hand - " + frame.hands[0]);
        var previousFrame = controller.frame(1);
        var totalRotation = hand.rotationAngle(previousFrame);
        var rotationAroundZAxis = hand.rotationAngle(previousFrame, [0,0,1]);
        console.log("Rot: " + totalRotation + ", Z Rot:" + rotationAroundZAxis);
      }
      draw(frame);
      

      /*
      Snippet below shows how to work with gestures.
      Not sure if I will be using these.
      Reference : 
      http://goo.gl/Zl8XBH
      or
      http://goo.gl/V8eIjQ
      */
      for( var i = 0; i < frame.gestures.length; i++ ){
        var gesture = frame.gestures[i];
        var type = gesture.type;
        switch( type )
        {  
          case "circle":
            //onCircle( gesture );
            console.log ("CIRCLE");
            break;
            
          case "swipe":
            console.log ("SWIPE");
            break;
          
          case "screenTap":
            console.log ("SCREEN TAP");
            break;

          case "keyTap":
            console.log ("KEY TAP");
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

