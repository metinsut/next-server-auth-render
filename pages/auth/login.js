import { useState } from "react"
import { useRouter } from 'next/router'
import { Input, Button } from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { useDispatch } from "react-redux"
import { fetchUserLogin } from "../../store/actions"
import style from "./auth.module.scss"

const Login = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const handleLogin = () => {
        const userData = { email, password }
        dispatch(fetchUserLogin(userData, router))
    };

    return (
        <div className={style.wrapper}>
            <p>Email</p>
            <Input placeholder="Basic usage" name="email" onChange={e => setEmail(e.target.value)} />
            <p>Password</p>
            <Input.Password
                placeholder="input password"
                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                onChange={e => setPassword(e.target.value)}
            />
            <Button type="primary" onClick={handleLogin}>Submit</Button>
        </div>
    );
};

export default Login;