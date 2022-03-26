import dedent from "dedent";
import { convert } from "../convert";

it("should replace top-level notes", () => {
  const script = dedent`
      {note;poggers}
      {user.mention}
    `;

  const result = convert(script).output;
  const expected = dedent`
      // poggers
      {user.mention}
    `;

  expect(result).toBe(expected);
});

it("should add new lines if necessary", () => {
  expect(convert(`{note;poggers}{user.mention}`).output).toBe(`// poggers\n{user.mention}`);
  expect(convert(`{note;poggers}\n{user.mention}`).output).toBe(`// poggers\n{user.mention}`);
});

it("should replace nested notes with {void}", () => {
  const script = `{user.mention;{note;test}}`;
  const result = convert(script).output;
  expect(result).toBe(`{user.mention;{void;test}}`);
});
