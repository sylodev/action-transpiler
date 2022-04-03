import { convert } from "../convert";

it("should rename {user.send} and inject the polyfill", () => {
  expect(convert("{user.send}")).toMatchSnapshot();
  expect(convert("{user.send;message}")).toMatchSnapshot();
  expect(convert("{user.send;message;user}")).toMatchSnapshot();
});

it("should rename {channel.send} and inject the polyfill", () => {
  expect(convert("{channel.send}")).toMatchSnapshot();
  expect(convert("{channel.send;message}")).toMatchSnapshot();
  expect(convert("{channel.send;message;channel}")).toMatchSnapshot();
});
