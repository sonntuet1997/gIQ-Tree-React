import React from 'reactn';
import './TreeView.scss';
import {withRouter} from 'react-router-dom';
import parse from "../../newick/tools/parse";
import {useEffect, useState} from "react";
import Tree from 'react-d3-tree';
import {_TreeViewRepository} from "../../repositories/TreeViewRepository";
import {ExpandOutlined, ZoomInOutlined, ZoomOutOutlined} from '@ant-design/icons';
import {Button} from "antd";
import {useTranslation} from "react-i18next";
import {CustomButton} from "../CustomButton/Custom";

const convertTree = (tree: any) => {
    const children = tree.branchset ? tree.branchset.map(convertTree) : [];
    const attributes = {"": tree.length};
    // const attributes = {};
    const name = tree.name;
    return {name, attributes, children};
}

function TreeView({match}: any) {
    const [translate] = useTranslation();
    const [treeData, setTreeData] = useState({});
    const [zoom, setZoom] = useState(0.9);
    const [translatePosition, setTranslate] = useState({x: 0, y: 0});
    const [visibility, setVisibility] = useState("hidden" as any);
    const [pathFunction, setPathFunction] = useState("straight" as any);
    const treeRef: any = React.createRef();
    const nodeSvgShape = {
        shape: 'circle',
        shapeProps: {
            r: 10,
        },
    }
    const center = () => {
        setTranslate({
            x: treeRef.current.offsetWidth / 7 + Math.random(),
            y: treeRef.current.offsetHeight / 2 + Math.random()
        });
    }
    const zoomIn = () => {
        setZoom(zoom + 0.1);
    }
    const zoomOut = () => {
        setZoom(zoom - 0.1);
    }
    useEffect(() => {
        setTreeData({});
        center();
        let tempData = "";
        const loop = () => {
            _TreeViewRepository.get(match.params.urlId).subscribe((tree: any) => {
                if (tree.data) {
                    if (tempData != tree.data) {
                        console.log(tempData);
                        tempData = tree.data;
                        let convertedTree = convertTree(parse(tree.data));
                        setTreeData(convertedTree);
                        setPathFunction("step");
                        setVisibility("visible");
                    }
                }
                setTimeout(loop, 1000);
            });
        }
        loop();
    }, [match.params.urlId]);
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
        <div style={{maxWidth: "130px", position: "absolute", right: "30px", top: "30px"}}>
            <CustomButton icon={<ZoomInOutlined/>} placement={"left"}  onClick={zoomIn}>{translate("tree.zoomIn")}</CustomButton>
            <CustomButton icon={<ZoomOutOutlined/>} placement={"left"} onClick={zoomOut}>{translate("tree.zoomOut")}</CustomButton>
            <CustomButton icon={<ExpandOutlined/>} placement={"left"} onClick={center}>{translate("tree.centre")}</CustomButton>
        </div>
        <Tree styles={style} translate={translatePosition} data={treeData} pathFunc={pathFunction}
              scaleExtent={{min: 0.1, max: 10}} nodeSvgShape={nodeSvgShape} zoom={zoom}
              separation={{siblings: 0.4, nonSiblings: 0.8}}/>
    </div>)
}

export default withRouter(TreeView);
