import dedent from "dedent";
import { writeFileSync } from "fs";
import { convert } from "./convert";

const input = dedent`{a!ae;--description="{perget;name}"}`;
const result = convert(input);
console.log({ input, result });
writeFileSync("output.txt", result.output);
