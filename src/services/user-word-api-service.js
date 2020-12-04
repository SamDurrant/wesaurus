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
    }).then((res) =>
      !res.ok
        ? res.json().then((e) => Promise.reject(e))
        : res.json().then((res) => res)
    )
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
  getWord(word_id) {
    const user_id = TokenService.readJwtToken().user_id

    return fetch(`${config.API_ENDPOINT}/users/${user_id}/words/${word_id}`, {
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    )
  },
  getWordDefinitions(id) {
    const user_id = TokenService.readJwtToken().user_id

    return fetch(
      `${config.API_ENDPOINT}/users/${user_id}/words/${id}/definitions`,
      {
        headers: {
          'content-type': 'application/json',
          authorization: `bearer ${TokenService.getAuthToken()}`,
        },
      }
    ).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    )
  },
  deleteWord(word_id) {
    const user_id = TokenService.readJwtToken().user_id

    return fetch(`${config.API_ENDPOINT}/users/${user_id}/words/${word_id}`, {
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
    const user_id = TokenService.readJwtToken().user_id

    return fetch(`${config.API_ENDPOINT}/users/${user_id}/words/${word.id}`, {
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
  postDefinition(id) {
    const user_id = TokenService.readJwtToken().user_id

    return fetch(`${config.API_ENDPOINT}/users/${user_id}/definitions`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        definition_id: id,
      }),
    }).then((res) =>
      !res.ok
        ? res.json().then((e) => Promise.reject(e))
        : res.json().then((res) => res)
    )
  },
  getDefinition(definition_id) {
    const user_id = TokenService.readJwtToken().user_id

    return fetch(
      `${config.API_ENDPOINT}/users/${user_id}/definitions/${definition_id}`,
      {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          authorization: `bearer ${TokenService.getAuthToken()}`,
        },
      }
    ).then((res) => {
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    })
  },
  deleteDefinition(definition_id) {
    const user_id = TokenService.readJwtToken().user_id

    return fetch(
      `${config.API_ENDPOINT}/users/${user_id}/definitions/${definition_id}`,
      {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
          authorization: `bearer ${TokenService.getAuthToken()}`,
        },
      }
    ).then((res) => (!res.ok ? res.json().then((e) => Promise.reject(e)) : res))
  },
}

export default UserWordApiService
