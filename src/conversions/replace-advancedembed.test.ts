import { convert } from "../convert";

it("should convert nested tags", () => {
  // because the converter returns a string with the stringified tag, nested tags
  // are missed unless the ae conversion is run last once they've already been replaced.
  const result = convert(`{a!ae;--description="{perget;name}"}`).output;
  expect(result).toBe('{responder.embed;{{"description":"{store.get;name}"}}}');
});
