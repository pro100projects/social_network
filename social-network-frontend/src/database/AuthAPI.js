const BASE_URL = "http://localhost:8081";

const LOGIN = "/login";
const REGISTRATION = "/registration";
const PROFILE = "/user/profile";

const apiSettings = {
    login: async (userCreate) => {
        const endpoint = BASE_URL + LOGIN;
        return (await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userCreate)
        })).json();
    },
    getUser: async (jwtToken) => {
        console.log(jwtToken)
        const endpoint = BASE_URL + PROFILE;
        return (await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`
            }
        })).json();
    },
}

export default apiSettings;