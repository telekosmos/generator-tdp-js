# generator-tdp-node

## Overview
A simple [Yeoman](http://yeoman.io/) generator which is probably pretty specific to me (or you might call it "optinionated"), though you're of course *very* welcome to [use it](http://yeoman.io/learning/index.html) if it works for you.


## Installation
See the [Yeoman getting started guide](http://yeoman.io/learning/index.html). The NPM package name of this generator is `generator-tdp-node`.


## Usage
Once installed, you can run:

```
yo tdp-js <options>
```

This generator will make some major assumptions (which work for me):

* You're in a directory which is named for the project you want to create
* Source control is `git` via [github](https://github.com)
* You're happy to transpile your JS
* You're going to run your JS in a modern environment (though you can change this easily afterwards)
* You want data type checking both at build/compile and at run-time
* You want to publish to NPM (and your account is named for your Github account)
* You want to use [Travis](https://travis-ci.org/) for your CI (and your account is named for your Github account)
* You're currently authenticated with the correct GitHub credentials
* You're using OSX or possibly a \*nix (but probably not Windows)


There are a few options you can opt in/out from when generating your :

* `--description "<String>"`: a description to use in the `package.json` file
* `--license "<String>"`: a license to use, 
* `--react <Boolean>`: whether you want to install [React](https://facebook.github.io/react/) and [React-DOM](https://www.npmjs.com/package/react-dom) (for e.g. server-side rendering) along with the [React ESLint plugin](https://www.npmjs.com/package/eslint-plugin-react)


Then it will configure/install the following, customised to use the containing directory name as the project name:

* `.babelrc` file containing relevant Babel configuration
* `.eslintrc` and `.eslintignore` files to configure ESLint
* `.gitignore` a [gitignore](https://help.github.com/articles/ignoring-files/) file to exclude files from source-control
* `.travis.yml` [Travis CI test configuration](https://docs.travis-ci.com/user/customizing-the-build)
* `changelog.md`: a simple changelog markdown file
* `config`: a directory containing a template config file
* `license.md` file, as per the above `yo` option (current options are limited to "AFL-*", "GPL-2.0", "GPL-3.0", "ISC", "MIT", "MPL-2.0")
* `package.json`: [NPM package.json](https://docs.npmjs.com/files/package.json) file with correct package name and scripts:
    * A postinstall script which is set up to copy the (source-controlled) template config file to a (source-control-ignored) working config file - this helps avoid adding real config files (which probably contain sensitive info) to source-control
    * `npm start`: start your new application
    * `npm run lint`: [lint](https://en.wikipedia.org/wiki/Lint_(software)) your code, currently via [ESLint](http://eslint.org/) and with my [config](https://github.com/neilstuartcraig/eslint-config-tdp)
    * `npm run vuln-scan`: scan your dependencies with [Snyk](https://snyk.io/) for known vulnerabilities
    * `npm run build`: buld your new application into `dist/`, via [Babel](https://babeljs.io/) to [es2015-node6](https://www.npmjs.com/package/babel-preset-es2015-node6) with [Flow](https://flowtype.org/) data type processing and checking via [babel-plugin-typecheck](https://github.com/codemix/babel-plugin-typecheck) (this willl enforce data type checking at run-time, unlike most data type libs for JS - I am a big fan of this)
    * `npm test`: run unit tests, via [AVA](https://github.com/avajs/ava). This also creates a [code coverage](https://en.wikipedia.org/wiki/Code_coverage) report using [nyc](https://github.com/istanbuljs/nyc) (see below)
        * `yo tdp-js:tests`: create unit test files for exported library functions (run `yo tdp-js:tests --help` to show options)
        * `npm run report`: show the created code coverage report
    * `npm version (major|minor|patch)`: a very simple "version bump" flow which runs `npm run vuln-scan` then uses [npm version](https://docs.npmjs.com/cli/version) to bump the `package.json` version number then `git add -A`, followed by `git commit` and `git push --follow-tags` then `npm publish`
* `readme.md` file for Github (primarily)
* `script` directory, containing the postinstall script 
* `src` directory which contains an `index.js` file and a `lib/<project name>-lib.js` library file which is `import`'d in the `index.js` file 

It currently does not create a Github project repo (but maybe will do in the future - #12).


## Project aims

* Make my (dev) life simpler, faster & more reproducible
* Automate all the things! (in a way which suits my dev flow/style)
* Use as few direct dependencies as possible
* Use as simple a build chain as possible (no Grunt, Gulp etc.)


## Prerequisites
* [NodeJS](https://nodejs.org/) and [NPM](https://www.npmjs.com/) (NPM is included in the installers from nodejs.org)


## Semver
This project aims to maintain the [semver](http://semver.org/) version numbering scheme.


## Changelog
See the [changelog](./changelog.md) file.


## To do
See [issues](./issues).


## Contributing
Contributions are *very* welcome for fixes, improvements, new features, documentation, bug reports and/or ideas. Please create a Github issue initially so we can discuss and agree actions/approach - that should save time all-round.

The ideal way to receive contributions is via a [Github Pull Request](https://help.github.com/articles/using-pull-requests/) from the master branch. Please ensure that at least unit tests (you can run these via `npm test`) and if possible, linter rules (`npm run lint`).

If you find a sensitive, security issue with this application, please email me privately in the first instance: `neil [dot] craig [at] thedotproduct [dot] org`.


## License
[MIT license](./license.md)