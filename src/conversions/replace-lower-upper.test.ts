import { convert } from "../convert";

it("should replace {lower}", () => {
  expect(convert("{lower;TEST}").output).toBe('{casing mode="lower";TEST}');
  expect(convert("{lower}").output).toBe('{casing mode="lower"}');
});

it("should replace {upper}", () => {
  expect(convert("{upper;TEST}").output).toBe('{casing mode="upper";TEST}');
  expect(convert("{upper}").output).toBe('{casing mode="upper"}');
});

it("should replace {utils.capitalize}", () => {
  expect(convert("{utils.capitalize;TEST}").output).toBe('{casing mode="title";TEST}');
  expect(convert("{utils.capitalize}").output).toBe('{casing mode="title"}');
});
