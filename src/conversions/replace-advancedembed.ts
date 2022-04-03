import { APIEmbed } from "discord-api-types/v9";
import parseColour from "parse-color";
import parseArgs from "yargs-parser";
import { getColour } from "../helpers/get-color";
import { traverse } from "../helpers/traverse";
import { treeToText } from "../helpers/tree-to-text";
import { Node, NodeType, ScriptOptions } from "../types";

const ADVANCED_EMBED_TAG_NAMES = new Set(["a!advancedembed", "a!ae", "/advancedembed", "/ae"]);
const FIELD_REGEX = /field([0-9])value/i;
const ESCAPED_NEWLINE_REGEX = /\\n/g;

const cleanString = (input: string) => {
  if (typeof input !== "string") return;
  return input.replace(ESCAPED_NEWLINE_REGEX, "\n");
};

// mostly ported from v8 with some minor changes to produce
// a cleaner output
function parseParametersToEmbed(parameters: string[]) {
  // join() is necessary because some parameters can have multiple flags
  const parsedArgs = parseArgs(parameters.map((param) => param.trim()).join(" "), {
    configuration: {
      "parse-numbers": false,
    },
  });

  console.log({ parameters, parsedArgs });

  let color;
  if (parsedArgs.color || parsedArgs.colour) {
    const unparsedColor = parsedArgs.color || parsedArgs.colour;
    if (typeof unparsedColor === "string") {
      color = getColour(unparsedColor.trim().toLowerCase()) || parseColour(unparsedColor);
      if (!color.hex) {
        color = null;
      }
    }
  }

  const authorName = cleanString(parsedArgs.icon && !parsedArgs.name ? parsedArgs.title : parsedArgs.name);
  const footerText = cleanString(parsedArgs.footer);
  const embed: APIEmbed = {
    color: color ? parseInt(color.hex.replace(/#/g, ""), 16) : undefined,
    title: !(parsedArgs.icon && !parsedArgs.name) ? cleanString(parsedArgs.title) : undefined,
    author: authorName ? { name: authorName, icon_url: parsedArgs.icon } : undefined,
    description: cleanString(parsedArgs.description),
    image: parsedArgs.image ? { url: parsedArgs.image } : undefined,
    thumbnail: parsedArgs.thumbnail ? { url: parsedArgs.thumbnail } : undefined,
    footer: footerText ? { icon_url: parsedArgs["footer-icon"], text: footerText } : undefined,
    timestamp: parsedArgs.timestamp && new Date(),
    url: parsedArgs.url,
  };

  for (const name of Object.keys(parsedArgs)) {
    const match = FIELD_REGEX.exec(name);
    if (match) {
      const fieldIndex = Number(match[1]);
      const fieldName = cleanString(parsedArgs[`field${fieldIndex}name`]);
      const fieldValue = cleanString(parsedArgs[`field${fieldIndex}value`]);
      if (fieldName && fieldValue) {
        if (!embed.fields) embed.fields = [];
        embed.fields[fieldIndex - 1] = {
          name: fieldName,
          inline: !!parsedArgs[`field${fieldIndex}inline`],
          value: fieldValue,
        };
      }
    }
  }

  if (embed.fields) {
    // because we assign array indexes to fields, we have to remove any undefined indexes
    embed.fields = embed.fields.filter((field) => !!field);
  }

  return embed;
}

export function replaceAdvancedEmbed(tree: Node, options: ScriptOptions): void {
  traverse(tree, (node) => {
    if (node.type === NodeType.CALL && ADVANCED_EMBED_TAG_NAMES.has(node.text.toLowerCase())) {
      const parameters = node.children.map((node) => treeToText(node));
      const embed = parseParametersToEmbed(parameters);
      const hasIndentation = parameters.some((param) => param.trim() !== param);
      const json = hasIndentation ? JSON.stringify(embed, null, 2) : JSON.stringify(embed);

      return {
        type: NodeType.TEXT,
        text: `{responder.embed;{${json}}}`,
        children: [],
      };
    }
  });
}
