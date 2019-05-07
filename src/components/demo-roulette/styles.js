import { css } from 'lit-element';

const styles = css`
  svg {
    width: 300px;
    height: 300px;
    transition: transform var(--transition-duration) cubic-bezier(.51,1.16,.92,.99), height .3s;
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
