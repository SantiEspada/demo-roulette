import { LitElement, html } from 'lit-element';

import { getRandomColor, checkContrast } from './utils';

import './components/demo-roulette';

class XperienceTools extends LitElement {
	static get properties() {
		return {
			rouletteSpinning: { type: Boolean },
			people: { type: Array },
			winner: { type: Object },
			showRepeat: { type: Boolean }
		}
	}

	constructor() {
		super();
		this.people = [];
		this.winner = '';
		this.showRepeat = false;
	}

	render() {
		return html`
			<h1>La ruleta de la demo ✨</h1>
			<demo-roulette
				@winner-selected="${this._handleWinner}"
				.people="${this.people}"
				.spinning="${this.rouletteSpinning}"
			>
			</demo-roulette>
			${!this.rouletteSpinning ? html`
				<form @submit="${this._addName}">
					<input required type="text" name="nameToAdd">
					<button>+</button>
				</form>
			` : ''}
			${this.winner ? html`<p>And the winner is... <strong>${this.winner.name}!</strong></p>` : ''}
			${(this.rouletteSpinning || this.people.length === 0) ? '' : html`<button @click="${this._spinRoulette}">Tira de la ruletaaaaa</button>`}
			${this.showRepeat ? html`<button @click="${this._reSpinRoulette}">Repetir</button>` : ''}
		`;
	}

	_spinRoulette() {
		this.rouletteSpinning = true;
	}

	_reSpinRoulette() {
		const roulette = this.shadowRoot.querySelector('demo-roulette');
		roulette.reSpin();
	}

	_handleWinner({detail: { winner }}) {
		this.winner = winner;
		this.showRepeat = true;
	}

	_addName(event) {
		event.preventDefault();

		const nameInput = this.shadowRoot.querySelector('input[name="nameToAdd"]');
		const name = nameInput.value;

		if (name) {
			const existingColors = this.people.map(({ color }) => color);
			let newColor = getRandomColor();
			while(!checkContrast(newColor, existingColors)) {
				newColor = getRandomColor();
			}

			const personToAdd = { name, color: newColor };

			this.people = [...this.people, personToAdd];
			nameInput.value = '';
		}
	}
}

customElements.define('xperience-tools', XperienceTools);
