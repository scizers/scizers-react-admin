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

  editWebsiteScreens ({ slug, data }) {
    return new Promise((next) => {
      authAxios
        .put(`/website/${slug}`, data)
        .then((d) => {
          next(d.data)
        })
        .catch((err) => {
          next({ error: true, err })
          this.error(err)
        })

    })
  }

  toggleWebsiteEnabled ({ urlSlug }) {
    return new Promise((next) => {
      authAxios
        .get(`/website/${urlSlug}/toggle`)
        .then((d) => {
          next()
        })
        .catch((err) => {
          next({ error: true, err })
          this.error(err)
        })
    })

  }

  deleteWebsite ({ urlSlug }) {
    return new Promise((next) => {
      authAxios
        .delete(`/website/${urlSlug}`)
        .then((d) => {
          next(d.data)
        })
        .catch((err) => {
          next({ error: true, err })
          this.error(err)
        })

    })
  }

  undoDeleteWebsite ({ urlSlug }) {
    return new Promise((next) => {
      authAxios
        .patch(`/website/${urlSlug}`)
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

