import { traverse } from "../helpers/traverse";
import { Node, NodeType } from "../types";

export function replaceMessageTimestamp(tree: Node) {
  traverse(tree, (node) => {
    if (node.type !== NodeType.CALL) return;
    if (node.text.toLowerCase() === "message.timestamp") {
      node.text = "message.createdAt";
      return {
        type: NodeType.CALL,
        text: "time format=relative_time",
        children: [node],
      };
    }
  });
}
