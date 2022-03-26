import dedent from "dedent";
import { traverse } from "../helpers/traverse";
import { Node, NodeType, ScriptOptions } from "../types";

/**
 * Polyfills the {args} function as {legacy_args}.
 * Takes the same arguments and can be called without arguments to get all args.
 * Depends on the "input" option to be set.
 */
const functionPolyfill = dedent`
    // This function has been injected for backwards compatibility.
    // You should update your action to use the new {option} tag when possible.
    [#function;legacy_args;{=position};{=end}]
      // {args} used one-based indexing, so we subtract one to get zero-based indexing.
      {#if;{$position};{=position;{math;{$position} - 1}}}
      {#if;{$end};{=end;{math;{$end} - 1}}}
      // "input" is added during import.
      {=args;{split;{option;input};/ +/g}}
      {#if;{and;{$position};{$end}};{#return;{join;{slice;{$args};{$position};{$end}}; }}}
      {#if;{$position};{#return;{$args.{$position}}}}
      {#return;{join;{$args}; }}
  [/function]\n
`;

const variablePolyfill = dedent`
    // This variable has been injected for backwards compatibility, replacing parameterless calls to {args}.
    // You should update your action to use the new {option} tag when possible.
    {=legacy_args;{option;input}}\n
`;

export function replaceArgs(tree: Node, options: ScriptOptions): void {
  traverse(tree, (node) => {
    if (node.type === NodeType.CALL && node.text === "args") {
      if (!node.children[0]) {
        if (!options.appendBefore.includes(variablePolyfill)) {
          options.injectInputOption = true;
          options.appendBefore.push(variablePolyfill);
        }

        // for single {args} calls, we can do a tiny optimisation and skip the
        // splitting and joining of the args by just replacing it with {option;input}.
        // this does introduce minor backwards compatibility issues
        // ("something   with spaces" used to have groups of spaces replaced with a single space)
        return {
          type: NodeType.TEXT,
          text: `{$legacy_args}`,
          children: [],
        };
      } else {
        node.text = "legacy_args";
        if (!options.appendBefore.includes(functionPolyfill)) {
          options.injectInputOption = true;
          options.appendBefore.push(functionPolyfill);
        }
      }
    }
  });
}
