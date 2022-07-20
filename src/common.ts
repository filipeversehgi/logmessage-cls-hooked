import { getNamespace, Namespace } from "cls-hooked";
import { NAMESPACE_KEY, PROP_KEY } from "./constants";

export const _getSessionOrFail = () => {
    let session = getNamespace(NAMESPACE_KEY);
    if(!session) throw '@LOG_ROOT Session is not created'
    return session;
}

export const _setPropKeyHistory = (session: Namespace, propName: string) => {
    const alreadSetProps = session.get(PROP_KEY) ?? [];
    session.set(PROP_KEY, alreadSetProps.concat([propName]))
}