import axios from 'axios'

import {apiUrl} from './settings'

export const API_URL = apiUrl

let authAxios = axios.create({
    baseURL: apiUrl
})


let getToken = () => {
    return ({'headers': {'Authorization': 'Bearer ' + localStorage.getItem('token')}})
}


class Request {

    constructor() {

    }

    error = (err) => {
        try {
            if (err.response.status === 401) {
                localStorage.clear()
            }
        } catch (e) {
        }
    }

    login(data) {
        return new Promise((next, error) => {
            authAxios
                .post('/login', data)
                .then((d) => {
                    next(d.data)
                })
                .catch((err) => {
                    next({error: true, err})
                    this.error(err)
                })

        })
    }

    getAllUser(data) {
        return new Promise((next) => {
            authAxios
                .get('/users', {params: {...data}}, getToken())
                .then((d) => {
                    next(d.data)
                })
                .catch((err) => {
                    next({error: true, err})
                    this.error(err)
                })

        })
    }

    addUser(data) {
        return new Promise((next) => {
            authAxios
                .post('/users', {...data}, getToken())
                .then((d) => {
                    next(d.data)
                })
                .catch((err) => {
                    next({error: true, err})
                    this.error(err)
                })

        })
    }


    addInstitution(data) {
        return new Promise((next) => {
            authAxios
                .post('/institution', {...data})
                .then((d) => {
                    next(d.data)
                })
                .catch((err) => {
                    next({error: true, err})
                    this.error(err)
                })

        })
    }

    getInstitution({id}) {
        return new Promise((next) => {
            authAxios
                .get(`/institution/${id}`, getToken())
                .then((d) => {
                    next(d.data)
                })
                .catch((err) => {
                    next({error: true, err})
                    this.error(err)
                })

        })
    }

    editInstitution(data, {id}) {
        return new Promise((next) => {
            authAxios
                .put(`/institution/${id}`, {...data}, getToken())
                .then((d) => {
                    next(d.data)
                })
                .catch((err) => {
                    next({error: true, err})
                    this.error(err)
                })

        })
    }

    deleteInstitution({id}) {
        return new Promise((next) => {
            authAxios
                .delete(`/institution/${id}`, getToken())
                .then((d) => {
                    next(d.data)
                })
                .catch((err) => {
                    next({error: true, err})
                    this.error(err)
                })

        })
    }

    getAllInstitution(data) {
        return new Promise((next) => {
            authAxios
                .get('/institution', {params: {...data}})
                .then((d) => {
                    next(d.data)
                })
                .catch((err) => {
                    next({error: true, err})
                    this.error(err)
                })

        })
    }

    addMakes(data) {
        return new Promise((next) => {

            authAxios.post('/make', {...data}, getToken())
                .then((d) => {
                    console.log(d)
                    next(d.data)
                }).catch((err) => {
                next({error: true, err})
            })


        })
    }

    getAllMakes(data) {
        return new Promise((next) => {
            console.log(data, "-------------------")
            authAxios.get('/makes', {params: {...data}}, getToken())
                .then((d) => {
                    console.log(d)
                    next(d.data)
                }).catch((err) => {
                next({error: true, err})
            })


        })
    }

    addCar(data) {
        return new Promise((next) => {

            authAxios.post('/car', {...data}, getToken())
                .then((d) => {
                    console.log(d)
                    next(d.data)
                }).catch((err) => {
                next({error: true, err})
            })


        })
    }

}

export default new Request()
