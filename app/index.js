"use strict";

/*
Super simple Yeoman generrator to set up a Node NPM package
*/

const generators = require("yeoman-generator");

module.exports = generators.Base.extend(
{
  // The name `constructor` is important here
  constructor: function constructorFn()
  {
    generators.Base.apply(this, arguments);

    // this.templatePath("templates");

    // template(source, destination, data, options)
  },

  writing: function wFn()
  {
console.log("CWD: " + process.cwd());
console.log("sp: " + this.templatePath("package.json"));
console.log("dp: " + this.destinationPath("package.json"));
    //
    this.fs.copy(this.templatePath("*.json"), ".");
    this.fs.copy(this.templatePath("aasutin.json"), ".");
  }
});
