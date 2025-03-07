import {
  ChatInputCommandInteraction,
  MessageFlags,
  SlashCommandBuilder,
} from "discord.js";
import { GetFormattedResponse, UserStats } from "./modules/Response.js";
import { Client } from "pg";
import { AppClient } from "@/index.js";


export const command = {
  data: new SlashCommandBuilder()
    .setName("user")
    .setDescription("Provides information about the user.")

    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The username to search for")
        .setRequired(true),
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

    const user = interaction.options.getUser("user") ?? interaction.user;

    if (!user) {
      await interaction.reply("User Not Found");
      return;
    }

    const member = await interaction.guild?.members.fetch(user.id);

    if (!member) {
      await interaction.reply("User Not Found");
      return;
    }

    const client = interaction.client as Client & AppClient;

    const repository = client.db.userRepository;

    if (!repository) {
      await interaction.reply({
        content: "db not initalised",
        flags: MessageFlags.Ephemeral,
      });
      return;
    }
    const userModel = await repository.getUserScore(user);

    const userStats: UserStats = {
      displayName: member.displayName,
      createdAt: user.createdAt,
      joinedAt: (member.joinedAt) ? member.joinedAt : new Date(),
      avatar: user.displayAvatarURL(),
      roles: [...member.roles.cache.values()], //To get the roles as a Role[] instead of a Collection<string,Role>
      score: userModel.score,
    }

    const embed = GetFormattedResponse(userStats)

    // Build a display string for the embed.
    await interaction.reply({
      embeds: [embed],
      allowedMentions: { roles: [] }, // This prevents role pings
    });
  }
}

