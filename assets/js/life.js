        const preventGestureScreenshot = (e) => {
            if (e.touches.length > 2) { 
                e.preventDefault();
                alert('kay nag screenshot man ka,\nnaa nakay record! 😑');
            }
        };

        document.addEventListener('touchstart', preventGestureScreenshot, { passive: false });

        
        document.addEventListener('visibilitychange', function () {
            if (document.visibilityState === 'hidden') {
                alert('Bantayg nang save huh 😑');
                document.body.style.display = 'none'; 
                setTimeout(() => {
                    document.body.style.display = ''; 
                }, 2000);
            }
        });

        document.addEventListener('keydown', function (e) {
            if ((e.key === 'volumeDown' || e.key === 'volumeUp') && e.ctrlKey) {
                e.preventDefault();
                alert('Screenshot detected! You have been recorded. 😑');
            }
        });


        document.addEventListener("contextmenu", function (e) {
            e.preventDefault();
            alert("Bawal mag right click! 😑");
        });
        
        document.addEventListener("copy", function (e) {
            e.preventDefault();
            alert("Bawal mag og copy text! 😑");
        });
        
        document.addEventListener("keydown", function (e) {
            if (e.key === "PrintScreen") {
                alert("Bawal lagi mag screenshot! 😑");
                e.preventDefault();
                navigator.clipboard.writeText(""); 
            }
        });
        
        document.addEventListener("keyup", function (e) {
            if (e.key === "PrintScreen") {
                alert("Bawal lagi mag screenshot! 😑");
                e.preventDefault();
                navigator.clipboard.writeText(""); 
            }
        });
        
        document.addEventListener("keydown", function (e) {
        
            if (
                e.ctrlKey && (e.key === "f" || e.key === "F" || e.key === "t" || e.key === "T" || e.key === "u" || e.key === "U" || e.key === "s" || e.key === "S") || 
                e.key === "F12" || 
                (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "i")) 
            ) {
                e.preventDefault();
                alert("Unsaon man nimo tahay? 😑!");
            }
        });
        
        document.addEventListener("click", function (event) {
            if (event.target.matches(".open")) {
                document.body.classList.add("fixed");
            }
        }, false);
        
        document.addEventListener("keydown", function (e) {
            if (e.keyCode === 13) { 
                document.activeElement.click();
                document.body.classList.add("fixed");
            }
        }, false);
        
        document.addEventListener("click", function (event) {
            if (event.target.matches(".close")) {
                document.body.classList.remove("fixed");
            }
        }, false);
        
        document.addEventListener("keydown", function (e) {
            if (e.keyCode === 27) { 
                const closeButton = document.activeElement.querySelector(".close");
                if (closeButton) {
                    closeButton.click();
                }
                document.body.classList.remove("fixed");
            }
        }, false);
        