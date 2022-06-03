var stompClient = null;

const setConnected = (connected) => {
    document.getElementById('connect').disabled = connected;
    document.getElementById('disconnect').disabled = !connected;
    document.getElementById('conversationDiv').style.visibility
        = connected ? 'visible' : 'hidden';
    document.getElementById('messages').innerHTML = '';
}

const connect = () => {
    var socket = new SockJS('/chat');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/messages', function (message) {

        })
    })
}

const disconnect = () => {
    if(stompClient !== null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log('Disconnected');
}

const sendMessage = () => {

}