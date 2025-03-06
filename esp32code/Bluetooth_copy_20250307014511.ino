#include "NimBLEDevice.h"
#include <string.h>

#define SERVICE_UUID "b408e1a0-3d8a-11ed-b878-0242ac120002"         //服务UUID
#define CONTROL_UUID "de045162-3d97-11ed-b878-0242ac120002"         //控制特征UUID


NimBLECharacteristic controlCharacteristic(CONTROL_UUID, NIMBLE_PROPERTY::READ |NIMBLE_PROPERTY::WRITE);


// 重写链接和取消链接的函数，以便串口调试，并且当断开连接后重新监听蓝牙连接
class MyServerCallbacks: public NimBLEServerCallbacks {
    void onConnect(NimBLEServer* pServer, NimBLEConnInfo& connInfo) {
      Serial.println("现在有设备接入~");
    };

    void onDisconnect(NimBLEServer* pServer, NimBLEConnInfo& connInfo, int reason) {
      Serial.println("现在有设备断开连接~");
      // 在有设备接入后Advertising广播会被停止，所以要在设备断开连接时重新开启广播
      // 不然的话只有重启ESP32后才能重新搜索到
      pServer->startAdvertising(); //该行效果同 BLEDevice::startAdvertising();
    }
};

//设置服务器所需要的配置
void setup() {
  Serial.begin(115200);
  NimBLEDevice::init("Esp32test");
  NimBLEServer *pServer = NimBLEDevice::createServer();
  pServer->setCallbacks(new MyServerCallbacks()); // 绑定回调函数

  NimBLEService *pService = pServer->createService(SERVICE_UUID);                         //创建设备

  

  // 添加一个带有对象名（官方UUID）的特征，不带对象，这个特征不会改变               //显示特征名
  pService->addCharacteristic(&controlCharacteristic);  //增加一个控制LED的特性

  controlCharacteristic.setValue("\0"); // 初始电压值

  pService->start();

  
  NimBLEAdvertising *pAdvertising = NimBLEDevice::getAdvertising();
  
  pAdvertising->addServiceUUID(SERVICE_UUID); // advertise the UUID of our service
  pAdvertising->setName("why"); // advertise the device name
  pAdvertising->start(); 


  Serial.println("Characteristic defined! Now you can read it in your phone!");  //提示消息

}


char test[10];
long int a;
int vg; // 设置电压
void loop() {
  
  delay(100);
  strncpy(test,controlCharacteristic.getValue().c_str(),9); // 这儿接受的其实是一个char的数值类型

// 防止一些奇奇怪怪的数进来
  vg=(int)test[0];
  if((int)test[0]<0)
    vg=0;
  if((int)test[0]>255)
    vg=255;
  
  Serial.printf("info: %ld  %d  %s \n",a,vg,test);    a++;
  dacWrite(25,vg); //

}
