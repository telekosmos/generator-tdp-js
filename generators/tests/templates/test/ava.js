"use strict";

/*
Unit tests for function <%= GTNOpts.functionName %>
*/

// 3rd party deps
import test from "ava";

// Local deps
import {<%= GTNOpts.functionName %>} from "../dist/lib/<%= GTNOpts.appLibFilename %>";


<%
// Try to determine whether the function is async
var callbackArgNamesRegex = /^(callback|cb)$/i;
var lastArg = GTNOpts.functionArgs[GTNOpts.functionArgs.length - 1];
var fnIsAsync = !!lastArg.match(callbackArgNamesRegex); // Boolean

// Create a string of the arguments to pass to the function call...
// ...popping the callback arg off the array if the function is async
if(fnIsAsync === true)
{
  // NOTE: Might be better to create a new array rather than mutate the original (? - maybe pedantic)
  GTNOpts.functionArgs.pop();
  var testType = "test.cb";
}
else
{
  var testType = "test";
}
var argSting = GTNOpts.functionArgs.join(", ");
%>

// Valid inputs:
<%= testType %>("<%= GTNOpts.functionName %> with valid inputs", (t) =>
{<%for(var i = 0; i < GTNOpts.functionArgs.length; i++)
{
  var argName = GTNOpts.functionArgs[i];

  // NOTE: Using 123 as the value because output is HTML escaped and thus " etc get mangled. It'll need editing anyway...
  var str = "let " + argName + " = 123;";%>
  <%= str %><%
}
  if(fnIsAsync === true)
  {
  %>

  <%= GTNOpts.functionName %>(<%= argSting %>, (err, res) =>
  {
    t.is(err === null, true, "'err' must be null");
    t.is(res instanceof Object, true, "'res' must be an object"); // NOTE: You'll probably need to change this

    t.end();
  });<%}
  else
  {
  %>

  let res = <%= GTNOpts.functionName %>(<%= argSting %>);
  t.is(res, "b", "a must equal b");<%
  }%>
});


// Invalid inputs
<%
// Invalid inputs - one test per arg, with that arg set to null
for(var j = 0; j < GTNOpts.functionArgs.length; j++)
{
  var testName = GTNOpts.functionArgs[j];
%>

<%= testType %>("<%= GTNOpts.functionName %> with invalid inputs (<%= testName %> == null)", (t) =>
{<% for(var i = 0; i < GTNOpts.functionArgs.length; i++)
  {
    var argName = GTNOpts.functionArgs[i];

    if(testName === argName)
    {
      var val = null;
    }
    else
    {
      var val = 123;
    }

    // NOTE: Using 123 as the value because output is HTML escaped and thus " etc get mangled. It'll need editing anyway...
    var str = "let " + argName + " = " + val + ";";%>
  <%= str %><%
  }
  %>
    <% if(fnIsAsync === true)
    {
    %>
  <%= GTNOpts.functionName %>(<%= argSting %>, (err, res) =>
  {
    t.is(err === null, true, "'err' must be null");
    t.is(res instanceof Object, true, "'res' must be an object"); // NOTE: You'll probably need to change this

    t.end();
  });<%}
  else{
  %>
  let res = <%= GTNOpts.functionName %>(<%= argSting %>);
  t.is(res, "b", "a must equal b");<%
  }%>
});<%}%>
