import React from 'react';
// Styles
import { Wrapper } from "./Footer.styles";
import {useSelector} from "react-redux";

const Footer = () => {
    let error = useSelector(state => state.chat.error);

    return (
        <Wrapper>
            Footer {error}
        </Wrapper>
    )
};

export default Footer;