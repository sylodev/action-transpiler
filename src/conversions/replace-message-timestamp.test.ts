import { convert } from "../convert";

it("should replace {message.timestamp}", () => {
  expect(convert("{message.timestamp}").output).toBe("{time format=relative_time;{message.createdAt}}");
  expect(convert("{message.timestamp;message}").output).toBe("{time format=relative_time;{message.createdAt;message}}");
});
