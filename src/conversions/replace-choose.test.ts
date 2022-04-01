import { convert } from "../convert";

it("should replace {choose}", () => {
  expect(convert("{choose;a;b;c}").output).toBe("{random;{[a;b;c]}}");
  expect(convert("{choose;a}").output).toBe("{random;{[a]}}");
  expect(convert("{choose;{test}}").output).toBe("{random;{[{test}]}}");
  expect(convert("{choose}").output).toBe("{random;{[]}}");
});
