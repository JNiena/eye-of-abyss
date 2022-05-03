import {DiscordBot} from "./DiscordBot";
import {Config} from "./Config";
import {MinecraftBot} from "./MinecraftBot";
import {ErrorListener} from "./listeners/ErrorListener";
import {ChatListener} from "./listeners/ChatListener";
import {SpawnedListener} from "./listeners/SpawnedListener";
import {KickedListener} from "./listeners/KickedListener";
import {DeathListener} from "./listeners/DeathListener";
import {ConnectCommand} from "./commands/ConnectCommand";
import {DisconnectCommand} from "./commands/DisconnectCommand";
import {ReconnectCommand} from "./commands/ReconnectCommand";
import {SayCommand} from "./commands/SayCommand";
import {StatusCommand} from "./commands/StatusCommand";
import {FilterAddCommand} from "./commands/filter/FilterAddCommand";
import {FilterRemoveCommand} from "./commands/filter/FilterRemoveCommand";
import {FilterEnableCommand} from "./commands/filter/FilterEnableCommand";
import {FilterDisableCommand} from "./commands/filter/FilterDisableCommand";
import {FilterResetCommand} from "./commands/filter/FilterResetCommand";
import {FilterListCommand} from "./commands/filter/FilterListCommand";
import {ChannelInhibitor} from "./inhibitors/ChannelInhibitor";

let config: Config = new Config(process.argv[2]);
let discordBot: DiscordBot = new DiscordBot(config);
let minecraftBot: MinecraftBot = new MinecraftBot(config, () => {
	new ErrorListener(minecraftBot, discordBot);
	new ChatListener(minecraftBot, discordBot);
	new SpawnedListener(minecraftBot, discordBot);
	new KickedListener(minecraftBot, discordBot);
	new DeathListener(minecraftBot, discordBot);
});

discordBot.registerCommand(new ConnectCommand(minecraftBot));
discordBot.registerCommand(new DisconnectCommand(minecraftBot));
discordBot.registerCommand(new ReconnectCommand(minecraftBot));
discordBot.registerCommand(new StatusCommand(minecraftBot));
discordBot.registerCommand(new SayCommand(minecraftBot));
discordBot.registerCommand(new FilterListCommand(minecraftBot));
discordBot.registerCommand(new FilterAddCommand(minecraftBot));
discordBot.registerCommand(new FilterRemoveCommand(minecraftBot));
discordBot.registerCommand(new FilterResetCommand(minecraftBot));
discordBot.registerCommand(new FilterEnableCommand(minecraftBot));
discordBot.registerCommand(new FilterDisableCommand(minecraftBot));

discordBot.registerInhibitor(new ChannelInhibitor(config));

minecraftBot.connect();
discordBot.start();