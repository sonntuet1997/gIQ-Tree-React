import React from 'reactn';
import './ResultView.scss';
import {withRouter} from 'react-router-dom';
import {useEffect, useState} from "react";
import {useResultView} from "./ResultViewHook";
import {_ResultViewRepository} from "../../repositories/ResultViewRepository";
import {Log} from "../../models/Log";
import {useTranslation} from "react-i18next";
import {LogTab} from "./LogTab";


function ResultView() {
    console.log(111);
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
    //
    // useEffect(() =>{
    //
    // },[]);
    console.log(logs);
    return (<div style={{zIndex: 999, position: 'fixed', bottom: '1vh', right: 0, alignItems: 'flex-end'}}>
        {logs.map((log) =>
            <LogTab  {...log} onKill={killProcess} key={log.url + log.id}/>
        )}
    </div>);
}


// const tabClick = (key: string, event: React.KeyboardEvent | React.MouseEvent) => {
//     console.log(key, event);
// }


export default withRouter(ResultView);
