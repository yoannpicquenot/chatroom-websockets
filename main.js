var username;
var socket;

function redirect() {
    if (window.location.pathname !== '/login') {
        window.history.pushState({
            urlPath: 'views/login.html'
        }, null, '/login');
        window.location.pathname = '/login';
    }
}

function applyHtml() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementsByTagName('main')[0].innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", window.history.state.urlPath, true);
    xhttp.send();
}

var connection = function connection() {
    socket = io.connect('http://55764eff.ngrok.io');
    window.history.pushState({
        'urlPath': 'views/chatroom.html'
    }, null, '/chatroom');
    applyHtml();

    username = document.forms[0]['username'].value;
    socket.emit('connected', { username });

    socket.on('message', function(data) {
        document.getElementsByClassName('msg-container')[0].innerHTML += `<p>${data}</p>`;
    });
}

var sendMessage = function sendMessage() {
    console.log(document.forms);
    socket.emit('message', {username, message: document.getElementsByName('msg-input')[0].value});
}

/*(function() {*/
redirect();
applyHtml(window.location.pathname);
/*})();*/
