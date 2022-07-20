import { _getSessionOrFail } from "./common";


/**
 * Method decorator that starts a new LogRoot. All subsequent calls of setOnLog/appendToLog
 * will use a new context inherited from existing active context
 */
export function LogRoot(): MethodDecorator {
  return (target: any, methodName: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
    const originalMethod = descriptor.value
    const session = _getSessionOrFail()
    descriptor.value = function PropertyDescriptor(...args: any[]) {
        return session.runAndReturn(() => {
            originalMethod.apply(this, args)
        })
    }
  }
}


