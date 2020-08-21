import React from "react";
import Terminal from "react-console-emulator";

export default class MyTerminal extends Terminal {
    constructor(props: any) {
        super(props);
    }

    componentDidUpdate() {
        (this as any).terminalInput.current.value = this.props.iqCommand ?? '';
        (this as any).scrollToBottom();
    }

    render() {
        (this as any).state.stdout = [...this.props.stdout];
        (this as any).state.processing = {...this.props.processing}
        return super.render();
    }

    pushCommandToStdout = (command: string) => {
        const echo = (<span>{(this as any).props.promptLabel || '$'} {command}</span>);
        (this as any).pushToStdout(echo, {isEcho: true});
        (this as any).pushToHistory(command);
    }
}