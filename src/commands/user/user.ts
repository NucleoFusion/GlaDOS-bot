import {
  ChatInputCommandInteraction,
  MessageFlags,
  SlashCommandBuilder,
} from "discord.js";
import info from "./subcommands/info.js";

export const command = {
  data: new SlashCommandBuilder()
    .setName("user")
    .setDescription("Provides information about the user.")

    .addSubcommand(subcommand => subcommand
      .setName("info")
      .setDescription("gives info of a certain user.")
      .addUserOption((option) =>
        option
          .setName("user")
          .setDescription("The username to search for")
          .setRequired(false),
      )
    )

    .addSubcommand(subcommand => subcommand
      .setName("attach")
      .setDescription("attaches github name of a user.")
      .addUserOption((option) =>
        option
          .setName("user")
          .setDescription("The username to search for")
          .setRequired(false),
      )
    ),

  async execute(interaction: ChatInputCommandInteraction) {
    // Ensure the command is executed in a guild
    if (!interaction.guild) {
      await interaction.reply({
        content: "This command can only be used within a server.",
        flags: MessageFlags.Ephemeral,
      });
      return;
    }

    const subcommand = interaction.options.getSubcommand();

    switch (subcommand) {
      case "info":
        info(interaction)
        break;

      case "attach":
        console.log("Attached");
        break;
    }
  }
}

