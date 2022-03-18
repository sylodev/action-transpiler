import dedent from "dedent";
import { writeFileSync } from "fs";
import { convert } from "./convert";

const input = dedent`
    {a!ae;
        --field1name="field 1 name";
        --field1value="field 1 value";
        --field1inline;
        --field2name="field 2 name";
        --field2value="field 2 value";
        --field2inline;
        --title="title";
        --color="#0063ff";
        --name="author name";
        --footer="footer text";
        --timestamp="true";
        --description="description"
    }`;
const result = convert(input);
console.log({ input, result });
writeFileSync("output.txt", result.output);
