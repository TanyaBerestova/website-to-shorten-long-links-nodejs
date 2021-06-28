import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {Loader} from '../components/Loader'
import {LinksList} from '../components/LinksList'

export const LinksPage = () => {
  const [links, setLinks] = useState([])
  const {loading, request} = useHttp()
  const auth = useContext(AuthContext)

  const fetchLinks = useCallback(async () => {
    try {
      const fetched = await request('http://localhost:5000/link', 'GET', null, {
        Authorization: `Bearer ${auth.token}`
      })
      if (fetched.status === 500){
        auth.logout()
      }
      setLinks(fetched)
    } catch (e) {}
  }, [auth.token, request])

  useEffect(() => {
    fetchLinks()
  }, [fetchLinks])

  if (loading) {
    return <Loader/>
  }

  return (
    <>
      {!loading && <LinksList links={links} />}
    </>
  )
}
