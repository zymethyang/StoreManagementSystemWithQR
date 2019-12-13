#ifndef PositionState_h
#define PositionState_h

#include "Arduino.h"

class PositionState {
  public:
    PositionState(int of_01, int of_02, int of_03, int of_04, int of_05, int of_06);
    void setState(int of_01, int of_02, int of_03, int of_04, int of_05, int of_06);

    int getOF01();
    int getOF02();
    int getOF03();
    int getOF04();
    int getOF05();
    int getOF06();
  private:
    int _of_01 = 90; //0->180
    int _of_02 = 20; //0->180
    int _of_03 = 180; //0->180
    int _of_04 = 0; //50->0
    int _of_05 = 20; //0->180
    int _of_06 = 20; //0->60
};

#endif
