Jigsaw_With_Leap
================

Demo : https://www.youtube.com/watch?v=tDzik9xlKeI

Learning Leap motion development

Runing my basic HTTP server using command:
python -m SimpleHTTPServer 8001

Access url : http://localhost:8001/src/jigsaw.html

Steps for Customization :
1. You can add custom puzzle as follows : 
2. Image size  supported 339 * 225 
3. Cut the image into exact 4 equal parts.
4. Place the pieces inside jigsaw/samplePuzzles/<customImageFolder>
   The pieces should be named as 1.jpg, 2.jpg, 3.jpg, 4.jpg
5. Go to file jigsaw/src/jigsaw.js, 
   add the <customImageFolder> to the array games
