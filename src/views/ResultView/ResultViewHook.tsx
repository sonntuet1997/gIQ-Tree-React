import React, {createContext, useContext, useState} from "react";
import {Log} from "../../models/Log";

const ResultViewContext = createContext({
    logs: [] as Log[],
    setLogs: null as any,
    appendLog: null as any,
    removeLog: null as any,
    overrideLog: null as any,
});
export const useResultView = () => useContext(ResultViewContext);

export default function ResultViewProvider({children}: { children: any }) {
    const [logs, setLogs] = useState([] as Log[]);

    const overrideLog = (log: Log) => {
        setLogs(logs => [...logs.filter(li => log.url != li.url), log])
    }

    const appendLog = (log: Log) => {
        setLogs(logs => {
            console.log(log);
            console.log(JSON.stringify(logs));
            // debugger;
            if (logs.some(l => l.url == log.url)) {
                // debugger;
                return logs;
            } else {
                // debugger;
                return [...logs, log];
            }
        })
    }

    const removeLog = (log: Log) => {
        setLogs(logs => logs.filter(li => log.url != li.url));
    }
    return (
        // <ErrorBoundary fallback={ErrorScreen}>
        <ResultViewContext.Provider value={{logs, setLogs, appendLog, overrideLog, removeLog}}>
            {children}
        </ResultViewContext.Provider>
        // </ErrorBoundary>

    )
}