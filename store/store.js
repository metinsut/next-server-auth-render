import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import { createWrapper } from 'next-redux-wrapper'
import reducers from './reducers'

const bindMiddleware = (middleware) => {
    if (process.env.NODE_ENV !== 'production') {
        return composeWithDevTools(applyMiddleware(...middleware))
    }
    return applyMiddleware(...middleware)
}

const makeStore = context => createStore(reducers, bindMiddleware([thunkMiddleware]))

const wrapper = createWrapper(makeStore)

export { wrapper }
