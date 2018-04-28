var Return;
module.exports = class Embed {
  constructor(title, description, footer, timestamp, color, fieldText, fieldName, inline) {
    title = this.title
    description = this.description
    footer = this.footer
    timestamp = this.timestamp
    color = this.color
    fieldName = this.fieldName
    fieldText = this.fieldText
    inline = this.inline
    
  }
  embed(title, description, footer, timestamp, color) {
    const Discord = require('discord.js');
    if (timestamp === false) {
    var Return = new Discord.RichEmbed()
    .setTitle(title)
    .setDescription(description)
    .setFooter(footer)
    .setColor(color);
    }
    else {
    var Return = new Discord.RichEmbed()
    .setTitle(title)
    .setDescription(description)
    .setFooter(footer)
    .setColor(color)
    .setTimestamp();
    }
    return Return;
  }
  Field(fieldName, fieldText, inline) {
    Return = Return.addField(fieldName, fieldText, inline)
    return Return;
  }
}
