import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useSWR from 'swr'
import clienteAxios from '../config/axios'

const useAuth = ({ middleware, url }) => {
  const token = localStorage.getItem('AUTH_TOKEN')
  const navigate = useNavigate()

  const { data: user, error, mutate } = useSWR('/api/user', () =>
    clienteAxios('api/user', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => res.data)
    .catch(error => {
      throw Error(error?.response?.data?.errors)
    })
  )

  const login = async (datos, setErrors) => {
    try {
      const { data } = await clienteAxios.post('/api/login', datos)
      localStorage.setItem('AUTH_TOKEN', data.token)
      setErrors([])
      await mutate()
    } catch (error) {
      setErrors(Object.values(error.response.data.errors))
    }
  }

  const registro = async (datos, setErrors) => {
    try {
      const { data } = await clienteAxios.post('/api/registro', datos)
      localStorage.setItem('AUTH_TOKEN', data.token)
      setErrors([])
      await mutate()
    } catch (error) {
      setErrors(Object.values(error.response.data.errors))
    }
  }

  const logout = async () => {
    try {
      await clienteAxios.post('/api/logout', null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      localStorage.removeItem('AUTH_TOKEN')
      await mutate(undefined)
    } catch (error) {
      
    }
  }

  useEffect(() => {
    if (middleware === 'guest' && url && user) {
      navigate(url)
    }

    if (middleware === 'auth' && error) {
      navigate('/auth/login')
    }
  }, [user, error])
  
  return {
    login,
    registro,
    logout,
    user,
    error
  }
}

export {
  useAuth
}