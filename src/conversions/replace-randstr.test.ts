import { convert } from "../convert";

it("should replace {randstr}", () => {
  expect(convert("{randstr}").output).toBe("{randomString}");
  expect(convert("{randstr;abc}").output).toBe('{randomString alphabet="abc"}');
  expect(convert("{randstr;abc;7}").output).toBe('{randomString alphabet="abc";7}');
  expect(convert("{randstr;{test};7}").output).toBe('{randomString alphabet="{test}";7}');
});
