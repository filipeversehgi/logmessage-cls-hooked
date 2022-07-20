import { _getSessionOrFail } from "./common";
import { PROP_KEY, TValidValues } from "./constants";


/**
 * Gets all the key-values that were set in the active contexts,
 * in a Map<key, value> format
 */
 export const getLogData = () => {
    const session = _getSessionOrFail();;
    let result = new Map<string, TValidValues>();
    const sessionProps = session.get(PROP_KEY) ?? [];
    for(const propName of sessionProps) {
        result.set(propName, session.get(propName))
    }
    return result;
}