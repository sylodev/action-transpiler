import { convert } from "../convert";
it("should replace utils.isUrl", () => {
  const output = convert("{utils.isUrl}").output;
  expect(output).toBe("{isUrl}");
});
