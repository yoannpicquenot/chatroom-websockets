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

function applyHtml(cb) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementsByTagName('main')[0].innerHTML = this.responseText;
            document.dispatchEvent(new Event('htmlReady'));
        }
    };
    xhttp.open("GET", window.history.state.urlPath, true);
    xhttp.send();
}

var sendMessage = function sendMessage() {
    socket.emit('message', {
        username,
        message: document.getElementsByName('msg-input')[0].value
    });

    document.getElementsByName('msg-input')[0].value = '';
}

redirect();
applyHtml();

document.addEventListener('htmlReady', function() {
    if (window.location.pathname === '/login') {
        document.forms[0].onsubmit = function(e) {
            username = document.forms[0]['username'].value;
            e.preventDefault();
            socket = io.connect('http://localhost:5000');
            window.history.pushState({
                'urlPath': 'views/chatroom.html'
            }, null, '/chatroom');
            applyHtml();
            socket.emit('connected', {
                username
            });
            socket.on('message', function(data) {
                document.getElementsByClassName('msg-container')[0].innerHTML += `
                <div class='card blue white-text'>
                <div class='card-content'>${data}</div>
                </div>
                `;
            });

            return false;
        }
    } else {

    }
});
