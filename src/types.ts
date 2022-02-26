export type Converter = (tree: Node) => void;

export interface Node {
  type: NodeType;
  text: string;
  parent?: Node;
  isRoot?: boolean;
  children: Node[];
}

export enum NodeType {
  TEXT = "TEXT",
  CALL = "CALL",
}

export enum Chars {
  TAG_OPEN = "{",
  TAG_SEP = ";",
  TAG_CLOSE = "}",
}
