import { traverse } from "../helpers/traverse";
import { treeToText } from "../helpers/tree-to-text";
import { Node, NodeType } from "../types";

export function replaceChoose(tree: Node) {
  traverse(tree, (node) => {
    if (node.type !== NodeType.CALL || node.text.toLowerCase() !== "choose") return;
    return {
      type: NodeType.CALL,
      text: "random",
      children: [
        {
          type: NodeType.TEXT,
          text: `{[${node.children.map((child) => treeToText(child)).join(";")}]}`,
          children: [],
        },
      ],
    };
  });
}
