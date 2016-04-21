# apidoc-plugin-test

__Only a test and example plugin. It demonstrates the usage of the apidoc hook system.__

apidoc search in global node modules dir and local `node_modules` for modules that start with `apidoc-plugin-`. (local installed plugins have higher priority)

With a plugin you can add features like new parsers or filters and workers.

A plugin can use apidoc-core [hooks](https://github.com/apidoc/apidoc-core/hooks.md).
Hooks can be used to extend or transform data.

If you need a hook in apidoc-core please add your hook and provide a [pull request](https://github.com/apidoc/apidoc-core/).
How to add a hook into apidoc-core view [source code](https://github.com/apidoc/apidoc-core/blob/20921efd32f95e7934333d633c56ff6f60722123/lib/parser.js#L454-L458).
