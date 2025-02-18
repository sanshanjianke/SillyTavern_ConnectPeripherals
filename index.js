import { getContext } from "../../extensions.js";



const context = getContext();
context.chat; // Chat log
context.characters; // Character list
context.groups; // Group list
// And many more...


// test msgbox
function run_alert(context){

	alert(context.chat);
	alert(context.characters);
	alert(context.groups);
}	

// timer
let intervalId = setInterval(() => {
    run_alert(context);
}, 10000);

