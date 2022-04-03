import dedent from "dedent";
import { traverse } from "../helpers/traverse";
import { Node, NodeType, ScriptOptions } from "../types";

const userSendPolyfill = dedent`
    // This function has been injected to replace functionality of a legacy {user.send} tag.
    [#function;legacy_user_send;{=message};{=user}]
        {responder.text;{$message}} // Add the text to the responder
        {=userId;{or;{$user};{user.id}}} // Get the user we're sending to
        {responder.dm;{$userId}} // Configure the responder to direct-message the user
        {responder.send} // Send the message
    [/function]
`;

const channelSendPolyfill = dedent`
    // This function has been injected to replace functionality of a legacy {channel.send} tag.
    [#function;legacy_channel_send;{=message};{=channel}]
        {responder.text;{$message}} // Add the text to the responder
        {=channelId;{or;{$channel};{channel.id}}} // Get the channel we're sending to
        {responder.channel;{$channelId}} // Configure the responder to send the message to the channel
        {responder.send} // Send the message
    [/function]
`;

const replacements = new Map([
  [
    "user.send",
    {
      name: "legacy_user_send",
      polyfill: userSendPolyfill,
    },
  ],
  [
    "channel.send",
    {
      name: "legacy_channel_send",
      polyfill: channelSendPolyfill,
    },
  ],
]);

export function replaceUserChannelSend(tree: Node, options: ScriptOptions) {
  traverse(tree, (node) => {
    if (node.type !== NodeType.CALL) return;
    const replacement = replacements.get(node.text.toLowerCase());
    if (replacement) {
      node.text = replacement.name;
      if (!options.appendBefore.includes(replacement.polyfill)) {
        options.appendBefore.push(replacement.polyfill);
      }
    }
  });
}
