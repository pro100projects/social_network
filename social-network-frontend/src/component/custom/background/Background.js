import React from "react";
// Styles
import {
    ChatContainerBackground,
    ChatContainerBackgroundImg
} from "./Background.styles";
// Images
import backgroundChatImg from "../../../image/backgroundChat.png";

const Background = () => {
    return (
        <ChatContainerBackground id='background_chat'>
            <ChatContainerBackgroundImg backgroundImg={backgroundChatImg}/>
        </ChatContainerBackground>
    )
}

export default Background;