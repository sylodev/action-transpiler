import { findParent } from "../helpers/find-parent";
import { traverse } from "../helpers/traverse";
import { treeToText } from "../helpers/tree-to-text";
import { Node, NodeType } from "../types";

export function replaceNotesWithComments(tree: Node): void {
  traverse(tree, (node, over) => {
    if (node.type === NodeType.CALL && node.text === "note") {
      if (findParent(node, NodeType.CALL)) {
        // for {tag;{note;test}} converting it to a comment would break the script
        // so we swap it out for {void} which has the same functionality as {note} used to
        node.text = "void";
        return;
      }

      const needsNewLine = !over?.text.startsWith("\n");
      const replacement: Node = {
        type: NodeType.TEXT,
        text: `// ${node.children.map((child) => treeToText(child)).join(" ")}${needsNewLine ? "\n" : ""}`,
        children: [],
      };

      return replacement;
    }
  });
}
