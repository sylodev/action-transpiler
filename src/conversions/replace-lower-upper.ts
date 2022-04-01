import { traverse } from "../helpers/traverse";
import { Node, NodeType } from "../types";

const REPLACE_MODES = new Map([
  ["lower", "lower"],
  ["upper", "upper"],
]);

export function replaceLowerUpper(tree: Node) {
  traverse(tree, (node) => {
    if (node.type !== NodeType.CALL) return;
    const mode = REPLACE_MODES.get(node.text.toLowerCase());
    if (!mode) return;
    return {
      type: NodeType.CALL,
      text: `casing mode=${mode}`,
      children: node.children,
    };
  });
}
