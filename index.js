import { getContext } from "../../extensions.js";

import { eventSource, event_types } from "../../../../script.js";

eventSource.on(event_types.MESSAGE_RECEIVED, handleIncomingMessage);


const context = getContext();
context.chat; // Chat log
context.characters; // Character list
context.groups; // Group list
// And many more...


function handleIncomingMessage(data) {
    // Handle message
}

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

