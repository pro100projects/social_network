import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
// API
import ChatAPI from "../../database/ChatAPI";
import UserAPI from "../../database/UserAPI";

const nameOfSlice = 'chatSlice';

export const findUsers = createAsyncThunk(
    'findUsers',
    async (text, { getState, rejectWithValue }) => {
        try {
            const state = getState();
            return await UserAPI.findUsers(text, state.user.jwtToken);
        } catch (ex) {
            return rejectWithValue('Opps there seems to be an error')
        }
    }
);

export const findChat = createAsyncThunk(
    'fetchChat',
    async (anotherUserId, { getState, rejectWithValue }) => {
        try {
            const state = getState();
            return await ChatAPI.findChat(anotherUserId, state.user.jwtToken);
        } catch (ex) {
            return rejectWithValue('Opps there seems to be an error')
        }
    }
);

export const findChats = createAsyncThunk(
    'findChats',
    async (_, { getState, rejectWithValue }) => {
        try {
            const state = getState().user;
            return await ChatAPI.findChats(state.jwtToken);
        } catch (ex) {
            return rejectWithValue('Opps there seems to be an error')
        }
    }
);

export const sendMessage = createAsyncThunk(
    'sendMessage',
    /**
     * @param {string} chatId
     * @param {string} text - The text for new message
     * @param getState
     * @param rejectWithValue
     */
    async ({ text }, { getState, rejectWithValue }) => {
        try {
            const state = getState();
            return await ChatAPI.sendMessage(state.chat.chat.id, text.trim(), state.user.jwtToken);
        } catch (ex) {
            return rejectWithValue('Opps there seems to be an error')
        }
    }
);

export const updateMessage = createAsyncThunk(
    'updateMessage',
    async (text, { getState, rejectWithValue }) => {
        try {
            const state = getState();
            return await ChatAPI.updateMessage(state.chat.editMode.messageId, text.trim(), state.user.jwtToken);
        } catch (ex) {
            return rejectWithValue('Opps there seems to be an error')
        }
    }
);

export const deleteMessage = createAsyncThunk(
    'deleteMessage',
    async ({ messageId }, { getState, rejectWithValue }) => {
        try {
            const stateChat = getState();
            return await ChatAPI.deleteMessage(messageId, stateChat.user.jwtToken);
        } catch (ex) {
            return rejectWithValue('Opps there seems to be an error')
        }
    }
);


const chatSlice = createSlice({
    name: nameOfSlice,
    initialState: {
        searchUsers: [
            // {
            //     id: 2,
            //     avatar: '2avatar.jpg',
            //     name: 'Богдан',
            //     surname: 'Ткачук',
            //     username: 'pro100user',
            //     email: 'bogdan@gmail.com',
            //     phone: '380972553991',
            //     sex: 'MALE'
            // }
        ],
        chats: [
            // {
            //     "chatId": 2,
            //     "anotherUserId": 2,
            //     "userId": 3,
            //     "name": "name",
            //     "surname": "surname",
            //     "messageId": 7,
            //     "text": "А ти якк?",
            //     "sentAt": [
            //         2022,
            //         5,
            //         9,
            //         17,
            //         19,
            //         0,
            //         594468000
            //     ],
            //     "amountNotReadMessages": 0
            // }
        ],
        chat: {
            // "id": 2,
            // "users": [
            //     {
            //         "id": 3,
            //         "avatar": null,
            //         "name": "Вадім",
            //         "surname": "Скуратовський",
            //         "username": "vadim",
            //         "email": "vadim@gmail.com",
            //         "phone": "380958827299",
            //         "sex": "MALE"
            //     },
            //     {
            //         "id": 2,
            //         "avatar": null,
            //         "name": "Богдан",
            //         "surname": "Ткачук",
            //         "username": "pro100user",
            //         "email": "bogdan@gmail.com",
            //         "phone": "380972553991",
            //         "sex": "MALE"
            //     }
            // ],
            // "messages": [
            //     {
            //         "id": 2,
            //         "userId": 3,
            //         "chatId": 2,
            //         "text": "Привіт",
            //         "photo": null,
            //         "forwardId": null,
            //         "sentAt": [
            //             2022,
            //             5,
            //             9,
            //             17,
            //             17,
            //             0,
            //             594468000
            //         ],
            //         "readMessages": [
            //             2
            //         ],
            //         "likedMessages": [],
            //         "updated": false
            //     }
            // ],
        },
        selectedChat: {
            anotherUserId: ""
        },
        editMode: {
            isEdit: false,
            oldText: '',
            messageId: ''
        },
        isLoadingChat: false,
        error: ''
    },
    reducers: {
        setEditMode: (state, { payload }) => {
            state.editMode.isEdit = payload.isEdit;
            state.editMode.oldText = payload.text;
            state.editMode.messageId = payload.messageId;
        },
        setSelectedChat: (state, { payload }) => {
            state.selectedChat.anotherUserId = payload;
        }
    },
    extraReducers: {
        [findChat.pending]: (state) => {
            state.isLoadingChat = true;
        },
        [findChat.fulfilled]: (state, { payload }) => {
            state.chat = payload;
            state.isLoadingChat = false;
        },
        [findChat.rejected]: (state, { payload }) => {
            state.error = payload;
            state.isLoadingChat = false;
        },

        [findChats.pending]: (state) => {
            state.isLoadingChat = true;
        },
        [findChats.fulfilled]: (state, { payload }) => {
            state.chats = payload;
            state.isLoadingChat = false;
        },
        [findChats.rejected]: (state, { payload }) => {
            state.error = payload;
            state.isLoadingChat = false;
        },

        [sendMessage.pending]: (state) => {
            state.isLoadingChat = true;
        },
        [sendMessage.fulfilled]: (state, { payload }) => {
            state.chat.messages.push(payload);
            state.isLoadingChat = false;

            // change chats
            let position;
            let updatedChat;
            state.chats.forEach((chat, i) => {
                if (chat.chatId === payload.chatId) {
                    let myChat = state.chats[i];
                    myChat.text = payload.text;
                    myChat.sentAt = payload.sentAt;
                    myChat.userId = payload.userId;
                    myChat.messageId = payload.messageId;
                    updatedChat = myChat;
                    position = i;
                }
            });
            if (position !== 0) {
                state.chats.sort(compareBySentAtThenCreateAt);
            }
             else {
                state.chats[position] = updatedChat;
            }
        },
        [sendMessage.rejected]: (state, { payload }) => {
            state.error = payload;
            state.isLoadingChat = false;
        },

        [updateMessage.pending]: (state) => {
            state.isLoadingChat = true;
        },
        [updateMessage.fulfilled]: (state, { payload }) => {
            state.chat.messages.forEach((m, index) => {
                if(m.id === payload.id) {
                    state.chat.messages[index] = payload;
                }
            });
            state.isLoadingChat = false;

            // change chats
            state.chats.forEach((chat, i) => {
                if (chat.chatId === payload.chatId) {
                    if (state.chats[i].messageId === payload.id) {
                        let updateChat = state.chats[i];
                        updateChat.text = payload.text;
                        state.chats[i] = updateChat;
                    }
                }
            });
        },
        [updateMessage.rejected]: (state, { payload }) => {
            console.log(payload)
            state.error = payload;
            state.isLoadingChat = false;
        },

        [deleteMessage.pending]: (state) => {
            state.isLoadingChat = true;
        },
        [deleteMessage.fulfilled]: (state, { payload }) => {
            let index = -1;
            state.chat.messages.forEach((m, i) => {
                if(m.id === payload.id) {
                    index = i;
                }
            });
            state.chat.messages.splice(index, 1);
            state.isLoadingChat = false;

            // change chats
            if (state.chat.messages.length === index) {
                if (index !== 0) {
                    state.chats.forEach((chat, i) => {
                        if (chat.chatId === payload.chatId) {
                            let lastMessage = state.chat.messages[index - 1];
                            let updateChat = state.chats[i];
                            updateChat.text = lastMessage.text;
                            updateChat.sentAt = lastMessage.sentAt;
                            updateChat.userId = lastMessage.userId;
                            updateChat.messageId = lastMessage.messageId;
                            state.chats[i] = updateChat;
                        }
                    });
                }
                else {
                    state.chats.forEach((chat, i) => {
                        if (chat.chatId === payload.chatId) {
                            let updateChat = state.chats[i];
                            updateChat.text = null;
                            updateChat.sentAt = null;
                            updateChat.userId = null;
                            updateChat.messageId = null;
                            state.chats[i] = updateChat;
                        }
                    });
                }
                state.chats.sort(compareBySentAtThenCreateAt);
            }
        },
        [deleteMessage.rejected]: (state, { payload }) => {
            console.log(payload)
            state.error = payload;
            state.isLoadingChat = false;
        },

        [findUsers.pending]: (state) => {
            state.isLoadingChat = true;
        },
        [findUsers.fulfilled]: (state, { payload }) => {
            state.searchUsers = payload;
            state.isLoadingChat = false;
        },
        [findUsers.rejected]: (state, { payload }) => {
            state.error = payload;
            state.isLoadingChat = false;
        },
    }
});

export const { setEditMode, setSelectedChat } = chatSlice.actions;
export default chatSlice.reducer;

let compareBySentAtThenCreateAt = (b,a) => {
    if (!a.sentAt || !b.sentAt) {
        if (!a.sentAt && !b.sentAt) {
            let yearR = a.createdAt[0] - b.createdAt[0];
            let monthR = a.createdAt[1] - b.createdAt[1];
            let dayR = a.createdAt[2] - b.createdAt[2];
            let hourR = a.createdAt[3] - b.createdAt[3];
            let minuteR = a.createdAt[4] - b.createdAt[4];
            let millisR = a.createdAt[5] - b.createdAt[5];
            if (yearR !== 0) {
                return yearR;
            }
            if (monthR !== 0) {
                return monthR;
            }
            if (dayR !== 0) {
                return dayR;
            }
            if (hourR !== 0) {
                return hourR;
            }
            if (minuteR !== 0) {
                return minuteR;
            }
            return millisR;
        }
        return +1;
    }
    let yearR = a.sentAt[0] - b.sentAt[0];
    let monthR = a.sentAt[1] - b.sentAt[1];
    let dayR = a.sentAt[2] - b.sentAt[2];
    let hourR = a.sentAt[3] - b.sentAt[3];
    let minuteR = a.sentAt[4] - b.sentAt[4];
    let millisR = a.sentAt[5] - b.sentAt[5];
    if (yearR !== 0) {
        return yearR;
    }
    if (monthR !== 0) {
        return monthR;
    }
    if (dayR !== 0) {
        return dayR;
    }
    if (hourR !== 0) {
        return hourR;
    }
    if (minuteR !== 0) {
        return minuteR;
    }
    return millisR;
};
