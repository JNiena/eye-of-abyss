import { MinecraftBot } from "./MinecraftBot";

export class Repeater {

  public constructor(minecraftBot: MinecraftBot) {
    let repeater: any = minecraftBot.config.get()["repeater"];
    for (let i = 0; i < repeater.length; i++) {
      let message: string = repeater[i]["message"];
      let interval: number = repeater[i]["interval"];
      setInterval(() => {
        if (minecraftBot && minecraftBot.isConnected()) {
          minecraftBot.chat(message);
        }
      }, interval);
    }
  }

}