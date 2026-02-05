import { Events, type CommandInteraction } from "discord.js";
import { Discord, On, ArgsOf } from "discordx";

@Discord()
export class Messages {
  @On({ event: Events.MessageCreate })
  onMessage([message]: ArgsOf<Events.MessageCreate>) {
    if (message.author.id === message.client.user.id) return;

    let exactMatch = message.content.replace(
      /[\u200B]+|[\u200C]+|[\u200D]+|[\u200E]+|[\u200F]+|[\uFEFF]+/gm,
      "",
    );
    let partialMatch = exactMatch.toLowerCase().replace(/[\s-_\.]+/gm, "");

    if (exactMatch.match(/\b(avery|deer|doe)\b/)) {
      message.react("1345908850938744864").catch(() => {
        message.channel.send("hey guys");
      });
    } else if (partialMatch.match(/avery|deer|doe/)) {
      message.react("1345908810425962608").catch();
    }
  }
}
