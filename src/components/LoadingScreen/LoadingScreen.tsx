import React from 'react';
import './LoadingScreen.scss';
import Spin from 'antd/lib/spin';

function LoadingScreen() {
  return (
    <>
      <Spin tip="Loading"/>
    </>
  );
}

export default LoadingScreen;
