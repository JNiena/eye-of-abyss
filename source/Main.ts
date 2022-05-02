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
import {FilterCommand} from "./commands/filter/FilterCommand";

let config: Config = new Config(process.argv[2]);
let discordBot: DiscordBot = new DiscordBot(config);
let minecraftBot: MinecraftBot = new MinecraftBot(config, () => {
	new ErrorListener(minecraftBot, discordBot);
	new ChatListener(minecraftBot, discordBot);
	new SpawnedListener(minecraftBot, discordBot);
	new KickedListener(minecraftBot, discordBot);
	new DeathListener(minecraftBot, discordBot);
});

discordBot.register(new ConnectCommand(minecraftBot));
discordBot.register(new DisconnectCommand(minecraftBot));
discordBot.register(new ReconnectCommand(minecraftBot));
discordBot.register(new StatusCommand(minecraftBot));
discordBot.register(new SayCommand(minecraftBot));
discordBot.register(new FilterCommand(minecraftBot));
discordBot.register(new FilterAddCommand(minecraftBot));
discordBot.register(new FilterRemoveCommand(minecraftBot));
discordBot.register(new FilterResetCommand(minecraftBot));
discordBot.register(new FilterEnableCommand(minecraftBot));
discordBot.register(new FilterDisableCommand(minecraftBot));

minecraftBot.connect();
discordBot.start();