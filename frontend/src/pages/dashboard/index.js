import React from 'react';

import { MdChevronRight } from 'react-icons/md';

import {
  Container,
  MeetupContainer,
  MeetupContainerTitle,
  MeetupList,
  MeetupBox,
  MeetupImage,
  MeetupInfoWrapper,
  MeetupInfo,
  MeetupTitle,
  MeetupMemebers,
  MeetupButtonDetails,
} from './styles';

import Navbar from '../../components/navbar';

function Dashboard() {
  return (
    <>
      <Navbar />
      <Container>
        <MeetupContainer>
          <MeetupContainerTitle>Inscrições</MeetupContainerTitle>
          <MeetupList>
            <MeetupBox>
              <MeetupImage src="https://via.placeholder.com/290x110.jpg?text=meetup" alt="" />
              <MeetupInfoWrapper>
                <MeetupInfo>
                  <MeetupTitle>Meetup React JS</MeetupTitle>
                  <MeetupMemebers>120 membros</MeetupMemebers>
                </MeetupInfo>
                <MeetupButtonDetails>
                  <MdChevronRight size={20} color="#fff" />
                </MeetupButtonDetails>
              </MeetupInfoWrapper>
            </MeetupBox>

            <MeetupBox>
              <MeetupImage src="https://via.placeholder.com/290x110.jpg?text=meetup" alt="" />
              <MeetupInfoWrapper>
                <MeetupInfo>
                  <MeetupTitle>Meetup React JS</MeetupTitle>
                  <MeetupMemebers>120 membros</MeetupMemebers>
                </MeetupInfo>
                <MeetupButtonDetails>
                  <MdChevronRight size={20} color="#fff" />
                </MeetupButtonDetails>
              </MeetupInfoWrapper>
            </MeetupBox>

            <MeetupBox>
              <MeetupImage src="https://via.placeholder.com/290x110.jpg?text=meetup" alt="" />
              <MeetupInfoWrapper>
                <MeetupInfo>
                  <MeetupTitle>Meetup React JS</MeetupTitle>
                  <MeetupMemebers>120 membros</MeetupMemebers>
                </MeetupInfo>
                <MeetupButtonDetails>
                  <MdChevronRight size={20} color="#fff" />
                </MeetupButtonDetails>
              </MeetupInfoWrapper>
            </MeetupBox>

            <MeetupBox>
              <MeetupImage src="https://via.placeholder.com/290x110.jpg?text=meetup" alt="" />
              <MeetupInfoWrapper>
                <MeetupInfo>
                  <MeetupTitle>Meetup React JS</MeetupTitle>
                  <MeetupMemebers>120 membros</MeetupMemebers>
                </MeetupInfo>
                <MeetupButtonDetails>
                  <MdChevronRight size={20} color="#fff" />
                </MeetupButtonDetails>
              </MeetupInfoWrapper>
            </MeetupBox>

            <MeetupBox>
              <MeetupImage src="https://via.placeholder.com/290x110.jpg?text=meetup" alt="" />
              <MeetupInfoWrapper>
                <MeetupInfo>
                  <MeetupTitle>Meetup React JS</MeetupTitle>
                  <MeetupMemebers>120 membros</MeetupMemebers>
                </MeetupInfo>
                <MeetupButtonDetails>
                  <MdChevronRight size={20} color="#fff" />
                </MeetupButtonDetails>
              </MeetupInfoWrapper>
            </MeetupBox>

            <MeetupBox>
              <MeetupImage src="https://via.placeholder.com/290x110.jpg?text=meetup" alt="" />
              <MeetupInfoWrapper>
                <MeetupInfo>
                  <MeetupTitle>Meetup React JS</MeetupTitle>
                  <MeetupMemebers>120 membros</MeetupMemebers>
                </MeetupInfo>
                <MeetupButtonDetails>
                  <MdChevronRight size={20} color="#fff" />
                </MeetupButtonDetails>
              </MeetupInfoWrapper>
            </MeetupBox>
          </MeetupList>

          <MeetupContainerTitle>Próximos meetups</MeetupContainerTitle>
          <MeetupList>
            <MeetupBox>
              <MeetupImage src="https://via.placeholder.com/290x110.jpg?text=meetup" alt="" />
              <MeetupInfoWrapper>
                <MeetupInfo>
                  <MeetupTitle>Meetup React JS</MeetupTitle>
                  <MeetupMemebers>120 membros</MeetupMemebers>
                </MeetupInfo>
                <MeetupButtonDetails>
                  <MdChevronRight size={20} color="#fff" />
                </MeetupButtonDetails>
              </MeetupInfoWrapper>
            </MeetupBox>

            <MeetupBox>
              <MeetupImage src="https://via.placeholder.com/290x110.jpg?text=meetup" alt="" />
              <MeetupInfoWrapper>
                <MeetupInfo>
                  <MeetupTitle>Meetup React JS</MeetupTitle>
                  <MeetupMemebers>120 membros</MeetupMemebers>
                </MeetupInfo>
                <MeetupButtonDetails>
                  <MdChevronRight size={20} color="#fff" />
                </MeetupButtonDetails>
              </MeetupInfoWrapper>
            </MeetupBox>

            <MeetupBox>
              <MeetupImage src="https://via.placeholder.com/290x110.jpg?text=meetup" alt="" />
              <MeetupInfoWrapper>
                <MeetupInfo>
                  <MeetupTitle>Meetup React JS</MeetupTitle>
                  <MeetupMemebers>120 membros</MeetupMemebers>
                </MeetupInfo>
                <MeetupButtonDetails>
                  <MdChevronRight size={20} color="#fff" />
                </MeetupButtonDetails>
              </MeetupInfoWrapper>
            </MeetupBox>
          </MeetupList>

          <MeetupContainerTitle>Recomendados</MeetupContainerTitle>
          <MeetupList>
            <MeetupBox>
              <MeetupImage src="https://via.placeholder.com/290x110.jpg?text=meetup" alt="" />
              <MeetupInfoWrapper>
                <MeetupInfo>
                  <MeetupTitle>Meetup React JS</MeetupTitle>
                  <MeetupMemebers>120 membros</MeetupMemebers>
                </MeetupInfo>
                <MeetupButtonDetails>
                  <MdChevronRight size={20} color="#fff" />
                </MeetupButtonDetails>
              </MeetupInfoWrapper>
            </MeetupBox>
          </MeetupList>
        </MeetupContainer>
      </Container>
    </>
  );
}

export default Dashboard;
