const BASE_URL = "http://localhost:8081";

const GET_USERS = `/user/search?search=`;

const UserAPI = {
    findUsers: async (text, jwtToken) => {
        const endpoint = BASE_URL + GET_USERS + text;
        return (await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            },
        })).json();
    }
}

export default UserAPI;
