import sys
sys.path.insert(0, "../lib")
import Leap
from Leap import ScreenTapGesture

class jigsaw(Leap.Listener):
  def on_init(self, controller):
     print "Initialized"
  def on_connect(self, controller):
    print "Connected"
    # Enable gestures
    controller.enable_gesture(Leap.Gesture.TYPE_SCREEN_TAP);

  def on_disconnect(self, controller):
    # Note: not dispatched when running in a debugger.
    print "Disconnected"

  def on_exit(self, controller):
    print "Exited"


  def on_frame(self, controller):
    # Get the most recent frame and report some basic information
    frame = controller.frame()
    for gesture in frame.gestures():
      if gesture.type == Leap.Gesture.TYPE_SCREEN_TAP:
        screentap = ScreenTapGesture(gesture)
        print "Screen Tap id: %d, %s, position: %s, direction: %s" % ( gesture.id, self.state_string(gesture.state), screentap.position, screentap.direction )
      else:
        print "Some other gesture"



def main():
      # Create a sample listener and controller
      listener = jigsaw()
      controller = Leap.Controller()
      # Have the sample listener receive events from the controller
      controller.add_listener(listener)

      # Keep this process running until Enter is pressed
      print "Press Enter to quit..."
      sys.stdin.readline()

      # Remove the sample listener when done
      controller.remove_listener(listener)


if __name__ == "__main__":
  main()
