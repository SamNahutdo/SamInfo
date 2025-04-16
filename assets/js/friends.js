
const style = document.createElement('style');
style.textContent = `
  .custom-alert-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    backdrop-filter: blur(5px);
  }
  
  .custom-alert-box {
    background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
    color: white;
    padding: 25px;
    border-radius: 15px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.3);
    max-width: 80%;
    text-align: center;
    animation: alertPop 0.3s ease-out;
    border: 2px solid white;
  }
  
  @keyframes alertPop {
    0% { transform: scale(0.8); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
  }
  
  .custom-alert-message {
    font-size: 1.2rem;
    margin-bottom: 20px;
    font-weight: bold;
    text-shadow: 1px 1px 3px rgba(0,0,0,0.2);
  }
  
  .custom-alert-button {
    background: white;
    color: #ff6b6b;
    border: none;
    padding: 10px 25px;
    border-radius: 50px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }
  
  .custom-alert-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0,0,0,0.15);
  }
  
  .custom-alert-emoji {
    font-size: 2rem;
    margin-bottom: 15px;
    display: block;
  }
`;
document.head.appendChild(style);

function showCustomAlert(message) {
  const overlay = document.createElement('div');
  overlay.className = 'custom-alert-overlay';
  
  const alertBox = document.createElement('div');
  alertBox.className = 'custom-alert-box';
  
  const emoji = document.createElement('div');
  emoji.className = 'custom-alert-emoji';
  emoji.textContent = '⚠️';
  
  const messageElement = document.createElement('div');
  messageElement.className = 'custom-alert-message';
  messageElement.textContent = message;
  
  const button = document.createElement('button');
  button.className = 'custom-alert-button';
  button.textContent = 'OK';
  button.onclick = function() {
    document.body.removeChild(overlay);
  };
  
  alertBox.appendChild(emoji);
  alertBox.appendChild(messageElement);
  alertBox.appendChild(button);
  overlay.appendChild(alertBox);
  document.body.appendChild(overlay);
  
  setTimeout(() => {
    if (document.body.contains(overlay)) {
      document.body.removeChild(overlay);
    }
  }, 5000);
}

function replaceAlerts() {
 
  const preventGestureScreenshot = (e) => {
    if (e.touches.length > 2) { 
      e.preventDefault();
      showCustomAlert('Kay nag screenshot man ka,\nnaa nakay record! 😑');
    }
  };

  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') {
      showCustomAlert('Bantayg nang save huh 😑');
      document.body.style.display = 'none'; 
      setTimeout(() => {
        document.body.style.display = ''; 
      }, 2000);
    }
  });

  document.addEventListener('keydown', function (e) {
    if ((e.key === 'volumeDown' || e.key === 'volumeUp') && e.ctrlKey) {
      e.preventDefault();
      showCustomAlert('Screenshot detected! You have been recorded. 😑');
    }
  });

  document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
    showCustomAlert("Bawal mag right click! 😑");
  });

  document.addEventListener("copy", function (e) {
    e.preventDefault();
    showCustomAlert("Bawal mag og copy text! 😑");
  });

  const printScreenAlert = function(e) {
    showCustomAlert("Bawal lagi mag screenshot! 😑");
    e.preventDefault();
    navigator.clipboard.writeText(""); 
  };
  
  document.addEventListener("keydown", function (e) {
    if (e.key === "PrintScreen") printScreenAlert(e);
  });

  document.addEventListener("keyup", function (e) {
    if (e.key === "PrintScreen") printScreenAlert(e);
  });

  document.addEventListener("keydown", function (e) {
    if (
      e.ctrlKey && (e.key === "f" || e.key === "F" || e.key === "t" || e.key === "T" || e.key === "u" || e.key === "U" || e.key === "s" || e.key === "S") || 
      e.key === "F12" || 
      (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "i")))
    {
      e.preventDefault();
      showCustomAlert("Unsaon man nimo tahay? 😑!");
    }
  });
}

replaceAlerts();
