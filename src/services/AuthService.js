import {URL} from "../config/URL";
import {$authHost, $host, setTokens} from "../config";

const BASE_URL = URL.AUTH_REST_API_URL

export const logIn = async (user) => {
  const {data} = await $host.post(BASE_URL + '/login', {
    email: user.email,
    password: user.password,
    role: user.role,
  })

  await setTokens(JSON.stringify(data.accessToken), JSON.stringify(data.refreshToken))

  await localStorage.setItem('userData', JSON.stringify({
    email: user.email,
    role: user.role,
  }))


  return data
}

export const register = async (user) => {
  const {data} = await $host.post(BASE_URL + '/registration', {
    email: user.email,
    password: user.password,
    role: user.role,
    chatId: localStorage.getItem('chatId')
  })

  return data
}


export const logOut = async () => {
  await $authHost.post(BASE_URL + '/logout', {
    refreshToken: localStorage.getItem('refreshToken')
  })

  localStorage.clear()

  return window.location.href = '/login'
}
