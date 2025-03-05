import { User as DiscordUser } from "discord.js";
import { drizzle } from "drizzle-orm/node-postgres";
import { github, GithubUser } from "../models/github.model.js";

/**
 * Repository for managing user-related database operations.
 */
export class GithubRepository {
  readonly db: ReturnType<typeof drizzle>;

  /**
   * Initializes the repository with a Drizzle instance.
   */
  constructor(db: ReturnType<typeof drizzle>) {
    this.db = db;
  }

  async insertGithubDetails(user: DiscordUser, githubName: string): Promise<void> {
    const { id, username } = user;

    await this.db
      .insert(github)
      .values({
        discord_id: BigInt(id),
        username: username,
        githubname: githubName
      })
  }

  async getGithubDetails(): Promise<GithubUser[]> {

    return await this.db
      .select()
      .from(github)
  }
}
