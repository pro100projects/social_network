import React, {useEffect, useLayoutEffect, useState} from 'react';
// Styles
import {
    Wrapper,
    ListChatsContainer,
    ListChatsHeader,
    ChatContainer,
    ChatContainerBackground,
    ChatContainerBackgroundImg
} from './Chats.styles';
// Images
import backgroundChatImg from '../../image/backgroundChat.png';
// Routing
import { useParams } from "react-router-dom";
// Redux
import { findChat, findChats, findUsers, setSelectedChat } from "../../redux/slice/chatSlice";
import { useDispatch, useSelector } from "react-redux";
// Components
import Chat from "./chat/Chat";
import FindChatsInputContainer from "./chats_menu/find_chats_input_container/FindChatsInputContainer";
import ChatsMenuContent from "./chats_menu/chats_menu_content/ChatsMenuContent";
import Background from "../custom/background/Background";

const Chats = () => {
    const chatAnotherUserUrlId = useParams()['*'];
    const dispatch = useDispatch();
    const chatState = useSelector(state => state.chat);
    const meId = useSelector(state => state.user.user.id);

    useLayoutEffect(() => {
        if (chatAnotherUserUrlId !== '') {
            dispatch(findChat(chatAnotherUserUrlId))
                .then(() => {
                    dispatch(findChats());
                    dispatch(setSelectedChat(parseInt(chatAnotherUserUrlId)));
                });
        }
        else {
            dispatch(findChats());
        }
    }, [dispatch, chatAnotherUserUrlId]);

    //find chants mode
    const [isFocus, setFocus] = useState(false);
    const [text, setText] = useState('');

    let onTextChange = (x) => {
        dispatch(findUsers(x));
    };

    return (
        <Wrapper id='chats'>
            <ListChatsContainer>
                <ListChatsHeader>
                    <FindChatsInputContainer
                        isFocus={isFocus}
                        setFocus={setFocus}
                        text={text}
                        setText={setText}
                        onTextChange={onTextChange}
                    />
                </ListChatsHeader>
                <ChatsMenuContent
                    chatState={chatState}
                    dispatch={dispatch}
                    meId={meId}
                    text={text}
                    searchUsers={chatState.searchUsers}
                />
            </ListChatsContainer>
            <ChatContainer>
                {chatAnotherUserUrlId !== '' && <Chat messages={chatState.chat.messages}/>}
            </ChatContainer>
            <Background />
        </Wrapper>
    );
}

export default Chats;