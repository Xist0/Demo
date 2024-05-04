import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {loginThunk} from './redux/authSlice'
import { Link } from 'react-router-dom'

const Log = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const authSate = useSelector((state => state.auth))
    const dispatch = useDispatch()

    useEffect(() => {

    }, [authSate])

    return (
        <>

            <div className="reg-container">
                <div className="block-reg">
                    <h1>Авторизация</h1>
                    <input type="text"
                        placeholder='Логин'
                        onChange={(e) => {
                            setUsername(e.target.value)
                        }}
                        value={username}
                    />
                    <input type="password"
                        placeholder='Пароль'
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                        value={password}
                    />
                   <button onClick={() => {
                        dispatch(loginThunk({
                            username: username,
                            password: password
                        }))
                    }}>Войти</button>
                    <div className="reg-log">
                        <h5>Нет аккаунта?</h5><Link to='/reg'>Зарегистрироваться</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Log