export const a = 23;
// import cast from "./tools/cast";
// import normalize from "./tools/normalize";
// import parse from "./tools/parse";
// import serialize from "./tools/serialize";
// import dfs from "./tools/dfs";
// import getRoot from "./tools/getRoot";
// import map from "./tools/map";
//
// class Newick {
//     public tree: any;
//
//     constructor(data: any) {
//         this.tree = cast(data)
//     }
//
//
//     getRoot = () => getRoot(this.tree)
//
//     dfs = (callback: any) => dfs(this.tree, callback)
//
//     map = (callback: any) => {
//         this.tree = map(this.tree, callback)
//     }
//
//     normalize = () => normalize(this.tree)
//
//     serialize = () => serialize(this.tree)
//
//     toString = () => this.serialize()
//
//     clone = () => new Newick(this.tree)
//
//     equal = (anotherTree: any) => this.serialize()
//         .toLowerCase() === anotherTree.serialize()
//         .toLowerCase()
//
//     static parse = (data: string) => parse(data);
// }
//
// export default Newick