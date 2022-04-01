import { replaceAdvancedEmbed } from "./conversions/replace-advancedembed";
import { replaceArgs } from "./conversions/replace-args";
import { replaceBrackets } from "./conversions/replace-brackets";
import { replaceChoose } from "./conversions/replace-choose";
import { replaceCommandTags } from "./conversions/replace-command-tags";
import { replaceCreatedAt } from "./conversions/replace-createdAt";
import { replaceGeneric } from "./conversions/replace-generic";
import { replaceLowerUpper } from "./conversions/replace-lower-upper";
import { replaceMessageTimestamp } from "./conversions/replace-message-timestamp";
import { replaceNotesWithComments } from "./conversions/replace-notes-with-comments";
import { replaceRandstr } from "./conversions/replace-randstr";
import { replaceVariables } from "./conversions/replace-variables";
import { treeToText } from "./helpers/tree-to-text";
import { Lexer } from "./lexer";
import { Converter, ScriptOptions } from "./types";

const converters: Converter[] = [
  replaceGeneric,
  replaceArgs,
  replaceNotesWithComments,
  replaceBrackets,
  replaceVariables,
  replaceCommandTags,
  replaceMessageTimestamp,
  replaceCreatedAt,
  replaceChoose,
  replaceLowerUpper,
  replaceRandstr,
  replaceAdvancedEmbed, // must be last
];

export function convert(script: string) {
  const options: ScriptOptions = {
    appendAfter: [],
    appendBefore: [],
    source: script,
    warnings: [],
    errors: [],
    injectInputOption: false,
  };

  const lexer = new Lexer(script);
  const tree = lexer.parse();
  for (const converter of converters) {
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

  return {
    output: text.trim(),
    warnings: options.warnings,
    errors: options.errors,
    injectInputOption: options.injectInputOption,
  };
}
