import { ChatInputCommandInteraction, PermissionFlagsBits } from "discord.js";
import { SlashCommandBuilder } from "discord.js";
import reconnect from "./subcommands/reconnect.js";
import connect from "./subcommands/connect.js";
import disconnect from "./subcommands/disconnect.js";
import view from "./subcommands/view.js";

export const data = {
  data: new SlashCommandBuilder()
    .setName("github")
    .setDescription("Provides access to github database.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)

    // Connect Subcommand
    .addSubcommand(subcommand => subcommand
      .setName('connect')
      .setDescription('Create a github entry for a user.')
      .addUserOption(option => option
        .setName("user")
        .setDescription("user to connect github to.")
        .setRequired(true))
      .addStringOption(option => option
        .setName('githubName')
        .setDescription('The users github account name.')
        .setRequired(true))
    )

    // Connect Subcommand
    .addSubcommand(subcommand => subcommand
      .setName('connect')
      .setDescription('Create a github entry for a user.')
      .addUserOption(option => option
        .setName("user")
        .setDescription("user to connect github to.")
        .setRequired(true))
      .addStringOption(option => option
        .setName('githubName')
        .setDescription('The users github account name.')
        .setRequired(true))
    )

    // Reconnect Subcommand
    .addSubcommand(subcommand => subcommand
      .setName('reconnect')
      .setDescription('Update a github entry for a user.')
      .addUserOption(option => option
        .setName("user")
        .setDescription("user to connect github to.")
        .setRequired(true))
      .addStringOption(option => option
        .setName('githubName')
        .setDescription('The users github account name.')
        .setRequired(true))
    )

    // Disconnect Subcommand
    .addSubcommand(subcommand => subcommand
      .setName('disconnect')
      .setDescription('Disconnect a github entry for a user.')
      .addUserOption(option => option
        .setName("user")
        .setDescription("user to connect github to.")
        .setRequired(true))
    )

    // View Subcommand
    .addSubcommand(subcommand => subcommand
      .setName('view')
      .setDescription('Create a github entry for a user.')
      .addUserOption(option => option
        .setName("user")
        .setDescription("user to connect github to.")
        .setRequired(true))
    ),

  async execute(interaction: ChatInputCommandInteraction) {
    const subcommand = interaction.options.getSubcommand()

    switch (subcommand) {
      case "connect":
        connect(interaction)
        break;
      case "reconnect":
        reconnect(interaction)
        break;
      case "disconnect":
        disconnect(interaction)
        break;
      case "view":
        view(interaction)
        break;
    }
  }
}
