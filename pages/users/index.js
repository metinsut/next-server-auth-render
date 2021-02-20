const getData = async () => {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users")
        if (!response.ok) {
            throw new Error("Request Failed")
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.log("error", error)
    }

}

export const getStaticProps = async () => {
    const users = await getData() ?? []
    return {
        props: {
            users
        },
    }
}

const Users = ({ users }) => {
    return (
        <>
            <h1>This is users page</h1>
            <ul>
                {users.length > 0 &&
                    users.map((user) =>
                        <li key={user.id}>{user.name}</li>
                    )
                }
            </ul>
        </>
    )
}

export default Users