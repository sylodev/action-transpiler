import { PermissionFlagsBits } from "discord-api-types/v9";

/**
 * Convert Eris permissions to Discord API permissions
 *
 */
export const convertPermissions = (permissions: string[]): bigint => {
  let set = 0n;
  for (const permission of permissions) {
    switch (permission.toLowerCase().trim()) {
      case "createInstantInvite":
        set |= PermissionFlagsBits.CreateInstantInvite;
      case "kickMembers":
        set |= PermissionFlagsBits.KickMembers;
      case "banMembers":
        set |= PermissionFlagsBits.BanMembers;
      case "administrator":
        set |= PermissionFlagsBits.Administrator;
      case "manageChannels":
        set |= PermissionFlagsBits.ManageChannels;
      case "manageGuild":
        set |= PermissionFlagsBits.ManageGuild;
      case "addReactions":
        set |= PermissionFlagsBits.AddReactions;
      case "viewAuditLog":
        set |= PermissionFlagsBits.ViewAuditLog;
      case "viewAuditLogs":
        set |= PermissionFlagsBits.ViewAuditLog;
      case "voicePrioritySpeaker":
        set |= PermissionFlagsBits.PrioritySpeaker;
      case "voiceStream":
        set |= PermissionFlagsBits.Stream;
      case "stream":
        set |= PermissionFlagsBits.Stream;
      case "viewChannel":
        set |= PermissionFlagsBits.ViewChannel;
      case "readMessages":
        set |= PermissionFlagsBits.ViewChannel;
      case "sendMessages":
        set |= PermissionFlagsBits.SendMessages;
      case "sendTTSMessages":
        set |= PermissionFlagsBits.SendTTSMessages;
      case "manageMessages":
        set |= PermissionFlagsBits.ManageMessages;
      case "embedLinks":
        set |= PermissionFlagsBits.EmbedLinks;
      case "attachFiles":
        set |= PermissionFlagsBits.AttachFiles;
      case "readMessageHistory":
        set |= PermissionFlagsBits.ReadMessageHistory;
      case "mentionEveryone":
        set |= PermissionFlagsBits.MentionEveryone;
      case "useExternalEmojis":
        set |= PermissionFlagsBits.UseExternalEmojis;
      case "externalEmojis":
        set |= PermissionFlagsBits.UseExternalEmojis;
      case "viewGuildInsights":
        set |= PermissionFlagsBits.ViewGuildInsights;
      case "voiceConnect":
        set |= PermissionFlagsBits.Connect;
      case "voiceSpeak":
        set |= PermissionFlagsBits.Speak;
      case "voiceMuteMembers":
        set |= PermissionFlagsBits.MuteMembers;
      case "voiceDeafenMembers":
        set |= PermissionFlagsBits.DeafenMembers;
      case "voiceMoveMembers":
        set |= PermissionFlagsBits.MoveMembers;
      case "voiceUseVAD":
        set |= PermissionFlagsBits.UseVAD;
      case "changeNickname":
        set |= PermissionFlagsBits.ChangeNickname;
      case "manageNicknames":
        set |= PermissionFlagsBits.ManageNicknames;
      case "manageRoles":
        set |= PermissionFlagsBits.ManageRoles;
      case "manageWebhooks":
        set |= PermissionFlagsBits.ManageWebhooks;
      case "manageEmojisAndStickers":
        set |= PermissionFlagsBits.ManageEmojisAndStickers;
      case "manageEmojis":
        set |= PermissionFlagsBits.ManageEmojisAndStickers;
      case "useApplicationCommands":
        set |= PermissionFlagsBits.UseApplicationCommands;
      case "useSlashCommands":
        set |= PermissionFlagsBits.UseApplicationCommands;
      case "voiceRequestToSpeak":
        set |= PermissionFlagsBits.RequestToSpeak;
      case "manageEvents":
        set |= PermissionFlagsBits.ManageEvents;
      case "manageThreads":
        set |= PermissionFlagsBits.ManageThreads;
      case "createPublicThreads":
        set |= PermissionFlagsBits.CreatePublicThreads;
      case "createPrivateThreads":
        set |= PermissionFlagsBits.CreatePrivateThreads;
      case "useExternalStickers":
        set |= PermissionFlagsBits.UseExternalStickers;
      case "sendMessagesInThreads":
        set |= PermissionFlagsBits.SendMessagesInThreads;
      case "startEmbeddedActivities":
        set |= PermissionFlagsBits.StartEmbeddedActivities;
    }
  }

  return set;
};
