import {sagas as auth} from './ducks/auth'
import {sagas as notifications} from './ducks/notifications'

export default function* rootSaga() {
  yield [
    auth,
    notifications,
  ]
}
