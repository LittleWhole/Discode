var Command;
const config = require("../config.json");
module.exports = {
  async handleCommand(message, client, command, args) {
    if (command === 'test') {
      Command = require('../commands/test.js');
      Command.run(message, client, command, args);
    }
    if (command === 'eval') {
      if (message.author.id !== "230880116035551233") return;
      Command = require('../commands/eval.js');
      Command.run(message, client, command, args);
    }
    if (command === 'support') {
      Command = require('../commands/support.js');
      Command.run(message, client, command, args);
    }
  }
}