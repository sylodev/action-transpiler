import { traverse } from "../helpers/traverse";
import { Node, NodeType } from "../types";

const REPLACEMENTS = new Map([
  ["if", "#if"],
  ["perset", "store.set"],
  ["perget", "store.get"],
  ["delete", "message.delete"],
  ["utils.isurl", "isUrl"],
]);

export function replaceGeneric(tree: Node) {
  traverse(tree, (node) => {
    if (node.type !== NodeType.CALL) return;
    const replacement = REPLACEMENTS.get(node.text.toLowerCase());
    if (replacement) node.text = replacement;
  });
}
