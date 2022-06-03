import React from 'react';
// Styles
import {
    Wrapper,
    WriteMessageContainer,
    ChatInfoContainer,
    MessagesContainer
} from "./Chat.styles";
// Components
import WriteMessages from "./write_message/WriteMessages";
import Messages from "./messages/Messages";

const Chat = ({ messages }) => {
    return (
        <Wrapper id='chat'>
            {/*<ChatInfoContainer>*/}
            {/*    info about chat*/}
            {/*</ChatInfoContainer>*/}
            <MessagesContainer>
                <Messages messages={messages}/>
            </MessagesContainer>
            <WriteMessageContainer>
                <WriteMessages />
            </WriteMessageContainer>
        </Wrapper>
    );
};

export default Chat;

