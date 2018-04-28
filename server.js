// Discord
const Discord = require('discord.js');
const client = new Discord.Client();

// Other depedencies

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(":memory:");

// Imports
const config = require('./config');

// Scripts
const Pinger = require("./other/pinger.js");

// Events
const Message = require('./events/message.js');
const Ready = require('./events/ready.js');
const GuildMemberAdd = require('./events/guildMemberAdd.js');
const GuildMemberRemove = require('./events/guildMemberRemove.js');

// further event
Message.main(client);
Ready.main(client);
GuildMemberAdd.main(client);
GuildMemberRemove.main(client);

// ping
const pinger = new Pinger();
pinger.ping();

// login
console.log("$ Attempting to log in.");
client.login(config.credentials.token);
