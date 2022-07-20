import { _getSessionOrFail, _setPropKeyHistory } from "./common";
import { TValidValues } from "./constants";

/**
 * Adds a new value to a key to the current active log context
 * If the value already holds a array, it appends a new item
 * If the value is not yet a array, it's converted into one
 * If the value has never been sets, it's get initialized
 * @param {string} key
 * @param {string | number | boolean | Date} value 
 */
 export const appendOnLog = (key: string, value: TValidValues) => {
    const session = _getSessionOrFail();
    const existingValue = session.get(key) ?? []
    if(Array.isArray(existingValue)) {
        session.set(key, existingValue.concat([value]))
    } else {
        session.set(key, [value])
    }

    _setPropKeyHistory(session, key);
}