import dedent from "dedent";
import { convert } from "../convert";

it("should convert nested tags", () => {
  // because the converter returns a string with the stringified tag, nested tags
  // are missed unless the ae conversion is run last once they've already been replaced.
  const result = convert(`{a!ae;--description="{perget;name}"}`).output;
  expect(result).toBe('{responder.embed;{{"description":"{store.get;name}"}}}');
});

it("should convert nested tags", () => {
  const script = dedent`
    {channel.send;
      {a!ae;
      --edit="725492484326686750";
      --color="#a3d5ae";
      --field1name="Pick One";
      --field1value=":spider: - {role.mention;702325354748182548}\n:scorpion: - {role.mention;702325340105736303}";
      --field1inline;
      --title="Location Roles";
      --description="React on the message to chose your Hemisphere:"};723698264511086624}
  `;

  expect(convert(script).output).toMatchSnapshot();
});

it("should convert embeds with no description", () => {
  const script = dedent`
      {a!ae;
        --color="#a3d5ae";
        --title="{$legacy_args}";
        --footer="{user.tag}";
        --footer-icon="{user.avatarURL}";
        --timestamp
      }
  `;

  expect(convert(script).output).toMatchSnapshot();
});
