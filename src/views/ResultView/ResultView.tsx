import React from 'reactn';
import './ResultView.scss';
import {Link, NavLink, Redirect, withRouter} from 'react-router-dom';
import {Button, Modal, Progress, Result, Spin, Tooltip} from "antd";
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    CloseSquareOutlined,
    DownloadOutlined,
    BarChartOutlined,
    StopOutlined,
    LoadingOutlined
} from '@ant-design/icons';
import {blue, green, red, yellow} from '@ant-design/colors';
import {useEffect, useState} from "react";
import {useResultView} from "./ResultViewHook";
import MyTerminal from "./myTerminal";
import {WebSocket} from "./WebSocket";
import {_ResultViewRepository} from "../../repositories/ResultViewRepository";
import {SOCKET_BASE_URL} from "../../config/consts";
import {Log} from "../../models/Log";
import {PulseLoader} from "react-spinners";
import {_FileRepository} from "../../repositories/FileRepository";
import {useTranslation} from "react-i18next";


function ResultView() {
    const [translate] = useTranslation();
    const {logs, setLogs} = useResultView();
    const [, setError] = useState(() => null);
    const killProcess = (url: string) => {
        _ResultViewRepository.kill(url).subscribe((logResults: any) => {
            console.log(logResults);

        }, error => {
            // setError(() => {
            throw error;
            // });
        });
    }
    useEffect(() => {
        _ResultViewRepository.getAll().subscribe((logResults: Log[]) => {
            console.log(logResults);
            setLogs(logResults ?? []);
        }, error => {
            setError(() => {
                throw error;
            });
        });
    }, []);
    return (<div style={{zIndex: 999, position: 'fixed', bottom: '1vh', right: 0, alignItems: 'flex-end'}}>
        {logs.map((log) =>
            <LogTab  {...log} onKill={killProcess} key={log.url}/>
        )}
    </div>);
}


// const tabClick = (key: string, event: React.KeyboardEvent | React.MouseEvent) => {
//     console.log(key, event);
// }

const LogTab = ({url, processedFile, onKill}: Log & { onKill: any }) => {
    const [translate] = useTranslation();
    const [state, setState] = useState({
        loading: false,
        visible: false,
    })
    const {visible, loading} = state;
    const [results, setResults] = useState([] as any[]);
    const [terminalOutput, setTerminalOutput] = useState([] as any[]);
    const [status, setStatus] = useState('Connecting');
    const [percentage, setPercentage] = useState(0);
    const [current, setCurrent] = useState(0);
    const [total, setTotal] = useState(0);
    const [downloadingZip, setDownloadingZip] = useState(false);
    const [showTerminal, setShowTerminal] = useState(false);
    const handleDownloadZip = () => {
        setDownloadingZip(true);
        _FileRepository.zip(url).subscribe(response => {
            const headerval = response.headers['content-disposition'];
            const filename = headerval.split(';')[1].split('=')[1].replace('"', '').replace('"', '');
            if (window.navigator.msSaveOrOpenBlob != null) {
                window.navigator.msSaveBlob(response.data, filename);
            } else {
                const elem = window.document.createElement('a');
                elem.href = window.URL.createObjectURL(response.data);
                elem.download = filename;
                document.body.appendChild(elem);
                elem.click();
                document.body.removeChild(elem);
            }
            setDownloadingZip(false);
        }, error => {
            setDownloadingZip(false);
            throw error;
        })
    }

    const showModal = () => {
        setState({
            ...state,
            visible: true,
        });
    };

    const hideModal = () => {
        setState({
            ...state,
            visible: false,
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

    const statusComponent: any = {
        color: {
            "Processing": yellow.primary,
            "Success": green.primary,
            "Error": red.primary,
            "Connecting": blue.primary,
            "Canceled": red.primary,
            "Canceling": yellow.primary,
        },
        indicator: {
            // "Processing": (<><Spin indicator={<LoadingOutlined/>}/> <span
            //     style={{color: blue.primary}}>{percentage + '%'}</span></>),
            "Processing": (<Spin indicator={<LoadingOutlined/>}/>),
            "Canceling": (<Spin indicator={<LoadingOutlined/>}/>),
            "Success": (<CheckCircleOutlined/>),
            "Error": (<CloseCircleOutlined/>),
            "Canceled": (<CloseCircleOutlined/>),
            "Connecting": (<PulseLoader size={3} css={'display:contents'}/>),
        },
        text: {
            "Connecting": translate("logWebsocket.connecting"),
            "Canceling": translate("logWebsocket.canceling"),
            "Error": translate("logWebsocket.error"),
            "Canceled": translate("logWebsocket.canceled"),
            "Success": translate("logWebsocket.success"),
            "Processing": translate("logWebsocket.processing"),
        },
        action: {
            "Connecting": (<></>),
            "Canceling": (<></>),
            "Error": (<></>),
            "Canceled": (<></>),
            "Success": (<span onClick={(e) => {
                e.stopPropagation();
                handleDownloadZip();
            }}>
                {downloadingZip ? <LoadingOutlined/> : <DownloadOutlined/>}
            </span>),
            "Processing": (<></>)
        },
        tooltip: {
            "Connecting": (<>{translate("logWebsocket.connecting")}</>),
            "Canceling": (<>{translate("logWebsocket.canceling")}</>),
            "Error": (<>{translate("logWebsocket.error")}</>),
            "Canceled": (<>{translate("logWebsocket.canceled")}</>),
            "Success": (<>{translate("logWebsocket.success")}</>),
            "Processing": (<>{translate("logWebsocket.processing")} {percentage}% [{current}/{total}]</>)
        },
        tooltipColor: {
            "Processing": "gold",
            "Canceling": "gold",
            "Success": "green",
            "Error": "red",
            "Canceled": "red",
            "Connecting": "blue",
        },
        modalBody: {
            "Processing": (<>
                <Result
                    status="warning"
                    icon={(<Progress
                        type="dashboard"
                        percent={percentage}
                    />)}
                    title={(<>{translate("logWebsocket.processing")}</>)}
                    // subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
                    extra={[
                        <Button onClick={()=>{onKill(url)}} type="primary" key="console" icon={<StopOutlined />}>
                            {translate("logWebsocket.action.cancel")}
                        </Button>,
                        // <Button key="buy">Buy Again</Button>,
                    ]}
                />
                <MyTerminal iqCommand={"command: "} stdout={terminalOutput} style={{height: '30px'}} commands={{}}
                            disabled/>
            </>),
            "Success": (<>
                <Result
                    status="success"
                    title={(<>{translate("logWebsocket.success")}</>)}
                    // subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
                    extra={[
                        <Button type="primary" key="console" icon={<DownloadOutlined/>} onClick={handleDownloadZip}
                                loading={downloadingZip}>
                            {downloadingZip ? translate("logWebsocket.action.downloading") : translate("logWebsocket.action.download")}
                        </Button>,
                        <NavLink to={'/tree/'+url}>
                            <Button type="primary" key="console" icon={<BarChartOutlined />}
                                loading={downloadingZip}
                                    onClick={hideModal}>
                                {translate("logWebsocket.action.showTree")}
                        </Button>,
                        </NavLink>

                        // <Button key="buy">Buy Again</Button>,
                    ]}
                />
                <MyTerminal iqCommand={"command: "} stdout={terminalOutput} style={{height: '30px'}} commands={{}}
                            disabled/>
            </>),
            "Error": "red",
            "Canceled": (<>
                <Result
                    status="error"
                    icon={(<CloseCircleOutlined />)}
                    title={(<>{translate("logWebsocket.canceled")}</>)}
                    // subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
                    extra={[
                        // <Button onClick={()=>{onKill(url)}} type="primary" key="console" icon={<StopOutlined />}>
                        //     {translate("logWebsocket.action.cancel")}
                        // </Button>,
                        // <Button key="buy">Buy Again</Button>,
                    ]}
                />
                {/*<MyTerminal iqCommand={"command: "} stdout={terminalOutput} style={{height: '30px'}} commands={{}}*/}
                {/*            disabled/>*/}
            </>),
            "Connecting": (<>
                <Result
                    status="warning"
                    icon={(<Progress
                        type="dashboard"
                        percent={percentage}
                    />)}
                    title={(<>{translate("logWebsocket.connecting")}</>)}
                    // subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
                    // extra={[
                    //     <Button type="primary" key="console">
                    //         Go Console
                    //     </Button>,
                    //     <Button key="buy">Buy Again</Button>,
                    // ]}
                />
                <MyTerminal iqCommand={"command: "} stdout={terminalOutput} style={{height: '30px'}} commands={{}}
                            disabled/>
            </>),
            "Canceling": (<>
                <Result
                    status="warning"
                    icon={(<Progress
                        type="dashboard"
                        percent={percentage}
                    />)}
                    title={(<>{translate("logWebsocket.canceling")}</>)}
                    // subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
                    // extra={[
                    //     <Button type="primary" key="console">
                    //         Go Console
                    //     </Button>,
                    //     <Button key="buy">Buy Again</Button>,
                    // ]}
                />
                <MyTerminal iqCommand={"command: "} stdout={terminalOutput} style={{height: '30px'}} commands={{}}
                            disabled/>
            </>),
        },
        modalTitle: {
            "Connecting": (<>{translate("logWebsocket.connecting")}</>),
            "Canceling": (<>{translate("logWebsocket.canceling")}</>),
            "Error": (<>{translate("logWebsocket.error")}</>),
            "Canceled": (<>{translate("logWebsocket.canceled")}</>),
            "Success": (<><CheckCircleOutlined
                size={10}/> {translate("logWebsocket.success") + ' ' + processedFile}</>),
            "Processing": (<>{translate("logWebsocket.processing")} {percentage}% [{current}/{total}]</>)
        }
    }
    return (
        <>
            <WebSocket logLink={SOCKET_BASE_URL + '/log/' + url} onJson={(newMes: any) => {
                if (newMes != null) {
                    setResults([...results, newMes]);
                    let newTotal = total;
                    let newCurrent = current;
                    let newPercentage = parseFloat((newCurrent / newTotal * 100).toFixed(2));
                    if (newMes.status == "Processing" && status != "Processing") {
                        newTotal = 0;
                        newCurrent = 0;
                        newPercentage = 0;
                    }
                    if (newMes.content) {
                        const lines = newMes.content.split('\n');
                        setTerminalOutput([...terminalOutput, ...lines.map((content: string) => {
                            return {message: content}
                        })])
                        lines.forEach((line: string) => {
                            if (newTotal == 0) {
                                const totalKey = "ModelFinder will test";
                                const ins = line.indexOf(totalKey);
                                if (ins > -1) {
                                    const numbers = line.match(/\d+/g);
                                    newTotal = (numbers ? parseInt(numbers[0]) : 0);
                                }
                            } else {
                                if (newCurrent < newTotal) {
                                    const words = line.match(/("[^"]+"|[^"\s]+)/g);
                                    // console.log(words);
                                    const number = words ? parseInt(words[0]) : 0;
                                    // console.log(number);
                                    if (!isNaN(number) && number > newCurrent) {
                                        newCurrent = number;
                                    }
                                    // console.log(newCurrent);
                                }
                            }
                        })
                        let _percentage = parseFloat((newCurrent / newTotal * 100).toFixed(2));
                        if (_percentage > newPercentage) newPercentage = _percentage;
                    }
                    setPercentage(newPercentage);
                    setTotal(newTotal);
                    setCurrent(newCurrent);
                    setStatus(newMes.status);
                    // setStatus('Success');
                }
            }}/>
            <Tooltip title={statusComponent.tooltip[status]} color={statusComponent.tooltipColor[status]}
                     autoAdjustOverflow={false}>
                <Button size={'large'}
                        style={{
                            background: (statusComponent.color[status] ?? statusComponent.color.Error),
                            color: 'black'
                        }}
                        onClick={showModal}>
                    {/*<div style={{width:'100%'}}  className={'d-flex align-items-center'}>*/}
                    {statusComponent.indicator[status]}
                    <div style={{marginLeft: '1rem', marginRight: '1rem', display: 'inline-flex', width: '150px'}}>
                        <div style={{
                            display: 'inline-block',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis'
                        }}> {processedFile} </div>
                    </div>
                    {statusComponent.action[status]}
                    <CloseSquareOutlined onClick={() => {
                        setStatus('Canceling');
                        onKill(url);
                    }}/>
                    {/*</div>*/}
                </Button>
            </Tooltip>
            <Modal
                width={'85vw'}
                visible={visible}
                centered
                // title={statusComponent.modalTitle[status]}
                // onOk={handleOk}
                footer={null}
                onCancel={handleCancel}
                // footer={[
                //     <Button key="back" onClick={handleCancel}>
                //         Return
                //     </Button>,
                //     <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                //         Submit
                //     </Button>,
                // ]}
            >
                {statusComponent.modalBody[status]}
            </Modal>
        </>
    )
}

export default withRouter(ResultView);
