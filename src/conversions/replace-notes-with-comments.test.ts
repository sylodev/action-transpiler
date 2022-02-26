import dedent from "dedent";
import { convert } from "../convert";

it("should replace top-level notes", () => {
  const script = dedent`
      {note;poggers}
      {user.mention}
    `;

  const result = convert(script);
  const expected = dedent`
      // poggers
      {user.mention}
    `;

  expect(result).toBe(expected);
});

it("should add new lines if necessary", () => {
  const script = `{note;poggers}{user.mention}`;
  const result = convert(script);
  expect(result).toBe(`// poggers\n{user.mention}`);
});

it("should replace nested notes with {void}", () => {
  const script = `{user.mention;{note;test}}`;
  const result = convert(script);
  expect(result).toBe(`{user.mention;{void;test}}`);
});
