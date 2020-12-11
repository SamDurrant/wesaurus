import TokenService from './token-service'
import config from '../config'

const UserApiService = {
  getUserDefinitions() {
    return fetch(`${config.API_ENDPOINT}/users/definitions`, {
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    )
  },
}

export default UserApiService
