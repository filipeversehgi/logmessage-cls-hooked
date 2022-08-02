import { createNamespace, getNamespace } from "cls-hooked";
import { NAMESPACE_KEY } from "./constants";

/**
 * You must call this function only ONCE. It's used to create
 * a namespace in the Node CLS. That's mandatory to your log
 * contexts to work properly
 */
 export const initLogMessageCls =  () => {
    return getNamespace(NAMESPACE_KEY) || createNamespace(NAMESPACE_KEY)
}

