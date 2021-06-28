import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router'
import {useHttp} from '../hooks/http.hook'
import {useMessage} from '../hooks/message.hook'

export const RegistrPage = () => {
const history = useHistory()
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

    const registerHandler = async () => {
      try {
        const data = await request('http://localhost:5000/registr', 'POST', {...form})
        message(data.message)
        if (data.status === 201){
          history.push('/')
        }
      } catch (e) {}
    }

    return(
        <div className="row">
        <div className="col s6 offset-s3 " style={{paddingTop: '6rem'}}>
          <div className="card brown lighten-1">
            <div className="card-content white-text">
              <span className="card-title center-align" style={{paddingBottom: '2rem'}}>Регистрация</span>
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
            <p>Уже есть аккаунт? - <a href="/">Войти</a></p> 
              <button
                className="btn black"
                onClick={registerHandler}
                disabled={loading}
              >
                Регистрация
              </button>
            </div>
          </div>
        </div>
      </div>
    )
}