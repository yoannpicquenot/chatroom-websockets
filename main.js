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
    var objDiv = document.getElementsByClassName('msg-container')[0];
    objDiv.scrollTop = objDiv.scrollHeight;
}

redirect();
applyHtml();

document.addEventListener('htmlReady', function() {
    if (window.location.pathname === '/login') {
        document.getElementsByName('loginform')[0].onsubmit = function(e) {
            username = document.forms[0]['username'].value;
            e.preventDefault();
            socket = io.connect('http://localhost:5000');
            window.history.pushState({
                'urlPath': 'views/chatroom.html'
            }, null, '/chatroom');
            applyHtml();
            document.addEventListener('htmlReady', function() {
                socket.emit('connected', {
                    username
                });
                socket.on('message', function(data) {
                    var objDiv = document.getElementsByClassName('msg-container')[0];
                    objDiv.innerHTML += `
                    <div class='message'>
                    <div class='message-content'>${data}</div>
                    </div>
                    `;
                    objDiv.scrollTop = objDiv.scrollHeight;
                });
                socket.on('userconnection', function(data) {
                    document.getElementsByClassName('msg-container')[0].innerHTML += `
                        <p>${data}</p>
                    `;
                    var objDiv = document.getElementsByClassName('msg-container')[0];
                    objDiv.scrollTop = objDiv.scrollHeight;
                });
                socket.on('userdisconnected', function(data) {
                    document.getElementsByClassName('msg-container')[0].innerHTML += `
                        <p>${data}</p>
                    `;
                    var objDiv = document.getElementsByClassName('msg-container')[0];
                    objDiv.scrollTop = objDiv.scrollHeight;
                });
                window.onbeforeunload = function() {
                    socket.emit('userdisconnection', username);
                };
                document.getElementsByName('messageform')[0].onsubmit = function(e) {
                    e.preventDefault();
                    sendMessage();
                }
            });

            return false;
        }
    }
});
