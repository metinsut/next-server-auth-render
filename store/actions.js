import Cookies from 'js-cookie'
import cookie from "cookie"

const fetchUserLogin = (userData, router) => {
    return async (dispatch) => {
        const response = await fetch("http://localhost:3001/api/auth/login",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            }
        )
        const responseHeaders = response.headers;
        const authToken = responseHeaders.get("auth-token");
        const data = await response.json();
        if (!response.ok || data.error) {
            dispatch({
                type: "LOGIN_FAIL",
            })
            return
        }
        Cookies.set('token', authToken)
        dispatch({
            type: "LOGIN_SUCCESS",
            payload: data.success
        })
        router.push("/")
        return
    }
}

const fetchHealtCheck = async () => {
    const response = await fetch("http://localhost:3001/api")
    if (!response.ok) {
        return {}
    }
    return response.json()
}

const checkLogin = (authToken) => {
    return async (dispatch) => {
        const response = await fetch("http://localhost:3001/api/auth/tokencheck", {
            headers: {
                'auth-token': authToken
            },
        })
        if (!response.ok) {
            dispatch({
                type: "LOGIN_FAIL",
            })
            return false
        }
        const data = await response.json();
        if (data.success) {
            dispatch({
                type: "LOGIN_SUCCESS",
                payload: data.success
            })
            return true
        } else {
            dispatch({
                type: "LOGIN_FAIL",
            })
            return false
        }
    }
}

const logOutUser = () => {
    Cookies.remove('token')
    return {
        type: "LOGOUT"
    }
}

const fetchPosts = (req) => {
    return async (dispatch) => {
        const url = "http://localhost:3001/api/posts"
        const result = await fetchApi({ url, req })
        if (result.success) {
            dispatch({
                type: "FETCH_POST",
                payload: result.success
            })
        } else {
            dispatch({
                type: "POST_FAIL",
            })
        }
    }
}

const addPost = () => {
    return {
        type: "ADD_POST",
        payload: "new post"
    }
}

const fetchApi = async ({ url, params = {}, req }) => {
    const isServer = typeof window === 'undefined'
    let authToken = ""
    if (isServer) {
        const { token } = cookie.parse(req.headers.cookie || '')
        authToken = token
    } else {
        authToken = Cookies.get('token')
    }
    const options = {
        ...params,
        ...{
            ...params.headers,
            headers: { "auth-token": authToken }
        }
    }
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
}

export {
    fetchUserLogin,
    fetchHealtCheck,
    checkLogin,
    logOutUser,
    fetchPosts,
    addPost
}