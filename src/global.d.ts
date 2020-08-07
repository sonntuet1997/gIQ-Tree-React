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
        pushToHistory:() => any;
    }

    export type TerminalProps = CommandProps &
        LabelProps &
        OptionProps & FunctionProps &
        StyleProps;

    export default class Terminal extends React.Component<TerminalProps, {}> {
    }
}