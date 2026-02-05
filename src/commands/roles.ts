import {
  Application,
  ApplicationCommandOptionType,
  ColorResolvable,
  Events,
  GuildMember,
  MessageFlags,
  type CommandInteraction,
} from "discord.js";
import { Discord, Slash, On, ArgsOf, SlashOption } from "discordx";

@Discord()
export class Roles {
  @Slash({ name: "set-color", description: "set yourself a color!" })
  async setColor(
    @SlashOption({
      description: "color you want to set",
      name: "color",
      required: true,
      type: ApplicationCommandOptionType.String,
    })
    color: ColorResolvable,
    interaction: CommandInteraction,
  ) {
    const member = interaction.member as GuildMember;
    const guild = interaction.guild;
    const roles = guild?.roles;

    let role;
    if ((role = roles?.cache.find((r) => r.name === member.user.displayName))) {
      role
        .edit({
          colors: {
            primaryColor: color,
          },
        })
        .then(async () => {
          await interaction.reply({
            content: `ah! so colors! :)`,
            withResponse: true,
            flags: MessageFlags.Ephemeral,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      roles
        ?.create({
          name: member.user.displayName ?? "new role",
          colors: {
            primaryColor: color,
          },
          position: 0,
        })
        .then(async (role) => {
          await member.roles.add(role);
          await interaction.reply({
            content: `ah! so colors! :)`,
            withResponse: true,
            flags: MessageFlags.Ephemeral,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
}
