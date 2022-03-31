import { convert } from "../convert";

it("should replace {channel.createdAt}", () => {
  expect(convert("{channel.createdAt}").output).toBe("{time format=relative_time;{channel.createdAt}}");
  expect(convert("{channel.createdAt;true;message}").output).toBe(
    "{time format=relative_time;{channel.createdAt;message}}"
  );
});

it("should replace {role.createdAt}", () => {
  expect(convert("{role.createdAt}").output).toBe("{time format=relative_time;{role.createdAt}}");
  expect(convert("{role.createdAt;true;message}").output).toBe("{time format=relative_time;{role.createdAt;message}}");
});
