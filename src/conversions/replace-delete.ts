import { traverse } from "../helpers/traverse";
import { Node, NodeType } from "../types";

export const replaceDelete = (tree: Node) => {
  traverse(tree, (node) => {
    if (node.type === NodeType.CALL && node.text === "delete") {
      node.text = "message.delete";
    }
  });
};
