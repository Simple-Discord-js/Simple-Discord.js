const { Client, GatewayIntentBits, Collection } = require('discord.js');

class SimpleBot {
  constructor(token, intents = []) {
    this.client = new Client({ intents });
    this.token = token;
    this.commands = {};
    this.slashCommands = new Collection();
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

  slashCommand(commandData, callback) {
    this.slashCommands.set(commandData.name, callback);
    this.client.once('ready', async () => {
      try {
        const guilds = this.client.guilds.cache;
        await Promise.all(
          guilds.map((guild) =>
            guild.commands.create(commandData)
          )
        );
        console.log(`Slash command ${commandData.name} registered.`);
      } catch (error) {
        console.error('Failed to register slash commands:', error);
      }
    });
  }

  onInteraction() {
    this.client.on('interactionCreate', async (interaction) => {
      if (!interaction.isCommand()) return;

      const command = this.slashCommands.get(interaction.commandName);
      if (command) {
        try {
          await command(interaction);
        } catch (error) {
          console.error('Error handling slash command:', error);
          await interaction.reply({
            content: 'There was an error while executing this command!',
            ephemeral: true,
          });
        }
      }
    });
  }

  start() {
    this.onMessage();
    this.onInteraction();
    this.client.login(this.token)
      .then(() => console.log('Bot is online!'))
      .catch(console.error);
  }
}

module.exports = SimpleBot;
