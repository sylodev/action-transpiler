import { Node, NodeType } from "../types";

export const findParent = (current: Node, type: NodeType): Node | undefined => {
  if (!current.parent) return;
  if (current.parent.type === type) return current.parent;
  return findParent(current.parent, type);
};
