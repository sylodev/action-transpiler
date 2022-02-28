import { replaceArgs } from "./conversions/replace-args";
import { replaceBrackets } from "./conversions/replace-brackets";
import { replaceDelete } from "./conversions/replace-delete";
import { replaceNotesWithComments } from "./conversions/replace-notes-with-comments";
import { replaceVariables } from "./conversions/replace-variables";
import { treeToText } from "./helpers/tree-to-text";
import { Lexer } from "./lexer";
import { Converter, ScriptOptions } from "./types";

const converters: Converter[] = [
  replaceNotesWithComments,
  replaceArgs,
  replaceBrackets,
  replaceVariables,
  replaceDelete,
];

export function convert(script: string): string {
  const options: ScriptOptions = { appendAfter: [], appendBefore: [], source: script, warnings: [] };
  const lexer = new Lexer(script);
  const tree = lexer.parse();
  for (const converter of converters) {
    console.log(converter);
    converter(tree, options);
  }

  let text = treeToText(tree);
  if (options.warnings[0]) {
    text = `${options.warnings.map((warning) => `// ${warning}`).join("\n")}\n${text}`;
  }

  if (options.appendAfter) {
    text = options.appendBefore.join("\n") + "\n" + text;
  }

  if (options.appendAfter[0]) {
    text = text + "\n" + options.appendAfter.join("\n");
  }

  return text.trim();
}
