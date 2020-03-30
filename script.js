class Keyboard {
    constructor() {
        this.text = '';

        this.elements = {
            container: null,
            textarea: null,
            keys: []
        }

        this.configs = {
            lowEngKeys: ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace", "Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\", "CapsLock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "Enter", "Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "↑", "Shift", "Ctrl", "Win", "Alt", "english", "Alt", "←", "↓", "→", "Ctrl"],
            upEngKeys: ["~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "Backspace", "Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "Q", "P", "{", "}", "|", "CapsLock", "A", "S", "D", "F", "G", "H", "J", "K", "L", ":", "\"", "Enter", "Shift", "Z", "X", "C", "V", "B", "N", "M", "<", ">", "?", "↑", "Shift", "Ctrl", "Win", "Alt", "ENGLISH", "Alt", "←", "↓", "→", "Ctrl"],
            lowRuKeys: ["ё", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace", "Tab", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "\\", "CapsLock", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "Enter", "Shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", "↑", "Shift", "Ctrl", "Win", "Alt", "русский", "Alt", "←", "↓", "→", "Ctrl"],
            upRuKeys: ["Ё", "!", "\"", "№", ";", "%", ":", "?", "*", "(", ")", "_", "+", "Backspace", "Tab", "Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З", "Х", "Ъ", "/", "CapsLock", "Ф", "Ы", "В", "А", "П", "Р", "О", "Л", "Д", "Ж", "Э", "Enter", "Shift", "Я", "Ч", "С", "М", "И", "Т", "Ь", "Б", "Ю", ",", "↑", "Shift", "Ctrl", "Win", "Alt", "РУССКИЙ", "Alt", "←", "↓", "→", "Ctrl"],
            keyClasses: ["Backquote", "Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8", "Digit9", "Digit0", "Minus", "Equal", "Backspace", "Tab", "KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP", "BracketLeft", "BracketRight", "Backslash", "CapsLock", "KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "Semicolon", "Quote", "Enter", "ShiftLeft", "KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Comma", "Period", "Slash", "ArrowUp", "ShiftRight", "ControlLeft", "MetaLeft", "AltLeft", "Space", "AltRight", "ArrowLeft", "ArrowDown", "ArrowRight", "ControlRight"]
        }

        this.language = 'eng';
        this.capsLock = false;

        this.pressed = new Set();
    }

    init() {

        //Create textarea
        let textarea = document.createElement('textarea');
        document.body.append(textarea)

        // Create main keyboard block
        let keyboard = document.createElement('div');
        keyboard.classList.add('keyboard');
        document.body.append(keyboard)

        // Create keys
        keyboard.append(this._createKeys());

        this.elements.container = document.querySelector('.keyboard__container')
        this.elements.keys = document.querySelectorAll('.keyboard__key');
        this.elements.textarea = document.querySelector('textarea')

        //Add EeventListeners
        window.addEventListener('keydown', (event) => {
            this._eventHandler(event)
        })
        window.addEventListener('keyup', (event) => {
            this._eventHandler(event)
        })

        this.elements.textarea.addEventListener('keydown', () => {
            event.preventDefault()
        })

    }

    _createKeys() {
        let container = document.createElement('div');
        container.classList.add('keyboard__container');

        this.configs.keyClasses.forEach((eachClass) => {
            let key = document.createElement('button');
            key.classList.add(eachClass, 'keyboard__key');
            container.append(key);
            this.elements.keys.push(key)
        });

        for (let i = 0; i < this.configs.lowEngKeys.length; i++) {
            //Put english letters in key
            this.elements.keys[i].innerHTML = this.configs.lowEngKeys[i];

            //Add mouse events for each key
            this.elements.keys[i].addEventListener('mousedown', (event) => {
                this._eventHandler(event)
            })
            this.elements.keys[i].addEventListener('mouseup', (event) => {
                this._eventHandler(event)
            })
        }

        return container
    }

    _changeKeys(configKeys) {
        for (let i = 0; i < configKeys.length; i++) {
            this.elements.keys[i].innerHTML = configKeys[i];
        }
    }

    _capsLockToggle() {
        if (this.capsLock == false) {
            if (this.language == 'eng') {
                this._changeKeys(this.configs.upEngKeys);
                this.capsLock = true;
            }
            else {
                this._changeKeys(this.configs.upRuKeys);
                this.capsLock = true;
            }
        }
        else {
            if (this.language == 'eng') {
                this._changeKeys(this.configs.lowEngKeys);
                this.capsLock = false;
            }
            else {
                this._changeKeys(this.configs.lowRuKeys);
                this.capsLock = false;
            }
        }
    }

    _languageToggle() {
        if (this.language == 'eng') {
            this._changeKeys(this.configs.lowRuKeys)
            this.language = 'rus'
        }
        else {
            this._changeKeys(this.configs.lowEngKeys)
            this.language = 'eng'
            console.log(this.language)
        };
    }

    _eventHandler(event) {
        switch (event.type) {
            case 'keydown': {
                let key = document.querySelector(`.${event.code}`);
                key.classList.add('keyboard__key_active');

                switch (event.code) {
                    case 'ShiftLeft': {
                        if (!this.pressed.has('ShiftLeft')) {
                            this._capsLockToggle()
                        }
                        break;
                    }

                    case 'CapsLock': {
                        this._capsLockToggle()
                        break;
                    }
                    case 'Space': {
                        this.elements.textarea.value += ' ';
                        break;
                    }
                    case 'Backspace': {
                        this.elements.textarea.value = this.elements.textarea.value.slice(0, -1)
                        break;
                    }
                    case 'Enter': {
                        this.elements.textarea.value += '\n';
                        break
                    }
                    default: {
                        if (key.innerHTML.length == 1)
                            this.elements.textarea.value += key.innerHTML;
                        break;
                    }
                }

                this.pressed.add(event.code)
                if (this.pressed.has('ShiftLeft') && this.pressed.has('ControlLeft')) {
                    this._languageToggle();
                }

                break;
            }

            case 'keyup': {
                let key = document.querySelector(`.${event.code}`);
                key.classList.remove('keyboard__key_active')
                this.pressed.delete(event.code)

                if (event.code == 'ShiftLeft') {
                    this._capsLockToggle()
                }
                break;
            }

            case 'mousedown': {
                let key = event.target;
                key.classList.add('keyboard__key_active')

                switch (event.target.classList[0]) {
                    case 'CapsLock': {
                        this._capsLockToggle()
                    }
                    case 'Space': {
                        this.elements.textarea.value += ' ';
                        break;
                    }
                    case 'Enter': {
                        this.elements.textarea.value += '\n';
                        break
                    }
                    case 'Backspace': {
                        this.elements.textarea.value = this.elements.textarea.value.slice(0, -1)
                        break;
                    }
                    case 'ShiftLeft': {
                        this._capsLockToggle()
                    }
                    default: {
                        if (key.innerHTML.length == 1)
                            this.elements.textarea.value += key.innerHTML;
                        break;
                    }
                }
                break
            }

            case 'mouseup': {
                let key = event.target;
                key.classList.remove('keyboard__key_active')

                if (event.target.classList[0] == 'ShiftLeft') {
                    this._capsLockToggle()
                }
                break;
            }

        }
    }
}

let keyboard = new Keyboard();
keyboard.init()

