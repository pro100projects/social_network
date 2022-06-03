import React from "react";
// Styles
import {
    Wrapper,
    ContentMessage,
    TextMessage,
    DataMessage,
    AdditionalContent,
    ExtraMessageInfoRow,
    ExtraMessageInfoImg
} from "./Message.styles";
// Image
import editedImg from '../../../../../image/edited.svg';
import copyImg from '../../../../../image/copy.svg';
import seenImg from '../../../../../image/seen.png';
import deleteImg from '../../../../../image/delete.svg';
// Redux
import { useDispatch } from "react-redux";
import { deleteMessage, setEditMode } from "../../../../../redux/slice/chatSlice";
// Components
import MyCustomContextMenu from "../../../../util/context_menu/ContextMenu";
// Other
import getDateForShow from "../../../../util/getDateForShow";

const Message = ({ id , text, sentAt, isEdited, isRead, isMe }) => {
    const dispatch = useDispatch();
    const shortData = `${getDateForShow(sentAt[3])}:${getDateForShow(sentAt[4])}`;
    const contextMenuItems = [
        {
            name: 'Copy',
            icon: copyImg,
            action: async () => {
                await navigator.clipboard.writeText(text);
            }
        },
    ];

    if (isMe) {
        contextMenuItems.push({
            name: 'Edit',
            icon: editedImg,
            action: () => {dispatch(setEditMode({
                isEdit: true,
                text: text,
                messageId: id
            }))}
        })
        contextMenuItems.push({
            name: 'Delete',
            icon: deleteImg,
            action: () => {dispatch(deleteMessage({
                messageId: id
            }))},
            extraStyle: 'dangerous'
        })
    }

    return (
        <>
            <Wrapper id={id}>
                <ContentMessage>
                    <TextMessage>{text}</TextMessage>
                    <AdditionalContent>
                        <ExtraMessageInfoRow>
                            { isRead && <ExtraMessageInfoImg src={seenImg} /> }
                            { isEdited && <ExtraMessageInfoImg src={editedImg} /> }
                        </ExtraMessageInfoRow>
                        <DataMessage>{shortData}</DataMessage>
                    </AdditionalContent>
                </ContentMessage>
            </Wrapper>
            <MyCustomContextMenu
                targetId={id}
                items={contextMenuItems}
            />
        </>
    )
}

export default Message;