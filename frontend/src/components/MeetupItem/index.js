import React from 'react';
import PropTypes from 'prop-types';

import { MdChevronRight } from 'react-icons/md';

import {
  MeetupBox,
  MeetupImage,
  MeetupInfoWrapper,
  MeetupInfo,
  MeetupTitle,
  MeetupMemebers,
  MeetupButtonDetails,
} from './styles';

export default function MeetupItem({ meetup }) {
  return (
    <MeetupBox>
      <MeetupImage src={meetup.image} alt={meetup.title} />
      <MeetupInfoWrapper>
        <MeetupInfo>
          <MeetupTitle>{meetup.title}</MeetupTitle>
          <MeetupMemebers>
            {parseInt(meetup.__meta__.members_count, 10).length > 0
              ? `${meetup.__meta__.members_count} membros`
              : 'Incrições abertas'}
          </MeetupMemebers>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {meetup.themes.map(theme => (
              <span
                style={{
                  fontSize: 11,
                  color: '#fff',
                  paddingTop: 4,
                  paddingRight: 8,
                  paddingBottom: 4,
                  paddingLeft: 8,
                  backgroundColor: '#534c56',
                  borderRadius: 10,
                  marginRight: 6,
                  marginTop: 6,
                }}
                key={theme.id}
              >
                {theme.title.toLowerCase()}
              </span>
            ))}
          </div>
        </MeetupInfo>
        <MeetupButtonDetails to={`/meetups/details/${meetup.id}`} title="Detalhes do meetup">
          <MdChevronRight size={20} color="#fff" />
        </MeetupButtonDetails>
      </MeetupInfoWrapper>
    </MeetupBox>
  );
}

MeetupItem.propTypes = {
  meetup: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
};
