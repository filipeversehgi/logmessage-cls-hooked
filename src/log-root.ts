import { _getSessionOrFail } from "./common";


/**
 * Method decorator that starts a new LogRoot. All subsequent calls of setOnLog/appendToLog
 * will use a new context inherited from existing active context
 */
export function LogRoot(): MethodDecorator {
  return (target: any, methodName: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
    const originalMethod = descriptor.value
    const isAsync = originalMethod.constructor.name === 'AsyncFunction';
    if(isAsync) {
      descriptor.value = async function PropertyDescriptor(...args: any[]) {
        const session = _getSessionOrFail()
        return session.runAndReturn(async () => {
          const result = await originalMethod.apply(this, args)
          return result 
        })
      }
    } else {
      descriptor.value = function PropertyDescriptor(...args: any[]) {
        const session = _getSessionOrFail()
        return session.runAndReturn(() => {
          return originalMethod.apply(this, args)
        })
      }
    }
  }
}


