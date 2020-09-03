import React from 'reactn';
import './ResultView.scss';
import {withRouter} from 'react-router-dom';
import {useEffect, useState} from "react";
import {useResultView} from "./ResultViewHook";
import {_ResultViewRepository} from "../../repositories/ResultViewRepository";
import {Log} from "../../models/Log";
import {useTranslation} from "react-i18next";
import {LogTab} from "./LogTab";
import { Button } from 'antd';

//TODO: Conflict with tab created by GenerateTree
function ResultView() {
    const [translate] = useTranslation();
    const {logs, setLogs, appendLog} = useResultView();
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

    const deleteTab = (url: string) => {
        setLogs(logs.filter(value => value.url != url));
    }
    const loop = (lgs:Log[]) => {
        _ResultViewRepository.getAll().subscribe((logResults: Log[]) => {
            console.log(logResults);
            console.log(JSON.stringify(lgs));
            logResults.forEach(l => {
                appendLog(l);
            } );
            setTimeout(loop, 5000,[lgs]);
        }, error => {
            setError(() => {
                throw error;
            });
        });
    }

    useEffect(() => {
        loop(logs);
    }, []);
    return (<div style={{textAlign: "end", position: 'fixed', bottom: '1vh', right: 0}}>
            {logs.map((log) =>
                <LogTab  {...log} onKill={killProcess} key={log.url + log.id} onDeleteTab={deleteTab}/>
            )}
        </div>
    );
}


// const tabClick = (key: string, event: React.KeyboardEvent | React.MouseEvent) => {
//     console.log(key, event);
// }


export default withRouter(ResultView);
