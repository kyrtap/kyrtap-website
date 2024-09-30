let windows = [];
let bouncing = false;

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

    newWindow.querySelector('.title-bar button').onclick = function() {
        closeWindow(this);
    };

    windows.push(newWindow);
}

function closeWindow(buttonElement) {
    var windowElement = buttonElement.closest('.window');
    windows = windows.filter(win => win !== windowElement);
    windowElement.remove();
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

function startBouncing() {
    if (bouncing) return;
    bouncing = true;

    const bounceSpeed = 2;
    const directions = [];

    windows.forEach(windowElement => {
        directions.push({
            x: Math.random() > 0.5 ? bounceSpeed : -bounceSpeed,
            y: Math.random() > 0.5 ? bounceSpeed : -bounceSpeed,
        });
    });

    function animate() {
        windows.forEach((windowElement, index) => {
            const rect = windowElement.getBoundingClientRect();
            let direction = directions[index];

            if (rect.left <= 0 || rect.right >= window.innerWidth) {
                direction.x *= -1;
            }
            if (rect.top <= 0 || rect.bottom >= window.innerHeight - 40) {
                direction.y *= -1;
            }

            windowElement.style.left = (rect.left + direction.x) + 'px';
            windowElement.style.top = (rect.top + direction.y) + 'px';
        });

        requestAnimationFrame(animate);
    }

    animate();
}

window.onload = function() {
    centerWindow();
    updateClock();
    setInterval(updateClock, 200);

    var messageWindow = document.getElementById('messageWindow');
    makeWindowDraggable(messageWindow);

    windows.push(messageWindow);

    document.getElementById('clock').onclick = startBouncing;
};
