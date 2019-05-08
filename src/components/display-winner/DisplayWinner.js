import { LitElement, html } from 'lit-element';
import ConfettiGenerator from 'confetti-js';

import styles from './styles';

const CANVAS_STYLE_BASE = `
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 10;
`;

class DisplayWinner extends LitElement {
  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      winner: { type: Object },
      display: { type: Boolean },
    }
  }

  constructor() {
    super();
    this.winner = { name: 'Paca', color: '#b4d455'};
    this.display = false;
  }

  disconnectedCallback() {
    this._removeConfetti();
  }

  updated() {
    if (this.display) {
      this._createConfetti();
    } else {
      this._removeConfetti();
    }
  }

  _createConfetti() {
    const confettiCanvasId = `__display-winner__confetti__${Date.now()}__`;
  
    this._confettiCanvas = document.createElement('canvas');
    this._confettiCanvas.setAttribute('id', confettiCanvasId);
    this._confettiCanvas.setAttribute('style', CANVAS_STYLE_BASE);
    document.body.appendChild(this._confettiCanvas);

    this._confetti = new ConfettiGenerator({
      target: confettiCanvasId,
      height: window.innerHeight * 2,
      clock: 30
    });
    this._confetti.render();
  }

  _removeConfetti() {
    if(this._confettiCanvas) {
      document.body.removeChild(this._confettiCanvas);
    }
  }

  render() {
    const { name, color } = this.winner;

    return html`
      <div class="wrapper ${this.display ? 'display' : ''}">
        <div class="winner" style="--bg-color:${color}">
          ${name}
        </div>
      </div>
    `;
  }
}

export default DisplayWinner;
