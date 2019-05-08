import { css } from 'lit-element';

const styles = css`
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
    z-index: 30;
    pointer-events: none;
    opacity: 0;
  }

  .winner {
    font-size: 20vh;
    color: #fff;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-color: #fff;
    background-image: linear-gradient(transparent 40%, var(--bg-color));
    font-style: italic;
    text-shadow: 0 0 30px rgba(255, 255, 255, .3);
    opacity: 0;
  }

  @keyframes flash {
    0% {
      background-color: #fff;
    }

    100% {
      background-color: transparent;
    }
  }

  @keyframes zoom {
    0% {
      opacity: 0;
      transform: scale3d(.3,.3,.3);
    }

    50% {
      opacity: 1;
    }
  }

  .display {
    opacity: 1;
    animation: flash .3s;
  }

  .display .winner{
    opacity: 1;
    animation: zoom .3s;
  }
`;

export default styles;
