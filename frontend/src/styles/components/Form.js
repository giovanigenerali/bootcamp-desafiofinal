import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 10px;
  width: 315px;

  span {
    font-weight: bold;
  }

  label {
  }

  input[type='checkbox'] {
    margin: 0;
    padding: 0;
  }
`;

export default Form;
