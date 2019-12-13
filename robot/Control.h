#ifndef Control_h
#define Control_h

//DOF 1: PIN11
//DOF 2: PIN10
//DOF 3: PIN3
//DOF 4: PIN5
//DOF 5: PIN6
//DOF 6: PIN9

#include "Arduino.h"

class Control {
  public:
    Control();
    void initialRobot();
    void outputSignal(int of_01, int of_02, int of_03, int of_04, int of_05, int of_06);
  private:
    int _of_01_pin = 11;
    int _of_02_pin = 10;
    int _of_03_pin = 3;
    int _of_04_pin = 5;
    int _of_05_pin = 6;
    int _of_06_pin = 9;
};

#endif
