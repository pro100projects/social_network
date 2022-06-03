import React from 'react';

import { Wrapper, Box } from './Custom.styles';
import MyFormik from "./MyFormik";
import * as SockJS from 'sockjs-client';

const Custom = () => {

    //let ws = new SockJS('http://198.211.110.141:8002/ws-chat');

    // let ws = new SockJS('http://localhost:8081/ws-chat');
    // ws.onopen = function() {
    //     console.log('open');
    // };
    //
    // ws.onmessage = function(e) {
    //     console.log('message', e.data);
    // };
    //
    // ws.onclose = function() {
    //     console.log('close');
    // };

    return (
        <Wrapper>
            <MyFormik/>
        </Wrapper>
    )
};

export default Custom;