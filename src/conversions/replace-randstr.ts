import { traverse } from "../helpers/traverse";
import { treeToText } from "../helpers/tree-to-text";
import { Node, NodeType } from "../types";

export function replaceRandstr(tree: Node) {
  traverse(tree, (node) => {
    if (node.type !== NodeType.CALL || node.text.toLowerCase() !== "randstr") return;
    const [alphabet, length] = node.children.slice(0, 2).map((child) => treeToText(child));
    const replacement: Node = {
      type: NodeType.CALL,
      text: "randomString",
      children: length
        ? [
            {
              type: NodeType.TEXT,
              text: length,
              children: [],
            },
          ]
        : [],
    };

    if (alphabet) {
      replacement.text = `randomString alphabet="${alphabet}"`;
    }

    return replacement;
  });
}
