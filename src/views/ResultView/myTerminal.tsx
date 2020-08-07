import React, {useMemo, useRef} from "react";
import Terminal from "react-console-emulator";
import {useWebSocket} from "react-use-websocket/dist/lib/use-websocket";

export default class MyTerminal extends Terminal {
    constructor(props: any) {
        super(props);
        // console.log(props,logLink);
        // if (props.initCommand) this.pushCommandToStdout(props.initCommand);
        // props.initResults?.forEach((x: any) => {
        //     console.log(x);
        //     // (this as any).pushToStdout(x);
        // })
    }
    //
    // render() {
    //     const {
    //         sendMessage,
    //         lastMessage,
    //         readyState,
    //         lastJsonMessage
    //     } = useWebSocket( this.props.fileLink, {onClose: console.log});
    //     this.messageHistory.current = useMemo(() =>
    //         this.messageHistory.current.concat(lastMessage), [lastMessage]);
    //     //
    //     // const handleClickChangeSocketUrl = useCallback(() =>
    //     //     setSocketUrl('wss://demos.kaazing.com/echo'), []);
    //     //
    //     // const handleClickSendMessage = useCallback(() =>
    //     //     sendMessage('Hello'), []);
    //     //
    //     // const connectionStatus = {
    //     //     [ReadyState.CONNECTING]: 'Connecting',
    //     //     [ReadyState.OPEN]: 'Open',
    //     //     [ReadyState.CLOSING]: 'Closing',
    //     //     [ReadyState.CLOSED]: 'Closed',
    //     //     [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    //     // }[readyState];
    //     console.log(lastMessage)
    //     console.log(lastJsonMessage)
    //     console.log(this.messageHistory)
    //     this.messageHistory.current
    //         .forEach((message) => {
    //             console.log(message);
    //             this.pushCommandToStdout(message ? JSON.parse(message.data).status : "");
    //             // if(x.current) return  x.current.pushToStdout(message ? JSON.parse(message.data).status : "");
    //             // return null;
    //         });
    //     return super.render();
    //
    // }


    pushCommandToStdout = (command: string) => {
        const echo = (<span>{(this as any).props.promptLabel || '$'} {command}</span>);
        (this as any).pushToStdout(echo, {isEcho: true});
        (this as any).pushToHistory(command);
    }
}