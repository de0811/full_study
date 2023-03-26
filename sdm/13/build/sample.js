//@ts-check
/**
 * 변수 내부가 비었는지 확인
 * @param {any} target
 * @returns boolean
 */
export function isEmpty(target) {
    if (target === null || target === undefined) {
        return true;
    }
    else if (typeof target === 'string' && target.length === 0) {
        return true;
    }
    else if (target instanceof Array && target.length === 0) {
        return true;
    }
    else {
        return false;
    }
}
/**
 *
 * @param {Object} config
 * @param {string} config.url
 * @returns boolean
 */
export function init(config) {
    return true;
}
/**
 *
 * @param {number} code
 * @returns number
 */
export function exit(code) {
    return code;
}
