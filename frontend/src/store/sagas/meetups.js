import { call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { actions as toastrActions } from 'react-redux-toastr';

import api from '../../services/api';

import MeetupsActions from '../ducks/meetups';

export function* newMeetup({ data }) {
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

export function* filterMeetupSubscribed({ filter }) {
  try {
    const response = yield call(api.get, `meetups?filter=${filter}`);

    yield put(MeetupsActions.meetupSubscribedSuccess(response.data));
  } catch (err) {
    yield put(
      toastrActions.add({
        type: 'error',
        title: 'Atenção',
        message: 'Erro ao carregar os meetups',
      }),
    );
  }
}

export function* filterMeetupUpcoming({ filter }) {
  try {
    const response = yield call(api.get, `meetups?filter=${filter}`);

    yield put(MeetupsActions.meetupUpcomingSuccess(response.data));
  } catch (err) {
    yield put(
      toastrActions.add({
        type: 'error',
        title: 'Atenção',
        message: 'Erro ao carregar os meetups',
      }),
    );
  }
}

export function* filterMeetupRecomended({ filter }) {
  try {
    const response = yield call(api.get, `meetups?filter=${filter}`);

    yield put(MeetupsActions.meetupRecomendedSuccess(response.data));
  } catch (err) {
    yield put(
      toastrActions.add({
        type: 'error',
        title: 'Atenção',
        message: 'Erro ao carregar os meetups',
      }),
    );
  }
}

export function* searchMeetup({ title }) {
  try {
    const response = yield call(api.get, `meetups?title=${title}`);

    yield put(MeetupsActions.meetupSearchSuccess(response.data));
  } catch (err) {
    yield put(
      toastrActions.add({
        type: 'error',
        title: 'Atenção',
        message: 'Erro ao buscar os meetups',
      }),
    );
  }
}
