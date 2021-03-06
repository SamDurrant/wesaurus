import TokenService from './token-service'
import config from '../config'

const WordApiService = {
  getWords() {
    return fetch(`${config.API_ENDPOINT}/words`, {
      headers: {},
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
  postWord(word) {
    return fetch(`${config.API_ENDPOINT}/words`, {
      method: 'POST',
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
  deleteWord(id) {
    return fetch(`${config.API_ENDPOINT}/words/${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res
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

export default WordApiService
