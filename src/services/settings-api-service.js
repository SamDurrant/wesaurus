import TokenService from './token-service'
import config from '../config'

const SettingsApiService = {
  getSettings() {
    const user_id = TokenService.readJwtToken().user_id

    return fetch(`${config.API_ENDPOINT}/users/${user_id}/settings`, {
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    )
  },
  updateSettings(dark_mode) {
    const user_id = TokenService.readJwtToken().user_id
    return fetch(`${config.API_ENDPOINT}/users/${user_id}/settings`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        dark_mode,
      }),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res
    )
  },
}

export default SettingsApiService
