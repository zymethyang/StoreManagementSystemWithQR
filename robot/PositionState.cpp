#include "Arduino.h"
#include "PositionState.h"
#include <ArduinoJson.h>

PositionState::PositionState(int of_01, int of_02, int of_03, int of_04, int of_05, int of_06) {
  _of_01 = of_01;
  _of_02 = of_02;
  _of_03 = of_03;
  _of_04 = of_04;
  _of_05 = of_05;
  _of_06 = of_06;
}

void PositionState::setState(int of_01, int of_02, int of_03, int of_04, int of_05, int of_06) {
  _of_01 = of_01;
  _of_02 = of_02;
  _of_03 = of_03;
  _of_04 = of_04;
  _of_05 = of_05;
  _of_06 = of_06;
}

int PositionState::getOF01() {
  return _of_01;
}

int PositionState::getOF02() {
  return _of_02;
}

int PositionState::getOF03() {
  return _of_03;
}

int PositionState::getOF04() {
  return _of_04;
}

int PositionState::getOF05() {
  return _of_05;
}

int PositionState::getOF06() {
  return _of_06;
}
