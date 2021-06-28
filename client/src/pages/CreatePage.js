import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {useHistory} from 'react-router-dom'

export const CreatePage = () => {
  const history = useHistory()
  const auth = useContext(AuthContext)
  const {request} = useHttp()
  const [link, setLink] = useState('')

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  async function createLink() {
    try {
        const data = await request('http://localhost:5000/generate', 'POST', {origin_link: link}, {
          Authorization: `Bearer ${auth.token}`
        })
        //console.log(data.link)
        if (!data.link){
          auth.logout()
        }
        history.push(`/detail/${data.link._id}`)
      } catch (e) {}
  }
  const pressHandler = async event => {
    if (event.key === 'Enter') {
      createLink()
    }
  }

  return (
    <div className="row">
      <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
      <h5 htmlFor="link">Вставьте ссылку</h5>
        <div className="input-field">
          <input
            placeholder="Вставьте ссылку"
            id="link"
            type="text"
            value={link}
            onChange={e => setLink(e.target.value)}
            onKeyPress={pressHandler}
          />
        </div>
        <button className="waves-effect brown darken-3 btn" onClick={createLink}>Сократить</button>
      </div>
    </div>
  )
}
