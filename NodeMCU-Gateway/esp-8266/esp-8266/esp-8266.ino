//Include lib
#include "FS.h"
#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <NTPClient.h>
#include <WiFiUdp.h>
#include <Wire.h>

#include <ArduinoJson.h>


//Declare global variables
const char* ssid = "Trung That 1";
const char* password = "11091981";
const char* publish_topic = "storage/feedback";
const char* subcribe_topic = "storage/control";
const char* AWS_endpoint = "a162573iz22qwr-ats.iot.ap-southeast-1.amazonaws.com"; //MQTT broker ip

//Setup ntpUDP time
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "pool.ntp.org");

//Setup serial for lora connect
//SoftwareSerial serial_P01(D2, D1); //RX, TX

//Declare mqtt callback function - get string array -> convert to string -> send to lora.
void callbackMQTT(char* topic, byte* payload, unsigned int length) {
  char message[length + 1];
  for (int i = 0; i < length; i++) {
    message[i] = (char)payload[i];
  }
  message[length] = '\0';

  sendDataUART(message);
}

//Setup mqtt pubsubclient
WiFiClientSecure espClient;
PubSubClient client(AWS_endpoint, 8883, callbackMQTT, espClient);

void setup_AWS_IOT_Core() {
  if (!SPIFFS.begin()) {
    Serial.println("Failed to mount file system");
    return;
  }

  Serial.print("Heap: ");
  Serial.println(ESP.getFreeHeap());

  // Load certificate file
  File cert = SPIFFS.open("/cert.der", "r"); //replace cert.crt eith your uploaded file name
  if (!cert) {
    Serial.println("Failed to open cert file");
  }
  else {
    Serial.println("Success to open cert file");
  }

  delay(1000);

  if (espClient.loadCertificate(cert)) {
    Serial.println("cert loaded");
  }
  else {
    Serial.println("cert not loaded");
  }


  File private_key = SPIFFS.open("/private.der", "r"); //replace private eith your uploaded file name
  if (!private_key) {
    Serial.println("Failed to open private cert file");
  }
  else {
    Serial.println("Success to open private cert file");
  }

  delay(1000);

  if (espClient.loadPrivateKey(private_key)) {
    Serial.println("private key loaded");
  }
  else {
    Serial.println("private key not loaded");
  }

  // Load CA file
  File ca = SPIFFS.open("/ca.der", "r"); //replace ca eith your uploaded file name
  if (!ca) {
    Serial.println("Failed to open ca ");
  }
  else {
    Serial.println("Success to open ca");
  }

  delay(1000);

  if (espClient.loadCACert(ca)) {
    Serial.println("ca loaded");
  }
  else {
    Serial.println("ca failed");
  }

  Serial.print("Heap: ");
  Serial.println(ESP.getFreeHeap());
}

void setup_wifi() {
  delay(10);
  espClient.setBufferSizes(512, 512);
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

  timeClient.begin();
  while (!timeClient.update()) {
    timeClient.forceUpdate();
  }

  espClient.setX509Time(timeClient.getEpochTime());
}



void setup() {
  Serial.begin(9600);
  while (!Serial);
  Wire.begin(D1, D2);

  Serial.setDebugOutput(true);
  setup_wifi();
  delay(1000);
  setup_AWS_IOT_Core();
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();
}


void reconnect() {
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    String clientId = "ESP8266Client-";
    clientId += String(random(0xffff), HEX);
    if (client.connect(clientId.c_str())) {
      Serial.println("connected");
      client.subscribe(subcribe_topic);
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      char buf[256];
      espClient.getLastSSLError(buf, 256);
      Serial.print("WiFiClientSecure SSL error: ");
      Serial.println(buf);
    }
  }
}

void sendDataUART(char* anything) {
  Serial.println(anything);
  byte of_1 = 1;
  byte of_2 = 2;
  byte of_3 = 3;
  byte of_4 = 4;
  byte of_5 = 5;
  byte of_6 = 6;

  StaticJsonDocument<96> doc;
  deserializeJson(doc, anything);
  if (doc.containsKey("of_1")) {
    of_1 = doc["of_1"];
  }
  if (doc.containsKey("of_2")) {
    of_2 = doc["of_2"];
  }
  if (doc.containsKey("of_3")) {
    of_3 = doc["of_3"];
  }

  if (doc.containsKey("of_4")) {
    of_4 = doc["of_4"];
  }

  if (doc.containsKey("of_5")) {
    of_5 = doc["of_5"];
  }
  if (doc.containsKey("of_6")) {
    of_6 = doc["of_6"];
  }

  Wire.beginTransmission(8);
  Wire.write(of_1);
  Wire.write(of_2);
  Wire.write(of_3);
  Wire.write(of_4);
  Wire.write(of_5);
  Wire.write(of_6);
  Wire.endTransmission();

  /*
    Wire.beginTransmission(8);
    Wire.write(of_2);
    Wire.endTransmission();

    Wire.beginTransmission(8);
    Wire.write(of_3);
    Wire.endTransmission();

    Wire.beginTransmission(8);
    Wire.write(of_4);
    Wire.endTransmission();

    Wire.beginTransmission(8);
    Wire.write(of_5);
    Wire.endTransmission();

    Wire.beginTransmission(8);
    Wire.write(of_6);
    Wire.endTransmission();
  */
}
