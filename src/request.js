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

            authAxios.post('/backOffice/make', {...data}, getToken())
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
            authAxios.get('/backOffice/make', {params: {...data}}, getToken())
                .then((d) => {
                    next(d.data)
                }).catch((err) => {
                next({error: true, err})
            })


        })
    }

    addFuel(data) {
        return new Promise((next) => {

            authAxios.post('/backOffice/fuelType', {...data}, getToken())
                .then((d) => {
                    console.log(d)
                    next(d.data)
                }).catch((err) => {
                next({error: true, err})
            })


        })
    }


    getMake({id}) {
        return new Promise((next) => {
            authAxios.get('/backOffice/make/' + id, {}, getToken())
                .then((d) => {
                    next(d.data)
                }).catch((err) => {
                next({error: true, err})
            })


        })
    }


    editMake(data) {
        return new Promise((next) => {
            console.log(data, "@@@@@@@@@@@@222")
            authAxios.put('/backOffice/make/' + data._id, {params: {...data}}, getToken())
                .then((d) => {
                    console.log(d, "=========")
                    next(d.data)
                }).catch((err) => {
                next({error: true, err})
            })


        })
    }


    deleteMake(data) {
        return new Promise((next) => {
            console.log(data, "@@@@@@@@@@@@222")
            authAxios.delete('/backOffice/make/' + data._id, {params: {...data}}, getToken())
                .then((d) => {
                    console.log(d, "=========")
                    next(d.data)
                }).catch((err) => {
                next({error: true, err})
            })


        })
    }

    addModel(data) {
        return new Promise((next) => {

            authAxios.post('/backOffice/model', {...data}, getToken())
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
