import React, {useEffect} from 'react';
// Styles
import {
    Wrapper,
    StyledFormContainer,
    InputContainer,
    EditContainer,
    EditImg,
    EditImgEnd,
    EditTextContainer,
    EditTextTitle,
    EditTextContent
} from './WriteMessages.styles';
// Images
import sendMessageImg from '../../../../image/sendMessage.png';
import editModeBlueImg from '../../../../image/editedBlue.svg';
import closeImg from '../../../../image/close.png';
// Redux
import {sendMessage, setEditMode, updateMessage} from "../../../../redux/slice/chatSlice";
import { useDispatch, useSelector } from "react-redux";
// Formik
import { Field, Form, Formik } from "formik";
// Other
import TextareaAutosize from 'react-textarea-autosize';


const WriteMessages = () => {
    const dispatch = useDispatch();
    const editMode = useSelector(state => state.chat.editMode)

    const closeEditMode = () => {
        dispatch(setEditMode({
            isEdit: false,
            text: '',
            messageId: null
        }))
    }

    return (
        <Wrapper>
            <Formik
                initialValues={{
                    message: editMode.isEdit ? editMode.oldText : '',
                }}
                enableReinitialize
                onSubmit={
                    async (values) => {
                        editMode.isEdit
                            ? dispatch(updateMessage(values.message))
                            : dispatch(sendMessage({
                                text: values.message
                            }));
                        values.message = '';
                        editMode.isEdit && dispatch(setEditMode({
                            isEdit: false,
                            text: '',
                            messageId: ''
                        }))
                    }}
            >
                {formik => {
                    const handleUserKeyPress = e => {
                        if (e.key === "Enter" && !e.shiftKey && formik.values.message !== '') {
                            formik.handleSubmit();
                            e.preventDefault();
                        }
                        if (e.key === "Enter" && !e.shiftKey && formik.values.message === '') {
                            e.preventDefault();
                        }
                    };
                    return (
                        <Form>
                            <StyledFormContainer>
                                <InputContainer>
                                    { editMode.isEdit &&
                                    <EditContainer>
                                        <EditImg src={editModeBlueImg}/>
                                        <EditTextContainer>
                                            <EditTextTitle>Editing</EditTextTitle>
                                            <EditTextContent>{editMode.oldText}</EditTextContent>
                                        </EditTextContainer>
                                        <EditImgEnd src={closeImg} onClick={closeEditMode}/>
                                    </EditContainer> }
                                    <Field name="message">
                                        {({ field, form, meta }) => {
                                            return <TextareaAutosize
                                                {...field} id="message"
                                                minRows={1}
                                                maxRows={10}
                                                className='textarea'
                                                placeholder="message"
                                                onKeyPress={handleUserKeyPress}/>
                                        }}
                                    </Field>
                                </InputContainer>
                                {formik.values.message
                                    ? <button type="submit" className='submit'>
                                        <img src={sendMessageImg}/>
                                    </button>
                                    : <button type="submit" className='submit' disabled={true}>
                                        <img src={sendMessageImg}/>
                                    </button>
                                }
                            </StyledFormContainer>
                        </Form>
                    )
                }}
            </Formik>
        </Wrapper>
    )
};

export default WriteMessages;