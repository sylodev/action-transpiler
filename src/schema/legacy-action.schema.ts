import { t } from "@deepkit/type";

export enum LegacyActionTriggerType {
  Label = "label",
  Keyword = "keyword",
  ReactionAdd = "reactionAdd",
  ReactionRemove = "reactionRemove",
  Interval = "interval",
  MessageCreate = "messageCreate",
  GuildMemberAdd = "guildMemberAdd",
  GuildMemberRemove = "guildMemberRemove",
  MemberRoleAdd = "memberRoleAdd",
  MemberRoleRemove = "memberRoleRemove",
}

export class LegacyActionFlags {
  @t.number
  ttl!: number;

  @t.number
  cooldown!: number;

  @t.boolean
  enabled!: boolean;

  @t.boolean
  silent!: boolean;

  @t.boolean
  delete!: boolean;

  @t.boolean
  quiet!: boolean;
}

export class LegacyActionTrigger {
  @t.enum(LegacyActionTriggerType)
  type!: LegacyActionTriggerType;

  @t.string.maxLength(256).optional
  content?: string;
}

export enum LegacyRestrictionMode {
  Blacklist = "blacklist",
  Whitelist = "whitelist",
}

export class LegacyRestriction {
  @t.enum(LegacyRestrictionMode)
  mode!: LegacyRestrictionMode;

  @t.array(t.string).maxLength(100)
  roles!: string[];

  @t.array(t.string).maxLength(100)
  channels!: string[];

  @t.array(t.string).maxLength(100)
  permissions!: string[];
}

export enum LegacyActionScriptType {
  Channel = "channel",
  DirectMessage = "dm",
}

export class LegacyActionScript {
  @t.boolean.required
  fallback!: boolean;

  @t.enum(LegacyActionScriptType).required
  type!: LegacyActionScriptType;

  @t.string.minLength(1).maxLength(15_000)
  message!: string;

  @t.string.optional
  channel?: string;
}

export class LegacyAction {
  @t.type(() => LegacyActionTriggerType).required
  flags!: LegacyActionFlags;

  @t.type(() => LegacyRestriction).required
  restrictions!: LegacyRestriction;

  @t.type(() => LegacyActionTrigger).required
  trigger!: LegacyActionTrigger;

  @t.array(t.type(() => LegacyActionScript)).required
  content!: LegacyActionScript[];
}
