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

// 示例用法


let characteristic;


function send_value(characteristic,value){
	characteristic.writeValue(
    new Uint8Array([value])
  );
	
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



async function send_while(characteristic){
	// 获取整个消息文本
	
	
	const context = await getContext();
	  
	// 获取最新消息
	let inputString = context.chat[context.chat.length-1].mes;
	  
	// 通过正则读要传输设备的值
	let result = await extractDeviceContent(inputString);
	
	if(result!=''){
		console.log(result);
		// 发送设备来设置
		result=result[result.length-1];
		result= await parseInt(result);
		console.log(result);
		await send_value(characteristic,result);
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
