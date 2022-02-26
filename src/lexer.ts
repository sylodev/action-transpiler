import { Chars, Node, NodeType } from "./types";

/**
 * Converts a string to an AST/"tree"
 */
export class Lexer {
  private position: number;
  private script: string;
  private current: Node;
  constructor(script: string) {
    this.position = 0;
    this.script = script;
    this.current = this.createNode(NodeType.TEXT);
  }

  /**
   * Parse the script into a tree used with the interpreter.
   */
  parse(): Node {
    const length = this.script.length;
    while (this.position < length) {
      const char = this.script[this.position];

      switch (char) {
        case Chars.TAG_OPEN:
          this.down(NodeType.CALL);
          break;
        case Chars.TAG_SEP: {
          const argumentParent = this.findParent(NodeType.CALL);
          if (!argumentParent) this.bail(char);
          else {
            this.current = argumentParent;
            this.down(NodeType.TEXT);
          }

          break;
        }
        case Chars.TAG_CLOSE: {
          const closeParent = this.findParent(NodeType.CALL);
          if (!closeParent) this.bail(char);
          else this.current = closeParent.parent!;
          break;
        }
        default:
          this.bail(char);
      }

      this.position += 1;
    }

    while (this.current.parent) this.current = this.current.parent;
    return this.current;
  }

  /**
   * Go down in the tree.
   * @param {NodeType} type The type of node to create when moving down.
   * @private
   */
  private down(type: NodeType): void {
    const node = this.createNode(type);
    node.parent = this.current;
    this.current.children.push(node);
    this.current = node;
  }

  /**
   * Go up in the tree.
   * @private
   */
  private up(): void {
    if (!this.current.parent) throw new TypeError("Cannot move to non-existent parent node");
    this.current = this.current.parent;
  }

  /**
   * Find a parent node with the given type. Returns undefined if none exist.
   * @param {NodeType} type The type of node to look for
   * @private
   */
  private findParent(type: NodeType): Node | undefined {
    let current = this.current;
    while (current.type !== type && current.parent) {
      current = current.parent;
    }

    if (current.type !== type) return;
    return current;
  }

  /**
   * Create a new node.
   * @param {*} type The type of the node
   * @private
   */
  private createNode(type: NodeType): Node {
    return {
      type: type,
      text: "",
      children: [],
    };
  }

  private bail(char: string): void {
    // "one {two} three" would output as "one two {three}" otherwise.
    if (this.current.type === NodeType.TEXT && this.current.children[0]) this.down(NodeType.TEXT);
    this.current.text += char;
  }
}
