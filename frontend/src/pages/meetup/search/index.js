/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MdSearch, MdRemoveCircleOutline } from 'react-icons/md';
import MeetupsActions from '../../../store/ducks/meetups';

import {
  Container, MeetupSearch, MeetupSearchInput, MeetupContainer, MeetupList,
} from './styles';

import Navbar from '../../../components/Navbar';
import MeetupItem from '../../../components/MeetupItem';

class Search extends Component {
  static propTypes = {
    meetupSearchRequest: PropTypes.func.isRequired,
    meetups: PropTypes.any.isRequired,
    loadingMeetupSearch: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.searchInput = React.createRef();
  }

  state = {
    search: '',
    meetups: [],
    total: 0,
  };

  componentDidMount() {
    this.searchInput.current.focus();
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.loadingMeetupSearch) {
      const { meetups } = nextProps;
      if (meetups) {
        this.setState({ meetups, total: parseInt(meetups.total, 10) });
      }
    }
  }

  handleSubmitSearch = (event) => {
    const { meetupSearchRequest } = this.props;
    const search = event.target.value;

    if (event.key === 'Enter') {
      if (search.length > 0) {
        this.setState({ search });
        meetupSearchRequest(search);
      } else {
        this.setState({ meetups: [] });
      }
    }

    if (search.length === 0) {
      this.setState({ meetups: [] });
    }
  };

  handleClearSearch = () => {
    this.setState({
      search: '',
      meetups: [],
      total: 0,
    });
  };

  render() {
    const { loadingMeetupSearch } = this.props;
    const { search, meetups, total } = this.state;

    return (
      <>
        <Navbar />
        <Container>
          <MeetupSearch>
            <MdSearch className="searchIcon" size={24} />
            <MeetupSearchInput
              ref={this.searchInput}
              value={search}
              onChange={event => this.setState({ search: event.target.value })}
              placeholder="Digite o título do meetup e pressione enter"
              onKeyDown={event => this.handleSubmitSearch(event)}
            />
            {!loadingMeetupSearch && search && (
              <MdRemoveCircleOutline
                className="searchClear"
                onClick={this.handleClearSearch}
                size={20}
              />
            )}
          </MeetupSearch>

          <MeetupContainer>
            {!loadingMeetupSearch && meetups.data && meetups.data.length > 0 && (
              <div style={{ marginTop: 20, marginBottom: 20, color: 'rgba(255, 255, 255, 0.8)' }}>
                {total > 1 ? 'Foram encontrados' : 'Foi encontrato'}
                {' '}
                <strong
                  style={{
                    fontSize: 14,
                    borderRadius: 4,
                    backgroundColor: '#e5556e',
                    paddingLeft: 4,
                    paddingRight: 4,
                  }}
                >
                  {total}
                </strong>
                {' '}
                {total > 1 ? 'meetups' : 'meetup'}
              </div>
            )}

            {loadingMeetupSearch && (
              <div style={{ marginTop: 20, marginBottom: 20, color: 'rgba(255, 255, 255, 0.8)' }}>
                Efetuando busca...
              </div>
            )}

            {!loadingMeetupSearch && meetups.data && meetups.data.length > 0 && (
              <MeetupList>
                {meetups.data.map(meetup => (
                  <MeetupItem key={meetup.id} meetup={meetup} />
                ))}
              </MeetupList>
            )}

            {!loadingMeetupSearch && meetups.data && meetups.data.length === 0 && (
              <div style={{ marginTop: 20, marginBottom: 20, color: 'rgba(255, 255, 255, 0.8)' }}>
                Nenhum meetup encontrado com o título:
                {' '}
                <strong
                  style={{
                    fontSize: 14,
                    borderRadius: 3,
                    backgroundColor: '#e5556e',
                    paddingLeft: 4,
                    paddingRight: 4,
                    marginLeft: 4,
                  }}
                >
                  {search}
                </strong>
              </div>
            )}
          </MeetupContainer>
        </Container>
      </>
    );
  }
}

const mapStateToProps = state => ({
  loadingMeetupSearch: state.meetups.loadingMeetupSearch,
  meetups: state.meetups.search,
});

const mapDispatchToProps = dispatch => bindActionCreators(MeetupsActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search);
