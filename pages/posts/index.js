import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { postsSelector, authSelector } from "../../store/reducers"
import { wrapper } from '../../store/store'
import { fetchPosts, addPost } from "../../store/actions"

const Posts = () => {
    const dispatch = useDispatch()
    const { posts } = useSelector(postsSelector)
    const { auth } = useSelector(authSelector)
    const addPostHandler = () => {
        dispatch(addPost())
    }
    useEffect(() => {
        dispatch(fetchPosts())
    }, [auth])
    return (
        <>
            <h1>This is test post page.</h1>
            <button onClick={addPostHandler}>Add Post</button>
            {posts.map((post, key) => <div key={key}>{post}</div>)}
        </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(
    async ({ store: { dispatch, getState }, req, res, ...etc }) => {
        await dispatch(fetchPosts(req))
    }
);

export default Posts