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

function Test() {
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

    // let newWick = "((raccoon:19.19959,bear:6.80041):0.84600,((sea_lion:11.99700, seal:12.00300):7.52973,((monkey:100.85930,cat:47.14069):20.59201, weasel:18.87953):2.09460):3.87382,dog:25.46154)";
    // let newWick = "";
    let newWick = "(((EELA:0.150276,CONGERA:0.213019):0.230956,(EELB:0.263487,CONGERB:0.202633):0.246917):0.094785,((CAVEFISH:0.451027,(GOLDFISH:0.340495,ZEBRAFISH:0.390163):0.220565):0.067778,((((((NSAM:0.008113,NARG:0.014065):0.052991,SPUN:0.061003,(SMIC:0.027806,SDIA:0.015298,SXAN:0.046873):0.046977):0.009822,(NAUR:0.081298,(SSPI:0.023876,STIE:0.013652):0.058179):0.091775):0.073346,(MVIO:0.012271,MBER:0.039798):0.178835):0.147992,((BFNKILLIFISH:0.317455,(ONIL:0.029217,XCAU:0.084388):0.201166):0.055908,THORNYHEAD:0.252481):0.061905):0.157214,LAMPFISH:0.717196,((SCABBARDA:0.189684,SCABBARDB:0.362015):0.282263,((VIPERFISH:0.318217,BLACKDRAGON:0.109912):0.123642,LOOSEJAW:0.397100):0.287152):0.140663):0.206729):0.222485,(COELACANTH:0.558103,((CLAWEDFROG:0.441842,SALAMANDER:0.299607):0.135307,((CHAMELEON:0.771665,((PIGEON:0.150909,CHICKEN:0.172733):0.082163,ZEBRAFINCH:0.099172):0.272338):0.014055,((BOVINE:0.167569,DOLPHIN:0.157450):0.104783,ELEPHANT:0.166557):0.367205):0.050892):0.114731):0.295021)";
    useEffect(() => {

    }, []);
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
                           newick={newWick}
                           transform={`translate(${padding}, ${padding})`}
                           includeBLAxis/>
            </svg>
            <svg width={"100%"} height={"100%"}>
                <Phylotree width={state.width - 2 * padding}
                           height={state.height - 2 * padding}
                           maxLabelWidth={state.maxLabelWidth}
                           sort={state.sort}
                           alignTips={state.alignTips}
                           newick={newWick}
                           transform={`translate(${padding}, ${padding})`}
                           includeBLAxis/>
            </svg>
            <svg width={"100%"} height={"100%"}>
                <Phylotree width={state.width - 2 * padding}
                           height={state.height - 2 * padding}
                           maxLabelWidth={state.maxLabelWidth}
                           sort={state.sort}
                           alignTips={state.alignTips}
                           newick={newWick}
                           transform={`translate(${padding}, ${padding})`}
                           includeBLAxis/>
            </svg>
            <svg width={"100%"} height={"100%"}>
                <Phylotree width={state.width - 2 * padding}
                           height={state.height - 2 * padding}
                           maxLabelWidth={state.maxLabelWidth}
                           sort={state.sort}
                           alignTips={state.alignTips}
                           newick={newWick}
                           transform={`translate(${padding}, ${padding})`}
                           includeBLAxis/>
            </svg>
            <svg width={"100%"} height={"100%"}>
                <Phylotree width={state.width - 2 * padding}
                           height={state.height - 2 * padding}
                           maxLabelWidth={state.maxLabelWidth}
                           sort={state.sort}
                           alignTips={state.alignTips}
                           newick={newWick}
                           transform={`translate(${padding}, ${padding})`}
                           includeBLAxis/>
            </svg>
            <svg width={"100%"} height={"100%"}>
                <Phylotree width={state.width - 2 * padding}
                           height={state.height - 2 * padding}
                           maxLabelWidth={state.maxLabelWidth}
                           sort={state.sort}
                           alignTips={state.alignTips}
                           newick={newWick}
                           transform={`translate(${padding}, ${padding})`}
                           includeBLAxis/>
            </svg>
        </div>
    )
}


export default withRouter(Test);