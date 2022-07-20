import { _getSessionOrFail, _setPropKeyHistory } from "./common";
import { TValidValues } from "./constants";

/**
 * Adds a key-value pair to the current active log context
 * @param {string} key
 * @param {string | number | boolean | Date} value 
 */
 export const setOnLog = (key: string, value: TValidValues) => {
    const session = _getSessionOrFail();
    session.set(key, value);
    _setPropKeyHistory(session, key);
}
