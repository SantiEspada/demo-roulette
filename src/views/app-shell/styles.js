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
    font-size: small;
  }

  /* main > *:not(display-winner) {
    display: none !important;
  } */
`;

export default [sharedStyles, styles];
