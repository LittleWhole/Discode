module.exports = {
  async run(message, client, command, args) {
      var fs = require('fs');
      var dbFile = './.data/sqlite.db';
      var exists = fs.existsSync(dbFile);
      var sqlite3 = require('sqlite3').verbose();
      var db = new sqlite3.Database(dbFile);
    if (args === null &&
        !args.includes("request") &&
        !args.includes("tickets") &&
        !args.includes("ticket-archive") &&
        !args.includes("fufill") &&
        !args.includes("active")
        ) 
    {
          message.channel.send(`:x: **|** ${message.author}, invalid subcommand!`).then(m => {
            if(!message.member.roles.has("350114151936425984")) {
              m.edit(`:x: **|** ${message.author}, invalid subcommand!\nTo request support, please do *>_support request* **<language>  <link to code (github, codeshare, hastebin, etc)> <problem>**.`);
            }
          });
      return;
    }
    if (args[0] === 'request') {
      if (!args[1]) return message.reply("Please provide a valid language!");
      if (!args[2]) return message.reply("Please provide a valid link!");
      if (!args[3]) return message.reply("Please state your problem or question!");
      message.reply("Your support ticket has been created! Please wait until a support member fufills your ticket! (You will be allowed to chat with them in a private channel until the ticket is closed.)");
      let language = args[1];
      let link = args[2];
      let problem = args.slice(3).join(" ");
      
      let Discord = require('discord.js');
      
      let embed = new Discord.RichEmbed()
      .setTitle("Support Ticket")
      .addField("User", message.author, true)
      .addField("Language", language, true)
      .addField("Link to code", link, true)
      .setDescription(problem)
      .setTimestamp();
      
      let supportTicketChannel = message.guild.channels.find("name", "support-tickets")
      supportTicketChannel.send({embed: embed});
      
      db.serialize(function(){
      if (!exists) {
        db.run("CREATE TABLE SupportTickets ( ID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, User varchar(255) NOT NULL, Language varchar(255) NOT NULL, CodeLink varchar(511) NOT NULL, Problem varchar(2048) NOT NULL, Fufilled BIT NOT NULL );");
        console.log("INTERNAL PROCESS >> I've created the SupportTickets table!");
      } 
        db.run(`INSERT INTO SupportTickets (User, Language, CodeLink, Problem, Fufilled) VALUES ('${message.author.id}', '${language}', '${link}', '${problem}', 0);`);
        db.each('SELECT * FROM SupportTickets', function(err, row) {
          if ( row ) {
            console.log('record:', row);
          }
        });
      });
    }
    if (args[0] === 'fufill') {
    }
    if (args[0] === 'active') {
      if (!message.member.roles.has("350114151936425984")) return message.channel.send(`:x: **|** ${message.author}, you don't have the correct permissions to perform this command!`);
      if (message.channel.name !== 'support-commands') return message.reply("Whoops, you're using this command in the wrong channel!");
      console.log("ran");
        db.each('SELECT * FROM SupportTickets WHERE Fufilled=0', function(err, row) {
            message.channel.send(`**ID:** ${row.ID}\n**User:** <@${row.User}>\n**Language:** ${row.Language}`);
        });
  }
  }
}