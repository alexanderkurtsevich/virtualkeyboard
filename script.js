class Keyboard {
  constructor() {
    this.elements = {
      container: null,
      textarea: null,
      keys: [],
    };

    this.configs = {
      lowEngKeys: ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', 'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter', 'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '↑', 'Shift', 'Ctrl', 'Win', 'Alt', 'english', 'Alt', '←', '↓', '→', 'Ctrl'],
      upEngKeys: ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Backspace', 'Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'Q', 'P', '{', '}', '|', 'CapsLock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', 'Enter', 'Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', '↑', 'Shift', 'Ctrl', 'Win', 'Alt', 'ENGLISH', 'Alt', '←', '↓', '→', 'Ctrl'],
      lowRuKeys: ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', 'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter', 'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '↑', 'Shift', 'Ctrl', 'Win', 'Alt', 'русский', 'Alt', '←', '↓', '→', 'Ctrl'],
      upRuKeys: ['Ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', 'Backspace', 'Tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '/', 'CapsLock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'Enter', 'Shift', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', ',', '↑', 'Shift', 'Ctrl', 'Win', 'Alt', 'РУССКИЙ', 'Alt', '←', '↓', '→', 'Ctrl'],
      keyClasses: ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace', 'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter', 'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight', 'ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight'],
    };

    this.language = 'eng';
    this.capsLock = false;

    this.pressed = new Set();
  }

  init() {
    const textarea = document.createElement('textarea');
    document.body.append(textarea);

    const keyboard = document.createElement('div');
    keyboard.classList.add('keyboard');
    document.body.append(keyboard);

    keyboard.append(this.createKeys());

    this.elements.container = document.querySelector('.keyboard__container');
    this.elements.keys = document.querySelectorAll('.keyboard__key');
    this.elements.textarea = document.querySelector('textarea');

    window.addEventListener('keydown', (event) => {
      this.eventKeyDown(event);
    });
    window.addEventListener('keyup', (event) => {
      this.eventKeyUp(event);
    });
    window.addEventListener('mousedown', (event) => {
      this.eventKeyDown(event);
    });
    window.addEventListener('mouseup', (event) => {
      this.eventKeyUp(event);
    });
    window.addEventListener('mouseout', (event) => {
      this.eventMouseOut(event);
    });
    this.elements.textarea.addEventListener('keydown', (event) => {
      event.preventDefault();
    });
  }

  createKeys() {
    const container = document.createElement('div');
    container.classList.add('keyboard__container');

    this.configs.keyClasses.forEach((eachClass) => {
      const key = document.createElement('button');
      key.classList.add(eachClass, 'keyboard__key');
      container.append(key);
      this.elements.keys.push(key);
    });

    if (localStorage.language === 'eng' || localStorage.language === undefined) {
      for (let i = 0; i < this.configs.lowEngKeys.length; i += 1) {
        this.elements.keys[i].innerHTML = this.configs.lowEngKeys[i];
      }
    } else {
      for (let i = 0; i < this.configs.lowRuKeys.length; i += 1) {
        this.elements.keys[i].innerHTML = this.configs.lowRuKeys[i];
      }
    }

    return container;
  }

  changeKeys(configKeys) {
    for (let i = 0; i < configKeys.length; i += 1) {
      this.elements.keys[i].innerHTML = configKeys[i];
    }
  }

  capsLockToggle() {
    if (this.capsLock === false) {
      if (this.language === 'eng') {
        this.changeKeys(this.configs.upEngKeys);
        this.capsLock = true;
      } else {
        this.changeKeys(this.configs.upRuKeys);
        this.capsLock = true;
      }
    } else if (this.language === 'eng') {
      this.changeKeys(this.configs.lowEngKeys);
      this.capsLock = false;
    } else {
      this.changeKeys(this.configs.lowRuKeys);
      this.capsLock = false;
    }
  }

  languageToggle() {
    if (this.language === 'eng') {
      this.changeKeys(this.configs.lowRuKeys);
      this.language = 'rus';
    } else {
      this.changeKeys(this.configs.lowEngKeys);
      this.language = 'eng';
    }
    localStorage.setItem('language', this.language);
  }


  eventKeyDown(event) {
    if (event.type === 'keydown' || event.target.classList.contains('keyboard__key')) {
      let key = document.querySelector(`.${event.code}`);

      if (event.type === 'mousedown') {
        key = document.querySelector(`.${event.target.classList[0]}`);
      }

      key.classList.add('keyboard__key_active');

      switch (key.classList[0]) {
        case 'CapsLock': {
          this.capsLockToggle();
          break;
        }
        case 'Space': {
          this.elements.textarea.value += ' ';
          break;
        }
        case 'Tab': {
          this.elements.textarea.value += '       ';
          break;
        }
        case 'Backspace': {
          this.elements.textarea.value = this.elements.textarea.value.slice(0, -1);
          break;
        }
        case 'Enter': {
          this.elements.textarea.value += '\n';
          break;
        } case 'ShiftLeft': {
          if (!this.pressed.has('ShiftLeft')) {
            this.capsLockToggle();
          }
          break;
        }
        default: {
          if (key.innerHTML.length === 1) { this.elements.textarea.value += key.innerHTML; }
          break;
        }
      }

      this.pressed.add(event.code);

      if (this.pressed.has('ShiftLeft') && this.pressed.has('ControlLeft')) {
        this.languageToggle();
      }
    }
  }

  eventKeyUp(event) {
    if (event.type === 'keyup' || event.target.classList.contains('keyboard__key')) {
      let key = document.querySelector(`.${event.code}`);
      if (event.type === 'mouseup') {
        key = document.querySelector(`.${event.target.classList[0]}`);
      }

      key.classList.remove('keyboard__key_active');

      if (key.classList[0] === 'CapsLock' && this.capsLock) {
        key.classList.add('keyboard__key_active');
      }
      if (key.classList[0] === 'ShiftLeft') {
        this.capsLockToggle();
      }
    }

    this.pressed.delete(event.code);
  }

  eventMouseOut(event) {
    event.target.classList.remove('keyboard__key_active');
  }
}

const keyboard = new Keyboard();
keyboard.init();
