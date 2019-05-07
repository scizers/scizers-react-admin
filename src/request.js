import axios from 'axios'

import { apiUrl } from './settings'

export const API_URL = apiUrl

let authAxios = axios.create({
  baseURL: apiUrl
})
let getToken = () => {
  return ({ 'headers': { 'Authorization': 'Bearer ' + localStorage.getItem('token') } })
}

class Request {

  error = (err) => {
    try {
      if (err.response.status === 401) {
        localStorage.clear()
      }
    } catch (e) {
    }
  }

  constructor () {

  }

  login (data) {
    return new Promise((next, error) => {
      authAxios
        .post('/login', data)
        .then((d) => {
          next(d.data)
        })
        .catch((err) => {
          next({ error: true, err })
          this.error(err)
        })

    })
  }

  getAllUser (data) {
    return new Promise((next) => {
      authAxios
        .get('/users', { params: { ...data } }, getToken())
        .then((d) => {
          next(d.data)
        })
        .catch((err) => {
          next({ error: true, err })
          this.error(err)
        })

    })
  }

  addUser (data) {
    return new Promise((next) => {
      authAxios
        .post('/users', { ...data }, getToken())
        .then((d) => {
          next(d.data)
        })
        .catch((err) => {
          next({ error: true, err })
          this.error(err)
        })

    })
  }


  getBudget () {
    return new Promise((next) => {
      authAxios
        .get(`budget`, getToken())
        .then((d) => {
          next(d.data)
        })
        .catch((err) => {
          next({ error: true, err })
          this.error(err)
        })

    })
  }

  getBudgetGroups (type) {
    return new Promise((next) => {
      authAxios
        .get(`budget/groups/${type}`, getToken())
        .then((d) => {
          next(d.data)
        })
        .catch((err) => {
          next({ error: true, err })
          this.error(err)
        })

    })
  }

  getAllContacts (data) {
    return new Promise((next) => {
      authAxios
        .get('/contact', { params: { ...data } })
        .then((d) => {
          next(d.data)
        })
        .catch((err) => {
          next({ error: true, err })
          this.error(err)
        })

    })
  }

  addContact (data) {
    return new Promise((next) => {
      authAxios
        .post('/contact', { ...data }, getToken())
        .then((d) => {
          next(d.data)
        })
        .catch((err) => {
          next({ error: true, err })
          this.error(err)
        })

    })
  }

  editContact (data) {
    return new Promise((next) => {
      authAxios
        .post(`/contact/${data._id}`, { ...data }, getToken())
        .then((d) => {
          next(d.data)
        })
        .catch((err) => {
          next({ error: true, err })
          this.error(err)
        })

    })
  }

  addBudget (data) {
    return new Promise((next) => {
      authAxios
        .post('/budget', { ...data }, getToken())
        .then((d) => {
          next(d.data)
        })
        .catch((err) => {
          next({ error: true, err })
          this.error(err)
        })

    })
  }

  editBudget (id, data) {
    return new Promise((next) => {
      authAxios
        .post(`/budget/${id}`, { ...data }, getToken())
        .then((d) => {
          next(d.data)
        })
        .catch((err) => {
          next({ error: true, err })
          this.error(err)
        })

    })
  }


  getSingleBudget (id) {
    return new Promise((next) => {
      authAxios
        .get(`/budget/${id}`, getToken())
        .then((d) => {
          next(d.data)
        })
        .catch((err) => {
          next({ error: true, err })
          this.error(err)
        })

    })
  }

  editScores (data) {
    return new Promise((next) => {
      authAxios
        .post('/editScores', { ...data }, getToken())
        .then((d) => {
          next(d.data)
        })
        .catch((err) => {
          next({ error: true, err })
          this.error(err)
        })

    })
  }

  csvUpload ({ type, uploadData }) {
    return new Promise((next) => {
      authAxios
        .post(`/csvUpload/${type}`, { uploadData })
        .then((d) => {
          next(d.data)
        })
        .catch((err) => {
          next({ error: true, err })
          this.error(err)
        })

    })
  }

  addInstitution (data) {
    return new Promise((next) => {
      authAxios
        .post('/institution', { ...data })
        .then((d) => {
          next(d.data)
        })
        .catch((err) => {
          next({ error: true, err })
          this.error(err)
        })

    })
  }

  getInstitution ({ id }) {
    return new Promise((next) => {
      authAxios
        .get(`/institution/${id}`, getToken())
        .then((d) => {
          next(d.data)
        })
        .catch((err) => {
          next({ error: true, err })
          this.error(err)
        })

    })
  }

  editInstitution (data, { id }) {
    return new Promise((next) => {
      authAxios
        .put(`/institution/${id}`, { ...data }, getToken())
        .then((d) => {
          next(d.data)
        })
        .catch((err) => {
          next({ error: true, err })
          this.error(err)
        })

    })
  }

  deleteInstitution ({ id }) {
    return new Promise((next) => {
      authAxios
        .delete(`/institution/${id}`, getToken())
        .then((d) => {
          next(d.data)
        })
        .catch((err) => {
          next({ error: true, err })
          this.error(err)
        })

    })
  }

  getAllInstitution (data) {
    return new Promise((next) => {
      authAxios
        .get('/institution', { params: { ...data } })
        .then((d) => {
          next(d.data)
        })
        .catch((err) => {
          next({ error: true, err })
          this.error(err)
        })

    })
  }

}

export default new Request()
