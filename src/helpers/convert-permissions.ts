import { PermissionFlagsBits } from "discord-api-types/v9";

const PERMISSION_MAP = new Map<string, bigint>([
  ["createinstantinvite", PermissionFlagsBits.CreateInstantInvite],
  ["kickmembers", PermissionFlagsBits.KickMembers],
  ["banmembers", PermissionFlagsBits.BanMembers],
  ["administrator", PermissionFlagsBits.Administrator],
  ["managechannels", PermissionFlagsBits.ManageChannels],
  ["manageguild", PermissionFlagsBits.ManageGuild],
  ["addreactions", PermissionFlagsBits.AddReactions],
  ["viewauditlog", PermissionFlagsBits.ViewAuditLog],
  ["voicepriorityspeaker", PermissionFlagsBits.PrioritySpeaker],
  ["voicestream", PermissionFlagsBits.Stream],
  ["viewchannel", PermissionFlagsBits.ViewChannel],
  ["readmessages", PermissionFlagsBits.ViewChannel],
  ["sendmessages", PermissionFlagsBits.SendMessages],
  ["sendttsmessages", PermissionFlagsBits.SendTTSMessages],
  ["managemessages", PermissionFlagsBits.ManageMessages],
  ["embedlinks", PermissionFlagsBits.EmbedLinks],
  ["attachfiles", PermissionFlagsBits.AttachFiles],
  ["readmessagehistory", PermissionFlagsBits.ReadMessageHistory],
  ["mentioneveryone", PermissionFlagsBits.MentionEveryone],
  ["useexternalemojis", PermissionFlagsBits.UseExternalEmojis],
  ["viewguildinsights", PermissionFlagsBits.ViewGuildInsights],
  ["voiceconnect", PermissionFlagsBits.Connect],
  ["voicespeak", PermissionFlagsBits.Speak],
  ["voicemute", PermissionFlagsBits.MuteMembers],
  ["voicedeafen", PermissionFlagsBits.DeafenMembers],
  ["voicemove", PermissionFlagsBits.MoveMembers],
  ["voiceusevad", PermissionFlagsBits.UseVAD],
  ["changenickname", PermissionFlagsBits.ChangeNickname],
  ["managenicknames", PermissionFlagsBits.ManageNicknames],
  ["manageroles", PermissionFlagsBits.ManageRoles],
  ["managewebhooks", PermissionFlagsBits.ManageWebhooks],
  ["manageemojis", PermissionFlagsBits.ManageEmojisAndStickers],
  ["useapplicationcommands", PermissionFlagsBits.UseApplicationCommands],
  ["useslashcommands", PermissionFlagsBits.UseApplicationCommands],
  ["voicerequesttospeak", PermissionFlagsBits.RequestToSpeak],
  ["manageevents", PermissionFlagsBits.ManageEvents],
  ["managethreads", PermissionFlagsBits.ManageThreads],
  ["createpublicthreads", PermissionFlagsBits.CreatePublicThreads],
  ["createprivatethreads", PermissionFlagsBits.CreatePrivateThreads],
  ["useexternalstickers", PermissionFlagsBits.UseExternalStickers],
  ["sendmessagesinthreads", PermissionFlagsBits.SendMessagesInThreads],
  ["startembeddedactivities", PermissionFlagsBits.StartEmbeddedActivities],
]);

/**
 * Convert Eris permissions to Discord API permissions
 */
export const convertPermissions = (permissions: string[]): bigint => {
  let set = 0n;
  for (const permission of permissions) {
    const value = PERMISSION_MAP.get(permission.toLowerCase().trim());
    if (value !== undefined) {
      set |= value;
    }
  }

  return set;
};
