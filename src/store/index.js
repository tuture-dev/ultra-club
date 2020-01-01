import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga'

import rootReducer from '../reducers'
import rootSaga from '../sagas'

const sagaMiddleware = createSagaMiddleware()
const middlewares = [sagaMiddleware, createLogger()]

export default function configStore() {
  const store = createStore(rootReducer, applyMiddleware(...middlewares))

  sagaMiddleware.run(rootSaga)

  return store
}
