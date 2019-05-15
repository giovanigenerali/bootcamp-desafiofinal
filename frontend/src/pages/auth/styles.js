import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  background: #25202c;
  justify-content: center;
  align-items: center;

  svg {
    display: flex;
    align-self: center;
    margin-bottom: 30px;
  }

  a {
    color: #fff;
    opacity: 0.6;
    text-decoration: none;
    margin: 20px 0 0 0;
    align-self: center;
    transition: opacity 0.2s ease;

    &:hover,
    &:focus,
    &:active,
    &:visited {
      opacity: 1;
    }
  }
`;

export const SignForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 10px;
  width: 315px;

  span {
    font-weight: bold;
  }

  input {
    color: #fff;
    font-size: 20px;
    border: 1px solid transparent;
    background: transparent !important;
    margin: 10px 0 40px 0;
    padding: 0;

    &::placeholder {
      color: rgba(256, 256, 256, 0.6);
    }
  }
`;
