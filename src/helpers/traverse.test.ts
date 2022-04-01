import { trace } from "console";
import { Node, NodeType } from "../types";
import { traverse } from "./traverse";

it("should replace top-level nodes", () => {
  const tree: Node = { type: NodeType.CALL, text: "test", children: [] };
  traverse(tree, (node) => {
    node.text = "replaced";
  });

  expect(tree.text).toBe("replaced");
});
