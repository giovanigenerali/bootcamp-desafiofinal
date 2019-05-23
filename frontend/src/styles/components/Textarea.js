import styled from 'styled-components';

const Textarea = styled.textarea`
  color: #fff;
  font-size: 20px;
  border: 1px solid transparent;
  background: transparent !important;
  margin: 10px 0 40px 0;
  padding: 0;
  resize: none;
  height: 100px;

  &::placeholder {
    color: rgba(256, 256, 256, 0.6);
  }

  @media all and (max-width: 768px) {
    font-size: 1em;
  }
`;

export default Textarea;
