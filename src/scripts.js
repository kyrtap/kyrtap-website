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

    makeWindowDraggable(newWindow);
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

function makeWindowDraggable(windowElement) {
    var titleBar = windowElement.querySelector('.title-bar');
    var offsetX = 0, offsetY = 0, initialX = 0, initialY = 0, isDragging = false;

    titleBar.onmousedown = function(e) {
        isDragging = true;
        initialX = e.clientX;
        initialY = e.clientY;
        var rect = windowElement.getBoundingClientRect();
        offsetX = initialX - rect.left;
        offsetY = initialY - rect.top;

        document.onmousemove = function(e) {
            if (isDragging) {
                var newX = e.clientX - offsetX;
                var newY = e.clientY - offsetY;
                windowElement.style.left = newX + 'px';
                windowElement.style.top = newY + 'px';
            }
        };

        document.onmouseup = function() {
            isDragging = false;
            document.onmousemove = null;
            document.onmouseup = null;
        };
    };
}

window.onload = function() {
    centerWindow();
    updateClock();
    setInterval(updateClock, 1000);

    // Make the initial window draggable
    var messageWindow = document.getElementById('messageWindow');
    makeWindowDraggable(messageWindow);
};
