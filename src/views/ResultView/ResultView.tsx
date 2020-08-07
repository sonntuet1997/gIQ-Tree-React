import React from 'reactn';
import './ResultView.scss';
import {withRouter} from 'react-router-dom';
import {Button, Modal, Spin, Tabs} from "antd";
import {CloseSquareOutlined, LoadingOutlined} from '@ant-design/icons';
import {yellow} from '@ant-design/colors';
import Text from "antd/es/typography/Text";
import {useState} from "react";

const {TabPane} = Tabs;

function ResultView() {
    const panes = [
        {
            title: 'Tab 1',
            content: 'Content of Tab Pane 2',
            // content: 'Content of Tab Pane 1 Content of Tab Pane 1 Content of Tab Pane 1 Content of Tab Pane 1 Content of Tab Pane 1 Content of Tab Pane 1 Content of Tab Pane 1 Content of Tab Pane 1 Content of Tab Pane 1 Content of Tab Pane 1 Content of Tab Pane 1 Content of Tab Pane 1 Content of Tab Pane 1 Content of Tab Pane 1 Content of Tab Pane 1 Content of Tab Pane 1 Content of Tab Pane 1 Content of Tab Pane 1 Content of Tab Pane 1 Content of Tab Pane 1 Content of Tab Pane 1 Content of Tab Pane 1 Content of Tab Pane 1 Content of Tab Pane 1 Content of Tab Pane 1 Content of Tab Pane 1 Content of Tab Pane 1 Content of Tab Pane 1 Content of Tab Pane 1 ',
            key: '1'
        },
        {title: 'Tab 2', content: 'Content of Tab Pane 2', key: '2'},
    ];
    const state = {
        activeKey: panes[0].key,
        panes,
    };
    return (
        <div style={{zIndex: 999, position: 'fixed', bottom: '1vh', right: 0, alignItems: 'flex-end'}}
            // hideAdd
            // onTabClick={tabClick}
            // onChange={this.onChange}
            // activeKey={this.state.activeKey}
            //   type="t"
            //   size={'large'}
            //   tabPosition={'bottom'}
            //   tabBarStyle={{backgroundColor: 'transparent'}}
            // renderTabBar={test}
            // onEdit={this.onEdit}
        >
            {/*{state.panes.map(pane => (*/}
            {/*    <TabPane tab={tab()} key={pane.key}>*/}
            {/*        {pane.content}*/}
            {/*    </TabPane>*/}
            {/*))}*/}
            <Tabb/>
        </div>
    );
}

const test = (ex: any) => {
    console.log(ex);
    return (<div>asdsa</div>)
}

const tabClick = (key: string, event: React.KeyboardEvent | React.MouseEvent) => {
    console.log(key, event);
}

const Tabb = () => {
    console.log()
    const [state, setState] = useState({
        loading: false,
        visible: false,
    })
    const showModal = () => {
        setState({
            ...state,
            visible: true,
        });
    };
    const handleOk = () => {
        setState({...state, loading: true});
        setTimeout(() => {
            setState({loading: false, visible: false});
        }, 3000);
    };
    const handleCancel = () => {
        setState({...state, visible: false});
    };
    const {visible, loading} = state;
    return (
        <>
            <Button size={'large'} style={{background: yellow.primary}} onClick={showModal}>
                <Spin indicator={<LoadingOutlined/>}/>
                <Text style={{
                    verticalAlign: 'text-top',
                    width: '150px', overflow: 'hidden',
                    whiteSpace: 'nowrap', /* Don't forget this one */
                    textOverflow: 'ellipsis'
                }}> Loading context abccc </Text>
                <CloseSquareOutlined style={{}}/>
            </Button>
            <Modal
                visible={visible}
                title="Title"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Return
                    </Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                        Submit
                    </Button>,
                ]}
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </>
    )
}

export default withRouter(ResultView);
