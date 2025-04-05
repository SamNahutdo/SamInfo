const ascii = {
    "chrome": (c1, c2, c3, c4, c5, browserName, user, dividerBar, uptime) => `
  <span>${c2}            .,:loool:,.                 ${c1}${user}@${browserName}
  ${c2}        .,coooooooooooooc,.             <span style='color: #ffffff'>${dividerBar}
  ${c2}     .,lllllllllllllllllllll,.          ${c2}OS: <span style='color: #ffffff'>Browser
  ${c2}    ;ccccccccccccccccccccccccc;         ${c2}Host: <span style='color: #ffffff'>${navigator.vendor}
  ${c1}  '${c2}ccccccccccccccccccccccccccccc.       ${c2}Kernel: <span style='color: #ffffff'>${window.navigator.userAgent.split(" ")[0]}
  ${c1} ,oo${c2}c::::::::okO${c5}000${c3}0OOkkkkkkkkkkk:      ${c2}Uptime: <span style='color: #ffffff'>${uptime}
  ${c1}.ooool${c2};;;;:x${c5}K0${c4}kxxxxxk${c5}0X${c3}K0000000000.     ${c2}Packages: <span style='color: #ffffff'>0
  ${c1}:oooool${c2};,;O${c5}K${c4}ddddddddddd${c5}KX${c3}000000000d     ${c2}Shell: <span style='color: #ffffff'>Bash
  ${c1}lllllool${c2};l${c5}N${c4}dllllllllllld${c5}N${c3}K000000000     ${c2}Resolution: <span style='color: #ffffff'>${window.screen.width}x${window.screen.height}
  ${c1}lllllllll${c2}o${c5}M${c4}dccccccccccco${c5}W${c3}K000000000     
  ${c1};cllllllllX${c5}X${c4}c:::::::::c${c5}0X${c3}000000000d
  ${c1}.ccccllllllO${c5}Nk${c4}c;,,,;cx${c5}KK${c3}0000000000.
  ${c1} .cccccclllllxOO${c5}OOO${c1}Okx${c3}O0000000000;
  ${c1}  .:ccccccccllllllllo${c3}O0000000OOO,
  ${c1}    ,:ccccccccclllcd${c3}0000OOOOOOl.
  ${c1}      '::ccccccccc${c3}dOOOOOOOkx:.
  ${c1}        ..,::cccc${c3}xOOOkkko;.
  ${c1}            ..,:${c3}dOkxl:.</span>
  `,
};

const asciiColors = {
    "chrome": ["#34a853", "#ea4335", "#fbbc05", "#4285f4", "#ffffff"],
};

class Terminal {
    constructor() {
        this.fileSystem = this.initFileSystem();
        this.settings = this.initSettings();
        this.stats = this.initStats();
        this.currentDir = '/';
        this.mode = 'normal';
        this.startDate = new Date();
        this.browserName = this.detectBrowser();
        this.commandHistory = [];
        this.historyIndex = -1;
        
        this.initDOM();
        this.bindEvents();
        this.loadState();
        this.showWelcome();
    }

    initDOM() {
        this.terminalElement = document.getElementById('terminal');
        this.outputElement = document.querySelector('.output');
        this.inputElement = document.querySelector('.input');
        this.promptElement = document.getElementById('prompt');
        this.updatePrompt();
    }

    bindEvents() {
        this.inputElement.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const input = this.inputElement.value;
                this.commandHistory.push(input);
                this.historyIndex = this.commandHistory.length;
                this.executeCommand(input);
                this.inputElement.value = '';
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (this.historyIndex > 0) {
                    this.historyIndex--;
                    this.inputElement.value = this.commandHistory[this.historyIndex];
                }
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (this.historyIndex < this.commandHistory.length - 1) {
                    this.historyIndex++;
                    this.inputElement.value = this.commandHistory[this.historyIndex];
                } else {
                    this.historyIndex = this.commandHistory.length;
                    this.inputElement.value = '';
                }
            }
        });
    }

    updatePrompt() {
        const currentUser = this.settings.users.find(u => u.UID === this.settings.currentUser);
        this.promptElement.textContent = `${currentUser.name}:${this.currentDir}$ `;
    }

    executeCommand(input) {
        if (!input.trim()) return;
        
        const [command, ...args] = input.trim().split(/\s+/);
        const currentUser = this.settings.users.find(u => u.UID === this.settings.currentUser);

        switch(command) {
            case 'help':
                this.showHelp();
                break;
            case 'clear':
                this.clearTerminal();
                break;
            case 'whoami':
                this.output(currentUser.name);
                break;
            default:
                this.output(`Command not found: ${command}`);
        }

        if (this.fileSystem[currentUser.home]?.['.bash_history'] !== undefined) {
            this.fileSystem[currentUser.home]['.bash_history'] += input + '\n';
        }

        this.stats.commands[command] = (this.stats.commands[command] || 0) + 1;
        this.updatePrompt();
    }

    // File System Operations
    initFileSystem() {
        return {
            '/': {
                home: {
                    user: {
                        ".bash_history": "",
                        "desktop": {
                            "about.txt": "<!DOCTYPE html>\n<span color='blue'>Hello, I'm User</span>"
                        }
                    },
                    root: {}
                },
                etc: {
                    "motd": "Welcome to the terminal!\nType 'help' for commands"
                }
            }
        };
    }

    // System Operations
    initSettings() {
        return {
            users: [
                { name: "user", password: "password", UID: 1000, home: "/home/user" },
                { name: "root", password: "root", UID: 0, home: "/root" }
            ],
            currentUser: 1000,
            colors: false
        };
    }

    initStats() {
        return {
            commands: {},
            uptime: 0
        };
    }

    // UI Methods
    clearTerminal() {
        this.outputElement.innerHTML = '';
    }

    output(text, isHTML = false) {
        const div = document.createElement('div');
        if (isHTML) {
            div.innerHTML = text;
        } else {
            div.textContent = text;
        }
        this.outputElement.appendChild(div);
        this.terminalElement.scrollTop = this.terminalElement.scrollHeight;
    }

    showHelp() {
        const commands = [
            { name: 'help', description: 'Show this help message' },
            { name: 'clear', description: 'Clear the terminal screen' },
            { name: 'whoami', description: 'Show current username\n' },
            { name: 'ABOUT WEBSITE NO FUNCTIONS\n', description: '' },
            { name: 'Home', description: 'Display the picture of workshop' },
            { name: 'About', description: 'About my skills and pictures' },
            { name: 'Education', description: 'To shown my education' },
            { name: 'Experience', description: 'Life as ICT IT experience' },
            { name: 'Skills', description: 'Languages i have learned' },
            { name: 'Projects', description: 'My Projects' },
            { name: 'Comments', description: 'Friends comment' },
            { name: 'Contact', description: 'To display my contact' }

        ];
        
        let output = 'Available commands:\n\n';
        
        commands.forEach(cmd => {
            output += `  ${cmd.name.padEnd(15)}${cmd.description}\n`;
        });
        
        output += `\n
  ██████╗     ██╗     ████    ████╗
████╔═══╝    ████╗    ██║██  ██║██║ 
  █████     ██  ██╗   ██║ ████╔╝██║
    ████╗  ████████╗  ██║  ██╔╝ ██║ 
██████╔═╝ ██║     ██╗ ██║  ╚═╝  ██║ ██ ██ ██
╚═════╝   ╚═╝     ╚═╝ ╚═╝       ╚═╝         `
        this.output(output);
    }

    showWelcome() {
        this.output("Welcome to the terminal!\nType 'help' for commands");
    }

    detectBrowser() {
        const ua = navigator.userAgent;
        if (ua.includes('Chrome')) return 'chrome';
        if (ua.includes('Firefox')) return 'firefox';
        if (ua.includes('Safari')) return 'safari';
        return 'browser';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const terminal = new Terminal();
});