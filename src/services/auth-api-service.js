import config from '../config'
import TokenService from './token-service'
import IdleService from './idle-service'

const AuthApiService = {
  postUser(user) {
    return fetch(`${config.API_ENDPOINT}/users`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(user),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    )
  },
  postLogin(credentials) {
    return fetch(`${config.API_ENDPOINT}/auth/login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })
      .then((res) =>
        !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
      )
      .then((res) => {
        // whenever login performed:
        // 1. save token in local storage
        // 2. queue auto logout when user goes idle
        // 3. queue call to refresh endpoint based on JWT exp value
        TokenService.saveAuthToken(res.authToken)
        IdleService.registerIdleTimerResets()
        TokenService.queueCallbackBeforeExpiry(() => {
          AuthApiService.postRefreshToken()
        })
      })
  },
  postRefreshToken() {
    return fetch(`${config.API_ENDPOINT}/auth/refresh`, {
      method: 'POST',
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then((res) =>
        !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
      )
      .then((res) => {
        // similar to login logic
        // 1. no need to queue idle timers again
        // 2. catch the error here as the refresh is happening behind the scenes
        TokenService.saveAuthToken(res.authToken)
        TokenService.queueCallbackBeforeExpiry(() => {
          AuthApiService.postRefreshToken()
        })
        return res
      })
      .catch((err) => {
        console.error(err)
      })
  },
}

export default AuthApiService
