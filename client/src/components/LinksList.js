import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'

export const LinksList = ({ links }) => {
  const auth = useContext(AuthContext)
  const {request} = useHttp()
  if (!links.length) {
    return <p className="center">Ссылок пока нет</p>
  }
  async function deleteLink(id){
    try{
      const data = await request('http://localhost:5000/delete', 'POST', {link_id: id}, {
          Authorization: `Bearer ${auth.token}`
        })

    }catch (e){}
  }
 
  return (
    <div className="row">
    <div className="col s10 offset-s1">
      <table>
        <thead>
        <tr>
          <th>№</th>
          <th>Оригинальная</th>
          <th>Сокращенная</th>
          <th>Открыть</th>
          <th>Удалить</th>
        </tr>
        </thead>

        <tbody>
        { links.map((link, index) => {
          return (
            <tr key={link._id}>
              <td>{index + 1}</td>
              <td>{link.origin_link}</td>
              <td>{link.short_link}</td>
              <td>
                <Link to={`/detail/${link._id}`}>Открыть</Link>
              </td>
              <td>
                <a href="/links" onClick={()=>deleteLink(link._id)}>Удалить</a>
              </td>
            </tr>
          )
        }) }
        </tbody>
      </table>
    </div>
    </div>
  )
}
