import { css } from 'lit-element';

import sharedStyles from '../../components/sharedStyles';

const styles = css`
  main {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100%;
    --transition: .8s;
    position: relative;
    z-index: 20;
  }

  .fullWidth {
    width: 90vw;
    max-width: 400px;
  }

  animated-logo {
    width: 200px;
    position: absolute;
    transition: var(--transition);
    z-index: 2;
    top: 50%;
    transform: translateY(-50%);
  }

  animated-logo.up {
    top: -100px;
    transform: scale(.5) translateY(0);
    --bg-transition: var(--transition);
    --bg-opacity: 0;
  }

  demo-roulette {
    position: absolute;
    z-index: 0;
  }

  people-selector {
    position: relative;
    z-index: 1;
  }

  people-selector,
  demo-roulette {
    opacity: 1;
    transform: translateY(0);
    transition: .8s;
  }

  people-selector.hidden,
  demo-roulette.hidden {
    opacity: 0;
    transform: translateY(20%);
  }

  button {
    position: fixed;
    bottom: 60px;
    font-family: 'Futura';
    text-transform: uppercase;
    color: #fff;
    padding: 16px 32px;
    font-size: 24px;
    border-radius: 999px;
    background-color: rgba(255, 255, 255, .2);
    border: 4px solid transparent;
    cursor: pointer;
    outline: none;
    box-shadow: 0 3px 6px rgba(0, 0, 0, .5);
    transition: .3s;
  }

  button.hidden {
    transform: translateY(30%);
    opacity: 0;
    pointer-events: none;
  }

  button:not(.hidden):hover {
    transform: translateY(-5%);
  }

  button:not(.hidden):focus {
    border-color: rgba(255, 255, 255, .3);
  }

  button:not(.hidden):active {
    transform: translateY(0);
  }

  /* main > *:not(display-winner) {
    display: none !important;
  } */
`;

export default [sharedStyles, styles];
