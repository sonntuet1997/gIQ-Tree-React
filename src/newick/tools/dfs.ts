import {cast} from "./cast";

const dfs = (tree: any, nodeCallback: any) => {
    nodeCallback = nodeCallback || function (e: any) {
        return e;
    }
    const vertex: any = {};

    function _local_dfs(tree: any) {
        const branchset = tree.branchset || []

        if (branchset.length !== 0) {
            for (let i = 0; i < branchset.length; i++) {
                vertex[branchset[i].name] = branchset[i].length
                tree.branchset[i] = nodeCallback(tree.branchset[i])
                _local_dfs(branchset[i])
            }
        }
    }

    tree = cast(tree)
    _local_dfs(tree)

    return vertex
}

export default dfs
