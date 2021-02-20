import { useSelector, useDispatch } from "react-redux"
import Link from 'next/link'
import styles from "./Header.module.scss"
import { authSelector } from "../../store/reducers"
import { logOutUser } from "../../store/actions"
import { Button } from 'antd'

const HeaderComponent = () => {
    const { auth } = useSelector(authSelector)
    const dispatch = useDispatch()
    const logOutUserHandler = () => {
        dispatch(logOutUser())
    }
    return (
        <header className={styles.header__wrapper}>
            <Link href="/">
                <a className={styles.header__logo}>App</a>
            </Link>
            <Link href="/posts">
                <a className={styles.header__logo}>Posts</a>
            </Link>
            <div className={styles.header__rightSide}>
                {auth
                    ?
                    <Button type="primary" onClick={logOutUserHandler}>Logout</Button>
                    :
                    <Link href="/auth/login">
                        <a>
                            <Button type="primary">Login</Button>
                        </a>
                    </Link>
                }
            </div>
        </header>
    )
}

export default HeaderComponent