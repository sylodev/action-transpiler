import { traverse } from "../helpers/traverse";
import { treeToText } from "../helpers/tree-to-text";
import { Node, NodeType } from "../types";

// dots have special meaning in vx, so we replace them with _
// to ensure backwards-compatibility.
const stripDots = (tree: Node) => {
  traverse(tree, (node) => {
    if (node.type === NodeType.TEXT && node.text.includes(".")) {
      node.text = node.text.replace(/\.+/g, "_");
    }
  });
};

// convert {set;key;value} to {=key;value}
// convert {get;key} to {$key}
export function replaceVariables(tree: Node): void {
  traverse(tree, (node) => {
    if (node.type === NodeType.CALL && (node.text === "get" || node.text === "set")) {
      const prefix = node.text === "get" ? "$" : "=";
      const key = node.children[0];
      const value = node.children[1];
      stripDots(key);
      if (prefix === "=" && value) {
        return {
          type: NodeType.TEXT,
          text: `{=${treeToText(key)};${treeToText(value)}}`,
          children: [],
        };
      }

      return {
        type: NodeType.TEXT,
        text: `{${prefix}${treeToText(key)}}`,
        children: [],
      };
    }
  });
}
