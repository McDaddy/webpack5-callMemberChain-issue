
  const MY_TAG = Symbol("i18n-tag");
class MyPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap(
      "MyPlugin",
      (compilation, { _, normalModuleFactory }) => {
        normalModuleFactory.hooks.parser
          .for("javascript/auto")
          .tap("MyPlugin", (parser) => {
            parser.hooks.importSpecifier.tap("MyPlugin",
              (statement, source, exportName, identifierName) => {
                parser.tagVariable("i18n", MY_TAG, {});
                return true  // if not comment this line Error happens: Uncaught ReferenceError: i18n is not defined
              }
            );

            parser.hooks.callMemberChain
              .for(MY_TAG)
              .tap("MyPlugin", (expression, properties) => {
                console.log(expression); // works well if line 14 not be commented
              });
          });
      }
    );
  }
}

module.exports = MyPlugin;
