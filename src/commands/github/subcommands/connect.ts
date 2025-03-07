import { GithubRepository } from "@/data/repositories/github.repository.js";
import { AppClient } from "@/index.js";
import { ChatInputCommandInteraction } from "discord.js";
import { Client } from "pg";
import { User } from "discord.js";
import { MessageFlags } from "discord-api-types/v9";

export default async function connect(interaction: ChatInputCommandInteraction) {
  const client = interaction.client as Client & AppClient;
  const githubRepo = client.db.githubRepository as GithubRepository;

  const userArg = interaction.options.getUser("user") as User;
  const githubName = interaction.options.getString("githubName") as string;

  const err = await githubRepo.insertGithubDetails(userArg, githubName)
  if (err) {  // The Method Call returns an Promise<Error | null>, this checks if error occurs
    await interaction.reply({
      content: "The user has a connected github. To update check the 'update' subcommand.",
      flags: MessageFlags.Ephemeral
    })
    return
  }

  await interaction.reply({
    content: `Successfully connected github account ${githubName} to user ${userArg.displayName}`
  })
}
