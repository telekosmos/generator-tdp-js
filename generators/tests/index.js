"use strict";

/*
Yeoman generator to read a lib/module and create test files for all exported functions
*/

// Core deps
const fs = require("fs");
const OS = require("os");

// Yeoman deps
const generators = require("yeoman-generator");

// TODO: Move this to a lib fn and add unit tests
function getFunctionArgumentNames(fn)
{
  let ret = null;

  if(typeof(fn) === "function")
  {
    // Stringify the function prototype
    const fnString = fn.toString();

    // Strip comments from the stringified function prototype
    const fnStringStripped = fnString.replace(/\/\*.*\*\//, "");

    // Get the arguments (as a string) from the stripped function prototype
    const argumentsMatch = fnStringStripped.match(/function\s.*?\(([^)]*)\)/);

    // TODO: Sort this, the 'if' isn't really adding anything useful
    if(argumentsMatch instanceof Array)
    {
      const argumentsString = argumentsMatch[1];

      // Create a filtered array from the arguments string
      const argumentsArray = argumentsString.split(",");

      ret = argumentsArray.map((arg) =>
      {
        // trim whitespace and do a simple regex match to eliminate default values and flow (+ maybe others) data type definitions
        let argTmp = arg.trim().match(/^[a-z0-9_\-]+/i);

        return argTmp[0] || null;
      });
    }
  }

  return ret;
}


module.exports = generators.Base.extend(
{
  // The name `constructor` is important here
    constructor: function constructorFn()
    {
        generators.Base.apply(this, arguments);
    },

    writing: function wFn()
    {
      // Set up options
      this.GTNOpts  = {};

      this.GTNOpts.appName = this.appname.replace(/\ /g, "-");

      this.option("lib",
      {
          alias: "l",
          type: String,
          optional: true,
          defaults: process.cwd() + "/src/lib/" + this.GTNOpts.appName + "-lib.js" // TODO: Make this less fugly
      });

      this.option("functions",
      {
          alias: "f",
          type: String,
          optional: true,
          defaults: "*" // All exported functions
      });

      // Define the lib filename - this will be used by templates
      this.GTNOpts.appLibFilename = this.GTNOpts.appName + "-lib.js";

      try
      {
        const lib = require(this.options.lib);

        // Build an object of the exported functions
        let exportedProperties = {};

        if(lib instanceof Object) // This would come from e.g. module.exports = {a: .., B: ..., ...};
        {
          exportedProperties = lib;
        }
        else if(typeof(lib) === "function") // This would come from e.g. module.exports = function foo(){...};
        {
          exportedProperties.default = lib;
        }
        // TODO: Is there anything else valid from a require()?

        for(let f in exportedProperties)
        {
          if(typeof(exportedProperties[f]) === "function")
          {
            this.GTNOpts.functionName = f;

            this.GTNOpts.functionArgs = getFunctionArgumentNames(exportedProperties[f]);

            // // Try to determine the name(s) of any arguments for the function...
            // let args = getFunctionArgumentNames(exportedProperties[f]);
            //
            // if(args instanceof Array)
            // {
            //   // ...and add them to the template
            //   args.forEach((a) =>
            //   {
            //     this.GTNOpts.functionArgs += "let " + a + " = \"<value>\";" + OS.EOL;
            //   });
            // }

            // test dir (automatically created) & file
            this.template(this.templatePath("test/ava.js"), "test/" + f + ".js");
          }
        }
      }
      catch (e)
      {
// NOTE: Is this "better" than just throwing? TBC
        console.log("Sorry, adding tests for %s failed, details: %s. Note, CWD is %s", this.options.lib, e.message, process.cwd());
        process.exit(1);
      }
    }
});
