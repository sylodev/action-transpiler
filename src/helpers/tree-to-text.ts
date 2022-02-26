import { Node, NodeType } from "../types";

export function treeToText(tree: Node): string {
  if (tree.type === NodeType.TEXT) {
    return `${tree.text}${tree.children.map((item) => treeToText(item)).join("")}`;
  }

  if (!tree.children[0]) return `{${tree.text}}`;
  return `{${tree.text};${tree.children.map((item) => treeToText(item)).join(";")}}`;
}

// export function treeToText(tree: Node): string {
//   let output = tree.text;
//   for (const child of tree.children) {
//     if (child.type === NodeType.CALL) {
//       output += `{${child.text}`;
//       if (child.children[0]) {
//         output += ";";
//         output += child.children.map((child) => treeToText(child)).join(";");
//       }

//       output += "}";
//       continue;
//     }

//     output += treeToText(child);
//     output += child.children.map((child) => treeToText(child));
//   }

//   return output;
// }
