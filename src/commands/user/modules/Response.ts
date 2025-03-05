import { EmbedBuilder, Role } from "discord.js";
import { getDateDifferenceFormatted } from "./DateConversion.js";

export interface UserStats {
  displayName: string;
  roles: Role[];
  createdAt: Date;
  joinedAt: Date;
  score: number;
  avatar: string;
}

export function GetFormattedResponse(userStats: UserStats) {
  const roleList = userStats.roles
    .filter(role => role.id !== role.guild.id)
    .map((role) => {
      const roleMention = `<@&${role.id}>`;
      return `${roleMention}`;
    })
    .join(" ");

  const DiscordFormattedTime = getDateDifferenceFormatted(userStats.createdAt);
  const ServerFormattedTime = getDateDifferenceFormatted(userStats.createdAt)

  const Description = `
    
    **Joined Discord**: ${userStats.createdAt.toDateString()} ~ ${DiscordFormattedTime}

    **Joined Server**: ${userStats.joinedAt.toDateString()} ~ ${ServerFormattedTime}

    **Roles**: ${roleList}
    
    **Score**: ${userStats.score} `
    .trimStart();

  return new EmbedBuilder()
    .setTitle(`${userStats.displayName}`)
    .setDescription(Description || "No Data Found")
    .setThumbnail(userStats.avatar)
    .setColor(0x2f3136);
}
