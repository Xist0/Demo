import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { regThunk } from './redux/regSlice'
import { useDispatch, useSelector } from 'react-redux'
const Reg = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const regState = useSelector((state) => state.reg)
    const dispatch = useDispatch()

    const nav = useNavigate()

    useEffect(() => {
        if (regState.message) {
            nav('/auth')
        }
    }, [regState])

    return (
        <>
            <div className="reg-container">
                <div className="block-reg">
                    <h1>Регестрация</h1>
                    <input type="text"
                        placeholder='Логин'
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value)
                        }} />
                    <input type="password"
                        placeholder='Пароль'
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }} />
                    <button onClick={() => {
                        dispatch(regThunk({
                            username: username,
                            password: password
                        }))
                    }}>Зарегистрироваться</button>
                    <div className="reg-log">
                        <h5>Уже есть аккаунт?</h5><Link to="/auth">Войти</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Reg