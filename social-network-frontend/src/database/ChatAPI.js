const BASE_URL = "http://localhost:8081";

const GET_CHATS = `/chats`;
const GET_CHAT = `/chats/get-chat`;
const SEND_MESSAGE = `/chats/sendMessage`;
const DELETE_MESSAGE = `/chats/deleteMessage`;
const UPDATE_MESSAGE = `/chats/updateMessage`;

const ChatAPI = {
    findChat: async (anotherUserId, jwtToken) => {
        const endpoint = BASE_URL + GET_CHAT;
        return (await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`
            },
            body: JSON.stringify({ userId: `${anotherUserId}` })
        })).json();
    },
    findChats: async (jwtToken) => {
        const endpoint = BASE_URL + GET_CHATS;
        return (await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`
            }
        })).json();
    },
    sendMessage: async (chatId, text, jwtToken) => {
        const endpoint = BASE_URL + SEND_MESSAGE;
        return (await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`
            },
            body: JSON.stringify({
                chatId: `${chatId}`,
                text: `${text}`
            })
        })).json();
    },
    updateMessage: async (messageId, text, jwtToken) => {
        const endpoint = BASE_URL + UPDATE_MESSAGE;
        return (await fetch(endpoint, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`
            },
            body: JSON.stringify({
                messageId: `${messageId}`,
                text: `${text}`
            })
        })).json();
    },
    deleteMessage: async (messageId, jwtToken) => {
        const endpoint = BASE_URL + DELETE_MESSAGE;
        return (await fetch(endpoint, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`
            },
            body: JSON.stringify({
                messageId: `${messageId}`
            })
        })).json();
    }
}

export default ChatAPI;