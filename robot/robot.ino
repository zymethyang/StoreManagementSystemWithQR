//add thread lib for writing non-blocking code.
#include <Thread.h>
#include <ThreadController.h>
//#include <SoftwareSerial.h>
#include <Wire.h>

#include "Control.h"
#include "PositionState.h"

//Initialize state object
Control ctl;
PositionState pos(90, 40, 90, 110, 90, 20);

ThreadController controll = ThreadController();
Thread* outputSignalThread = new Thread();

void setup() {
  Serial.begin(9600);
  while (!Serial);

  Wire.begin(8);
  Wire.onReceive(receiveEvent);

  ctl.initialRobot();

  //Initialize which function will be called when the thread start and interval time to start this thread.

  outputSignalThread->onRun(outputSignalCallback);
  outputSignalThread->setInterval(100);

  controll.add(outputSignalThread);
}

void loop() {
  controll.run();
}

void receiveEvent(int howMany) {
  int message[howMany];
  int i = 0;

  while (0 < Wire.available()) {
    int deg = Wire.read();
    message[i] = deg;
    i++;
  }
  Serial.print(message[0]); Serial.print(message[1]); Serial.print(message[2]); Serial.print(message[3]); Serial.print(message[4]); Serial.println(message[5]);
  pos.setState(message[0], message[1], message[2], message[3], message[4], message[1]);
}


void outputSignalCallback() {
  int of_01 = pos.getOF01();
  int of_02 = pos.getOF02();
  int of_03 = pos.getOF03();
  int of_04 = pos.getOF04();
  int of_05 = pos.getOF05();
  int of_06 = pos.getOF06();

  ctl.outputSignal(of_01, of_02, of_03, of_04, of_05, of_06);
}
