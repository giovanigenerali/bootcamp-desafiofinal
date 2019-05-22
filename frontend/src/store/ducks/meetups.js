/* eslint-disable max-len */
import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* Types & Action Creators */

const { Types, Creators } = createActions({
  meetupNewRequest: ['data'],
  meetupNewSuccess: null,
  meetupSubscribedRequest: null,
  meetupSubscribedSuccess: ['subscribed'],
  meetupUpcomingRequest: null,
  meetupUpcomingSuccess: ['upcoming'],
  meetupRecomendedRequest: null,
  meetupRecomendedSuccess: ['recomended'],
  meetupSearchRequest: ['title'],
  meetupSearchSuccess: ['search'],
});

export const MeetupsTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = Immutable({
  subscribed: [],
  upcoming: [],
  recomended: [],
  search: [],
  title: null,
  loading: false,
});

/* Reducers */

export const successMeetupNew = state => state.merge({ ...state });

export const requestMeetupSubscribed = state => state.merge({ loading: true });
export const successMeetupSubscribed = (state, { subscribed }) => state.merge({ subscribed, loading: false });
export const requestMeetupUpcoming = state => state.merge({ loading: true });
export const successMeetupUpcoming = (state, { upcoming }) => state.merge({ upcoming, loading: false });
export const requestMeetupRecomended = state => state.merge({ loading: true });
export const successMeetupRecomended = (state, { recomended }) => state.merge({ recomended, loading: false });
export const requestMeetupSearch = (state, { title }) => state.merge({ title, loading: true });
export const successMeetupSearch = (state, { search }) => state.merge({ search, loading: false });

/* Reducers to types */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.MEETUP_NEW_SUCCESS]: successMeetupNew,
  [Types.MEETUP_SUBSCRIBED_REQUEST]: requestMeetupSubscribed,
  [Types.MEETUP_SUBSCRIBED_SUCCESS]: successMeetupSubscribed,
  [Types.MEETUP_UPCOMING_REQUEST]: requestMeetupUpcoming,
  [Types.MEETUP_UPCOMING_SUCCESS]: successMeetupUpcoming,
  [Types.MEETUP_RECOMENDED_REQUEST]: requestMeetupRecomended,
  [Types.MEETUP_RECOMENDED_SUCCESS]: successMeetupRecomended,
  [Types.MEETUP_SEARCH_REQUEST]: requestMeetupSearch,
  [Types.MEETUP_SEARCH_SUCCESS]: successMeetupSearch,
});
