import { traverse } from "../helpers/traverse";
import { Node } from "../types";

export function replacePerset(tree: Node) {
  traverse(tree, (node) => {
    if (node.text.toLowerCase() === "perset") node.text = "store.set";
    if (node.text.toLowerCase() === "perget") node.text = "store.get";
  });
}
