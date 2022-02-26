import dedent from "dedent";
import { convert } from "./convert";

const input = dedent`
    {note;poggers}
    {user.mention;{note;test}}
`;

const result = convert(input);
console.log({ input, result });
