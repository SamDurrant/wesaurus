import TokenService from './token-service'
import config from '../config'

const UserWordApiService = {
  postWord(id) {
    const user_id = TokenService.readJwtToken().user_id
    return fetch(`${config.API_ENDPOINT}/users/${user_id}/words`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        word_id: id,
      }),
    }).then((res) => {
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    })
  },

  getWords() {
    const user_id = TokenService.readJwtToken().user_id

    return fetch(`${config.API_ENDPOINT}/users/${user_id}/words`, {
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    )
  },
  getWord(id) {
    return fetch(`${config.API_ENDPOINT}/words/${id}`, {
      headers: {},
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    )
  },
  getWordDefinitions(id) {
    return fetch(`${config.API_ENDPOINT}/words/${id}/definitions`, {
      headers: {},
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    )
  },
  deleteWord(word) {
    return fetch(`${config.API_ENDPOINT}/words/${word.id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    )
  },
  updateWord(word) {
    return fetch(`${config.API_ENDPOINT}/words/${word.id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        text: word.text,
      }),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    )
  },
}

export default UserWordApiService
