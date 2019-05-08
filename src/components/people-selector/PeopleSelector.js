import { LitElement, html } from 'lit-element';

import { iconArrow, iconClose } from "../svg";

import styles from './styles';

class PeopleSelector extends LitElement {
  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      _labelUp: { type: Boolean },
      _showInfo: { type: Boolean },
      _nameValue: { type: String },
      people: { type: Array }
    }
  }

  constructor() {
    super();
    this._showInfo = true;
    this._labelUp = false;
    this.people = [];
  }

  render() {
    return html`
      <h2 class="${this._showInfo ? '' : 'hidden'}">Añade víctimas para comenzar</h2>
      <form @submit="${this._handleSubmit}" autocomplete="off">
        <label for="name" class="${this._labelUp ? 'up' : ''}">Nombre de la víctima</label>
        <input
          @input="${this._handleInput}"
          @focus="${this._handleFocus}"
          @blur="${this._handleBlur}"
          .value="${this._nameValue ? this._nameValue : ''}"
          type="text"
          name="name"
        >
        <button aria-label="Añadir persona">${iconArrow}</button>
      </form>
      <ul>${this.people.map(this._renderPerson.bind(this))}</ul>
    `;
  }

  _renderPerson({ name, color }) {
    return html`
      <li style="--bg-color: ${color}" @click="${() => this._handleColorSwap(color)}">
        <span>${name}</span>
        <button @click="${(event) => this._handleDelete(event, name)}" aria-label="Quitar persona">${iconClose}</button>
      </li>
    `;
  }

  _handleInput({ target: { value } }) {
    this._nameValue = value;
  }

  _handleFocus() {
    this._labelUp = true;
  }

  _handleBlur({ target: { value } }) {
    if (!value) {
      this._labelUp = false;
    }
  }

  _handleSubmit(event) {
    event.preventDefault();
    if (!this._nameValue) return;

    const nameToAdd = this._nameValue;
    if (this.people.some(({ name }) => name === nameToAdd)) return;

    this._showInfo = false;
    this._nameValue = '';
    this.dispatchEvent(new CustomEvent('person-added', { detail: { person: nameToAdd }}));
  }

  _handleDelete(event, person) {
    event.stopPropagation();
    this.dispatchEvent(new CustomEvent('person-deleted', { detail: { person }}));
  }

  _handleColorSwap(color) {
    this.dispatchEvent(new CustomEvent('person-swap-color', { detail: { color }}));
  }
}

export default PeopleSelector;
