import { LitElement, html } from 'lit-element';

import { logoTextShadow, logoBg } from '../svg';

import styles from './styles';

class AppShell extends LitElement {
  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      animate: { type: Boolean }
    }
  }

  constructor() {
    super();
    this.animate = false;
  }

  render() {
    return html`
      <i class="bg ${this.animate ? 'animated' : ''}">${logoBg}</i>
      <i class="text ${this.animate ? 'animated' : ''}">${logoTextShadow}</i>
    `;
  }
}

export default AppShell;
