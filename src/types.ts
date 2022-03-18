export type Converter = (tree: Node, script: ScriptOptions) => void;

export interface ScriptOptions {
  appendBefore: string[];
  appendAfter: string[];
  warnings: string[];
  errors: string[];
  source: string;
}

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
