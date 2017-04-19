import {sagas as auth} from './ducks/auth'

export default function* rootSaga() {
  yield [
    auth,
  ]
}
