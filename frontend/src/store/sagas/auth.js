import { call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { actions as toastrActions } from 'react-redux-toastr';

import api from '../../services/api';

import AuthActions from '../ducks/auth';

export function* signIn({ email, password }) {
  try {
    const response = yield call(api.post, 'sessions', { email, password });
    localStorage.setItem('@meetapp:token', response.data.token);

    yield put(AuthActions.signInSuccess(response.data.token));

    const firstLogin = !!localStorage.getItem('@meetapp:first_login');

    yield put(push(firstLogin ? '/profile' : '/'));
  } catch (err) {
    yield put(
      toastrActions.add({
        type: 'error',
        title: 'Falha no login',
        message: 'Verifique seu e-mail/senha.',
      }),
    );
  }
}

export function* signUp({ name, email, password }) {
  try {
    yield call(api.post, 'users', { name, email, password });

    const response = yield call(api.post, 'sessions', { email, password });
    localStorage.setItem('@meetapp:token', response.data.token);
    localStorage.setItem('@meetapp:first_login', true);

    yield put(AuthActions.signUpSuccess(response.data.token));

    yield put(push('/profile'));
  } catch (err) {
    yield put(
      toastrActions.add({
        type: 'error',
        title: 'Falha ao criar conta',
        message: 'Verifique seu nome, e-mail e senha.',
      }),
    );
  }
}
