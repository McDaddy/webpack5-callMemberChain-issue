const ts = require("typescript");
const { resolve } = require("path");

const defaultOptions = {
  localePath: resolve("app/locales"),
  ns: ["default", "common"],
};

const { factory } = ts;

function createTransformer(_options = {}) {
  const mergeDefault = (options) => ({ ...defaultOptions, ...options });
  const optionsArray = Array.isArray(_options)
    ? _options.map((options) => mergeDefault(options))
    : [mergeDefault(_options)];

  return (context) => {
    const visitor = (node) => {
      if (ts.isSourceFile(node)) {
        return ts.visitEachChild(node, visitor, context);
      }

      if (
        ts.SyntaxKind.ExpressionStatement === node.kind &&
        ts.SyntaxKind.CallExpression === node.expression.kind
      ) {
        // 首先这是一个CallExpression
        const callExpression = node.expression;
        const { expression } = callExpression;
        if (expression.kind === ts.SyntaxKind.PropertyAccessExpression) {
          // callee是一个PropertyAccessExpression， 即i18n.s
          const { name, expression: identifierExpression } = expression;
          if (
            name.escapedText === "s" &&
            identifierExpression.escapedText === "i18n"
          ) {
            const { arguments: args } = callExpression;
            const params = args.map((arg) => arg.text);
            console.log(params);
            const newNode = factory.createCallExpression(
              factory.createPropertyAccessExpression(
                factory.createIdentifier("i18n"),
                factory.createIdentifier("t")
              ),
              undefined,
              [
                factory.createStringLiteral("asdasdad"),
                factory.createStringLiteral("ns"),
              ]
            );
            return newNode;
          }
        }
      }
      // 不匹配就返回原来的node
      return node;
    };

    return (node) => ts.visitNode(node, visitor);
  };
}

module.exports = createTransformer;
