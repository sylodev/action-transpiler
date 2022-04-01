import { traverse } from "../helpers/traverse";
import { Node, NodeType } from "../types";

export function replacePrettyMs(tree: Node) {
  traverse(tree, (node) => {
    if (node.type !== NodeType.CALL || node.text.toLowerCase() !== "utils.prettyms") return;
    const replacement: Node = {
      type: NodeType.CALL,
      text: `time format=relative_time`,
      children: node.children.slice(0, 1),
    };

    return replacement;
  });
}
