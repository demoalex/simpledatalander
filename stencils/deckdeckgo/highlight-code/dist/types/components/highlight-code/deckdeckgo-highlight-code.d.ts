import { EventEmitter } from '../../stencil-public-runtime';
import { DeckDeckGoRevealComponent } from '@deckdeckgo/slide-utils';
import { DeckdeckgoHighlightCodeCarbonTheme } from '../../declarations/deckdeckgo-highlight-code-carbon-theme';
import { DeckdeckgoHighlightCodeTerminal } from '../../declarations/deckdeckgo-highlight-code-terminal';
/**
 * @slot code - A `<code/>` element to highlight
 * @slot user - A user name for the Ubuntu terminal
 */
export declare class DeckdeckgoHighlightCode implements DeckDeckGoRevealComponent {
  el: HTMLElement;
  /**
   * Emitted when a language is fetched and loaded
   */
  prismLanguageLoaded: EventEmitter<string>;
  /**
   * Emitted when the code was edited (see attribute editable). Propagate the root component itself
   */
  codeDidChange: EventEmitter<HTMLElement>;
  /**
   * Define the language to be used for the syntax highlighting. The list of supported languages is defined by Prism.js
   */
  language: string;
  /**
   * If you wish to highlight some lines of your code. The lines number should be provided as a number (one line) or numbers separated with coma or dash (many lines), group separated with space.
   * For example: 1 3,5 8 14-17 which highlight lines  1, 3 to 5, 8 and 14 to 17
   */
  highlightLines: string;
  /**
   * Display the number of the lines of code
   */
  lineNumbers: boolean;
  /**
   * Present the code in a stylish "windowed" card
   */
  terminal: DeckdeckgoHighlightCodeTerminal;
  /**
   * In case you would like to set the code component as being editable
   */
  editable: boolean;
  /**
   * The theme of the selected terminal (applied only in case of carbon)
   */
  theme: DeckdeckgoHighlightCodeCarbonTheme;
  private parseAfterUpdate;
  private refCode;
  private themeStyle;
  private languagesToLoad;
  private loaded;
  private refContainer;
  private readonly debounceUpdateSlot;
  private highlightGroup;
  /**
   * @internal Used when integrated in DeckDeckGo to display next and previous highlight in the presentations
   */
  revealProgress: 'start' | 'partial' | 'end';
  private highlightRows;
  constructor();
  componentWillLoad(): Promise<void>;
  componentDidLoad(): Promise<void>;
  componentDidUpdate(): Promise<void>;
  loadTheme(): Promise<void>;
  languageLoaded($event: CustomEvent): Promise<void>;
  private parse;
  private languageDidLoad;
  onLanguage(): Promise<void>;
  private loadLanguages;
  private initLanguagesToLoad;
  private loadLanguagesRequire;
  private loadScript;
  onLineNumbersChange(): Promise<void>;
  onCarbonChange(): Promise<void>;
  /**
   * Load or reload the component
   */
  load(): Promise<void>;
  private parseSlottedCode;
  private parseCodeOptions;
  private applyCode;
  private inputCode;
  private copyCodeToSlot;
  private edit;
  private catchTab;
  /**
   * @internal Used when integrated in DeckDeckGo presentations. Call `nextHighlight()`.
   */
  reveal(): Promise<void>;
  /**
   * @internal Used when integrated in DeckDeckGo presentations. Call `prevHighlight()`.
   */
  hide(): Promise<void>;
  /**
   * @internal Reset the highlight state to default.
   */
  revealAll(): Promise<void>;
  /**
   * @internal Reset the highlight state to default.
   */
  hideAll(): Promise<void>;
  /**
   * Animate highlighted lines and, apply "focus" on next group
   */
  nextHighlight(): Promise<void>;
  /**
   * Animate highlighted lines and, apply "focus" on previous group
   */
  prevHighlight(): Promise<void>;
  private selectNextGroupHighlight;
  render(): any;
  private renderHighlightStyle;
  private renderCarbon;
  private renderCarbonCircle;
  private renderUbuntu;
  private renderUbuntuCircle;
}
