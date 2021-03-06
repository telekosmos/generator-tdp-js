# generator-tdp-js changelog

## v1.6.3
* Fix: const instead of let in test files
* Fix: test arg data type checks - use proper ava syntax

## v1.6.2
* Fix: Change test template to use path to lib file in `src/` (rather than `dest/`) so that we don't try to test transpiled functions and error outputs make sense

## v1.6.1
* Fix: Change tests generator path to `dist/` (from `src/`) to allow Babel to transpile the lib and thus allow e.g. `import`

## v1.6.0
* Add ava babel config to package.json to allow ava to test files which use e.g. ES6 imports

## v1.5.6
* Move `app/source-countrol/.gitignore` to `app/source-countrol/gitignore` as it doens't get depoyed curently (has probably always failed :-()

## v1.5.5
* Add NPM config to package.json for "force" (to be used in `npm version`)

## v1.5.4
* Fix broken lib example functions (WRT tests)

## v1.5.3
* Docs additions

## v1.5.2
* Add remaining options to docs

## v1.5.1
* Remove unnecessary test template
* Correct typos
* Add more info on what this generator does to the readme.md

## v1.5.0
* Add :tests generator to create AVA test files for all exported functions in a lib/module
* Remove test generator from default generator
* Fix bug in appname wherein hyphens are replaced with spaces

## v1.4.1
* Fix NPM deps install order

## v1.4.0
* Add "react" option (boolean) and adjust NPM deps accordingly
* Correct a couple of single quotes to be double quotes to fit my eslint rules

## v1.3.0
* Add npm publish to npm postversion
* Add snyk to npm version
* Simplify git push in npm postversion

## v1.2.0
* Add npm version (inc pre/post)

## v1.1.1
* Add license file

## v1.1.0
* Add `.eslintignore`
* Add readme content
* Add changelog

## v1.0.0
* Initial version
