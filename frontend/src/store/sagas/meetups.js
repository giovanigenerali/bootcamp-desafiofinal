import { call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { actions as toastrActions } from 'react-redux-toastr';

import api from '../../services/api';

import MeetupsActions from '../ducks/meetups';

export function* newMeetup({ data }) {
  console.tron.log('saga newMeetup', data);
  try {
    yield call(api.post, 'meetups', data);
    yield put(MeetupsActions.meetupNewSuccess());
    yield put(push('/dashboard'));
  } catch (err) {
    yield put(
      toastrActions.add({
        type: 'error',
        title: 'Atenção',
        message: 'Ocorreu um erro ao criar o meetup',
      }),
    );
  }
}
