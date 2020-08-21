import React from 'reactn';
import './TreeView.scss';
import {withRouter} from 'react-router-dom';
import parse from "../../newick/tools/parse";
import {useEffect, useState} from "react";
import Tree from 'react-d3-tree';
import {_TreeViewRepository} from "../../repositories/TreeViewRepository";

const convertTree = (tree: any) => {
    const children = tree.branchset ? tree.branchset.map(convertTree) : [];
    const attributes = {"": tree.length};
    // const attributes = {};
    const name = tree.name;
    return {name, attributes, children};
}

function TreeView({match}: any) {
    const t = parse("(LngfishAu:0.1709558514,(LngfishSA:0.1883618082,LngfishAf:0.1648507162):0.1073339725,(Frog:0.2562207382,((((Turtle:0.2215233768,(Crocodile:0.3056620225,Bird:0.2310102500):0.0651255621):0.0364815770,Sphenodon:0.3446637657):0.0204360122,Lizard:0.3860396409):0.0740136760,(((Human:0.1851800594,(Seal:0.0944389793,(Cow:0.0822974837,Whale:0.1013014129):0.0404363701):0.0252508854):0.0340575240,(Mouse:0.0584160619,Rat:0.0905579131):0.1218136963):0.0607262363,(Platypus:0.1920256326,Opossum:0.1510231493):0.0373213911):0.1490653601):0.1275684381):0.0940547204);\n");
    console.log(match);
    const [treeData, setTreeData] = useState({});
    // const [treeData, setTreeData] = useState(convertTree(t));
    const [translate, setTranslate] = useState({x: 0, y: 0});
    const [visibility, setVisibility] = useState("hidden" as any);
    const [pathFunction, setPathFunction] = useState("straight" as any);
    const treeRef: any = React.createRef();
    const nodeSvgShape = {
        shape: 'circle',
        shapeProps: {
            r: 10,
        },
    }
    useEffect(() => {

    }, []);
    useEffect(() => {
        setTranslate({
            x: treeRef.current.offsetWidth / 7,
            y: treeRef.current.offsetHeight / 2
        });
        _TreeViewRepository.get(match.params.urlId).subscribe((tree: any) => {
            console.log(tree);
            if (tree.data) {
                let convertedTree = convertTree(parse(tree.data));
                setTreeData(convertedTree);
                setPathFunction("step");
                setVisibility("visible");
            }
        });
    }, []);
    const style = {
        nodes: {
            node: {
                circle: {
                    fill: '#52e2c5',
                },
                attributes: {
                    stroke: '#000',
                },
            },
            leafNode: {
                circle: {
                    fill: 'white',
                },
                attributes: {
                    stroke: '#000',
                },
            },
        },
    }
    return (<div style={{visibility: visibility, height: "calc(100vh - 70px)"}} ref={treeRef}>
        <Tree styles={style} translate={translate} data={treeData} pathFunc={pathFunction}
              scaleExtent={{min: 0.1, max: 10}}  nodeSvgShape={nodeSvgShape}
              separation={{siblings: 0.4, nonSiblings: 0.8}}/>
    </div>)
}

export default withRouter(TreeView);
