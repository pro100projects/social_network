export default (errorCode) => {
    switch(errorCode) {
        case 401: {
            return "Wrong password or email";
        }
        default: {
            return "";
        }
    }
}