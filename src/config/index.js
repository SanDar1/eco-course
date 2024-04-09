import axios from "axios";
import {URL} from "./URL";

const BASE_URL = URL.AUTH_REST_API_URL

export const setTokens = async (accessToken, refreshToken) => {
  await localStorage.setItem('accessToken', accessToken)
  await localStorage.setItem('refreshToken', refreshToken)
}

const $host = axios.create({
  baseURL: process.env.REACT_APP_API_URL
})

const $authHost = axios.create({
  baseURL: process.env.REACT_APP_API_URL
})

const authInterceptor = config => {
  config.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`
  return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
  $host,
  $authHost
}

$authHost.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {

    const originalRequest = error.config

    if (error.response.status === 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true

      try {
        const {data} = await axios.post(`${BASE_URL}/refresh`, {
          refreshToken: JSON.parse(localStorage.getItem('refreshToken')),
          role: JSON.parse(localStorage.getItem('userData')).role
        })

        await setTokens(JSON.stringify(data?.accessToken), JSON.stringify(data?.refreshToken))

        window.location.reload();
      } catch (e) {
        console.log(e);
      }
    }
  }
);