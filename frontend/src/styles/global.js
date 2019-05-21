import { createGlobalStyle } from 'styled-components';

import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import 'react-datepicker/dist/react-datepicker.css';

export default createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    outline: 0;
    box-sizing: border-box;
  }

  #root {
    height: 100vh;
  }

  body {
    background-color: #22202c;
    background: linear-gradient(to bottom, #22202c 0%,#2a202c 100%);
    background-attachment: fixed;
    color: #ffffff;
    font-family: Helvetica, Arial, sans-serif;
    font-size: 16px;
    text-rendering: optimizeLegibility !important;
    -webkit-font-smoothing: antialiased !important;
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

  /* Datepicker - Custom style */
  .react-datepicker {
    border: 1px solid #cfcfcf;
    border-radius: unset !important;
  }

  .react-datepicker-wrapper {
    margin: 10px 0 40px 0;

    input {
    color: #fff;
    font-size: 20px;
    border: 1px solid transparent;
    background: transparent !important;
    padding: 0;
    min-width: 315px;

      &::placeholder {
        color: rgba(256, 256, 256, 0.6);
      }
    }
  }

  .react-datepicker__header {
    background-color: #3a3740 !important;
    border-radius: unset !important;
  }

  .react-datepicker__day, .react-datepicker__month-text {
    color: #22202c !important;
  }

  .react-datepicker__current-month, .react-datepicker-time__header, .react-datepicker-year-header {
    color: #fff !important;
  }

  .react-datepicker__day--keyboard-selected, .react-datepicker__month-text--keyboard-selected,
  .react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list li.react-datepicker__time-list-item--selected {
    background: #e5556e !important;
    color: #fff !important;
  }

  .react-datepicker__day--selected, .react-datepicker__day--in-selecting-range, .react-datepicker__day--in-range, .react-datepicker__month-text--selected, .react-datepicker__month-text--in-selecting-range, .react-datepicker__month-text--in-range {
    background: #e5556e !important;
    color: #fff !important;
  }

  .react-datepicker__day--keyboard-selected, .react-datepicker__month-text--keyboard-selected {
    color: #fff !important;
  }

  .react-datepicker__day--disabled, .react-datepicker__month-text--disabled {
    color: #9e9e9e !important;
  }

  .react-datepicker__day-name {
    color: #fff !important;
  }

  .react-datepicker__day--today {
    color: #e5556e !important;
  }
`;
