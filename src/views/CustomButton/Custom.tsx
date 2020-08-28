import React from 'reactn';
import {Button, Layout, Tooltip} from "antd";
import './Custom.scss';
import {ButtonProps} from "antd/es/button";
import {TooltipProps} from "antd/es/tooltip";

const {Header, Content, Footer, Sider} = Layout;
export const CustomButton = (props: ButtonProps & TooltipProps & { breakingPoint?: string } & any) => {
    return (<Tooltip title={props.children} placement={props.placement} className={"hiddenTooltip"}>
        <Button {...props}><span className={"hiddenTitle"}>{props.children}</span></Button>
    </Tooltip>)
}
