import React, {createContext, useContext, useState} from "react";
import {Log} from "../../models/Log";
import ErrorBoundary from "../../components/ErrorBoundary/ErrorBoundary";
import ErrorScreen from "../../components/ErrorScreen/ErrorScreen";

const ResultViewContext = createContext({
    logs: [] as Log[],
    setLogs: null as any,
    appendLog: null as any,
    removeLog: null as any,
});
export const useResultView = () => useContext(ResultViewContext);

export default function ResultViewProvider({children}: { children: any }) {
    const [logs, setLogs] = useState([] as Log[]);
    const appendLog = (log: Log) => {
        setLogs([...logs.filter(li => log.url != li.url), log])
    }
    const removeLog = (log: Log) => {
        setLogs(logs.filter(li => log.url != li.url));
    }
    return (
        // <ErrorBoundary fallback={ErrorScreen}>
            <ResultViewContext.Provider value={{logs, setLogs, appendLog, removeLog}}>
                {children}
            </ResultViewContext.Provider>
        // </ErrorBoundary>

    )
}