const accountBtn = document.getElementById("create-acc");
const loginBtn = document.getElementById("login-btn");
const userInput = document.getElementById("uname");
const userPin = document.getElementById("psw");
const form = document.querySelector("form");

let currentUname = "";
let currentPassword = "";
let counter = 0;

accountBtn.addEventListener("click", function() {

    currentUname = randomUsername();
    currentPassword = random4pin();
    counter = 0;
    alert("Username: " + currentUname + "\nPassword: " + currentPassword);
    
})

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const enteredUsername = userInput.value;
    localStorage.setItem("enteredUsername", enteredUsername);//store to localstorage so i can use it in main.js
    const enteredPassword = userPin.value;

    if (!enteredUsername || !enteredPassword) {
        alert("Please enter both username and password");
        return;
    }

    if(counter < 2) {
        if(enteredUsername === currentUname && Number(enteredPassword) === currentPassword) {
            window.location.href = "main.html";
        } else {
            counter++;
            if (counter < 2) {
                alert("Incorrect username or password. Please try again.");
                userInput.value = "";
                userPin.value = "";
                userInput.focus();
            }
            if(counter >= 2) {
                alert("Too many failed attempts. Generating new credentials...");
                currentUname = randomUsername();
                currentPassword = random4pin();
                counter = 0;
                alert("Username: " + currentUname + "\nPassword: " + currentPassword);
            }
        }
    }
});

function randomUsername() {
    var uname_array = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l"];
    var final_uname = "";

    for(var i=0; i<4; i++) {
        var randomUname = Math.floor(Math.random() * uname_array.length);
        final_uname += uname_array[randomUname];
    }
    return final_uname;
}

function random4pin() { 
    return Math.floor(Math.random() * (9999-1000 + 1)) + 1000;
}