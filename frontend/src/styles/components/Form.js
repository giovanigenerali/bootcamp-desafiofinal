import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 0;
  min-width: 315px;

  label {
    font-weight: bold;
    cursor: pointer;
  }

  input[type='checkbox'] {
    margin: 0;
    padding: 0;
  }
`;

export default Form;
