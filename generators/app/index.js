"use strict";

/*
Super simple Yeoman generrator to set up a Node NPM package
*/

// Core deps
const fs = require("fs");

// Yeoman deps
const generators = require("yeoman-generator");

module.exports = generators.Base.extend(
{
  // The name `constructor` is important here
    constructor: function constructorFn()
    {
        generators.Base.apply(this, arguments);
    },


/*
TODO: split this up into a less horrendous chunk of crap
*/
    writing: function wFn()
    {
        // Set up options
        this.GTNOpts  = {};

        // Date - for licenses etc.
        let d = new Date();
        this.GTNOpts.year = d.getFullYear();

        // app name
        this.option("name",
        {
            alias: "n",
            type: String,
            optional: true,
            defaults: this.appname
        });

        // TODO: ideally, this would ensure that the appName is valid as per NPM rules/best practice (lower case, hyphens)
        this.GTNOpts.appName = this.options.name.toLowerCase();

        // TODO: should this include the dir name too?
        this.GTNOpts.appLibFilename = this.GTNOpts.appName + "-lib.js";
        this.GTNOpts.appConfigFilename = this.GTNOpts.appName + "-config.js";
        this.GTNOpts.appConfigTemplateFilename = this.GTNOpts.appName + "-config-template.js";

        // app description
        this.option("description",
        {
            alias: "d",
            type: String,
            optional: true,
            defaults: "**Description goes here**"
        });

        this.GTNOpts.description = this.options.description;

        // app version
        this.option("version",
        {
            alias: "v",
            type: String,
            optional: true,
            defaults: "1.0.0"
        });

        // TODO: ideally, this would ensure that the version is valid as per NPM rules/best practice (lower case, hyphens)
        this.GTNOpts.version = this.options.version;


        // User info
        this.GTNOpts.user =
        {
            name: this.user.git.name() || "First name, last name",
            email: this.user.git.email() || "first.last@example.com",
            GHUsername: this.user.github.username() || "gh-username"
        };


        // License
        // TODO: move this to config
        // NOTE: this is the full list of current (July 2016), OSI approved SPDX licenses from https://spdx.org/licenses/. Commented license are not yet added to templates/licenses
        const validLicenses =
        [
            // "0BSD",
            // "AAL",
            "AFL-1.1",
            "AFL-1.2",
            "AFL-2.0",
            "AFL-2.1",
            "AFL-3.0",
            // "AGPL-3.0",
            // "Apache-1.1",
            // "Apache-2.0",
            // "APL-1.0",
            // "APSL-1.0",
            // "APSL-1.1",
            // "APSL-1.2",
            // "APSL-2.0",
            // "Artistic-1.0",
            // "Artistic-1.0-cl8",
            // "Artistic-1.0-Perl",
            // "Artistic-2.0",
            // "BSD-2-Clause",
            // "BSD-3-Clause",
            // "BSL-1.0",
            // "CATOSL-1.1",
            // "CDDL-1.0",
            // "CECILL-2.1",
            // "CNRI-Python",
            // "CPAL-1.0",
            // "CPL-1.0",
            // "CUA-OPL-1.0",
            // "ECL-1.0",
            // "ECL-2.0",
            // "EFL-1.0",
            // "EFL-2.0",
            // "Entessa",
            // "EPL-1.0",
            // "EUDatagrid",
            // "EUPL-1.1",
            // "Fair",
            // "Frameworx-1.0",
            "GPL-2.0",
            "GPL-3.0",
            // "HPND",
            // "Intel",
            // "IPA",
            // "IPL-1.0",
            // "ISC",
            // "LGPL-2.0",
            // "LGPL-2.1",
            // "LGPL-3.0",
            // "LiLiQ-P-1.1",
            // "LiLiQ-R-1.1",
            // "LiLiQ-Rplus-1.1",
            // "LPL-1.0",
            // "LPL-1.02",
            // "LPPL-1.3c",
            // "MirOS",
            "MIT",
            // "Motosoto",
            // "MPL-1.0",
            // "MPL-1.1",
            "MPL-2.0",
            // "MPL-2.0-no-copyleft-exception",
            // "MS-PL",
            // "MS-RL",
            // "Multics",
            // "NASA-1.3",
            // "Naumen",
            // "NCSA",
            // "NGPL",
            // "Nokia",
            // "NPOSL-3.0",
            // "NTP",
            // "OCLC-2.0",
            // "OFL-1.1",
            // "OGTSL",
            // "OSET-PL-2.1",
            // "OSL-1.0",
            // "OSL-2.0",
            // "OSL-2.1",
            // "OSL-3.0",
            // "PHP-3.0",
            // "PostgreSQL",
            // "Python-2.0",
            // "QPL-1.0",
            // "RPL-1.1",
            // "RPL-1.5",
            // "RPSL-1.0",
            // "RSCPL",
            // "SimPL-2.0",
            // "SISSL",
            // "Sleepycat",
            // "SPL-1.0",
            // "UPL-1.0",
            // "VSL-1.0",
            // "W3C",
            // "Watcom-1.0",
            // "Xnet",
            // "Zlib",
            // "ZPL-2.0"
        ];

        // TODO: Add an opt for license - default to MIT, git.name() ?
        this.option("license",
        {
            desc: "Specify the software license to include in package.json and the license.md file. Valid license are: " + validLicenses.toString("utf8"),
            type: String,
            alias: "l",
            optional: true,
            defaults: "MIT"
        });

        if(validLicenses.indexOf(this.options.license) >= 0)
        {
            this.GTNOpts.license = this.options.license;
        }
        else
        {
            console.error("Please specify a supported license type, one of: " + validLicenses.toString("utf8"));
            process.exit(1);
        }


        // TODO: add license files
        this.template(this.templatePath("licenses/" + this.GTNOpts.license+ ".md"), "license.md");

        // Changelog
        this.template(this.templatePath("docs/changelog.md"), "changelog.md");

        // Readme
        this.template(this.templatePath("docs/readme.md"), "readme.md");

        // CI e.g. travis.yml
        this.template(this.templatePath("ci/.travis.yml"), ".travis.yml");

        // deps / package.json
        // TODO: override for defaults?
        this.template(this.templatePath("npm/package.json"), "package.json");

        // test dir (automatically created) & file
        this.template(this.templatePath("test/ava.js"), "test/a.js");

        // lib dir (automatically created) & file
        this.template(this.templatePath("node/lib/app-lib.js"), "src/lib/" + this.GTNOpts.appLibFilename);

        // config dir
        this.template(this.templatePath("node/config/app-config.js"), "config/" + this.GTNOpts.appConfigFilename);
        this.template(this.templatePath("node/config/app-config.js"), "config/" + this.GTNOpts.appConfigTemplateFilename);

        // postinstall script
        this.template(this.templatePath("npm/scripts/post-install.js"), "scripts/post-install.js");

        // .gitignore
        this.template(this.templatePath("source-control/.gitignore"), ".gitignore");

        // index
        this.template(this.templatePath("node/index.js"), "src/index.js");

        // eslintrc
        this.template(this.templatePath("linters/.eslintrc"), ".eslintrc");

        // babelrc & lang file (for atom plugin)
        this.template(this.templatePath("transpilers/.babelrc"), ".babelrc");
        this.template(this.templatePath("transpilers/.languagebabel"), ".languagebabel");
    },

    install: function iFn()
    {
        // TODO: this should come from config

        // Runtime deps
        const NPMDeps =
        [
            "react",
            "react-dom"
        ];

        this.npmInstall(NPMDeps, { 'save': true });

        // Development deps
        const NPMDevDeps =
        [
            "ava",
            "nyc",
            "snyk",
            "eslint-config-tdp",
            "babel-cli",
            "babel-eslint",
            "babel-preset-es2015",
            "babel-preset-react",
            "babel-plugin-syntax-flow",
            "babel-plugin-transform-flow-strip-types",
            "babel-plugin-typecheck"
        ];

        this.npmInstall(NPMDevDeps, { 'saveDev': true });
    }
});
