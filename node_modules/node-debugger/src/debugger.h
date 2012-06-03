// Copyright 2012, Camilo Aguilar. Cloudescape, LLC.
#ifndef SRC_DEBUGGER_H_
#define SRC_DEBUGGER_H_
#include "node.h"
#include "v8-debug.h"

using namespace v8;
using namespace node;

namespace dbg {
    class Debugger : public ObjectWrap {
        public:
            static void Initialize(Handle<Object> target);
            Debugger();
            virtual ~Debugger();

        protected:
            enum PauseOnExceptionsState {
                DontPauseOnExceptions,
                PauseOnAllExceptions,
                PauseOnUncaughtExceptions
            };

            static Handle<Value> InitDebugger(const Arguments& args);
            static Handle<Value> GetScripts(const Arguments& args);
            static Handle<Value> SetBreakpoint(const Arguments& args);
            static Handle<Value> RemoveBreakpoint(const Arguments& args);
            static Handle<Value> ClearBreakpoints(const Arguments& args);
            static Handle<Value> ActivateBreakpoints(const Arguments& args);
            static Handle<Value> DeactivateBreakpoints(const Arguments& args);
            static Handle<Value> SetBreakOnException(const Arguments& args);
            static Handle<Value> ClearBreakOnException(const Arguments& args);
            static Handle<Value> SetBreakOnUncaughtException(const Arguments& args);
            static Handle<Value> ClearBreakOnUncaughtException(const Arguments& args);
            static Handle<Value> PauseProgram(const Arguments& args);
            static Handle<Value> ResumeProgram(const Arguments& args);
            static Handle<Value> StepInto(const Arguments& args);
            static Handle<Value> StepOver(const Arguments& args);
            static Handle<Value> StepOut(const Arguments& args);
            static Handle<Value> SetScriptSource(const Arguments& args);
            static Handle<Value> CurrentFrame(const Arguments& args);
            static Handle<Value> AddListener(const Arguments& args);

            static void DebugEventCallback(const Debug::EventDetails& eventDetails);
            void handleDebugEvent(const Debug::EventDetails& eventDetails);

        private:
            Persistent<Object> script;
            Persistent<Object> executionState;
            Persistent<Function> onBreak;
            Persistent<Function> onException;
            Persistent<Function> onNewFunction;
            Persistent<Function> onBeforeCompile;
            Persistent<Function> onAfterCompile;
            Persistent<Function> onScriptCollected;
            Persistent<Function> onBreakForCommand;
            Local<Context> pausedContext;
            bool isPaused();

            void handleV8DebugEvent(const Debug::EventDetails& eventDetails);
            static Persistent<ObjectTemplate> debugger_template_;
    };
} //namespace dbg
#endif  // SRC_DEBUGGER_H
