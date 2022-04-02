import { convertPermissions } from "./convert-permissions";

it("should convert permissions", () => {
  expect(convertPermissions(["administrator"])).toBe(8n);
  expect(convertPermissions(["administrator", "sendMessages"])).toBe(2056n);
  expect(convertPermissions(["banMembers", "kickMembers"])).toBe(6n);
});
