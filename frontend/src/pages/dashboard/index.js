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
    loadingMeetupsSubscribed: PropTypes.bool.isRequired,
    loadingMeetupsUpcoming: PropTypes.bool.isRequired,
    loadingMeetupsRecomended: PropTypes.bool.isRequired,
  };

  componentDidMount() {
    const { meetupSubscribedRequest, meetupUpcomingRequest, meetupRecomendedRequest } = this.props;

    meetupSubscribedRequest();
    meetupUpcomingRequest();
    meetupRecomendedRequest();
  }

  render() {
    const {
      meetupsSubscribed,
      meetupsUpcoming,
      meetupsRecomended,
      loadingMeetupsSubscribed,
      loadingMeetupsUpcoming,
      loadingMeetupsRecomended,
    } = this.props;

    return (
      <>
        <Navbar />
        <Container>
          <MeetupContainer>
            <MeetupContainerTitle>Inscrições</MeetupContainerTitle>
            {loadingMeetupsSubscribed && (
              <div style={{ marginBottom: 40, color: 'rgba(255, 255, 255, 0.8)' }}>
                Carregando...
              </div>
            )}
            {!loadingMeetupsSubscribed
              && meetupsSubscribed.data
              && meetupsSubscribed.data.length > 0 && (
                <MeetupList>
                  {!loadingMeetupsSubscribed
                    && meetupsSubscribed.data
                    && meetupsSubscribed.data.length > 0
                    && meetupsSubscribed.data.map(meetup => (
                      <MeetupItem key={meetup.id} meetup={meetup} />
                    ))}
                </MeetupList>
            )}
            {!loadingMeetupsSubscribed
              && meetupsSubscribed.data
              && meetupsSubscribed.data.length === 0 && (
                <div style={{ marginBottom: 40, color: 'rgba(255, 255, 255, 0.8)' }}>
                  Você não está inscrito em nenhum meetup.
                </div>
            )}

            <MeetupContainerTitle>Próximos meetups</MeetupContainerTitle>
            {loadingMeetupsUpcoming && (
              <div style={{ marginBottom: 40, color: 'rgba(255, 255, 255, 0.8)' }}>
                Carregando...
              </div>
            )}
            {!loadingMeetupsUpcoming && meetupsUpcoming.data && meetupsUpcoming.data.length > 0 && (
              <MeetupList>
                {!loadingMeetupsUpcoming
                  && meetupsUpcoming.data
                  && meetupsUpcoming.data.length > 0
                  && meetupsUpcoming.data.map(meetup => (
                    <MeetupItem key={meetup.id} meetup={meetup} />
                  ))}
              </MeetupList>
            )}
            {!loadingMeetupsUpcoming
              && meetupsUpcoming.data
              && meetupsUpcoming.data.length === 0 && (
                <div style={{ marginBottom: 40, color: 'rgba(255, 255, 255, 0.8)' }}>
                  Não existe nenhum meetup para os próximos dias
                </div>
            )}

            <MeetupContainerTitle>Recomendados</MeetupContainerTitle>
            {loadingMeetupsRecomended && (
              <div style={{ marginBottom: 40, color: 'rgba(255, 255, 255, 0.8)' }}>
                Carregando...
              </div>
            )}
            {!loadingMeetupsRecomended
              && meetupsRecomended.data
              && meetupsRecomended.data.length > 0 && (
                <MeetupList>
                  {!loadingMeetupsRecomended
                    && meetupsRecomended.data
                    && meetupsRecomended.data.length > 0
                    && meetupsRecomended.data.map(meetup => (
                      <MeetupItem key={meetup.id} meetup={meetup} />
                    ))}
                </MeetupList>
            )}
            {!loadingMeetupsRecomended
              && meetupsRecomended.data
              && meetupsRecomended.data.length === 0 && (
                <div style={{ marginBottom: 40, color: 'rgba(255, 255, 255, 0.8)' }}>
                  Nenhum meetup recomendado para você no momento.
                </div>
            )}
          </MeetupContainer>
        </Container>
      </>
    );
  }
}

const mapStateToProps = state => ({
  loadingMeetupsSubscribed: state.meetups.loadingMeetupsSubscribed,
  meetupsSubscribed: state.meetups.subscribed,
  loadingMeetupsUpcoming: state.meetups.loadingMeetupsUpcoming,
  meetupsUpcoming: state.meetups.upcoming,
  loadingMeetupsRecomended: state.meetups.loadingMeetupsRecomended,
  meetupsRecomended: state.meetups.recomended,
});

const mapDispatchToProps = dispatch => bindActionCreators(MeetupsActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);
