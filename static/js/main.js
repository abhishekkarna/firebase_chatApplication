import { firebaseConfig } from "./firebase_init.js";
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
console.log("firebase---",firebase)
const db = firebase.database();
const msgRef = db.ref("/msgs");
let username = "";
function init() {
    username = prompt("Please enter your name");
}
document.addEventListener('DOMContentLoaded', init);
const msgScreen = document.getElementById("messsageWindow"); //the <ul> that displays all the <li> msgs
const msgForm = document.getElementById("messageForm"); //the input form
const msgInput = document.getElementById("msgInput"); //the input element to write messages
const msgBtn = document.getElementById("msgBtn"); //the Send button

function sendMessage(e) {
    console.log("...",msgInput.value)
    e.preventDefault();
    const text = msgInput.value;

    if (!text.trim()) return alert('Please type a message'); //no msg submitted
    const msg = {
        name: username,
        text: text
    };

    msgRef.push(msg);
    msgInput.value = "";
}

const updateMsgs = data => {
    const { name, text } = data.val();
    const msg = `<li class='${username == name ? "own" : "other"}'><span class="ml-2 mr-2 badge badge-light msg-span">
      <i class="name">${name}: </i>${text}
      </span>
    </li>`

    msgScreen.innerHTML += msg; //add the <li> message to the chat window

    //auto scroll to bottom
    document.getElementById("messsageWindow").scrollTop = document.getElementById("messsageWindow").scrollHeight;
}

msgBtn.addEventListener('click', sendMessage);
msgRef.on('child_added', updateMsgs);
