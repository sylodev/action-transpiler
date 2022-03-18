import { traverse } from "../helpers/traverse";
import { Node, NodeType, ScriptOptions } from "../types";

export function replaceCommandTags(node: Node, options: ScriptOptions) {
  traverse(node, (node) => {
    if (node.type === NodeType.CALL && node.text.toLowerCase().startsWith("a!")) {
      node.text = `/${node.text.slice(2)}`;
    }
  });
}
