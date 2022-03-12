let usernameKey = "mb_UserName";
let oAuthKey = "mb_OAuth";
let targetKey = "mb_Target";

let username = "";
let oAuth = "";
let target = "";

function initFields() {
    console.log("running initFields")
    username = localStorage.getItem(usernameKey); console.log(username);
    oAuth = localStorage.getItem(oAuthKey); console.log(oAuth);
    target = localStorage.getItem(targetKey); console.log(target);
    //Fill in the fields if they exit in localstorage:
    if (username != null) document.getElementById("usernameInput").value = username;
    if (oAuth != null) document.getElementById("tokenInput").value = oAuth;
    if (target != null) document.getElementById("targetInput").value = target;
    console.log("Username: " + username);
    console.log("Target: " + target);
}

//Store the filled in fields in localstorage:
function updateFields() {
    console.log("running updatefields")
    //Update the variables from the fields:
    username = document.getElementById("usernameInput").value;
    oAuth = document.getElementById("tokenInput").value;
    target = document.getElementById("targetInput").value;
    console.log("Name: " + username + " target: " + target);

    //update the fields in localstorage:
    try {
        localStorage.setItem(usernameKey, username);
        localStorage.setItem(oAuthKey, oAuth);
        localStorage.setItem(targetKey, target);
    }
    catch (err) {
        console.log(err)
    }

}


let timeout = false;
function runBot() {
    updateFields();
    // const client = new tmi.Client({
    //     options: { debug: true },
    //     identity: {
    //         username: username,
    //         password: token
    //     },
    //     channels: [target]
    // });

    // client.connect();

    // client.on('message', (channel, tags, message, self) => {
    //     // Ignore echoed messages.
    //     if (self) return;

    //     if (message.toLowerCase() === '!hello') {
    //         // "@alca, heya!"
    //         client.say(channel, `@${tags.username}, heya!`);
    //     }
    // });
    opts = {
        identity: {
            username: username,
            password: oAuth
        },
        channels: [target]
    }
    const client = new tmi.Client(opts);

    client.on('connected', onConnectedHandler);
    client.on('message',onMessageHandler);
    client.connect();


    function toggleTimeout() {
        console.log('Re-enabling bot');
        timeout = false;
    }
    
    // Called every time a message comes in
    function onMessageHandler(target, context, msg, self) {
        if (self) {
            return;
        } // Ignore messages from the bot
    
        // Remove whitespace from chat message
        const commandName = msg.trim();
    
        // If the command is known, let's execute it
        if (!timeout && commandName === '!play') {
            client.say(target, '!play');
            timeout = true;
            console.log('Joined game, now waiting for 5 seconds');
            setTimeout(toggleTimeout, 20000);
        }
    }

    // Called every time the bot connects to Twitch chat
    function onConnectedHandler(addr, port) {
        console.log(`* Connected to ${addr}:${port}`);
        client.say(
            opts.channels[0],
            `${opts.identity.username} is ready to play some Marbles!`
        );
    }
}

