import { css } from 'lit-element';

import sharedStyles from '../sharedStyles';

const styles = css`
  :host {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .bg {
    width: 100%;
    height: auto;
    transition: var(--bg-transition);
    opacity: var(--bg-opacity);
    animation: spin 10s linear infinite;
  }

  .bg.animated {
    animation: spin 10s linear infinite, spinAndZoom 1s;
  }

  .text {
    position: absolute;
    width: 80%;
  }

  .text.animated {
    animation: bounceZoom 1s;
  }

  @keyframes spin {
    0%, 100% {
      animation-timing-function: linear;
    }

    0% {
      transform: rotate(0);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes spinAndZoom {
    0%, 100% {
      animation-timing-function: cubic-bezier(.35,.2,.24,1.02);
    }

    0% {
      transform: scale(0.01) rotate(-360deg);
    }

    100% {
      transform: scale(1) rotate(0);
    }
  }

  @keyframes bounceZoom {
    0%, 100% {
      animation-timing-function: cubic-bezier(.35,.2, .6, 1.6);
    }
    0% {
      transform: scale(0.01);
    }

    to {
      transform: scale(1);
    }
  }
`;

export default [sharedStyles, styles];
