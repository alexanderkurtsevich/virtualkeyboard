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
    }

    create() {

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
            this.elements.keys[i].innerHTML = this.configs.lowEngKeys[i];
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
            if (this.language = 'eng') {
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

}









let keyboard = new Keyboard();

keyboard.create()
console.log(keyboard)

let pressed = new Set();


window.addEventListener('keydown', () => {
    let key = document.querySelector(`.${event.code}`);
    key.classList.add('keyboard__key_active')

    pressed.add(event.code)
    if (pressed.has('ShiftLeft') && pressed.has('ControlLeft')) {
        keyboard._languageToggle();
    }

    if (event.code == 'CapsLock') {
        keyboard._capsLockToggle()
    }

    if (document.querySelector(`.${event.code}`).innerHTML.length == 1) {
        keyboard.text += document.querySelector(`.${event.code}`).innerHTML
        keyboard.elements.textarea.value = keyboard.text
    }

    if (event.code == 'Backspace'){
        keyboard.elements.textarea.value = keyboard.text.slice(0, -1)
    }
})

window.addEventListener('keyup', () => {
    let key = document.querySelector(`.${event.code}`);
    key.classList.remove('keyboard__key_active')
    pressed.delete(event.code)


})