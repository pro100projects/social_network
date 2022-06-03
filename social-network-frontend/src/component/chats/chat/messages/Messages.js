import React, {useEffect, useRef} from 'react';
// Styles
import {
    Avatar,
    Content,
    DateContainer,
    DayMessageGroupContainer,
    DayMessageGroupList,
    MessageGroup,
    MessageList,
    Wrapper
} from './Messages.styles';
// Images
import noAvatar from '../../../../image/noImage.svg';
// Redux
import {useSelector} from "react-redux";
// Components
import Message from './message/Message';
// Other
import getDateForShow from "../../../util/getDateForShow";
import timeUtil from "../../../util/timeUtil";


const Messages = ({ messages }) => {
    const meId = useSelector(state => state.user.user.id);
    const users = useSelector(state => state.chat.chat.users);

    const messagesEndRef = useRef(null)
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
    useEffect(() => {
        scrollToBottom()
    }, [messages]);

    if(!messages || messages.length === 0) {
        return (
            <Wrapper>
                <Content>
                </Content>
            </Wrapper>
        )
    }

    let anotherUser = null;
    users.forEach(u => {
        if (u.id !== meId) {
            anotherUser = u;
        }
    })

    let dayGroupMessages = [];
    let tempDayMessagesGroup = {
        date: '',
        groups: []
    }
    let tempMessagesGroup = {
        userId: '',
        messages: [],
    }

    let addGroupMessagesToMonthGroupMessages = () => {
        if (tempMessagesGroup.messages !== []) {
            addGroupToGroupMessages();
        }
        const date = timeUtil.toPrintDate(tempDayMessagesGroup.date[0], tempDayMessagesGroup.date[1], tempDayMessagesGroup.date[2]);
        const fullDate = timeUtil.toPrintFullDate(tempDayMessagesGroup.date[0], tempDayMessagesGroup.date[1], tempDayMessagesGroup.date[2]);
        dayGroupMessages.push(
            <DayMessageGroupContainer key={`day_messages_group_${fullDate}`} id={`day_messages_group_${fullDate}`}>
                <DateContainer>{ date }</DateContainer>
                <DayMessageGroupList>
                    {tempDayMessagesGroup.groups}
                </DayMessageGroupList>
            </DayMessageGroupContainer>
        )
        tempDayMessagesGroup.groups = [];
        tempMessagesGroup.userId = '';
        tempMessagesGroup.messages = [];
    }

    let indexGroup = 0;
    let addGroupToGroupMessages = () => {
        const isMe = tempMessagesGroup.userId !== meId;
        tempDayMessagesGroup.groups.push(
            <MessageGroup key={`messages_group_${indexGroup++}`}>
                { tempMessagesGroup.userId !== meId
                    ? <MessageList>
                        { tempMessagesGroup.messages.map(m => (<Message
                            key={m.id}
                            id={m.id}
                            text={m.text}
                            sentAt={m.sentAt}
                            isEdited={m.isUpdated}
                            isMe={false} />))
                        }
                    </MessageList>
                    : <MessageList me>
                        { tempMessagesGroup.messages.map(m => (<Message
                            key={m.id}
                            id={m.id}
                            text={m.text}
                            sentAt={m.sentAt}
                            isEdited={m.isUpdated}
                            isRead={m.readMessages.length !== 0}
                            isMe={true} />)) }
                    </MessageList>
                }
                { isMe && <Avatar url={ anotherUser.avatar ? "http://localhost:8081/avatars/" + anotherUser.avatar : noAvatar }/>}
            </MessageGroup>
        )
        tempMessagesGroup.messages = [];
    }
    if (messages.length !== 0) {
        tempDayMessagesGroup.date = getMassDatesFromMass(messages[0]);
    }
    for (let i = 0; i <= messages.length; i++) {
        if (tempDayMessagesGroup.date && i < messages.length) {
            if (!isEqualsDateMass(tempDayMessagesGroup.date, getMassDatesFromMass(messages[i]))) {
                addGroupMessagesToMonthGroupMessages();
            }
            tempDayMessagesGroup.date = getMassDatesFromMass(messages[i]);
        }
        if (i < messages.length) {
            if(tempMessagesGroup.userId && tempMessagesGroup.userId !== messages[i].userId) {
                addGroupToGroupMessages();
            }
            tempMessagesGroup.messages.push(messages[i]);
            tempMessagesGroup.userId = messages[i].userId;
        }
        else {
            if (tempDayMessagesGroup.date.length === 0) {
                tempDayMessagesGroup.date = getMassDatesFromMass(messages[i-1]);
            }
            addGroupMessagesToMonthGroupMessages();
        }
    }
    return (
        <Wrapper>
            <Content>
                { dayGroupMessages }
                <div ref={messagesEndRef} />
            </Content>
        </Wrapper>
    )
};

let getMassDatesFromMass = (messageDate) => {
    return [messageDate.sentAt[0], messageDate.sentAt[1], messageDate.sentAt[2]];
}

let isEqualsDateMass = (x, y) => {
    return x[0] === y[0] && x[1] === y[1] && x[2] === y[2];
}

export default Messages;