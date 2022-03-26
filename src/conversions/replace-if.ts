import { Node } from "../types";
import { traverse } from "../helpers/traverse";

export function replaceIf(tree: Node) {
  traverse(tree, (node) => {
    if (node.text.toLowerCase() === "if") node.text = "#if";
  });
}
