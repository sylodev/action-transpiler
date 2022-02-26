import { Node } from "../types";

/**
 * Traverse a tree.
 * @param handler The handler to call for each node. If it returns a node, that node will be replaced with the return value.
 */
export const traverse = (
  tree: Node,
  handler: (node: Node, over?: Node) => Node | undefined,
  over?: Node
): Node | undefined => {
  const result = handler(tree, over);
  if (result) return result;

  for (let childIndex = 0; childIndex < tree.children.length; childIndex++) {
    const child = tree.children[childIndex];
    const over = tree.children[childIndex + 1];
    const result = traverse(child, handler, over);
    if (result) {
      tree.children[tree.children.indexOf(child)] = result;
    }

    for (let grandChildIndex = 0; grandChildIndex < tree.children.length; grandChildIndex++) {
      const over = tree.children[grandChildIndex + 1];
      const grandChild = tree.children[grandChildIndex];
      const result = traverse(grandChild, handler, over);
      if (result) {
        child.children[child.children.indexOf(grandChild)] = result;
      }
    }
  }
};
