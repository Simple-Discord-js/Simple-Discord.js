const { Client, GatewayIntentBits } = require('discord.js');

class SimpleBot {
  constructor(token, intents = []) {
    this.client = new Client({ intents });
    this.token = token;
    this.commands = {};
    this.eventActions = {};
  }

  on(eventName, callback) {
    this.eventActions[eventName] = callback;
    this.client.on(eventName, callback);
  }

  onMessage() {
    this.client.on('messageCreate', (msg) => {
      const [command, ...args] = msg.content.split(' ');

      if (this.eventActions['messageCreate']) {
        this.eventActions['messageCreate'](msg);
      }
      
      if (this.commands[command]) {
        this.commands[command](msg, args);
      }
    });
  }

  command(commandName, callback) {
    this.commands[commandName] = callback;
  }

  start() {
    this.onMessage();
    this.client.login(this.token)
      .then(() => console.log('Bot is online!'))
      .catch(console.error);
  }
}

module.exports = SimpleBot;