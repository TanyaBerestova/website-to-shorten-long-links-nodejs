import {useState, useCallback} from 'react'
//позволяет взаимодействовать с сервером. Будет экспортировать определенные сущности
export const useHttp = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
    setLoading(true)
    try {
      if (body) {
        body = JSON.stringify(body)
        headers['Content-Type'] = 'application/json' // явно указываем, что передаем json, чтобы на сервере не был пустой объект
      }
      const res = await fetch(url, {method, headers, body})
      console.log(res)
      const data = await res.json() 
      console.log(`data is ${data}`)
      if (!res.ok) {
        throw new Error(data.message || 'Что-то пошло не так')
      }

      setLoading(false)
      console.log('kkkjjj')
      console.log(data)
      return data
    } catch (e) {
      setLoading(false)
      setError(e.message)
      throw e
    }
  }, [])

  const clearError = useCallback(() => setError(null), [])

  return { loading, request, error, clearError }
}
