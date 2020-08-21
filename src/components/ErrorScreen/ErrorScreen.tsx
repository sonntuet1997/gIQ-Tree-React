import React from 'react';
import './ErrorScreen.scss';
import {Button, Result} from "antd";
import {useTranslation} from "react-i18next";
import {isValidNumber} from "react3l/helpers";

function ErrorScreen({error}: any) {
    const [translate] = useTranslation();
    const status = isValidNumber(error.message) ? error.message : "500";
    let message = error.message;
    switch (message){
        case "404": message = translate("error.404");
    }
    return <Result
        status={status}
        title="Error"
        subTitle="Sorry, something went wrong."
        extra={<><Button type="primary" onClick={() => window.location.reload()}>Reload</Button>
            <p>{error.message}</p></>}
    />
}

export default ErrorScreen;
