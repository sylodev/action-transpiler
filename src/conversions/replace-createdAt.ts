import { traverse } from "../helpers/traverse";
import { Node, NodeType } from "../types";

const REPLACE = new Set(["channel.createdat", "role.createdat", "user.createdat"]);

export function replaceCreatedAt(tree: Node) {
  traverse(tree, (node) => {
    if (node.type !== NodeType.CALL) return;
    if (REPLACE.has(node.text.toLowerCase())) {
      return {
        type: NodeType.CALL,
        text: "time format=relative_time",
        children: [
          {
            type: NodeType.CALL,
            text: node.text,
            children: node.children[1] ? [node.children[1]] : [],
          },
        ],
      };
    }
  });
}
