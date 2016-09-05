"use strict";

function test1(arg1, arg2)
{
    return "1: Arg is: " + arg;
}

function test2(arg2_1, arg2_2)
{
    return "2: Arg is: " + arg;
}

module.exports =
{
    test1: test1,
    test2: test2
};
