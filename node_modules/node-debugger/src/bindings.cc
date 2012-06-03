#include "debugger.h"

namespace dbg {
  void Initialize(Handle<Object> target) {
    HandleScope scope;
    Debugger::Initialize(target);
  }

  NODE_MODULE(debugger, Initialize)
}
