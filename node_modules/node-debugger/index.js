var fs = require('fs');
var v8debugger = require('./bindings').v8debugger;

/**
 * We need to compile and run this script in the v8 debug context,
 * in order to have access to internal v8 debug objects
 **/
var debuggerjs = fs.readFileSync('./debugger.js', 'ascii');

v8debugger = v8debugger.initialize(debuggerjs);

// Debug events which can occour in the V8 JavaScript engine. These originate
// from the API include file v8-debug.h.
v8debugger.DebugEvent = {
    Break: 1,
    Exception: 2,
    NewFunction: 3,
    BeforeCompile: 4,
    AfterCompile: 5,
    ScriptCollected: 6,
    BreakForCommand: 7
};

var events = v8debugger.DebugEvent;

v8debugger.on(events.Break, function() {});
v8debugger.on(events.Exception, function() {});
v8debugger.on(events.NewFunction, function() {});
v8debugger.on(events.BeforeCompile, function() {});
v8debugger.on(events.AfterCompile, function() {});
v8debugger.on(events.ScriptCollected, function() {});
v8debugger.on(events.BreakForCommand, function() {});

module.exports = v8debugger;
