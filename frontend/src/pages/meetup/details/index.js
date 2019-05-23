import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MeetupsActions from '../../../store/ducks/meetups';

import {
  Container,
  MeetupContainer,
  MeetupImageWrapper,
  MeetupImage,
  MeetupInfoWrapper,
  MeetupTitle,
  MeetupMemebers,
  MeetupDescription,
  MeetupInfoLabel,
  MeetupInfoText,
} from './styles';

import Navbar from '../../../components/Navbar';
import Button from '../../../styles/components/Button';

class DetailsMeetup extends Component {
  static propTypes = {
    meetupDetailsRequest: PropTypes.func.isRequired,
    meetupSubscribeRequest: PropTypes.func.isRequired,
    meetupUnsubscribeRequest: PropTypes.func.isRequired,
    meetup: PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      description: PropTypes.string,
      when: PropTypes.string,
      where: PropTypes.string,
      image: PropTypes.string,
    }),
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string,
      }),
    }).isRequired,
    loading: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    meetup: null,
  };

  state = {
    meetup: null,
    notFound: null,
  };

  componentDidMount() {
    const { match, meetupDetailsRequest } = this.props;

    meetupDetailsRequest(match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.loading) {
      const { meetup } = nextProps;

      if (meetup) {
        this.setState({ meetup });
      } else {
        this.setState({ notFound: true });
      }
    }
  }

  handleSubscription = () => {
    const { match, meetupSubscribeRequest } = this.props;

    meetupSubscribeRequest(match.params.id);
  };

  handleUnsubscription = () => {
    const { match, meetupUnsubscribeRequest } = this.props;

    meetupUnsubscribeRequest(match.params.id);
  };

  render() {
    const { loading } = this.props;
    const { meetup, notFound } = this.state;

    return (
      <>
        {notFound && <Redirect to="/" />}
        <Navbar />
        <Container>
          {loading && (
            <div style={{ marginBottom: 40, color: 'rgba(255, 255, 255, 0.8)' }}>Carregando...</div>
          )}

          {meetup && (
            <MeetupContainer>
              <MeetupImageWrapper>
                <MeetupImage src={meetup.image} alt={meetup.title} />
              </MeetupImageWrapper>
              <MeetupInfoWrapper>
                <MeetupTitle>{meetup.title}</MeetupTitle>
                <MeetupMemebers>
                  {parseInt(meetup.__meta__.members_count, 10) > 0
                    ? `${meetup.__meta__.members_count} membro${
                      parseInt(meetup.__meta__.members_count, 10) > 1 ? 's' : ''
                    }`
                    : 'Incrições abertas'}
                </MeetupMemebers>
                <MeetupDescription>{meetup.description}</MeetupDescription>
                <MeetupInfoLabel>Realizado em:</MeetupInfoLabel>
                <MeetupInfoText>{meetup.where}</MeetupInfoText>
                <MeetupInfoLabel>Quando?</MeetupInfoLabel>
                <MeetupInfoText>
                  {moment(meetup.when).format('DD/MM/YYYY [às] HH:mm')}
                </MeetupInfoText>
                <MeetupInfoLabel>Organizado por:</MeetupInfoLabel>
                <MeetupInfoText>{meetup.user.name}</MeetupInfoText>
                {!meetup.subscribed ? (
                  <Button type="button" onClick={() => this.handleSubscription()}>
                    Inscreva-se
                  </Button>
                ) : (
                  <Button type="button" onClick={() => this.handleUnsubscription()}>
                    Cancelar inscrição
                  </Button>
                )}
              </MeetupInfoWrapper>
            </MeetupContainer>
          )}
        </Container>
      </>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.meetups.loading,
  meetup: state.meetups.meetup,
});

const mapDispatchToProps = dispatch => bindActionCreators(MeetupsActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DetailsMeetup);