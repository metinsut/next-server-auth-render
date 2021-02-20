import { combineReducers } from 'redux'
import { HYDRATE } from 'next-redux-wrapper'

const initialAuthState = {
    auth: false,
    user: {}
}
const initialPostsState = {
    posts: []
}

const authSelector = state => state.authentication;
const postsSelector = state => state.posts;

const authReducer = (state = initialAuthState, { type, payload }) => {
    switch (type) {
        case HYDRATE:
            return {
                ...state,
                ...payload.authentication
            };
        case "LOGIN_SUCCESS":
            return {
                ...state,
                user: payload.user,
                auth: true
            }
        case "LOGIN_FAIL":
            return {
                ...state,
                user: {},
                auth: false
            }
        case "LOGOUT":
            return {
                ...state,
                user: {},
                auth: false
            }
        default:
            return state;
    }
}

const postsReducer = (state = initialPostsState, { type, payload }) => {
    switch (type) {
        case HYDRATE:
            return {
                ...state,
                ...payload.posts
            };
        case "FETCH_POST":
            return {
                ...state,
                posts: payload.posts
            }
        case "POST_FAIL":
            return {
                ...state,
                posts: []
            }
        case "ADD_POST":
            const posts = [...state.posts]
            posts.push(payload)
            return {
                ...state,
                posts: posts
            }
        default:
            return state;
    }
}

const reducers = {
    authentication: authReducer,
    posts: postsReducer
}

export default combineReducers(reducers)

export { authSelector, postsSelector }
