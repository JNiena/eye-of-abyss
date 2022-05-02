# Eye of Abyss
## Minecraft Discord Client

Eye of Abyss is a project that allows you to manage minecraft accounts via discord.
The idea is that each account can be interacted seperately within their own channels.

## Features

- Execute any command or chat with your friends as if you were in-game.
- Filter through messages using a whitelist.
- Log the entire chat to a file.
- Automatically rejoin if the bot gets disconnected using a configurable delay.
- Ping a user or role if the bot gets disconnected.
- Configurable join message and command.
- Ability to connect on any version of minecraft.
- Per account configuration.

Visit the [Wiki](https://github.com/JNiena/Eye-of-Abyss/wiki) for more details.

## Installation

1. Make sure you have [Node.js](https://nodejs.org/) v10+ installed.
2. Download and extract the latest version from the [Releases](https://github.com/JNiena/Eye-of-Abyss/releases/latest) tab.
3. Put your discord bot token in the config.json file.
4. Add and configure accounts inside of the accounts directory.
5. Run main.js with node.

## Building

1. Clone the repository.
2. Go inside of the directory.
4. Run "npm install"  to install all the dependencies.
3. Run "npx tsc" to convert the typescript to javascript.
4. Run "node target/main.js" to start the bot.

## Development

Developed by JNiena.

Reviewed by Coder.

## License

[MIT](https://github.com/JNiena/Eye-of-Abyss/blob/main/LICENSE)

**Open Source Software**