import { all, fork } from 'redux-saga/effects';
import { watchLoginSaga, watchSignupSaga, watchAdminLoginSaga } from './authSagas';

export default function* rootSaga() {
  yield all([
    fork(watchLoginSaga),
    fork(watchSignupSaga),
    fork(watchAdminLoginSaga),
  ]);
}