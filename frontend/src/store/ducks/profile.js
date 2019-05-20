import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* Types & Action Creators */

const { Types, Creators } = createActions({
  loadProfileRequest: null,
  loadProfileSuccess: ['data'],
  updateProfileRequest: ['name', 'password', 'passwordConfirmation', 'preferencesId'],
  updateProfileSuccess: null,
});

export const ProfileTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = Immutable({
  data: [],
  loading: false,
});

/* Reducers */

export const loadRequest = state => state.merge({ loading: true });
export const loadSuccess = (state, { data }) => state.merge({ data, loading: false });

/* Reducers to types */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOAD_PROFILE_REQUEST]: loadRequest,
  [Types.LOAD_PROFILE_SUCCESS]: loadSuccess,
  [Types.UPDATE_PROFILE_SUCCESS]: loadSuccess,
});
