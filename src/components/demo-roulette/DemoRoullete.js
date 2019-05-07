import { LitElement, html } from 'lit-element';

import {
  getCoordinatesForPercent,
  getTextColorFromBackground,
} from '../../utils';

import styles from './styles';

const TRANSITION_DURATION = 8;

const renderSlice = ({ color }, position, { length: total } = []) => {
  const fromPercent = position / total;
  const toPercent = (position + 1) / total;

  const [startX, startY] = getCoordinatesForPercent(fromPercent);
  const [endX, endY] = getCoordinatesForPercent(toPercent);

  const largeArcFlag = (toPercent - fromPercent) > 0.5 ? 1 : 0;

  const pathData = [
    `M ${startX} ${startY}`, // Move
    `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`, // Arc
    `L 0 0`, // Line
  ].join(' ');

  return `<path d="${pathData}" fill="${color}"></path>`;
}

const renderPerson = ({ name, color: bgColor }) => {
  const textColor = getTextColorFromBackground(bgColor);
  return html`<li style="--color:${textColor};--bg-color:${bgColor}">${name}</li>`;
}

class DemoRoulette extends LitElement {
  static get properties() {
    return {
      people: { type: Array },
      spinning: { type: Boolean },
      transitionDuration: { type: Number }
    };
  }

  static get styles() {
    return [styles];
  }

  constructor() {
    super();
    this.people = [];
    this.spinning = false;
    this.transitionDuration = TRANSITION_DURATION;
  }

  render() {
    return html`
      <div class="demo-roulette">
        <svg
          class="${this.people.length > 0 ? '' : 'hidden'}"
          viewBox="-1 -1 2 2"
          style="--transition-duration: ${this.transitionDuration}s; transform: rotate(${this.spinning ? this.finalRotation : -90}deg);"
        >
        </svg>
        <ul>${this.people.map(renderPerson)}</ul>
      </div>
    `;
  }

  updated() {
    const svg = this.shadowRoot.querySelector('svg');
    svg.innerHTML = this.people.map(renderSlice).join('');
  }

  get finalRotation() {
    const size = this.people.length;
    const step = 360 / size;

    const winner = Math.floor(Math.random() * size);
    setTimeout(() => this._dispatchWinner(this.people[winner]), TRANSITION_DURATION * 1000);

    const overlapMin = Math.floor(step * .1);
    const overlapMax = Math.floor(step * .9);
    const overlap = (Math.random() * overlapMax) + overlapMin;
    return -1 * ((winner * step)) - (overlap) - 90 - (360 * 10);
  }

  reSpin() {
    this._dispatchWinner();

    this.transitionDuration = 0;
    this.spinning = false;
    setTimeout(() => {
      this.transitionDuration = TRANSITION_DURATION;
      this.spinning = true
    });
  }

  _dispatchWinner(winner) {
    this.dispatchEvent(new CustomEvent('winner-selected', {
      bubbles: true,
      detail: { winner }
    }));
  }
}

export default DemoRoulette;
