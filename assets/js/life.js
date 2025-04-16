
const customAlertSystem = (function() {

    const style = document.createElement('style');
    style.textContent = `
        .custom-alert-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.85);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 99999;
            backdrop-filter: blur(8px);
            animation: fadeIn 0.3s ease;
        }
        
        .custom-alert-container {
            background: linear-gradient(145deg, #ff4757, #ff6b81);
            color: white;
            width: 90%;
            max-width: 400px;
            padding: 25px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            text-align: center;
            transform: scale(0.9);
            animation: popIn 0.3s ease forwards;
            border: 2px solid rgba(255, 255, 255, 0.2);
        }
        
        .custom-alert-emoji {
            font-size: 3rem;
            margin-bottom: 15px;
            animation: bounce 1s infinite alternate;
        }
        
        .custom-alert-message {
            font-size: 1.1rem;
            line-height: 1.5;
            margin-bottom: 20px;
            font-weight: 600;
            text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
        }
        
        .custom-alert-btn {
            background: white;
            color: #ff4757;
            border: none;
            padding: 12px 30px;
            border-radius: 50px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
            font-size: 1rem;
        }
        
        .custom-alert-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes popIn {
            to { transform: scale(1); }
        }
        
        @keyframes bounce {
            to { transform: translateY(-10px); }
        }
        
        /* For the visibility change effect */
        .page-hidden {
            position: fixed;
            width: 100%;
            height: 100%;
            background: #111;
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.5rem;
            z-index: 999999;
        }
    `;
    document.head.appendChild(style);

    function showAlert(message, emoji = '⚠️') {
        const overlay = document.createElement('div');
        overlay.className = 'custom-alert-overlay';
        
        const container = document.createElement('div');
        container.className = 'custom-alert-container';
        
        const emojiEl = document.createElement('div');
        emojiEl.className = 'custom-alert-emoji';
        emojiEl.textContent = emoji;
        
        const messageEl = document.createElement('div');
        messageEl.className = 'custom-alert-message';
        messageEl.textContent = message;
        
        const button = document.createElement('button');
        button.className = 'custom-alert-btn';
        button.textContent = 'Okay';
        button.onclick = () => document.body.removeChild(overlay);
        
        container.appendChild(emojiEl);
        container.appendChild(messageEl);
        container.appendChild(button);
        overlay.appendChild(container);
        document.body.appendChild(overlay);
        
        setTimeout(() => {
            if (document.body.contains(overlay)) {
                document.body.removeChild(overlay);
            }
        }, 5000);
    }

    function handleVisibilityChange() {
        if (document.visibilityState === 'hidden') {
            const hiddenScreen = document.createElement('div');
            hiddenScreen.className = 'page-hidden';
            hiddenScreen.innerHTML = `
                <div style="text-align: center; padding: 20px;">
                    <div style="font-size: 3rem; margin-bottom: 20px;">🙅‍♂️</div>
                    <div>Bantayg nang save huh 😑</div>
                </div>
            `;
            document.body.appendChild(hiddenScreen);
            
            setTimeout(() => {
                if (document.body.contains(hiddenScreen)) {
                    document.body.removeChild(hiddenScreen);
                }
            }, 2000);
        }
    }

    return {
        showAlert,
        handleVisibilityChange
    };
})();

function applySecurityMeasures() {

    const preventGestureScreenshot = (e) => {
        if (e.touches.length > 2) { 
            e.preventDefault();
            customAlertSystem.showAlert('Kay nag screenshot man ka,\nnaa nakay record! 😑', '📸');
        }
    };
    document.addEventListener('touchstart', preventGestureScreenshot, { passive: false });

    document.addEventListener('visibilitychange', customAlertSystem.handleVisibilityChange);

    document.addEventListener('keydown', function(e) {
        if ((e.key === 'volumeDown' || e.key === 'volumeUp') && e.ctrlKey) {
            e.preventDefault();
            customAlertSystem.showAlert('Screenshot detected! You have been recorded. 😑', '📷');
        }
    });

    document.addEventListener("contextmenu", function(e) {
        e.preventDefault();
        customAlertSystem.showAlert("Bawal mag right click! 😑", '🖱️');
    });

    document.addEventListener("copy", function(e) {
        e.preventDefault();
        customAlertSystem.showAlert("Bawal mag og copy text! 😑", '📋');
    });

    const preventPrintScreen = function(e) {
        customAlertSystem.showAlert("Bawal lagi mag screenshot! 😑", '📸');
        e.preventDefault();
        navigator.clipboard.writeText("");
    };
    document.addEventListener("keydown", function(e) {
        if (e.key === "PrintScreen") preventPrintScreen(e);
    });
    document.addEventListener("keyup", function(e) {
        if (e.key === "PrintScreen") preventPrintScreen(e);
    });

    document.addEventListener("keydown", function(e) {
        if (
            (e.ctrlKey && (e.key === "f" || e.key === "F" || e.key === "t" || e.key === "T" || 
             e.key === "u" || e.key === "U" || e.key === "s" || e.key === "S")) || 
            e.key === "F12" || 
            (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "i"))
        ) {
            e.preventDefault();
            customAlertSystem.showAlert("Unsaon man nimo tahay? 😑!", '👨‍💻');
        }
    });

    document.addEventListener("click", function(event) {
        if (event.target.matches(".open")) {
            document.body.classList.add("fixed");
        }
    }, false);
    
    document.addEventListener("keydown", function(e) {
        if (e.keyCode === 13) { 
            document.activeElement.click();
            document.body.classList.add("fixed");
        }
    }, false);
    
    document.addEventListener("click", function(event) {
        if (event.target.matches(".close")) {
            document.body.classList.remove("fixed");
        }
    }, false);
    
    document.addEventListener("keydown", function(e) {
        if (e.keyCode === 27) { 
            const closeButton = document.activeElement.querySelector(".close");
            if (closeButton) {
                closeButton.click();
            }
            document.body.classList.remove("fixed");
        }
    }, false);
}

applySecurityMeasures();
