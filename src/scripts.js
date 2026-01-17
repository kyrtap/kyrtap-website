let windows = [];
let bouncing = false;

function spawnWindow(e) {
    if (e) {
        e.stopPropagation();
    }
    
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var messageWindow = document.getElementById('messageWindow');
    var windowRect = messageWindow.getBoundingClientRect();

    var newWindow = messageWindow.cloneNode(true);
    document.body.appendChild(newWindow);

    var newLeft = Math.floor(Math.random() * (windowWidth - windowRect.width));
    var newTop = Math.floor(Math.random() * (windowHeight - windowRect.height - 32));
    newWindow.style.left = newLeft + 'px';
    newWindow.style.top = newTop + 'px';

    newWindow.querySelector('.button').onclick = function(e) {
        spawnWindow(e);
    };

    makeWindowDraggable(newWindow);

    newWindow.querySelector('.title-bar button').onclick = function(e) {
        e.stopPropagation();
        closeWindow(this);
    };

    windows.push(newWindow);
    setActiveWindow(newWindow);
}

function closeWindow(buttonElement, e) {
    if (e) {
        e.stopPropagation();
    }
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
    var centerY = (windowHeight - windowRect.height - 32) / 2;
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

    windowElement.onmousedown = function(e) {
        if (e.target.classList.contains('button') || 
            e.target.closest('.title-bar button') ||
            e.target.closest('.button')) {
            return;
        }
        setActiveWindow(windowElement);
    };

    titleBar.onmousedown = function(e) {
        isDragging = true;
        initialX = e.clientX;
        initialY = e.clientY;
        var rect = windowElement.getBoundingClientRect();
        offsetX = initialX - rect.left;
        offsetY = initialY - rect.top;
        setActiveWindow(windowElement);

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

function setActiveWindow(windowElement) {
    windows.forEach(win => win.classList.remove('active'));
    windowElement.classList.add('active');
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
            if (rect.top <= 0 || rect.bottom >= window.innerHeight - 32) {
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
    setInterval(updateClock, 1000);

    var messageWindow = document.getElementById('messageWindow');
    makeWindowDraggable(messageWindow);
    setActiveWindow(messageWindow);

    windows.push(messageWindow);
    
    var dolphinIcon = document.getElementById('dolphinIcon');
    dolphinIcon.onclick = function(e) {
        e.stopPropagation();
        selectDesktopIcon(dolphinIcon);
        setTimeout(startBouncing, 200);
    };
    
    document.getElementById('desktop').onclick = function(e) {
        if (e.target === this) {
            deselectDesktopIcons();
        }
    };
};

function selectDesktopIcon(iconElement) {
    deselectDesktopIcons();
    iconElement.classList.add('selected');
}

function deselectDesktopIcons() {
    var icons = document.querySelectorAll('.desktop-icon');
    icons.forEach(icon => icon.classList.remove('selected'));
}
