function Debugger() {
}

(function() {
    Debug.clearBreakOnException();
    Debug.clearBreakOnUncaughtException();

    //TODO this function should live in node-webkit-agent
    var frameMirrorToJSCallFrame = function(frameMirror, callerFrame) {
        // Get function name.
        var func;
        try {
            func = frameMirror.func();
        } catch(e) {
        }
        var functionName;
        if (func) {
            functionName = func.name() || func.inferredName();
        }

        // Get script ID.
        var script = func.script();
        var scriptId = script && script.id();

        // Get location.
        var location  = frameMirror.sourceLocation();

        // Get this object.
        var thisObject = frameMirror.details_.receiver();

        // Get scope chain array in format: [<scope type>, <scope object>, <scope type>, <scope object>,...]
        var scopeChain = [];
        var scopeType = [];
        for (var i = 0; i < frameMirror.scopeCount(); i++) {
            var scopeMirror = frameMirror.scope(i);
            var scopeObjectMirror = scopeMirror.scopeObject();

            var scopeObject;
            switch (scopeMirror.scopeType()) {
                case ScopeType.Local:
                case ScopeType.Closure:
                    // For transient objects we create a "persistent" copy that contains
                    // the same properties.
                    scopeObject = {};
                    // Reset scope object prototype to null so that the proto properties
                    // don't appear in the local scope section.
                    scopeObject.__proto__ = null;
                    var properties = scopeObjectMirror.properties();

                    for (var j = 0; j < properties.length; j++) {
                        var name = properties[j].name();
                        if (name.charAt(0) === ".") {
                            continue; // Skip internal variables like ".arguments"
                        }
                        scopeObject[name] = properties[j].value_;
                    }
                    break;
                case ScopeType.Global:
                case ScopeType.With:
                case ScopeType.Catch:
                    scopeObject = scopeMirror.details_.object();
                    break;
            }

            scopeType.push(scopeMirror.scopeType());
            scopeChain.push(scopeObject);
        }

        function evaluate(expression) {
            return frameMirror.evaluate(expression, false).value();
        }

        return {
            "scriptId": scriptId,
            "line": location ? location.line : 0,
            "column": location ? location.column : 0,
            "functionName": functionName,
            "thisObject": thisObject,
            "scopeChain": scopeChain,
            "scopeType": scopeType,
            "evaluate": evaluate,
            "caller": callerFrame
        };
    }


    this.getScripts = function() {
        return Debug.scripts();
    };

    this.setBreakpoint = function(state, breakpoint) {
        var breakpointId = Debug.setScriptBreakPointById(breakpoint.sourceId,
                                                         breakpoint.line,
                                                         breakpoint.column,
                                                         breakpoint.condition);

        var locations = Debug.findBreakPointActualLocations(breakpointId);
        if (!locations.length) {
            return undefined;
        }

        var location = locations[0];
        breakpoint.line = location.line;
        breakpoint.column = location.column;

        return breakpointId.toString();
    };

    this.removeBreakpoint = function(state, args) {
        Debug.findBreakPoint(args.breakpointId, true);
    };

    this.clearBreakpoints = function(state, args) {
        Debug.clearAllBreakPoints();
    };

    this.activateBreakpoints = function(state, args) {
        Debug.debuggerFlags().breakPointsActive.setValue(true);
    };

    this.breakpointsActivate = function(state, args) {
        return Debug.debuggerFlags().breakPointsActive.getValue();
    };

    this.deactivateBreakpoints = function(state, args) {
        Debug.debuggerFlags().breakPointsActive.setValue(false);
    };

    this.setBreakOnException = function(state, args) {
        Debug.setBreakOnException();
    };

    this.clearBreakOnException = function(state, args) {
        Debug.clearBreakOnException();
    };

    this.setBreakOnUncaughtException = function(state, args) {
        Debug.setBreakOnUncaughtException();
    };

    this.clearBreakOnUncaughtException = function(state, args) {
        Debug.clearBreakOnUncaughtException();
    };

    this.currentFrame = function(state, args) {
        var count = state.frameCount();
        if (count === 0) {
            return undefined;
        }

        var topFrame;
        for (var i = count - 1; i >= 0; i--) {
            var frameMirror = state.frame(i);
            topFrame = frameMirrorToJSCallFrame(frameMirror, topFrame);
        }

        return topFrame;
    };

    this.stepInto = function(state) {
        state.prepareStep(Debug.StepAction.StepIn, 1);
    };

    this.stepOver = function(state) {
        state.prepareStep(Debug.StepAction.StepNext, 1);
    };

    this.stepOut = function(state) {
        state.prepareStep(Debug.StepAction.StepOut, 1);
    };

    this.setScriptSource = function(scriptId, newSource, preview) {
        var scripts = Debug.scripts();
        var scriptToEdit;

        for (var i = 0; i < scripts.length; i++) {
            if (scripts[i].id == scriptId) {
                scriptToEdit = scripts[i];
                break;
            }
        }

        if (!scriptToEdit) {
            //Revisit this, we shouldn't throw in nodejs
           throw("Script not found");
        }

        var changeLog = [];
        return Debug.LiveEdit.SetScriptSource(scriptToEdit,
                                              newSource,
                                              preview,
                                              changeLog);
    };

    return new Debugger();
}).call(Debugger.prototype);

