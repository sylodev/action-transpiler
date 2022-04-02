import { traverse } from "../helpers/traverse";
import { Node, NodeType } from "../types";

const REPLACEMENTS = new Map([
  ["perset", "store.set"],
  ["perget", "store.get"],
  ["delete", "message.delete"],
  ["utils.isurl", "isUrl"],
  ["message.react", "message.addReaction"],
  ["range", "randomInt"],
  ["utils.timestamp", "time"],
  ["utils.isSnowflake", "isSnowflake"],
  ["utils.includes", "includes"],
]);

export function replaceGeneric(tree: Node) {
  traverse(tree, (node) => {
    if (node.type !== NodeType.CALL) return;
    const replacement = REPLACEMENTS.get(node.text.toLowerCase());
    if (replacement) {
      node.text = replacement;
      return node;
    }
  });
}
