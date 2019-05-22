import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  margin: 40px 26px;
  flex-direction: column;
`;

export const MeetupSearch = styled.div`
  background: #302d38;
  border-radius: 4px;
  display: flex;
  flex: 1;
  width: 910px;
  align-items: center;

  .searchIcon {
    color: rgba(256, 256, 256, 0.6);
    margin-left: 14px;
  }

  .searchClear {
    color: rgba(256, 256, 256, 0.6);
    margin-right: 14px;
    transition: color 0.2s ease;
    cursor: pointer;

    &:hover,
    &:focus {
      color: #fc5e76;
    }
  }
`;

export const MeetupSearchInput = styled.input`
  background: transparent;
  border: none;
  border-radius: 4px;
  color: #fff;
  padding: 14px 14px 14px 6px;
  font-size: 16px;
  flex: 1;

  &::placeholder {
    color: rgba(256, 256, 256, 0.6);
  }
`;

export const MeetupContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 910px;
`;

export const MeetupList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 40px;

  :last-child {
    margin-bottom: 0;
  }

  /* Supports Grid */
  display: grid;
  grid-template-columns: 290px 290px 290px;
  grid-gap: 20px;

  @media all and (max-width: 1024px) {
    grid-template-columns: 290px 290px;
  }
  @media all and (max-width: 768px) {
    grid-template-columns: 290px;
  }
`;
