import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

import { MdChevronRight } from 'react-icons/md';

import {
  MeetupBox,
  MeetupImage,
  MeetupInfoWrapper,
  MeetupInfo,
  MeetupWhen,
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
          <MeetupWhen>{moment(meetup.when).format('DD/MM/YY [às] HH:mm')}</MeetupWhen>
          <MeetupTitle>{meetup.title}</MeetupTitle>
          <MeetupMemebers>
            {parseInt(meetup.__meta__.members_count, 10) > 0
              ? `${meetup.__meta__.members_count} membro${
                parseInt(meetup.__meta__.members_count, 10) > 1 ? 's' : ''}`
              : 'Incrições abertas'}
          </MeetupMemebers>
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
