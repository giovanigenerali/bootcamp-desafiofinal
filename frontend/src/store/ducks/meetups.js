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

  meetupDetailsRequest: ['id'],
  meetupDetailsSuccess: ['meetup'],
  meetupDetailsFailed: null,

  meetupSubscribeRequest: ['id'],
  meetupSubscribeSuccess: null,

  meetupUnsubscribeRequest: ['id'],
  meetupUnsubscribeSuccess: null,
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
  id: null,
  meetup: null,
  loadingMeetupsSubscribed: false,
  loadingMeetupsUpcoming: false,
  loadingMeetupsRecomended: false,
  loadingMeetupSearch: false,
  loadingMeetupDetails: false,
});

/* Reducers */

export const successMeetupNew = state => state.merge({ ...state });

export const requestMeetupSubscribed = state => state.merge({ loadingMeetupsSubscribed: true });
export const successMeetupSubscribed = (state, { subscribed }) => state.merge({ subscribed, loadingMeetupsSubscribed: false });

export const requestMeetupUpcoming = state => state.merge({ loadingMeetupsUpcoming: true });
export const successMeetupUpcoming = (state, { upcoming }) => state.merge({ upcoming, loadingMeetupsUpcoming: false });

export const requestMeetupRecomended = state => state.merge({ loadingMeetupsRecomended: true });
export const successMeetupRecomended = (state, { recomended }) => state.merge({ recomended, loadingMeetupsRecomended: false });

export const requestMeetupSearch = (state, { title }) => state.merge({ title, loadingMeetupSearch: true });
export const successMeetupSearch = (state, { search }) => state.merge({ search, loadingMeetupSearch: false });

export const requestMeetupDetails = (state, { id }) => state.merge({ id, loadingMeetupDetails: true });
export const successMeetupDetails = (state, { meetup }) => state.merge({ meetup, loadingMeetupDetails: false });
export const failedMeetupDetails = state => state.merge({ loadingMeetupDetails: false });

export const requestMeetupSubscribe = (state, { id }) => state.merge({ id });
export const successMeetupSubscribe = state => state;

export const requestMeetupUnsubscribe = (state, { id }) => state.merge({ id });
export const successMeetupUnsubscribe = state => state;

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

  [Types.MEETUP_DETAILS_REQUEST]: requestMeetupDetails,
  [Types.MEETUP_DETAILS_SUCCESS]: successMeetupDetails,
  [Types.MEETUP_DETAILS_FAILED]: failedMeetupDetails,

  [Types.MEETUP_SUBSCRIBE_REQUEST]: requestMeetupSubscribe,
  [Types.MEETUP_SUBSCRIBE_SUCCESS]: successMeetupSubscribe,

  [Types.MEETUP_UNSUBSCRIBE_REQUEST]: requestMeetupUnsubscribe,
  [Types.MEETUP_UNSUBSCRIBE_SUCCESS]: successMeetupUnsubscribe,
});
