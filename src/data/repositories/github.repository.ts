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

  async insertGithubDetails(user: DiscordUser, githubName: string): Promise<Error | null> {
    const { id, username } = user;

    const res = await this.db
      .insert(github)
      .values({
        discord_id: BigInt(id),
        username: username,
        githubname: githubName
      })
      .onConflictDoNothing()
      .execute() //returns metadata

    if (res.rowCount === 0) { //Checks if any change occured, since no change occuring means conflict happened
      return new Error('user already exists')
    }

    return null;
  }

  async getGithub(user: DiscordUser) {
    const { id } = user;
  }

  async getAllRecords(): Promise<GithubUser[]> {

    return await this.db
      .select()
      .from(github)
  }
}
