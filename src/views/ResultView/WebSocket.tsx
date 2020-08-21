import {useEffect, useMemo, useRef} from 'react';
import useWebSocket from 'react-use-websocket';

const getWSPoint = () => "ws://" + window.location.hostname;

export const WebSocket = ({onJson, logLink}: { onJson: Function, logLink: string }) => {
    const messageHistory = useRef<MessageEvent[]>([]);
    const {
        lastMessage,
        lastJsonMessage
    } = useWebSocket((logLink === '' ? getWSPoint() + ':8080/LogEndpoint/0A8350C5B7EF735968D84D20535A76E3-aln02455' : logLink), {
        onClose: (e) => {
            console.log(e)
        }
    });
    messageHistory.current = useMemo(() =>
        messageHistory.current.concat(lastMessage), [lastMessage]);
    //
    // const handleClickChangeSocketUrl = useCallback(() =>
    //     setSocketUrl('wss://demos.kaazing.com/echo'), []);
    //
    // const handleClickSendMessage = useCallback(() =>
    //     sendMessage('Hello'), []);
    //
    // const connectionStatus = {
    //     [ReadyState.CONNECTING]: 'Connecting',
    //     [ReadyState.OPEN]: 'Open',
    //     [ReadyState.CLOSING]: 'Closing',
    //     [ReadyState.CLOSED]: 'Closed',
    //     [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    // }[readyState];
    // if (logLink == '') return null;
    // console.log(lastJsonMessage)
    useEffect(() => {
        onJson(lastJsonMessage);
    }, [lastJsonMessage]);
    // const x: any = React.createRef();
    // console.log(messageHistory)
    // let t = messageHistory.current
    //     .map((message) => {
    //         console.log(x, message);
    //         return message ? JSON.parse(message.data).status : "";
    //         // if(x.current) return  x.current.pushToStdout(message ? JSON.parse(message.data).status : "");
    //         // return null;
    //     });
    //
    // return (
    //
    //     <div>
    //         {/*<button*/}
    //         {/*    onClick={handleClickChangeSocketUrl}*/}
    //         {/*>*/}
    //         {/*    Click Me to change Socket Url*/}
    //         {/*</button>*/}
    //         {/*<button*/}
    //         {/*    onClick={handleClickSendMessage}*/}
    //         {/*    disabled={readyState !== ReadyState.OPEN}*/}
    //         {/*>*/}
    //         {/*    Click Me to send 'Hello'*/}
    //         {/*</button>*/}
    //         <span>The WebSocket is currently {connectionStatus}</span>
    //         {lastMessage ? <span>Last message: {JSON.parse(lastMessage.data).status}</span> : null}
    //         <ul>
    //             {messageHistory.current
    //                 .map((message, idx) => <span key={idx}>{message ? JSON.parse(message.data).content : ""}</span>)}
    //         </ul>
    //     </div>
    // )
    return null;
};