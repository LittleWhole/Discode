const Discord = require('discord.js');

module.exports = {
  async run(message, client, command, args) {
    let code = args.join(" ");
    let evaled = eval(code);
    if (typeof evaled !== "string")
      evaled = require("util").inspect(evaled);

      evaled.replace(client.token, "[TOKEN]");

      if (evaled.length >= 1024) {
        message.channel.send(`Output was longer than 1024 characters (${evaled.length} to be exact)! 1024 is the maximum a \`RichEmbed\` field value can be. You can find it in the console.`);
        console.log(evaled);
        return;
      }
    try {
      const Successful = new Discord.RichEmbed()
      .setTitle("\`Evaluation successful\`")
      .addField("Input", `\`\`\`JavaScript\n${code}\`\`\``, true)
      .addField("Output", `\`\`\`JavaScript\n${evaled}\`\`\``, true)
      .setFooter("Discode by LittleWhole#2107")
      .setTimestamp()
      .setColor(message.member.displayHexColor);
      
      message.channel.send({embed: Successful});
    } catch(err) {
      const Errored = new Discord.RichEmbed()
      .setTitle("\`Evaluation errored\`")
      .addField("Input", `\`\`\`JavaScript\n${code}\`\`\``, true)
      .addField("Error", `\`\`\`JavaScript\n${err}\`\`\``, true)
      .setFooter("Discode by LittleWhole#2107")
      .setTimestamp()
      .setColor(message.member.displayHexColor);
      
      message.channel.send({embed: Errored});
    } finally {
      console.log("Eval command used by " + message.member);
    }
  }
}