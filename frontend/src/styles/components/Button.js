import styled from 'styled-components';

const Button = styled.button.attrs({
  type: 'button',
})`
  border-radius: 3px;
  background: #e5556e;
  transition: background-color 0.2s ease;
  border: 0;
  border-radius: 25px;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  height: 50px;

  &:hover,
  &:focus {
    background-color: #fc5e76;
  }
`;

export default Button;
