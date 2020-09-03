import React from 'reactn';
import {withRouter} from 'react-router-dom';
import {useEffect, useState} from "react";
import Phylotree from "react-phylotree";
import './Test.scss';
import {
    AlignLeftOutlined,
    ColumnHeightOutlined,
    ColumnWidthOutlined,
    SortAscendingOutlined,
    SortDescendingOutlined,
    UnorderedListOutlined,
    VerticalAlignMiddleOutlined
} from '@ant-design/icons';
import {CustomButton} from "../CustomButton/Custom";
import {_TreeViewRepository} from "../../repositories/TreeViewRepository";
import parse from "../../newick/tools/parse";
import {useTranslation} from "react-i18next";

function Test({match}: any) {
    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    const padding = 70;
    const [state, setState] = useState({
        width: 700,
        height: 700,
        maxLabelWidth: 30,
        alignTips: "right",
        sort: "ascending"
    } as any);
    const toggleDimension = (dimension: any, direction: any) => {
        const new_dimension: any = state[dimension] +
            (direction == "expand" ? 20 : -20),
            new_state: any = {};
        new_state[dimension] = new_dimension;
        setState({...state, ...new_state});
    }
    const handleSort = (direction: any) => {
        setState({...state, sort: direction});
    }

    const alignTips = (direction: any) => {
        setState({...state, alignTips: direction});
    }
    const [translate] = useTranslation();
    const [treeData, setTreeData] = useState("");
    // let newWick = "((raccoon:19.19959,bear:6.80041):0.84600,((sea_lion:11.99700, seal:12.00300):7.52973,((monkey:100.85930,cat:47.14069):20.59201, weasel:18.87953):2.09460):3.87382,dog:25.46154)";
    // let newWick = "";
    useEffect(() => {

    }, []);
    useEffect(() => {
        setTreeData("");
        // center();
        let tempData = "";
        const loop = () => {
            _TreeViewRepository.get(match.params.urlId).subscribe((tree: any) => {
                if (tree.data) {
                    if (tempData != tree.data) {
                        console.log(tempData);
                        tempData = tree.data;
                        setTreeData(tempData);
                    }
                }
                setTimeout(loop, 1000);
            });
        }
        loop();
    }, [match.params.urlId]);
    return (
        <div style={{height: "calc(100vh - 70px)"}}>
            <div style={{maxWidth: "130px", position: "absolute", right: "30px", top: "30px"}}>
                <CustomButton icon={<ColumnWidthOutlined/>} placement={"left"}
                              onClick={() => toggleDimension("width", "expand")}
                >expand</CustomButton>
                <CustomButton icon={<VerticalAlignMiddleOutlined rotate={90}/>} placement={"left"}
                              onClick={() => toggleDimension("width", "compress")}
                >compress</CustomButton>
                <CustomButton icon={<ColumnHeightOutlined/>} placement={"left"}
                              onClick={() => toggleDimension("height", "expand")}
                >expand</CustomButton>
                <CustomButton icon={<VerticalAlignMiddleOutlined/>} placement={"left"}
                              onClick={() => toggleDimension("height", "compress")}
                >compress</CustomButton>
                <CustomButton icon={<SortAscendingOutlined/>} placement={"left"}
                              onClick={() => handleSort("ascending")}
                >ascending</CustomButton>
                <CustomButton icon={<SortDescendingOutlined/>} placement={"left"}
                              onClick={() => handleSort("descending")}
                >descending</CustomButton>
                <CustomButton icon={<AlignLeftOutlined/>} placement={"left"}
                              onClick={() => alignTips("left")}
                >left</CustomButton>
                <CustomButton icon={<UnorderedListOutlined/>} placement={"left"}
                              onClick={() => alignTips("right")}
                >right</CustomButton>
            </div>
            <svg width={"100%"} height={"100%"}>
                <Phylotree width={state.width - 2 * padding}
                           height={state.height - 2 * padding}
                           maxLabelWidth={state.maxLabelWidth}
                           sort={state.sort}
                           alignTips={state.alignTips}
                           newick={treeData}
                           transform={`translate(${padding}, ${padding})`}
                           includeBLAxis/>
            </svg>
        </div>
    )
}


export default withRouter(Test);