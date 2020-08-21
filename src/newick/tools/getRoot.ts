/**
 * Returns a root of the tree
 * @private
 * @param {string|object} tree newick-string or tree-object
 * @returns {string|null} root node
 */
import {cast} from "./cast";

const getRoot = (tree:any) => {
    tree = cast(tree);
    for (const i in tree) {
        if (tree.hasOwnProperty(i) && i === 'name') {
            return tree[i]
        }
    }
    return null
}

export default getRoot
