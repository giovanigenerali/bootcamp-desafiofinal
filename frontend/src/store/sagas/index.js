import { all, takeLatest } from 'redux-saga/effects';

import { AuthTypes } from '../ducks/auth';
import { signIn, signUp } from './auth';

import { ThemesTypes } from '../ducks/themes';
import { loadThemes } from './themes';

import { MeetupsTypes } from '../ducks/meetups';
import { newMeetup } from './meetups';

import { ProfileTypes } from '../ducks/profile';
import { loadProfile, updateProfile } from './profile';

export default function* rootSaga() {
  return yield all([
    takeLatest(AuthTypes.SIGN_IN_REQUEST, signIn),
    takeLatest(AuthTypes.SIGN_UP_REQUEST, signUp),

    takeLatest(ThemesTypes.LOAD_THEMES_REQUEST, loadThemes),
    takeLatest(MeetupsTypes.MEETUP_NEW_REQUEST, newMeetup),

    takeLatest(ProfileTypes.LOAD_PROFILE_REQUEST, loadProfile),
    takeLatest(ProfileTypes.UPDATE_PROFILE_REQUEST, updateProfile),
  ]);
}
