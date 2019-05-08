import { LitElement, html } from 'lit-element';

import '../../components/animated-logo';
import '../../components/people-selector';
import '../../components/demo-roulette';
import '../../components/display-winner';

import { getRandomColor, checkContrast } from '../../utils';

import styles from './styles';

const TIME_REVEAL = 2;
const TIME_START_ROULETTE = 1;
const TIME_MAINTAIN_ROULETTE = 1;
const TIME_DISPLAY_WINNER = .5;

class AppShell extends LitElement {
  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      _people: { type: Array },
      _logoUp: { type: Boolean },
      _displayPeopleSelector: { type: Boolean },
      _displayRoulette: { type: Boolean },
      _rouletteSpinning: { type: Boolean },
      _displayWinner: { type: Boolean },
      _displaySpinButton: { type: Boolean },
      _displayRepeatButton: { type: Boolean },
      _winner: { type: Object },
    }
  }

  constructor() {
    super();
    this._people = [];
    this._displayPeopleSelector = false;
    this._displayRoulette = false;
    this._rouletteSpinning = false;
    this._displayWinner = false;
    this._winner = { name: '', color: ''};
  }

  render() {
    return html`
      <main>
        <animated-logo class="fullWidth ${this._logoUp ? 'up' : ''}" animate></animated-logo>
        <people-selector
          class="fullWidth ${this._displayPeopleSelector && !this._displayRoulette ? '' : 'hidden'}"
          @person-added="${this._handleNewPerson}"
          @person-deleted="${this._deletePerson}"
          @person-swap-color="${this._swapColor}"
          .people="${this._people}"
        ></people-selector>
        <demo-roulette
          class="fullWidth ${this._displayRoulette ? '' : 'hidden'}"
          @winner-selected="${this._handleWinner}"
          .spinning="${this._rouletteSpinning}"
          .people="${this._people}"
        ></demo-roulette>
        <display-winner .winner="${this._winner}" .display="${this._displayWinner}"></display-winner>
        <button
          class="${this._displaySpinButton ? '' : 'hidden'}"
          @click="${this._spinRoulette}"
        >
          Tira de la ruletaaaa
        </button><button
          class="${this._displayRepeatButton ? '' : 'hidden'}"
          @click="${this._reSpinRoulette}"
        >
          Repetir
        </button>
      </main>
    `;
  }

  firstUpdated() {
    this._checkQueryParams();
    setTimeout(() => {
      this._logoUp = true;
      this._displayPeopleSelector = true;
    }, TIME_REVEAL * 1000);
  }

  get _displaySpinButton() {
    return this._displayPeopleSelector && !this._displayRoulette && this._people.length >= 2;
  }

  get _displayRepeatButton() {
    return this._displayWinner;
  }

  _addPerson(name) {
    let newColor = getRandomColor();
    const existentColors = this._people.map(({ color }) => color);
    while(!checkContrast(newColor, existentColors)) {
      newColor = getRandomColor();
    }
    const person = {
      name,
      color: newColor
    };

    this._people = [...this._people, person];
  }

  _checkQueryParams() {
    const query = document.location.search;
    if (/\?names=/.test(query)) {
      const names = query.replace('?names=', '').split(',');
      names.forEach(name => this._addPerson(name));
    }
  }

  _updateQueryParams() {
    const names = this._people.map(({ name }) => name).join(',');
    const query = `?names=${names}`;

    document.location.search = query;
  }

  _handleNewPerson({ detail: { person: name } }) {
    this._addPerson(name);
  }

  _swapColor({ detail: { color: currentColor }}) {
    const personIndex = this._people.findIndex(({ color }) => color === currentColor);

    let newColor = getRandomColor();
    const existentColors = this._people.map(({ color }) => color);
    while(!checkContrast(newColor, existentColors, currentColor)) {
      newColor = getRandomColor();
    }
  
    const { name } = this._people[personIndex];
    const swapPerson = {
      name,
      color: newColor
    };

    this._people = [
      ...this._people.slice(0, personIndex),
      swapPerson,
      ...this._people.slice(personIndex + 1)
    ];
  }

  _deletePerson({ detail: { person: nameToDelete } }) {
    this._people = this._people.filter(({ name }) => name !== nameToDelete);
  }

  _spinRoulette() {
    if (this._people.length < 2) return;

    this._updateQueryParams();
    this._displayRoulette = true;
    setTimeout(() => {
      this._rouletteSpinning = true;
    }, TIME_START_ROULETTE * 1000);
  }

  _reSpinRoulette() {
    this._displayWinner = false;
    const roulette = this.shadowRoot.querySelector('demo-roulette');
    roulette.reSpin();
    this._displayRoulette = true;
  }

  _handleWinner({ detail: { winner } }) {
    this._winner = winner;
    setTimeout(() => {
      this._displayRoulette = false;
      this._displayPeopleSelector = false;
    }, TIME_MAINTAIN_ROULETTE * 1000);
    setTimeout(() => {
      this._displayWinner = true;
    }, (TIME_MAINTAIN_ROULETTE + TIME_DISPLAY_WINNER) * 1000);
  }
}

export default AppShell;
