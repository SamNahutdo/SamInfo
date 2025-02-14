const CORRECT_PIN = "218";
let currentPin = "";

function updatePinDisplay() {
    const pinSpans = document.querySelectorAll('#pinDisplay span');
    pinSpans.forEach((span, index) => {
        span.textContent = currentPin[index] || "";
        span.style.color = currentPin[index] ? "#000000" : "#000000";
    });
}

function appendNumber(num) {
    if (currentPin.length < 3) {
        currentPin += num;
        updatePinDisplay();
    }
}

function deleteNumber() {
    currentPin = currentPin.slice(0, -1);
    updatePinDisplay();
}

function clearInput() {
    currentPin = "";
    updatePinDisplay();
}

function createHearts() {
    const container = document.querySelector('.floating-hearts');
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDelay = Math.random() * 2 + 's';
        heart.textContent = '❤️';
        container.appendChild(heart);
    }
    setTimeout(() => {
        container.innerHTML = '';
    }, 6000);
}

function checkLove() {
    const message = document.getElementById('message');
    
    if (currentPin === CORRECT_PIN) {
        message.style.color = "#000000";
        message.textContent = "Access Accepted";
        createHearts();
        clearInput();
        
        proceedToNextFile();
    } else {
        message.style.color = "#000000";
        message.textContent = "Access Denied";
        setTimeout(() => {
            message.textContent = "";
        }, 2000);
        
        preventProceeding();
    }
}

function proceedToNextFile() {
    
    alert("Wow nakahibaw lagi ka???");
    window.location.href = "lifeExperienced.html";
}

function preventProceeding() {
    
    alert("Ngii d dei ko ");
    
}