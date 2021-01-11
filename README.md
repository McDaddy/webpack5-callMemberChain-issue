This repo attempts to demonstrates a bug with webpack 5 callMemberChain

# Install
```
npm i
```

# Run

```
npm run build
```

In my custom plugin, I'm expecting `parser.hooks.callMemberChain` can trigger callback no matter it's predefined object function or user defined function. But actually it only triggers when callExpression callee is a Identifier like `console`. So I'm suspecting it should be a bug
