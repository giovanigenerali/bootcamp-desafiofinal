import { all, takeLatest } from 'redux-saga/effects';

import { AuthTypes } from '../ducks/auth';
import { ThemesTypes } from '../ducks/themes';

import { signIn } from './auth';
import { loadThemes } from './themes';

export default function* rootSaga() {
  return yield all([
    takeLatest(AuthTypes.SIGN_IN_REQUEST, signIn),
    takeLatest(ThemesTypes.LOAD_THEMES_REQUEST, loadThemes),
  ]);
}
