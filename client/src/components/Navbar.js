import React, {useContext} from 'react'
import {NavLink, useHistory} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'

export const Navbar = () => {
  const history = useHistory()
  const auth = useContext(AuthContext)

  const logoutHandler = event => {
    event.preventDefault()
    auth.logout()
    history.push('/')
  }
  const url = window.location.href
  var final = url.split("/").reverse()[0];

  return (
    <nav>
      <div className="nav-wrapper brown darken-1" style={{ padding: '0 2rem' }}>
        <span className="brand-logo">Сокращение ссылок</span>
        {final !== "" && final !== "registr" &&
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><NavLink to="/create">Создать ссылку</NavLink></li>
          <li><NavLink to="/links">Ваши ссылки</NavLink></li>
          <li><a href="/" onClick={logoutHandler}>Выйти</a></li>
        </ul>}
      </div>
    </nav>
  )
}
