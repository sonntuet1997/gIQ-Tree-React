import {cast} from "./cast";
import dfs from "./dfs";

const normalize = (s: any) => {
    s = cast(s)

    function _local_normalize(tree: any) {
        const vertex = dfs(tree, null);
        let total = 0

        for (const i in vertex) {
            if (vertex.hasOwnProperty(i)) {
                total += vertex[i]
            }
        }
        dfs(tree, (e: any) => {
            e.length = (e.length) / total

            return e
        })

        return tree
    }

    return _local_normalize(s)
}

export default normalize
