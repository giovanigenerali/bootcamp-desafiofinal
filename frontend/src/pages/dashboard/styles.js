import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  margin: 40px 26px;
`;

export const MeetupContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MeetupContainerTitle = styled.span`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 20px;
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
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;

  @media all and (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }
  @media all and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const MeetupBox = styled.div`
  display: flex;
  flex: auto;
  flex-direction: column;

  &:hover {
    img {
      opacity: 0.8;
    }
  }
`;

export const MeetupImage = styled.img`
  width: 100%;
  min-width: 290px;
  height: 110px;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
  transition: opacity 0.2s ease;
`;

export const MeetupInfoWrapper = styled.div`
  display: flex;
  padding: 20px;
  background: #fff;
  justify-content: space-between;
  align-items: center;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
`;

export const MeetupInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
`;

export const MeetupTitle = styled.span`
  color: #222;
  font-size: 16px;
  font-weight: bold;
`;

export const MeetupMemebers = styled.span`
  color: #999;
  font-size: 14px;
  margin-top: 4px;
`;

export const MeetupButtonDetails = styled.button`
  background-color: #e5556e;
  border-radius: 100%;
  height: 40px;
  width: 40px;
  transition: background-color 0.2s ease;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover,
  &:focus {
    background-color: #fc5e76;
  }
`;
