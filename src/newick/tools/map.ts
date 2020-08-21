import dfs from "./dfs";
import {cast} from "./cast";

const map = (tree: any, callback: any) => {
    callback = callback || function (e: any) {
        return e;
    }
    tree = cast(tree);
    dfs(tree, callback);
    return tree
}

export default map
