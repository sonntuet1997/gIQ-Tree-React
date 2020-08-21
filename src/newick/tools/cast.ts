/**
 * Casts tree or string to tree-object
 * @private
 * @param {string|object} s newick-string or tree-object
 * @returns {object} Tree-object
 */
import parse from "./parse";

export const cast = (s: string) => {
    try {
        return JSON.parse(s)
    } catch (e) {
        return parse(s)
    }
}
