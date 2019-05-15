import { createGlobalStyle } from 'styled-components';

import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';

export default createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    background: #25202c;
    color: #ffffff;
    font-family: Helvetica, Arial, sans-serif;
    font-size: 16px;
    text-rendering: optimizeLegibility !important;
    -webkit-font-smoothing: antialiased !important;
  }

  html, body, #root {
    height: 100%;
  }

  input, button {
    font-family: Helvetica, Arial, sans-serif;
    font-size: 16px;
    border: 0;
    outline: none;
  }

  input {
    @keyframes autofill {
      to {
        font-family: Helvetica, Arial, sans-serif;
        color: #fff;
        font-size: 20px;
        background: transparent;
      }
    }
    &:-webkit-autofill {
      animation-name: autofill;
      animation-fill-mode: both;
    }
  }

  button {
    cursor: pointer;
  }
`;
