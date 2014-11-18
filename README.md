Jigsaw_With_Leap
================

Learning Leap motion development with 

Runing my basic HTTP server using command:
python -m SimpleHTTPServer 8001

Access url : http://localhost:8001/src/jigsaw.html

Steps for Customization :
1. You can add custom images of size 339 * 225 inside jigsaw/samplePuzzles/<customImageFolder>
2. The pieces should be named as 1.jpg, 2.jpg, 3.jpg, 4.jpg
3. The project currently supports only 4 slices in rectangular dimensions.
4. Go to file jigsaw/src/jigsaw.js, change the puzzleName to <customImageFolder>
