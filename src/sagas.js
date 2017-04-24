import {sagas as auth} from './ducks/auth'
import {sagas as notifications} from './ducks/notifications'
import {sagas as requests} from './ducks/api'

export default function* rootSaga() {
  yield [
    auth,
    notifications,
    requests,
  ]
}
