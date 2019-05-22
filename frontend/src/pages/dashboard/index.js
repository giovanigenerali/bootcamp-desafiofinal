/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MeetupsActions from '../../store/ducks/meetups';

import {
  Container, MeetupContainer, MeetupContainerTitle, MeetupList,
} from './styles';

import Navbar from '../../components/Navbar';
import MeetupItem from '../../components/MeetupItem';

class Dashboard extends Component {
  static propTypes = {
    meetupSubscribedRequest: PropTypes.func.isRequired,
    meetupUpcomingRequest: PropTypes.func.isRequired,
    meetupRecomendedRequest: PropTypes.func.isRequired,
    meetupsSubscribed: PropTypes.any.isRequired,
    meetupsUpcoming: PropTypes.any.isRequired,
    meetupsRecomended: PropTypes.any.isRequired,
    loading: PropTypes.bool.isRequired,
  };

  componentDidMount() {
    const { meetupSubscribedRequest, meetupUpcomingRequest, meetupRecomendedRequest } = this.props;

    meetupSubscribedRequest();
    meetupUpcomingRequest();
    meetupRecomendedRequest();
  }

  render() {
    const {
      meetupsSubscribed, meetupsUpcoming, meetupsRecomended, loading,
    } = this.props;

    return (
      <>
        <Navbar />
        <Container>
          <MeetupContainer>
            <MeetupContainerTitle>Inscrições</MeetupContainerTitle>
            {loading && (
              <div style={{ marginBottom: 40, color: 'rgba(255, 255, 255, 0.8)' }}>
                Carregando...
              </div>
            )}
            {!loading && meetupsSubscribed.data && meetupsSubscribed.data.length > 0 && (
              <MeetupList>
                {!loading
                  && meetupsSubscribed.data
                  && meetupsSubscribed.data.length > 0
                  && meetupsSubscribed.data.map(meetup => (
                    <MeetupItem key={meetup.id} meetup={meetup} />
                  ))}
              </MeetupList>
            )}
            {!loading && meetupsSubscribed.data && meetupsSubscribed.data.length === 0 && (
              <div style={{ marginBottom: 40, color: 'rgba(255, 255, 255, 0.8)' }}>
                Você não está inscrito em nenhum meetup.
              </div>
            )}

            <MeetupContainerTitle>Próximos meetups</MeetupContainerTitle>
            {loading && (
              <div style={{ marginBottom: 40, color: 'rgba(255, 255, 255, 0.8)' }}>
                Carregando...
              </div>
            )}
            {!loading && meetupsUpcoming.data && meetupsUpcoming.data.length > 0 && (
              <MeetupList>
                {!loading
                  && meetupsUpcoming.data
                  && meetupsUpcoming.data.length > 0
                  && meetupsUpcoming.data.map(meetup => (
                    <MeetupItem key={meetup.id} meetup={meetup} />
                  ))}
              </MeetupList>
            )}
            {!loading && meetupsUpcoming.data && meetupsUpcoming.data.length === 0 && (
              <div style={{ marginBottom: 40, color: 'rgba(255, 255, 255, 0.8)' }}>
                Não existe nenhum meetup para os próximos dias
              </div>
            )}

            <MeetupContainerTitle>Recomendados</MeetupContainerTitle>
            {loading && (
              <div style={{ marginBottom: 40, color: 'rgba(255, 255, 255, 0.8)' }}>
                Carregando...
              </div>
            )}
            {!loading && meetupsRecomended.data && meetupsRecomended.data.length > 0 && (
              <MeetupList>
                {!loading
                  && meetupsRecomended.data
                  && meetupsRecomended.data.length > 0
                  && meetupsRecomended.data.map(meetup => (
                    <MeetupItem key={meetup.id} meetup={meetup} />
                  ))}
              </MeetupList>
            )}
            {!loading && meetupsRecomended.data && meetupsRecomended.data.length === 0 && (
              <div style={{ marginBottom: 40, color: 'rgba(255, 255, 255, 0.8)' }}>
                Não existe nenhum meetup que corresponde às suas preferências.
              </div>
            )}
          </MeetupContainer>
        </Container>
      </>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.meetups.loading,
  meetupsSubscribed: state.meetups.subscribed,
  meetupsUpcoming: state.meetups.upcoming,
  meetupsRecomended: state.meetups.recomended,
});

const mapDispatchToProps = dispatch => bindActionCreators(MeetupsActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);
