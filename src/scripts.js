function spawnWindow() {
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var messageWindow = document.getElementById('messageWindow');
    var windowRect = messageWindow.getBoundingClientRect();

    var newWindow = messageWindow.cloneNode(true);
    document.body.appendChild(newWindow);

    var newLeft = Math.floor(Math.random() * (windowWidth - windowRect.width));
    var newTop = Math.floor(Math.random() * (windowHeight - windowRect.height - 40));
    newWindow.style.left = newLeft + 'px';
    newWindow.style.top = newTop + 'px';

    newWindow.querySelector('.button').onclick = spawnWindow;
}

function centerWindow() {
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var messageWindow = document.getElementById('messageWindow');
    var windowRect = messageWindow.getBoundingClientRect();
    var centerX = (windowWidth - windowRect.width) / 2;
    var centerY = (windowHeight - windowRect.height - 40) / 2;
    messageWindow.style.left = centerX + 'px';
    messageWindow.style.top = centerY + 'px';
}

function updateClock() {
    var now = new Date();
    var hours = now.getHours().toString().padStart(2, '0');
    var minutes = now.getMinutes().toString().padStart(2, '0');
    document.getElementById('clock').textContent = hours + ':' + minutes;
}

window.onload = function() {
    centerWindow();
    updateClock();
    setInterval(updateClock, 1000);
};
