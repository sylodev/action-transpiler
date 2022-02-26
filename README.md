# @sylo-digital/action-transpiler

Convert scripts from legacy formats into the new format. This can never be perfect but it should be good enough for >99% of actions.

```ts
import { convert } from "@sylo-digital/action-transpiler";
const script = `{note;This does something interesting}\n{user.mention;{note;example}}`;
const converted = convert(script);
console.log(converted);
```

```
// This does something interesting
{user.mention;{void;example}}
```
