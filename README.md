# Simple Discord.js

A simplified Discord.js library designed for beginners, making it easier to create Discord bots.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Creating Your Bot](#creating-your-bot)
- [Prefix Commands](#prefix-commands)
- [Slash Commands](#slash-commands)
- [Events](#events)
- [License](#license)

## Installation

To install the Simple Discord.js library, run the following command in your terminal:

```bash
npm install @amtixdev/simple-discord.js
```

## Usage

### Importing the Library

You can import the `SimpleBot` class from the package like this:

```javascript
const SimpleBot = require('simple-discord');
const { GatewayIntentBits } = require('discord.js');
```

### Creating Your Bot

1.  **Set Up Your Project**
    
    Create a new directory for your project and initialize it:
    
    ```bash
    mkdir my-discord-bot
    cd my-discord-bot
    npm init -y
    ```
    
2.  **Install Dependencies**
    
    Install the Simple Discord.js library and Discord.js:
    
    ```bash
    npm install @amtixdev/simple-discord.js discord.js
    ```
    
3.  **Create Your Bot Script**
    
    Create a file named `bot.js` and add the following code:
    
    ```javascript
    // bot.js
    const SimpleBot = require('simple-discord');
    const { GatewayIntentBits } = require('discord.js');
    
    // Define the intents your bot needs
    const intents = [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ];
    
    // Create a new bot instance
    const bot = new SimpleBot('YOUR_DISCORD_BOT_TOKEN_HERE', intents);
    
    // Register a prefix-based command
    bot.command('!ping', (msg) => {
      msg.reply('Pong!');
    });
    
    // Register a slash command
    bot.slashCommand(
      {
        name: 'ping',
        description: 'Replies with Pong!',
      },
      async (interaction) => {
        await interaction.reply('Pong!');
      }
    );
    
    // Define a custom action for the messageCreate event
    bot.on('messageCreate', (msg) => {
      console.log(`Message received: ${msg.content}`);
    });
    
    // Start the bot
    bot.start();
    
    ```
    
4.  **Replace Your Bot Token**
    
    Replace `'YOUR_DISCORD_BOT_TOKEN_HERE'` with your actual bot token, which you can get from the [Discord Developer Portal](https://discord.com/developers/applications).
    
5.  **Run Your Bot**
    
    Save your `bot.js` file and run the bot using:
    
    ```bash
    node bot.js
    ```
    
    Your bot should now be online and responding to both prefix and slash commands!
    

## Prefix Commands

You can register prefix-based commands using the `command` method. The first argument is the command name, and the second is the callback function that will be executed when the command is called.

### Example

```javascript
bot.command('!hello', (msg) => {
  msg.reply('Hello there!');
});
```

## Slash Commands

You can register slash commands using the `slashCommand` method. The first argument is an object defining the slash command data, and the second is the callback function that will be executed when the command is invoked.

### Example

```javascript
bot.slashCommand(
  {
    name: 'greet',
    description: 'Sends a greeting message',
  },
  async (interaction) => {
    await interaction.reply('Greetings!');
  }
);
```

The library automatically registers slash commands with Discord when the bot starts.

## Events

You can listen for various events using the `on` method. The first argument is the event name, and the second is the callback function.

### Example Events

-   **messageCreate**: Triggered when a new message is created.

```javascript
bot.on('messageCreate', (msg) => {
  console.log(`Message received: ${msg.content}`);
});
```

-   **interactionCreate**: Triggered when an interaction (e.g., a slash command) is created.

```javascript
bot.on('interactionCreate', (interaction) => {
  console.log(`Interaction received: ${interaction.commandName}`);
});
```

-   **guildMemberAdd**: Triggered when a new member joins the guild.

```javascript
bot.on('guildMemberAdd', (member) => {
  console.log(`New member joined: ${member.user.tag}`);
});
```

## License

This project is licensed under the MIT License. See the [LICENSE](https://chatgpt.com/c/LICENSE) file for details.

Maintained by [AmtiXDev](https://github.com/lifeisunusefull). For any questions or suggestions, feel free to open an issue or reach out.

[![Discord Banner](https://api.weblutions.com/discord/invite/FqceHDU8QP/)](https://discord.gg/FqceHDU8QP)

[![Discord Banner](https://api.weblutions.com/discord/invite/xEnX3Kbmsm/)](https://discord.gg/xEnX3Kbmsm)
