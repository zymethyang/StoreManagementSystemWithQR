#include "Arduino.h"
#include "Control.h"
#include "ServoEasing.h"

ServoEasing of_01_Servo;
ServoEasing of_02_Servo;
ServoEasing of_03_Servo;
ServoEasing of_04_Servo;
ServoEasing of_05_Servo;
ServoEasing of_06_Servo;

Control::Control() {
  //Nothing here
}

void Control::initialRobot() {
  of_01_Servo.attach(_of_01_pin);
  of_02_Servo.attach(_of_02_pin);
  of_03_Servo.attach(_of_03_pin);
  of_04_Servo.attach(_of_04_pin);
  of_05_Servo.attach(_of_05_pin);
  of_06_Servo.attach(_of_06_pin);
}

void Control::outputSignal(int of_01, int of_02, int of_03, int of_04, int of_05, int of_06) {
  of_01_Servo.startEaseTo(of_01, 30);
  of_02_Servo.startEaseTo(of_02, 40);
  of_03_Servo.startEaseTo(of_03, 40);
  of_04_Servo.startEaseTo(of_04, 40);
  of_05_Servo.startEaseTo(of_05, 40);
  of_06_Servo.startEaseTo(of_06, 40);
}
