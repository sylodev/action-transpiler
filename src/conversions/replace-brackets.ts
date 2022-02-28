import { traverse } from "../helpers/traverse";
import { Node, NodeType } from "../types";

export function replaceBrackets(tree: Node): void {
  traverse(tree, (node) => {
    if (node.type === NodeType.CALL && (node.text === "r" || node.text === "l" || node.text === "semi")) {
      const bracket = node.text === "r" ? "}" : node.text === "l" ? "{" : ";";
      return {
        type: NodeType.TEXT,
        text: `\\${bracket}`,
        children: [],
      };
    }
  });
}
