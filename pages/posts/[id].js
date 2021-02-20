const getAllPaths = async () => {
    let posts = []
    const response = await fetch("https://jsonplaceholder.typicode.com/posts")
    posts = await response.json()
    const data = posts.map(({ id }) => {
        return {
            params: {
                id: encodeURI(id)
            }
        }
    })
    return data
}

const getPostData = async (id) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    const post = await response.json()
    return post

}



export const getStaticPaths = async () => {
    const paths = await getAllPaths()
    return {
        paths,
        fallback: false
    }
}

export const getStaticProps = async ({ params }) => {
    const post = await getPostData(params.id)
    return {
        props: {
            post
        }
    }
}

const Post = ({ post }) => {
    return (
        <>
            <h1>Post Pages</h1>
            <h3>{post.userId} - {post.id}</h3>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
        </>
    )
}

export default Post;