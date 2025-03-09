#include "NimBLEDevice.h"
#include <string.h>
#include <Arduino.h>


TaskHandle_t Task1Handle;
TaskHandle_t Task2Handle;


#define SERVICE_UUID "b408e1a0-3d8a-11ed-b878-0242ac120002"         //服务UUID
#define CONTROL_UUID "de045162-3d97-11ed-b878-0242ac120002"         //控制特征UUID


NimBLECharacteristic controlCharacteristic(CONTROL_UUID, NIMBLE_PROPERTY::READ |NIMBLE_PROPERTY::WRITE);

char date[20]={0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0};
// 全局变量，用于存放蓝牙信息


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


void Task1(void *fuck_date) {
  
  int vg1=0;
  int time1=0;
  vg1=(int)date[0];
  if((int)date[0]<0)
    vg1=0;
  if((int)date[0]>255)
    vg1=255;
  
  time1=(int)date[1];
  if((int)date[1]<0)
    time1=0;
  if((int)date[1]>255)
    time1=255;

  Serial.printf("info: %d %d %d %d %d %d %d %d \n",(int)date[0],(int)date[1],(int)date[2],(int)date[3],(int)date[4],(int)date[5],(int)date[6],(int)date[7]);    
  dacWrite(25,vg1); 
  vTaskDelay(time1*1000 / portTICK_PERIOD_MS);
  dacWrite(25,0); 
  vTaskSuspend(NULL);
}


void Task2(void *fuck_date) {

  int vg2=0;
  int time2=0;

  
  vg2=(int)date[2];
  if((int)date[2]<0)
    vg2=0;
  if((int)date[2]>255)
    vg2=255;

  time2=(int)date[3];
    if((int)date[3]<0)
    time2=0;
  if((int)date[3]>255)
    time2=255;
  
  Serial.printf("info: %d %d %d %d %d %d %d %d \n",(int)date[0],(int)date[1],(int)date[2],(int)date[3],(int)date[4],(int)date[5],(int)date[6],(int)date[7]);    

  dacWrite(26,vg2);
  vTaskDelay(time2*1000 / portTICK_PERIOD_MS);
  dacWrite(26,0);
  vTaskSuspend(NULL);
}



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

  char test[20]={0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0};
  controlCharacteristic.setValue(test);
  
}



long int a;
void loop() {

  

  delay(100);

  if(
    (int)controlCharacteristic.getValue().c_str()[4]!=date[4] &&
    (int)controlCharacteristic.getValue().c_str()[5]!=date[5] &&
    (int)controlCharacteristic.getValue().c_str()[6]!=date[6] &&
    (int)controlCharacteristic.getValue().c_str()[7]!=date[7] 
  )
  {

    if (Task1Handle != NULL) {
      vTaskDelete(Task1Handle); // 安全删除，因任务处于挂起状态
      Task1Handle = NULL;
    }

    if (Task2Handle != NULL) {
      vTaskDelete(Task2Handle); // 安全删除，因任务处于挂起状态
      Task2Handle = NULL;
    }

    strncpy(date,controlCharacteristic.getValue().c_str(),10); // 这儿接受的其实是一个char的数值类型


    xTaskCreate(
        Task1,                 // 任务函数
        "Task 1",              // 任务名称（调试用）
        4096,                  // 任务堆栈大小（字数）
        NULL,                  // 传递给任务的参数
        1,                     // 优先级
        &Task1Handle           // 任务句柄
    );

    xTaskCreate(
        Task2,                 // 任务函数
        "Task 2",              // 任务名称（调试用）
        4096,                  // 任务堆栈大小（字数）
        NULL,                  // 传递给任务的参数
        1,                     // 优先级
        &Task2Handle           // 任务句柄
    );

  }

    Serial.printf("??aaaa:%d %d %d %d %d %d %d %d %d \n",
    (int)controlCharacteristic.getValue().c_str()[0],
    (int)controlCharacteristic.getValue().c_str()[1],
    (int)controlCharacteristic.getValue().c_str()[2],
    (int)controlCharacteristic.getValue().c_str()[3],
    (int)controlCharacteristic.getValue().c_str()[4],
    (int)controlCharacteristic.getValue().c_str()[5],
    (int)controlCharacteristic.getValue().c_str()[6],
    (int)controlCharacteristic.getValue().c_str()[7],
    (int)controlCharacteristic.getValue().c_str()[8]
    );

}
