import { replaceNotesWithComments } from "./conversions/replace-notes-with-comments";
import { treeToText } from "./helpers/tree-to-text";
import { Lexer } from "./lexer";
import { Converter } from "./types";

const converters: Converter[] = [replaceNotesWithComments];

export function convert(script: string): string {
  const lexer = new Lexer(script);
  const tree = lexer.parse();
  for (const converter of converters) {
    converter(tree);
  }

  return treeToText(tree);
}
