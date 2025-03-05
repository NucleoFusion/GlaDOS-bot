import { ChatInputCommandInteraction } from "discord.js";
import { GetFormattedResponse, UserStats } from "../modules/Response.js";
import { MessageFlags } from "discord-api-types/v9";
import { Client } from "pg";
import { AppClient } from "@/index.js";

export default async function info(interaction: ChatInputCommandInteraction) {
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

