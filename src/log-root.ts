import { createNamespace, getNamespace, Namespace } from "cls-hooked";

const NAMESPACE_KEY = 'LOGROOT-CLS-NAMESPACE';

/**
 * Used to declare a Transaction operation. In order to use it, you must use {@link BaseRepository} custom repository in order to use the Transactional decorator
 * @param connectionName - the typeorm connection name. 'default' by default
 * @param propagation - The transaction propagation type. see {@link Propagation}
 * @param isolationLevel - The transaction isolation level. see {@link IsolationLevel}
 */
export function LogRoot(): MethodDecorator {
  return (target: any, methodName: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
    const originalMethod = descriptor.value
    const session = getSession()
    const activeContext = session.active;
    // console.log('S', session)
    // console.log('AC', activeContext);
    descriptor.value = function PropertyDescriptor(...args: any[]) {
        return session.runAndReturn(() => {
            originalMethod.apply(this, args)
        })
    }
    // return session.run(originalMethod);
  }
}

export const setSessionProp = (propName: string, value: any) => {
    let session = getNamespace(NAMESPACE_KEY);
    if(!session) throw '@LOG_ROOT Session is not created'
    session.set(propName, value);
}

export const getSessionProps = (...sessionProps: string[]) => {
    let session = getNamespace(NAMESPACE_KEY);
    if(!session) throw '@LOG_ROOT Session is not created';
    let result = new Map<string, any>();
    for(const propName of sessionProps) {
        result.set(propName, session.get(propName))
    }
    return result;
}

const getSession = (): Namespace => {
    let session = getNamespace(NAMESPACE_KEY);
    if(session) return session;
    throw 'Namespace not found'

}

export const initLogMessageCls =  () => {
    createNamespace(NAMESPACE_KEY);
}
