import axios from 'axios'

// export const API_URL = 'http://ndribackend.wss.io'
export const API_URL = 'http://localhost:8083'

let authAxios = axios.create({
  baseURL: API_URL
})

class Request {

  constructor () {
    // asyncStorage
    //   .getToken()
    //   .then((data) => {
    //     localStorage.getItem('token') = data
    //   })
  }

  error = (err) => {
    try {
      if (err.response.status === 401) {
        localStorage.clear()
      }
    } catch (e) {
    }
  }

  deleteHeads (data) {
    return new Promise((next, error) => {
      authAxios
        .delete('/heads', { data: { _id: data } }, { 'headers': { 'Authorization': 'Bearer ' + localStorage.getItem('token') } })
        .then((d) => {
          next(d.data)
        })
        .catch((err) => {
          error(err)
          this.error(err)
        })

    })
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

  addWebsite (data) {
    return new Promise((next) => {
      authAxios
        .post('/website', { data })
        .then((d) => {
          next(d.data)
        })
        .catch((err) => {
          next({ error: true, err })
          this.error(err)
        })

    })
  }

  getWebsites (data) {
    return new Promise((next) => {
      authAxios
        .post('/websites', { ...data })
        .then((d) => {
          next(d.data)
        })
        .catch((err) => {
          next({ error: true, err })
          this.error(err)
        })

    })
  }

  getWebsite (slug) {
    return new Promise((next) => {
      authAxios
        .get(`/website/${slug}`)
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

