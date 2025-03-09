// The main script for the extension
// 以下是一些基本扩展功能的示例

// 你可能需要从extensions.js中导入extension_settings、getContext和loadExtensionSettings
import { extension_settings, getContext, loadExtensionSettings } from "../../../extensions.js";

// 您可能需要从主脚本导入一些其他函数
import { saveSettingsDebounced } from "../../../../script.js";

// 跟踪您的扩展所在的位置，名称应与repo名称匹配
const extensionName = "SillyTavern_ConnectPeripherals-main";
const extensionFolderPath = `scripts/extensions/third-party/${extensionName}`;
const extensionSettings = extension_settings[extensionName];
const defaultSettings = {};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
 
// 如果存在扩展设置，则加载它们，否则将它们初始化为默认值。
async function loadSettings() {
  // 如果设置不存在，则创建这些设置
  extension_settings[extensionName] = extension_settings[extensionName] || {};
  if (Object.keys(extension_settings[extensionName]).length === 0) {
    Object.assign(extension_settings[extensionName], defaultSettings);
  }

  // 更新UI中的设置
  $("#example_setting").prop("checked", extension_settings[extensionName].example_setting).trigger("input");
}





// 在UI中更改扩展设置时调用此函数
function onExampleInput(event) {
  const value = Boolean($(event.target).prop("checked"));
  extension_settings[extensionName].example_setting = value;
  saveSettingsDebounced();
}





// 正则读字符串标签，这里有问题，日后要改
function extractDeviceContent(str) {
  const regex = /<device>([\s\S]*?)<\/device>/g;
  const contents = [];
  let match;

  while ((match = regex.exec(str)) !== null) {
    contents.push(match[1]);
  }

  return contents;
}


let characteristic; // 定义全局变量，后面要用

async function send_value(characteristic, value) { // 添加 async
  value[4]=Math.round(Math.random()*255);
  value[5]=Math.round(Math.random()*255);
  value[6]=Math.round(Math.random()*255);
  value[7]=Math.round(Math.random()*255);
  console.log(new Uint8Array(value));
  return await characteristic.writeValue(new Uint8Array(value)); // 返回 Promise
}

async function connectBluetoothDevice() {
  try {
      const device = await navigator.bluetooth.requestDevice({
          filters: [{ namePrefix: 'why' }],
          optionalServices: ["b408e1a0-3d8a-11ed-b878-0242ac120002"]
      });
      
      const server = await device.gatt.connect();
      const service = await server.getPrimaryService("b408e1a0-3d8a-11ed-b878-0242ac120002");
      return await service.getCharacteristic("de045162-3d97-11ed-b878-0242ac120002");
  } catch (error) {
      console.error('蓝牙连接失败:', error);
      throw error; // 抛出错误给上层处理
  }
}


var floor_flag=0; 
// 定义一个楼层变量，用于判断funt是否已经执行过一次。

var funt_outbreak;

async function funt(characteristic,funt_string) {
  funt_outbreak=0;

  // 预定义的功能
  // 使用方法:
  // send_value 第一个参数characteristic默认填写。参数二是一个列表
  // 发送数值，第一个是电机1工作强度，第二个是电机1延迟时间。
  // 第三个是电机2工作强度，第四个是电机2延迟时间。
  // funt_string是传来的字符串。
  if(funt_string == "九浅一深"){
    await sleep(1000);
    if(break_funt=1){await send_value(characteristic, [0,0,0,0]);return 0;}
    await send_value(characteristic, [150,1,100,1]);
    await sleep(1000);
    if(break_funt=1){await send_value(characteristic, [0,0,0,0]);return 0;}
    await send_value(characteristic, [0,1,0,1]);
    await sleep(1000);
    if(break_funt=1){await send_value(characteristic, [0,0,0,0]);return 0;}
    await send_value(characteristic, [150,1,100,1]);
    await sleep(1000);
    if(break_funt=1){await send_value(characteristic, [0,0,0,0]);return 0;}
    await send_value(characteristic, [0,1,0,1]);
    await sleep(1000);
    if(break_funt=1){await send_value(characteristic, [0,0,0,0]);return 0;}
    await send_value(characteristic, [150,1,100,1]);
    await sleep(1000);
    if(break_funt=1){await send_value(characteristic, [0,0,0,0]);return 0;}
    await send_value(characteristic, [0,1,0,1]);
    await sleep(1000);
    if(break_funt=1){await send_value(characteristic, [0,0,0,0]);return 0;}
    await send_value(characteristic, [150,1,100,1]);
    await sleep(1000);
    if(break_funt=1){await send_value(characteristic, [0,0,0,0]);return 0;}
    await send_value(characteristic, [0,1,0,1]);
    await sleep(1000);
    if(break_funt=1){await send_value(characteristic, [0,0,0,0]);return 0;}
    await send_value(characteristic, [150,1,100,1]);
    await sleep(1000);
    if(break_funt=1){await send_value(characteristic, [0,0,0,0]);return 0;}
    await send_value(characteristic, [0,1,0,1]);
    await sleep(1000);
    if(break_funt=1){await send_value(characteristic, [0,0,0,0]);return 0;}
    await send_value(characteristic, [150,1,100,1]);
    await sleep(1000);
    if(break_funt=1){await send_value(characteristic, [0,0,0,0]);return 0;}
    await send_value(characteristic, [0,1,0,1]);
    await sleep(1000);
    if(break_funt=1){await send_value(characteristic, [0,0,0,0]);return 0;}
    await send_value(characteristic, [150,1,100,1]);
    await sleep(1000);
    if(break_funt=1){await send_value(characteristic, [0,0,0,0]);return 0;}
    await send_value(characteristic, [0,1,0,1]);
    await sleep(1000);
    if(break_funt=1){await send_value(characteristic, [0,0,0,0]);return 0;}
    await send_value(characteristic, [150,1,100,1]);
    await sleep(1000);
    if(break_funt=1){await send_value(characteristic, [0,0,0,0]);return 0;}
    await send_value(characteristic, [0,1,0,1]);
    await sleep(1000);
    if(break_funt=1){await send_value(characteristic, [0,0,0,0]);return 0;}
    await send_value(characteristic, [150,1,100,1]);
    await sleep(1000);
    if(break_funt=1){await send_value(characteristic, [0,0,0,0]);return 0;}
    await send_value(characteristic, [0,1,0,1]);
    await sleep(1000);
    if(break_funt=1){await send_value(characteristic, [0,0,0,0]);return 0;}
    await send_value(characteristic, [250,2,200,2]);
    await sleep(2000);
    await send_value(characteristic, [0,0,0,0]);
  }
  
  else if(funt_string == "一浅一深"){
    if(break_funt=1){await send_value(characteristic, [0,0,0,0]);return 0;}
    await send_value(characteristic, [150,1,150,1]);
    await sleep(1000);
    if(break_funt=1){await send_value(characteristic, [0,0,0,0]);return 0;}
    await send_value(characteristic, [0,0,0,0]);
    await sleep(1000);
    if(break_funt=1){await send_value(characteristic, [0,0,0,0]);return 0;}
    await send_value(characteristic, [250,1,150,1]);
    await sleep(2000);
    await send_value(characteristic, [0,0,0,0]);
  }

  // 如果给出的功能不存在则设定为空值。
  else{
    await send_value(characteristic, [0,0,0,0]);;
  }

}



async function send_while(characteristic){
	
	
	// 获取整个消息文本
	const context = await getContext();
	  
  if(context.chat.length!=floor_flag){
    
    // 获取最新消息
    let inputString = context.chat[context.chat.length-1].mes;
      
    // 通过正则读要传输设备的值
    let result = extractDeviceContent(inputString);
    if(result!=''){
      console.log(result);
      // 发送设备来设置
      result=result[result.length-1];
      
      var obj = JSON.parse(result);

      // AI直接使用
      let number=[0,0,0,0];
      if("one_power" in obj){
        number[0]=parseInt(obj.one_power);
      }
      if("one_times" in obj){
        number[1]=parseInt(obj.one_times);
      }
      if("two_power" in obj){
        number[2]=parseInt(obj.two_power);
      }
      if("two_times" in obj){
        number[3]=parseInt(obj.two_times);
      }


      console.log(number);
      if("one_power" in obj || "two_power" in obj){
        funt_outbreak=1; // 用于退出funt函数，必须放在funt前面，不然发了之后就又被异步还没终止的funt改了。
        await send_value(characteristic,number);
        floor_flag=context.chat.length; 
        // 用于表明这个楼层已经发送过一次消息了。这个必须放到这里，不然ai消息还没发完标志就改了。
        return 0; // 执行完就退，不然万一funt也有，那么既有自定义还有funt，岂不是冲突？
        
      }
      // 功能定义
      if("funt" in obj){
        funt_outbreak=1; // 用于退出funt函数，必须放在funt前面，不然发了之后就又被异步还没终止的funt改了。
        funt(characteristic,obj.funt);
        floor_flag=context.chat.length; 
        return 0;
      }

    }
  }


}


// 这个函数在按钮被点击时被调用
async function onButtonClick() {
  // 在这里你想做什么就做什么
  // 让我们用选中的设置创建一个弹出窗口
  
  // 连接蓝牙
  try {
    const characteristic = await connectBluetoothDevice();

    // 进入消息循环检测1秒一测
    setInterval(send_while, 1000, characteristic);

    // toastr.success("蓝牙设备已连接");
  } catch (error) {
    // toastr.error("蓝牙连接失败");
  }
  
  
 // toastr.info(
  //  `The checkbox is ${extension_settings[extensionName].example_setting ? "checked" : "not checked"}`,
    "A popup appeared because you clicked the button!"
 // );
}

// 此函数在加载扩展时调用
jQuery(async () => {
  // 这是一个从文件加载HTML的示例
  const settingsHtml = await $.get(`${extensionFolderPath}/example.html`);

  // 将settingsHtml附加到extensions_settings后
  // Extension_settings和extensions_settings2是Settings菜单的左列和右列
  // 左边应该是处理系统功能的扩展，右边应该是与视觉/UI相关的
  $("#extensions_settings").append(settingsHtml);

  // 这些都是监听事件的例子
  $("#my_button").on("click", onButtonClick);
  $("#example_setting").on("input", onExampleInput);
  $("#text_test").on("input",onExampleInput);
  // 启动时加载设置（如果有的话）
  loadSettings();
});
