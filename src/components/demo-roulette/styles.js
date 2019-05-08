import { css } from 'lit-element';

const styles = css`
  :host {
    display: block;
    position: relative;
  }

  .triangle {
    height: 0;
    width: 0;
    --size: 32px;
    border-style: solid;
    border-width: var(--size) calc(var(--size) / 2) 0 calc(var(--size) / 2);
    border-color: #ffffff transparent transparent transparent;
    filter: drop-shadow(0 0 3px rgba(0, 0, 0, .3));
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
  }

  svg {
    width: 100%;
    height: 100%;
    transition: transform var(--transition-duration) cubic-bezier(.51,1.16,.92,.99), height .3s;
    shape-rendering: geometricPrecision;
  }

  svg.hidden {
    height: 0;
  }

  ul {
    width: 300px;
    padding: 0;
    margin: 20px auto;
  }

  li {
    display: flex;
    padding: 8px 16px;
    color: rgba(0, 0, 0, .6);
    background-color: var(--bg-color);
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    width: 100%;
    box-sizing: border-box;
  }

  li + li {
    margin-top: 6px;
  }
`;

export default styles;
