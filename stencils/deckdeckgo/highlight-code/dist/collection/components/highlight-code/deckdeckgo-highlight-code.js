import { Component, Prop, Watch, Element, Method, Event, Listen, State, h, Host } from '@stencil/core';
import { debounce } from '@deckdeckgo/utils';
import { loadTheme } from '../../utils/themes-loader.utils';
import { parseCode } from '../../utils/parse.utils';
import { loadGoogleFonts } from '../../utils/fonts.utils';
import { CarbonThemeStyle } from '../styles/carbon-theme.style';
import { HighlightStyle } from '../styles/highlight.style';
import { DeckdeckgoHighlightCodeCarbonTheme } from '../../declarations/deckdeckgo-highlight-code-carbon-theme';
import { DeckdeckgoHighlightCodeTerminal } from '../../declarations/deckdeckgo-highlight-code-terminal';
import { deckdeckgoHighlightCodeLanguages } from '../../declarations/deckdeckgo-highlight-code-languages';
/**
 * @slot code - A `<code/>` element to highlight
 * @slot user - A user name for the Ubuntu terminal
 */
export class DeckdeckgoHighlightCode {
  constructor() {
    /**
     * Define the language to be used for the syntax highlighting. The list of supported languages is defined by Prism.js
     */
    this.language = 'javascript';
    /**
     * Display the number of the lines of code
     */
    this.lineNumbers = false;
    /**
     * Present the code in a stylish "windowed" card
     */
    this.terminal = DeckdeckgoHighlightCodeTerminal.CARBON;
    /**
     * In case you would like to set the code component as being editable
     */
    this.editable = false;
    /**
     * The theme of the selected terminal (applied only in case of carbon)
     */
    this.theme = DeckdeckgoHighlightCodeCarbonTheme.DRACULA;
    this.parseAfterUpdate = false;
    this.loaded = false;
    this.highlightGroup = undefined;
    /**
     * @internal Used when integrated in DeckDeckGo to display next and previous highlight in the presentations
     */
    this.revealProgress = 'start';
    this.highlightRows = undefined;
    this.catchTab = async ($event) => {
      if ($event && $event.key === 'Tab') {
        $event.preventDefault();
        document.execCommand('insertHTML', false, '&#009');
      }
    };
    this.debounceUpdateSlot = debounce(async () => {
      await this.copyCodeToSlot();
    }, 500);
  }
  async componentWillLoad() {
    await loadGoogleFonts(this.terminal);
    await this.loadTheme();
  }
  async componentDidLoad() {
    const languageWasLoaded = await this.languageDidLoad();
    await this.loadLanguages();
    if (languageWasLoaded) {
      await this.parse();
    }
  }
  async componentDidUpdate() {
    if (this.parseAfterUpdate) {
      await this.parse();
      this.parseAfterUpdate = false;
    }
  }
  async loadTheme() {
    if (this.terminal !== DeckdeckgoHighlightCodeTerminal.CARBON || !this.theme) {
      this.themeStyle = undefined;
      return;
    }
    const { theme } = await loadTheme(this.theme);
    this.themeStyle = theme;
  }
  async languageLoaded($event) {
    if (!$event || !$event.detail) {
      return;
    }
    if (this.languagesToLoad) {
      this.languagesToLoad = this.languagesToLoad.filter((lang) => lang !== $event.detail);
    }
    if (this.language && !this.loaded && (this.languagesToLoad === undefined || this.languagesToLoad.length <= 0)) {
      await this.parse();
      this.loaded = true;
    }
  }
  async parse() {
    if (!this.language || !deckdeckgoHighlightCodeLanguages[this.language]) {
      return;
    }
    await this.parseSlottedCode();
  }
  languageDidLoad() {
    return new Promise((resolve) => {
      if (!document || !this.language || this.language === '') {
        resolve(false);
        return;
      }
      const scripts = document.querySelector("[deckdeckgo-prism-loaded='" + this.language + "']");
      if (scripts) {
        resolve(true);
      }
      else {
        resolve(false);
      }
    });
  }
  async onLanguage() {
    await this.loadLanguages(true);
  }
  async loadLanguages(reload = false) {
    this.loaded = false;
    if (!this.language || !deckdeckgoHighlightCodeLanguages[this.language]) {
      console.error(`Language ${this.language} is not supported`);
      return;
    }
    await this.initLanguagesToLoad();
    await this.loadLanguagesRequire();
    await this.loadScript(this.language, reload);
  }
  async initLanguagesToLoad() {
    if (!this.language) {
      return;
    }
    const definition = deckdeckgoHighlightCodeLanguages[this.language];
    this.languagesToLoad = definition.require && definition.require.length > 0 ? [this.language, ...definition.require] : [this.language];
  }
  async loadLanguagesRequire() {
    const promises = [];
    const definition = deckdeckgoHighlightCodeLanguages[this.language];
    if (definition.require) {
      promises.push(...definition.require.map((extraScript) => this.loadScript(extraScript, false, true)));
    }
    if (promises.length <= 0) {
      return;
    }
    await Promise.all(promises);
  }
  loadScript(lang, reload = false, requireScript = false) {
    return new Promise(async (resolve) => {
      if (!document || !lang || lang === '') {
        resolve();
        return;
      }
      // No need to load javascript, it is there
      if (lang === 'javascript') {
        this.prismLanguageLoaded.emit('javascript');
        resolve();
        return;
      }
      const scripts = document.querySelector("[deckdeckgo-prism='" + lang + "']");
      if (scripts) {
        if (reload) {
          this.prismLanguageLoaded.emit(lang);
        }
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.onload = async () => {
        script.setAttribute('deckdeckgo-prism-loaded', lang);
        this.prismLanguageLoaded.emit(lang);
      };
      script.onerror = async () => {
        if (script.parentElement) {
          script.parentElement.removeChild(script);
        }
        // if the language definition doesn't exist or if unpkg is down, display code anyway
        this.prismLanguageLoaded.emit(lang);
      };
      const definition = deckdeckgoHighlightCodeLanguages[this.language];
      let language = !requireScript && definition.main ? definition.main : lang;
      script.src = 'https://unpkg.com/prismjs@latest/components/prism-' + language + '.js';
      script.setAttribute('deckdeckgo-prism', language);
      script.defer = true;
      document.head.appendChild(script);
      script.addEventListener('load', () => resolve(), { once: true });
    });
  }
  async onLineNumbersChange() {
    await this.parse();
  }
  async onCarbonChange() {
    this.parseAfterUpdate = true;
    await loadGoogleFonts(this.terminal);
  }
  /**
   * Load or reload the component
   */
  load() {
    return new Promise(async (resolve) => {
      if (!this.language || this.language === '') {
        resolve();
        return;
      }
      if (this.language === 'javascript') {
        await this.parse();
        resolve();
        return;
      }
      if (document.querySelector("[deckdeckgo-prism-loaded='" + this.language + "']")) {
        await this.parse();
      }
      else {
        await this.loadLanguages();
      }
      resolve();
    });
  }
  parseSlottedCode() {
    var _a;
    const code = this.el.querySelector("[slot='code']");
    if (code) {
      return parseCode(Object.assign(Object.assign({}, this.parseCodeOptions()), { code: (_a = code === null || code === void 0 ? void 0 : code.innerHTML) === null || _a === void 0 ? void 0 : _a.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&') }));
    }
    return new Promise((resolve) => {
      resolve();
    });
  }
  parseCodeOptions() {
    return {
      refContainer: this.refContainer,
      refCode: this.refCode,
      lineNumbers: this.lineNumbers,
      highlightLines: this.highlightLines,
      language: this.language
    };
  }
  async applyCode() {
    if (!this.editable) {
      return;
    }
    await this.copyCodeToSlot();
    await this.parseSlottedCode();
    this.codeDidChange.emit(this.el);
  }
  inputCode() {
    if (!this.editable) {
      return;
    }
    this.debounceUpdateSlot();
  }
  async copyCodeToSlot() {
    var _a, _b, _c;
    const code = this.el.querySelector(":scope > [slot='code']");
    if (!code) {
      return;
    }
    // Avoid duplicating new lines on new entries
    (_b = (_a = this.refCode) === null || _a === void 0 ? void 0 : _a.querySelectorAll('br')) === null || _b === void 0 ? void 0 : _b.forEach((node) => node.outerHTML = '\u200B');
    code.innerHTML = (_c = this.refCode) === null || _c === void 0 ? void 0 : _c.innerText.replace(/\u200B/g, '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  }
  edit() {
    var _a;
    if (!this.editable) {
      return;
    }
    (_a = this.refCode) === null || _a === void 0 ? void 0 : _a.focus();
  }
  /**
   * @internal Used when integrated in DeckDeckGo presentations. Call `nextHighlight()`.
   */
  async reveal() {
    await this.nextHighlight();
  }
  /**
   * @internal Used when integrated in DeckDeckGo presentations. Call `prevHighlight()`.
   */
  async hide() {
    await this.prevHighlight();
  }
  /**
   * @internal Reset the highlight state to default.
   */
  async revealAll() {
    this.highlightGroup = undefined;
    this.highlightRows = undefined;
    this.revealProgress = 'start';
  }
  /**
   * @internal Reset the highlight state to default.
   */
  async hideAll() {
    await this.revealAll();
  }
  /**
   * Animate highlighted lines and, apply "focus" on next group
   */
  async nextHighlight() {
    if (this.revealProgress === 'end') {
      return;
    }
    await this.selectNextGroupHighlight(this.highlightGroup + 1 || 0);
    // We want to limit the counter to max count of groups
    if (this.highlightRows !== undefined) {
      this.highlightGroup = this.highlightGroup + 1 || 0;
      this.revealProgress = 'partial';
      return;
    }
    this.revealProgress = 'end';
  }
  /**
   * Animate highlighted lines and, apply "focus" on previous group
   */
  async prevHighlight() {
    if (this.highlightGroup === 0) {
      this.highlightGroup = undefined;
      this.highlightRows = undefined;
      this.revealProgress = 'start';
      return;
    }
    this.highlightGroup = this.revealProgress === 'end' ? this.highlightGroup : this.highlightGroup - 1;
    await this.selectNextGroupHighlight(this.highlightGroup);
    if (this.highlightRows !== undefined) {
      this.revealProgress = 'partial';
    }
  }
  async selectNextGroupHighlight(highlightGroup) {
    var _a;
    const rows = (_a = this.refCode) === null || _a === void 0 ? void 0 : _a.querySelectorAll(`.group-${highlightGroup}`);
    if (!rows || rows.length <= 0) {
      this.highlightRows = undefined;
      return;
    }
    const allRows = Array.from(this.refCode.children);
    this.highlightRows = {
      start: allRows.indexOf(rows[0]),
      end: allRows.indexOf(rows[rows.length - 1])
    };
  }
  render() {
    var _a;
    const hostClass = {
      'deckgo-highlight-code-carbon': this.terminal === DeckdeckgoHighlightCodeTerminal.CARBON,
      'deckgo-highlight-code-ubuntu': this.terminal === DeckdeckgoHighlightCodeTerminal.UBUNTU
    };
    if (this.terminal === DeckdeckgoHighlightCodeTerminal.CARBON) {
      hostClass[`deckgo-highlight-code-theme-${this.theme}`] = true;
    }
    return (h(Host, { class: hostClass, onClick: () => this.edit() },
      this.renderCarbon(),
      this.renderUbuntu(),
      this.renderHighlightStyle(),
      h("div", { class: "container", ref: (el) => (this.refContainer = el) },
        h("code", { class: ((_a = this.highlightLines) === null || _a === void 0 ? void 0 : _a.length) > 0 ? 'highlight' : undefined, contentEditable: this.editable, onBlur: async () => await this.applyCode(), onInput: () => this.inputCode(), onKeyDown: ($event) => this.catchTab($event), ref: (el) => (this.refCode = el) }),
        h("slot", { name: "code" }))));
  }
  renderHighlightStyle() {
    if (!this.highlightLines || this.highlightLines.length <= 0) {
      return undefined;
    }
    return h(HighlightStyle, Object.assign({}, this.highlightRows));
  }
  renderCarbon() {
    if (this.terminal !== DeckdeckgoHighlightCodeTerminal.CARBON) {
      return undefined;
    }
    return [
      h(CarbonThemeStyle, { style: this.themeStyle }),
      h("div", { class: "carbon" },
        this.renderCarbonCircle('red'),
        this.renderCarbonCircle('yellow'),
        this.renderCarbonCircle('green'))
    ];
  }
  renderCarbonCircle(color) {
    return h("div", { class: color });
  }
  renderUbuntu() {
    if (this.terminal !== DeckdeckgoHighlightCodeTerminal.UBUNTU) {
      return undefined;
    }
    return (h("div", { class: "ubuntu" },
      this.renderUbuntuCircle('close'),
      this.renderUbuntuCircle('minimize'),
      this.renderUbuntuCircle('maximize'),
      h("p", null,
        h("slot", { name: "user" }))));
  }
  renderUbuntuCircle(mode) {
    const symbol = mode === 'close' ? '&#10005;' : mode === 'minimize' ? '&#9472;' : '&#9723;';
    return (h("div", { class: mode },
      h("span", { innerHTML: symbol })));
  }
  static get is() { return "deckgo-highlight-code"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["deckdeckgo-highlight-code.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["deckdeckgo-highlight-code.css"]
  }; }
  static get properties() { return {
    "language": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Define the language to be used for the syntax highlighting. The list of supported languages is defined by Prism.js"
      },
      "attribute": "language",
      "reflect": true,
      "defaultValue": "'javascript'"
    },
    "highlightLines": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "If you wish to highlight some lines of your code. The lines number should be provided as a number (one line) or numbers separated with coma or dash (many lines), group separated with space.\nFor example: 1 3,5 8 14-17 which highlight lines  1, 3 to 5, 8 and 14 to 17"
      },
      "attribute": "highlight-lines",
      "reflect": true
    },
    "lineNumbers": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Display the number of the lines of code"
      },
      "attribute": "line-numbers",
      "reflect": true,
      "defaultValue": "false"
    },
    "terminal": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "DeckdeckgoHighlightCodeTerminal",
        "resolved": "DeckdeckgoHighlightCodeTerminal.CARBON | DeckdeckgoHighlightCodeTerminal.NONE | DeckdeckgoHighlightCodeTerminal.UBUNTU",
        "references": {
          "DeckdeckgoHighlightCodeTerminal": {
            "location": "import",
            "path": "../../declarations/deckdeckgo-highlight-code-terminal"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Present the code in a stylish \"windowed\" card"
      },
      "attribute": "terminal",
      "reflect": true,
      "defaultValue": "DeckdeckgoHighlightCodeTerminal.CARBON"
    },
    "editable": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "In case you would like to set the code component as being editable"
      },
      "attribute": "editable",
      "reflect": false,
      "defaultValue": "false"
    },
    "theme": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "DeckdeckgoHighlightCodeCarbonTheme",
        "resolved": "DeckdeckgoHighlightCodeCarbonTheme",
        "references": {
          "DeckdeckgoHighlightCodeCarbonTheme": {
            "location": "import",
            "path": "../../declarations/deckdeckgo-highlight-code-carbon-theme"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "The theme of the selected terminal (applied only in case of carbon)"
      },
      "attribute": "theme",
      "reflect": true,
      "defaultValue": "DeckdeckgoHighlightCodeCarbonTheme.DRACULA"
    },
    "revealProgress": {
      "type": "string",
      "mutable": true,
      "complexType": {
        "original": "'start' | 'partial' | 'end'",
        "resolved": "\"end\" | \"partial\" | \"start\"",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [{
            "text": "Used when integrated in DeckDeckGo to display next and previous highlight in the presentations",
            "name": "internal"
          }],
        "text": ""
      },
      "attribute": "reveal-progress",
      "reflect": false,
      "defaultValue": "'start'"
    }
  }; }
  static get states() { return {
    "themeStyle": {},
    "languagesToLoad": {},
    "loaded": {},
    "highlightRows": {}
  }; }
  static get events() { return [{
      "method": "prismLanguageLoaded",
      "name": "prismLanguageLoaded",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Emitted when a language is fetched and loaded"
      },
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      }
    }, {
      "method": "codeDidChange",
      "name": "codeDidChange",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Emitted when the code was edited (see attribute editable). Propagate the root component itself"
      },
      "complexType": {
        "original": "HTMLElement",
        "resolved": "HTMLElement",
        "references": {
          "HTMLElement": {
            "location": "global"
          }
        }
      }
    }]; }
  static get methods() { return {
    "load": {
      "complexType": {
        "signature": "() => Promise<void>",
        "parameters": [],
        "references": {
          "Promise": {
            "location": "global"
          }
        },
        "return": "Promise<void>"
      },
      "docs": {
        "text": "Load or reload the component",
        "tags": []
      }
    },
    "reveal": {
      "complexType": {
        "signature": "() => Promise<void>",
        "parameters": [],
        "references": {
          "Promise": {
            "location": "global"
          }
        },
        "return": "Promise<void>"
      },
      "docs": {
        "text": "",
        "tags": [{
            "name": "internal",
            "text": "Used when integrated in DeckDeckGo presentations. Call `nextHighlight()`."
          }]
      }
    },
    "hide": {
      "complexType": {
        "signature": "() => Promise<void>",
        "parameters": [],
        "references": {
          "Promise": {
            "location": "global"
          }
        },
        "return": "Promise<void>"
      },
      "docs": {
        "text": "",
        "tags": [{
            "name": "internal",
            "text": "Used when integrated in DeckDeckGo presentations. Call `prevHighlight()`."
          }]
      }
    },
    "revealAll": {
      "complexType": {
        "signature": "() => Promise<void>",
        "parameters": [],
        "references": {
          "Promise": {
            "location": "global"
          }
        },
        "return": "Promise<void>"
      },
      "docs": {
        "text": "",
        "tags": [{
            "name": "internal",
            "text": "Reset the highlight state to default."
          }]
      }
    },
    "hideAll": {
      "complexType": {
        "signature": "() => Promise<void>",
        "parameters": [],
        "references": {
          "Promise": {
            "location": "global"
          }
        },
        "return": "Promise<void>"
      },
      "docs": {
        "text": "",
        "tags": [{
            "name": "internal",
            "text": "Reset the highlight state to default."
          }]
      }
    },
    "nextHighlight": {
      "complexType": {
        "signature": "() => Promise<void>",
        "parameters": [],
        "references": {
          "Promise": {
            "location": "global"
          }
        },
        "return": "Promise<void>"
      },
      "docs": {
        "text": "Animate highlighted lines and, apply \"focus\" on next group",
        "tags": []
      }
    },
    "prevHighlight": {
      "complexType": {
        "signature": "() => Promise<void>",
        "parameters": [],
        "references": {
          "Promise": {
            "location": "global"
          }
        },
        "return": "Promise<void>"
      },
      "docs": {
        "text": "Animate highlighted lines and, apply \"focus\" on previous group",
        "tags": []
      }
    }
  }; }
  static get elementRef() { return "el"; }
  static get watchers() { return [{
      "propName": "theme",
      "methodName": "loadTheme"
    }, {
      "propName": "language",
      "methodName": "onLanguage"
    }, {
      "propName": "lineNumbers",
      "methodName": "onLineNumbersChange"
    }, {
      "propName": "terminal",
      "methodName": "onCarbonChange"
    }]; }
  static get listeners() { return [{
      "name": "prismLanguageLoaded",
      "method": "languageLoaded",
      "target": "document",
      "capture": false,
      "passive": false
    }]; }
}
