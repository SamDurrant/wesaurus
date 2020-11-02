import config from '../config'
import jwtDecode from 'jwt-decode'

let _timeoutId
const _TEN_SECONDS_IN_MS = 10000

const TokenService = {
  saveAuthToken(token) {
    window.sessionStorage.setItem(config.TOKEN_KEY, token)
  },
  getAuthToken() {
    return window.sessionStorage.getItem(config.TOKEN_KEY)
  },
  clearAuthToken() {
    window.sessionStorage.removeItem(config.TOKEN_KEY)
  },
  hasAuthToken() {
    return !!TokenService.getAuthToken()
  },
  makeBasicAuthToken(userName, password) {
    return window.btoa(`${userName}:${password}`)
  },
  parseJwt(jwt) {
    return jwtDecode(jwt)
  },
  readJwtToken() {
    return TokenService.parseJwt(TokenService.getAuthToken())
  },
  _getMsUntilExpiry(payload) {
    // payload is from JWT
    // exp value is in seconds, need to convert to ms, so '* 1000' calculates the difference between now and when JWT will expire
    return payload.exp * 1000 - Date.now()
  },
  queueCallbackBeforeExpiry(callback) {
    // get num of ms from now until token expires
    const msUntilExpiry = TokenService._getMsUntilExpiry(
      TokenService.readJwtToken()
      // queue callback that will happen 10s before token expires
      // callback is passed in as argument so it could be anything
    )
    _timeoutId = setTimeout(callback, msUntilExpiry - _TEN_SECONDS_IN_MS)
  },
  clearCallbackBeforeExpiry() {
    clearTimeout(_timeoutId)
  },
}

export default TokenService
