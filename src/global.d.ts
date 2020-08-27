declare module 'react-console-emulator' {
    import * as React from 'react';

    interface OptionProps {
        autoFocus: boolean;
        dangerMode: boolean;
        disableOnProcess: boolean;
        noDefaults: boolean;
        noAutomaticStdout: boolean;
        noHistory: boolean;
        noAutoScroll: boolean;
        history: [];
    }

    interface LabelProps {
        welcomeMessage: boolean | string | string[];
        promptLabel: string;
        errorText: string;
    }

    interface CommandProps {
        commands?: {
            description: string;
            usage?: string;
            fn: () => string;
        };
        commandCallback?: () => {};
    }

    interface FunctionProps {
        pushToStdout: () => any;
        pushToHistory: () => any;
        scrollToBottom: () => any;
    }

    export type TerminalProps = CommandProps &
        LabelProps &
        OptionProps & FunctionProps &
        StyleProps;

    export default class Terminal extends React.Component<TerminalProps, {}> {

    }
}

declare module 'react-phylotree' {
    import * as React from 'react';

    interface OptionProps {
        width: number,
        height: number,
        maxLabelWidth: number,
        transform:string,
        newick: string,
        alignTips: string,
        sort: string,
        includeBLAxis

    }

    export default class Phylotree extends React.Component<OptionProps, {}> {
    }
}



declare const d3: any;
