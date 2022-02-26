import { validate } from "@deepkit/type";
import { LegacyAction } from "./legacy-action.schema";

const validateOrThrow = (value: LegacyAction | any): boolean => {
  const errors = validate(LegacyAction, value);
  if (errors.length > 0) {
    throw errors[0];
  }

  return true;
};

const VALID_ACTION = {
  meta: "Exported from https://atlas.bot",
  formatVersion: "1.2",
  flags: {
    ttl: 0,
    cooldown: 0,
    enabled: false,
    silent: false,
    delete: false,
    quiet: false,
  },
  restrictions: {
    mode: "blacklist",
    roles: [],
    channels: [],
    permissions: [],
  },
  trigger: {
    type: "label",
    content: "warn",
  },
  content: [
    {
      fallback: true,
      type: "channel",
      message:
        '{note;Evidence-locker channel ID}\n{set;lockerid;532902728834351115}\n\n{if;{args;2};==;;{channel.send;You must include a reason!}{set;LastMSG;{channel.lastMessageID}}{sleep;8}{message.delete;{get;LastMSG}};\n{if;{message.attachment};==;;{channel.send;Please use this command while pasting evidence to support your warning.}{set;LastMSG;{channel.lastMessageID}}{sleep;8}{message.delete;{get;LastMSG}};\n{if;{message.attachment};{set;attachmentURL;{message.attachment}}}\n{channel.send;{a!ae;\n--field1name="User";\n--field1value="**{if;{catch;{user.id;{args;1}};ERR_NOTFOUND};==;ERR_NOTFOUND;User could not be found;{user.tag;{args;1}}}**\\n(ID: `{if;{catch;{user.id;{args;1}};ERR_NOTFOUND};==;ERR_NOTFOUND;ID could not be found;{user.id;{args;1}}}`)";\n--field2name="Reason";\n--field2value="{args;2;999}";\n--title="Evidence added to locker";\n--color="#d0021b";\n--footer="Submitted by {user.tag} ({user.id})";\n--timestamp="true";\n--image="{message.attachment}"\n};{get;lockerid}}\n{a!warn;{args;1};{args;2;999}}}}\n{sleep;5}{delete}',
      id: "5e9553c66e399b0026538008",
    },
  ],
};

it("should validate valid legacy actions", () => {
  expect(validateOrThrow(VALID_ACTION)).toBeTruthy();
});

it("should not allow invalid inputs", () => {
  expect(() => validateOrThrow({})).toThrow();
  expect(() =>
    validateOrThrow({
      ...VALID_ACTION,
      trigger: undefined,
    })
  ).toThrow();

  expect(() =>
    validateOrThrow({
      ...VALID_ACTION,
      content: [
        {
          fallback: false,
          type: "channel",
          message: "lol".repeat(15_000),
        },
      ],
    })
  ).toThrow();
});
