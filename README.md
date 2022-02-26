# @sylo-digital/action-transpiler

Convert actions from legacy formats into the new format. Attempts to rewrite scripts and entire actions to be usable with the upgraded tags.

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
