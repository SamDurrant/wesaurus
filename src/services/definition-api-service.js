import TokenService from './token-service'
import config from '../config'

const DefinitionApiService = {
  postDefinition(def) {
    return fetch(`${config.API_ENDPOINT}/definitions`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        text: def.text,
        word_id: def.word_id,
      }),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    )
  },
  deleteDefinition(def) {
    return fetch(`${config.API_ENDPOINT}/definitions/${def.id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    )
  },
  updateDefinition(def) {
    return fetch(`${config.API_ENDPOINT}/definitions/${def.id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        text: def.text,
        word_id: def.word_id,
      }),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    )
  },
}

export default DefinitionApiService
