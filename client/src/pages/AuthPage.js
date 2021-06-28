import React, {useState, useEffect, useContext} from 'react'
import {useHttp} from '../hooks/http.hook'
import {useMessage} from '../hooks/message.hook'
import {AuthContext} from '../context/AuthContext'

export const AuthPage = () => {
  const auth = useContext(AuthContext)
  const message = useMessage()
  const {loading, request, error, clearError} = useHttp()
    const [form, setForm] = useState({
      email: '', password: ''
    })
  
    useEffect(() => {
      message(error)
      clearError()
    }, [error, message, clearError])

    useEffect(() => {
      window.M.updateTextFields() // делает инпуты активными
    }, [])
  
    const changeHandler = event => {
      setForm({ ...form, [event.target.name]: event.target.value })
    }

    const loginHandler = async () => {
      try {
        const data = await request('http://localhost:5000/login', 'POST', {...form})
        message(data.message)
        auth.login(data.token, data.userId)
      } catch (e) {}
    }

    return(
        <div className="row">
        <div className="col s6 offset-s3 " style={{paddingTop: '6rem'}}>

        
          <div className="card brown lighten-1">
            <div className="card-content white-text">
              <span className="card-title center-align" style={{paddingBottom: '2rem'}}>Вход</span>
              <div>
  
                <div className="input-field">
                  <input
                    placeholder="Введите email"
                    id="email"
                    type="text"
                    name="email"
                    className="yellow-input"
                    value={form.email}
                    onChange={changeHandler}
                  />
                  <label htmlFor="email">Email</label>
                </div>
  
                <div className="input-field">
                  <input
                    placeholder="Введите пароль"
                    id="password"
                    type="password"
                    name="password"
                    className="yellow-input"
                    value={form.password}
                    onChange={changeHandler}
                  />
                  <label htmlFor="email">Пароль</label>
                </div>
  
              </div>
            </div>
            <div className="card-action center-align">
            <p>Еще нет аккаунта? - <a href="/registr">Зарегистрируйся</a></p> 
            <button
                className="btn black"
                style={{marginRight: 10}}
                disabled={loading}
                onClick={loginHandler}
              >
                Войти
              </button>
            </div>
          </div>
        </div>
      </div>
    )
}