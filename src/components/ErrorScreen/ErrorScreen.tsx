import React from 'react';
import './ErrorScreen.scss';
import {Button, Result} from "antd";

function ErrorScreen({error}: any) {
    return <Result
        status="500"
        title="Error"
        subTitle="Sorry, something went wrong."
        extra={<><Button type="primary" onClick={() => window.location.reload()}>Reload</Button>
            <p>{error.message}</p></>}
    />
}

export default ErrorScreen;
