var zindex = 15;

var controllerOptions = { enableGestures: true }
    canvas = d3.select('div#inner_wrapper')
                .append('canvas')
                .attr({
                        "width": '500px',
                        "height": '500px',
                        "z-index" : zindex
                    }).node(),

// create a rendering context
 ctx = canvas.getContext("2d");
 ctx.translate(canvas.width,canvas.height);
 ctx.fillStyle = "rgba(0,0,0,0.7)";

// render each frame
function draw(obj) {
  // clear last frame
  ctx.clearRect(-canvas.width,-canvas.height,canvas.width,canvas.height);

  // render circles based on pointable positions
  var pointablesMap = obj.pointablesMap;
  for (var i in pointablesMap) {
     // get the pointable's position
      var pointable = pointablesMap[i];
       var pos = pointable.tipPosition;
      // create a circle for each pointable
       var radius = Math.min(600/Math.abs(pos[2]),20);
       ctx.beginPath();
       ctx.arc(pos[0]-radius/2,-pos[1]-radius/2,radius,0,2*Math.PI);
       ctx.fill();
   }
};

/*

function draw() {
      var a, b;

      for (var id in after) {
        b = before[id],
        a = after[id];
        if (!b) continue;
        ctx.strokeStyle = color(id);
        ctx.moveTo(b.tipPosition[0], -b.tipPosition[1]);
        ctx.lineTo(a.tipPosition[0], -a.tipPosition[1]);
        ctx.stroke();
        ctx.beginPath();
      }
      before = after;
      return true;
}

Leap.loop(controllerOptions, function(frame, done) {
      after = {};
      for (var i = 0; i < frame.pointables.length; i++) {
        after[frame.pointables[i].id] = frame.pointables[i];
      }
      draw();
      done();
});
*/

Leap.loop(draw);
