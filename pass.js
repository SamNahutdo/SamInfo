const CORRECT_PIN = "218";
        let currentPin = "";

        function updatePinDisplay() {
            const pinSpans = document.querySelectorAll('#pinDisplay span');
            pinSpans.forEach((span, index) => {
                span.textContent = currentPin[index] || "";
                span.style.color = currentPin[index] ? "#000000" : "#cccccc";
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
            for (let i = 0; i < 50; i++) {
                const heart = document.createElement('div');
                heart.className = 'heart';
                heart.style.left = Math.random() * 100 + 'vw';
                heart.style.animationDelay = Math.random() * 2 + 's';
                heart.textContent = '😱', 'kulbaan';
                container.appendChild(heart);
            }
            setTimeout(() => {
                container.innerHTML = '';
            }, 6000);
        }

        function checkLove() {
            const message = document.getElementById('message');
            
            if (currentPin === CORRECT_PIN) {
                message.style.color = "var(--success)";
                message.textContent = "Access Accepted";
                createHearts();
                clearInput();
                
                proceedToNextFile();
            } else {
                message.style.color = "var(--accent)";
                message.textContent = "Access Denied";
                setTimeout(() => {
                    message.textContent = "";
                }, 2000);
                
                preventProceeding();
            }
        }

        function showStyledAlert(message, callback) {
            
            const existing = document.getElementById("customAlertOverlay");
            if (existing) existing.remove();
        
            const overlay = document.createElement("div");
            overlay.id = "customAlertOverlay";
            Object.assign(overlay.style, {
                position: "fixed",
                top: "0",
                left: "0",
                width: "100vw",
                height: "100vh",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 10000
            });
        
            const box = document.createElement("div");
            Object.assign(box.style, {
                backgroundColor: "#ffffff",
                padding: "30px",
                borderRadius: "16px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                textAlign: "center",
                maxWidth: "400px",
                width: "80%",
                fontFamily: "Arial, sans-serif",
                transform: "scale(0.95)",
                transition: "transform 0.2s ease",
            });
        
            const text = document.createElement("div");
            text.innerText = message;
            Object.assign(text.style, {
                fontSize: "18px",
                color: "#333",
                marginBottom: "20px"
            });
        
            const button = document.createElement("button");
            button.innerText = "OK";
            Object.assign(button.style, {
                padding: "10px 20px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                fontSize: "16px",
                cursor: "pointer",
            });
        
            button.onmouseover = () => button.style.backgroundColor = "#0056b3";
            button.onmouseleave = () => button.style.backgroundColor = "#007bff";
        
            button.onclick = () => {
                overlay.remove();
                if (typeof callback === "function") callback();
            };
        
            box.appendChild(text);
            box.appendChild(button);
            overlay.appendChild(box);
            document.body.appendChild(overlay);
        
            requestAnimationFrame(() => {
                box.style.transform = "scale(1)";
            });
        }


        function proceedToNextFile() {
            showStyledAlert("Wow nakahibaw lagi ka???", () => {
                window.location.href = "lifeExperienced.html";
            });
        }
        
        function preventProceeding() {
            showStyledAlert("D oroy gihapon nimo mahibaw-an HAHAHAH");
        }
        



        
