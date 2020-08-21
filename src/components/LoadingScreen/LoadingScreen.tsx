import React from 'react';
import './LoadingScreen.scss';
import Spin from 'antd/lib/spin';

function LoadingScreen() {
    return (
        <div className={"loading"}>
            <div style={{textAlign: "center"}}>
                <div>
                    <Spin/> <Spin/> <Spin/> <Spin/> <Spin/> <Spin/>
                </div>
                <div>
                    Loading app...
                </div>
            </div>
        </div>
    );
}

export default LoadingScreen;
