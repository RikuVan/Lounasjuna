import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {
  notify,
  SEND_NOTIFICATION,
  DISMISS_NOTIFICATION
} from './notifications'
import {
  vote,
  revokeVote
} from './voting'
import {testRestaurants} from './__mocks__/requests'


const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('notifications', () => {
  test('creates FETCH_TODOS_NOTIFICATION followed by DISMISS_NOTIFICATION', () => {
    const expectedActions = [
      {type: SEND_NOTIFICATION, payload: 'CREATED'},
      {type: DISMISS_NOTIFICATION, payload: 'CREATED'}
    ]
    const store = mockStore({notifications: {}})

    store.subscribe(() => {
      if (store.getActions().length === 2) {
        expect(store.getActions()).toEqual(expectedActions);
        expect(payload).to.equal(mockExpected.payload);
        done();
      }
    });

    store.dispatch(notify())
  })
})


jest.mock('./requests');

describe('voting', () => {
  /**
   * Example of complex test of function with multiple actions dispatched and
   * external api calls that need to be mocked
   */

  test('vote', done => {
    const store = mockStore({requests: {}})
    //store will emit values as they come with subscribe
    store.subscribe(() => {
      if (store.getActions().length === 3) {
        const expectedActions = [
          {type: 'ATTEMPT_REQUEST', payload: {resource: 'votes'}},
          {type: 'ATTEMPT_REQUEST', payload: {resource: 'restaurants'}},
          {type: 'COMPLETE_REQUEST', payload: {
            data: [
             {
               uid: "e3660a89-0ece-45b4-9cb8-e32a4c0f376b",
               address: 'Näsilinnankatu 23, 33210 TAMPERE',
               name: 'Thai & Laos Näsilinnankatu',
               rating: 4.2,
               votes: [
                 {1: true}
               ]
             },
              {
                uid: '12ec6699-ebf3-46ae-95c4-b87d67fd8a46',
                address: 'Tullikatu 6, 33100 Tampere',
                name: 'Bengol Curry',
                rating: 3.2,
                votes: []
              }
          ],
            error: null,
            resource: 'restaurants'
          }},
        ]
        expect(store.getActions()).toEqual(expectedActions);
        done()
      }
    });

    return store.dispatch(vote('1', '1'))
  })

  test('revoke vote', done => {
    const mockCallback = jest.fn();
    const store = mockStore({requests: {}})
    store.subscribe(() => {
      if (store.getActions().length === 2) {
        const expectedActions = [
          {type: 'ATTEMPT_REQUEST', payload: {resource: "votes"}},
          {type: 'COMPLETE_REQUEST', payload: {resource: 'votes', error: null}}
        ]
        expect(store.getActions()).toEqual(expectedActions)
        expect(mockCallback).toBeCalled()
        done()
      }
    })

    return store.dispatch(revokeVote('1', '1', mockCallback))
  })

})

