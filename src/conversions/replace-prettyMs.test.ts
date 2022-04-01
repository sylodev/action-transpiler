import { convert } from "../convert";

it("should replace {utils.prettyMs}", () => {
  expect(convert("{utils.prettyMs;2 hours}").output).toBe("{time format=relative_time;2 hours}");
  expect(convert("{utils.prettyMs}").output).toBe("{time format=relative_time}");
});
