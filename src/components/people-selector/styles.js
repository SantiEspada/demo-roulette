import { css } from 'lit-element';

import sharedStyles from "../sharedStyles";

const styles = css`
  :host {
    display: block;
    --border-width: 4px;
    --border-radius: 6px;
    --border-radius-total: calc(var(--border-width) + var(--border-radius));
  }

  h2 {
    color: white;
    text-align: center;
    max-height: 80px;
    margin: 0 0 32px 0;
    overflow: hidden;
    transition: .3s;
  }

  h2.hidden {
    opacity: 0;
    max-height: 0;
    margin: 0;
  }

  form {
    position: relative;
    display: flex;
    width: 100%;
    background-color: rgba(255, 255, 255, .5);
    border-radius: calc(var(--border-radius-total));
    align-items: center;
    padding: var(--border-width);
  }

  form input,
  form button {
    --size: 52px;
    background-color: white;
    font-family: inherit;
    height: var(--size);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    border: 0;
    outline: none;
    border-radius: var(--border-radius);
  }

  form input:focus,
  form button:focus {
    box-shadow: 0 0 0 var(--border-width) rgba(255, 255, 255, .5);
  }

  form input {
    flex: 1;
    font-size: 18px;
    padding: 22px 12px 8px 12px;
    align-items: flex-end;
  }

  form button {
    background-color: transparent;
    margin-left: var(--border-width);
    width: var(--size);
  }

  form button svg {
    width: 100%;
    fill: white;
  }

  label {
    position: absolute;
    left: 16px;
    pointer-events: none;
    transition: .3s;
  }

  label.up {
    opacity: .8;
    transform: translate(-15px, -12px) scale(.8);
  }

  ul {
    padding: 0;
    margin: 16px 0;
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    grid-column-gap: 16px;
    grid-row-gap: 16px;
  }

  li {
    --height: 42px;
    display: flex;
    height: var(--height);
    width: 100%;
    background-color: #b4d445;
    border-radius: var(--border-radius-total);
    align-items: center;
    background-color: var(--bg-color, #b4d445);
    --color: rgba(000, 000, 000, .8);
    color: var(--color);
    user-select: none;
    cursor: pointer;
  }

  li span {
    padding: 0 12px;
    width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  li button {
    height: var(--height);
    width: var(--height);
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    outline: none;
    border: var(--border-width) solid transparent;
    border-radius: 0 var(--border-radius-total) var(--border-radius-total) 0;
    margin-left: auto;
  }

  li button:focus {
    border: var(--border-width) solid rgba(0, 0, 0, .3);
  }

  li button svg {
    height: 70%;
    width: 70%;
    fill: var(--color);
  }
`;

export default [sharedStyles, styles];
