import * as Path from "path";
import { Config } from "./Config";
import { DiscordBot } from "./DiscordBot";
import { Files } from "./Files";
import { MinecraftBot } from "./MinecraftBot";
import { Plugin } from "./Plugin";

export class PluginManager {

  private plugins: Plugin[];

  public constructor() {
    this.plugins = [];
  }

  public loadDirectory(path: string, minecraftBot: MinecraftBot, discordBot: DiscordBot): number {
    let files: string[] = Files.readDirectory(path);
    let loadedPlugins: number = 0;
    for (let file of files) {
      if (this.isAllowedPlugin(file, minecraftBot.config)) {
        import(Path.join(process.cwd(), path, file)).then(module => {
          let plugin = new module.default(minecraftBot, discordBot);
          this.load(plugin as Plugin);
          loadedPlugins += 1;
        });
      }
    }
    return loadedPlugins;
  }

  private isAllowedPlugin(file: string, config: Config): boolean {
    for (let allowedPlugin of config.get()["plugins"]) {
      if (file.endsWith(`${allowedPlugin}.js`)) {
        return true;
      }
    }
    return false;
  }

  public load(plugin: Plugin): void {
    this.plugins.push(plugin);
    plugin.start();
  }

  public unload(name: string): boolean {
    let plugin: Plugin | undefined = this.plugins.find(plugin => plugin.name === name);
    if (plugin) {
      plugin.stop();
      return true;
    }
    return false;
  }

  public unloadAll(): void {
    for (let plugin of this.plugins) {
      plugin.stop();
    }
  }

}