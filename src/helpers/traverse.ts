import { Node } from "../types";

/**
 * Traverse a tree.
 * @param handler The handler to call for each node. If it returns a node, that node will be replaced with the return value.
 */
export const traverse = (tree: Node, handler: (node: Node, over?: Node) => Node | undefined | void): void => {
  const check = (node: Node, over?: Node) => {
    // doing children first is important because some tags will return
    // a raw node containing treeToString() of their children, which would mean
    // the children are stringified without the potential updates required for them.
    for (let childIndex = 0; childIndex < node.children.length; childIndex++) {
      const child = node.children[childIndex];
      const childReplacement = check(child, node.children[childIndex + 1]);
      if (childReplacement) {
        node.children[childIndex] = childReplacement;
      }
    }

    return handler(node, over);
  };

  const updated = check(tree);
  if (updated) {
    for (const key of Object.keys(updated)) {
      (tree as any)[key] = (updated as any)[key];
    }
  }
};
